"use client";
import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { ProgressService } from "@/shared/services/progress.service";
import { useLectureProgress } from "@/providers/LectureProgressContext";

type FlexibleVideoProps = {
  url?: string;
  controls?: boolean;
  playing?: boolean;
  loop?: boolean;
  muted?: boolean;
  className?: string;
  aspectRatio?: string;
  userId: number;
  lectureId: number;
};

export function FlexibleVideo({
  url,
  controls = true,
  playing = false,
  loop = false,
  muted = false,
  className,
  aspectRatio = "16/9",
  userId,
  lectureId,
}: FlexibleVideoProps) {
  const [isClient, setIsClient] = useState(false);
  const [duration, setDuration] = useState(0);
  const [hasMarkedComplete, setHasMarkedComplete] = useState(false);
  const playerRef = useRef<ReactPlayer>(null);
  const { refreshProgress } = useLectureProgress();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleProgress = async ({
    playedSeconds,
  }: {
    playedSeconds: number;
  }) => {
    if (!duration || hasMarkedComplete) return;

    if (duration - playedSeconds <= 20) {
      try {
        await ProgressService.saveProgress({
          user_id: userId,
          lecture_id: lectureId,
          isCompleted: true,
          completedAt: new Date(),
          score: undefined,
        });

        refreshProgress();
        setHasMarkedComplete(true);
      } catch (error) {
        console.error("Ошибка при сохранении прогресса видео", error);
      }
    }
  };

  if (!isClient || !url) return null;

  return (
    <div
      className={className}
      style={{
        width: "100%",
        aspectRatio: aspectRatio,
        position: "relative",
        background: "#000",
      }}
    >
      <ReactPlayer
        ref={playerRef}
        url={url}
        controls={controls}
        playing={playing}
        loop={loop}
        muted={muted}
        width="100%"
        height="100%"
        style={{ position: "absolute", top: 0, left: 0 }}
        onDuration={(dur) => setDuration(dur)}
        onProgress={handleProgress}
      />
    </div>
  );
}
