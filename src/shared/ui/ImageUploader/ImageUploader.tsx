import React, { useRef, useState } from "react";
import styles from "./ImageUploader.module.scss";
import { UploadService } from "@/services/upload.servise";

interface ImageUploaderProps {
  value: string | null;
  onChange: (file: File | null, previewUrl: string | null) => void;
  folder: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
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

    const reader = new FileReader();
    reader.onload = async () => {
      const previewUrl = reader.result as string;
      setPreview(previewUrl);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const result = await UploadService.uploadImage(formData);
      const serverPath = result?.path;

      if (!serverPath) return;

      onChange(file, serverPath);
    };

    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);

    if (e.dataTransfer.items) {
      for (let i = 0; i < e.dataTransfer.items.length; i++) {
        const item = e.dataTransfer.items[i];
        if (item.kind === "file") {
          const file = item.getAsFile();
          if (file && file.type.startsWith("image/")) {
            handleFileChange(file);
            break;
          }
        }
      }
    } else if (e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith("image/")) {
        handleFileChange(file);
      }
    }
  };

  const handleClick = () => fileInputRef.current?.click();

  return (
    <>
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
          ref={fileInputRef}
          accept="image/*"
          style={{ display: "none" }}
          onChange={(e) => {
            const file = e.target.files?.[0] || null;
            handleFileChange(file);
          }}
        />
        {preview ? (
          <p>Предварительный просмотр изображения:</p>
        ) : (
          <p>Перетащите изображение сюда или нажмите для выбора</p>
        )}
      </div>
    </>
  );
};

export default ImageUploader;
