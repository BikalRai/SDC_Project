import React, { useEffect, useState } from "react";
import { LuUpload } from "react-icons/lu";

const ImageUploader = ({
  max = 10,
  value = [],
  onChange,
}) => {
  const [images, setImages] = useState([]);

  // sync from parent (edit mode support)
  useEffect(() => {
    if (value.length) {
      setImages(value);
    }
  }, [value]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    const updatedImages = [...images, ...newImages].slice(0, max);
    setImages(updatedImages);

    onChange?.(updatedImages);
  };

  return (
    <div className="space-y-4">
      {/* UPLOADER */}
      <div className="border border-dashed border-text-muted rounded-xl flex flex-col justify-center items-center p-8 relative cursor-pointer bg-background">
        <div className="flex flex-col items-center gap-4 pointer-events-none">
          <div className="bg-[#3b82f830] w-12 h-12 rounded-full flex items-center justify-center">
            <LuUpload className="stroke-primary text-3xl" />
          </div>
          <p className="text-text-muted text-sm text-center">
            Drag & Drop Images or Browse Files. Add up to {max} photos.
          </p>
        </div>

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>

      {/* PREVIEW GRID */}
      <div className="grid grid-cols-2 gap-4">
        {images.map((img, index) => (
          <div
            key={index}
            className="h-24 rounded-lg overflow-hidden border border-border"
          >
            <img
              src={img.preview}
              alt={`preview-${index}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        {/* Figma placeholders */}
        {Array.from({ length: Math.max(0, 2 - images.length) }).map(
          (_, i) => (
            <div
              key={`placeholder-${i}`}
              className="h-24 rounded-lg bg-muted"
            />
          )
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
