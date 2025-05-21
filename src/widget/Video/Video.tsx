"use client";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";

type FlexibleVideoProps = {
  url?: string;
  controls?: boolean;
  playing?: boolean;
  loop?: boolean;
  muted?: boolean;
  width?: string;
  height?: string;
  className?: string;
};

export function FlexibleVideo({
  url,
  controls = true,
  playing = false,
  loop = false,
  muted = false,
  width = "100%",
  height = "auto",
  className,
}: FlexibleVideoProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || !url) return null;

  return (
    <div className={className}>
      <ReactPlayer
        url={url}
        controls={controls}
        playing={playing}
        loop={loop}
        muted={muted}
        width={width}
        height={height}
      />
    </div>
  );
}
