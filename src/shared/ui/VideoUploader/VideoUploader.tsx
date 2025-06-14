"use client";

import React, { useRef, useState } from "react";
import styles from "./VideoUploader.module.scss";
import { UploadService } from "@/shared/services/upload.servise";
import { LuUpload } from "react-icons/lu";

interface VideoUploaderProps {
  value: string | null;
  onChange: (file: File | null, serverPath: string | null) => void;
  folder: string;
}

const VideoUploader: React.FC<VideoUploaderProps> = ({
  value,
  onChange,
  folder,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string | null>(value);

  const handleFileChange = async (file: File | null) => {
    if (!file) {
      onChange(null, null);
      setPreview(null);
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    const result = await UploadService.uploadVideo(formData);
    const serverPath = result?.path;

    if (!serverPath) return;

    onChange(file, serverPath);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("video/")) {
      handleFileChange(file);
    }
  };

  const handleClick = () => fileInputRef.current?.click();

  return (
    <div
      className={`${styles.dropzone} ${dragActive ? styles.active : ""}`}
      onDragOver={(e) => {
        e.preventDefault();
        setDragActive(true);
      }}
      onDragLeave={() => setDragActive(false)}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <input
        type="file"
        accept="video/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
      />
      {preview ? (
        <video controls width="100%">
          <source src={preview} />
          Ваш браузер не поддерживает видео.
        </video>
      ) : (
        <div>
          <LuUpload />
          <p>Перетащите видео сюда или нажмите для выбора</p>
        </div>
      )}
    </div>
  );
};

export default VideoUploader;
