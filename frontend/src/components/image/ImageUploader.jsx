import React from "react";
import { LuCamera, LuX } from "react-icons/lu";

const ImageUploader = ({ max = 10, value = [], onChange }) => {
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    // Create preview strings for local files
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    const updatedImages = [...value, ...newImages].slice(0, max);
    onChange?.(updatedImages);

    // Reset input value so the same file can be uploaded again if deleted
    e.target.value = null;
  };

  const removeImage = (indexToRemove) => {
    const updated = value.filter((_, index) => index !== indexToRemove);
    onChange?.(updated);
  };

  return (
    <div className="space-y-4">
      {/* UPLOADER BOX */}
      <div className="border border-dashed border-border rounded-xl flex flex-col justify-center items-center p-8 relative cursor-pointer bg-background hover:bg-muted/30 transition-colors">
        <div className="flex flex-col items-center gap-3 pointer-events-none">
          <div className="bg-primary/10 w-14 h-14 rounded-full flex items-center justify-center">
            {/* LU CAMERA ICON */}
            <LuCamera className="text-primary text-2xl" />
          </div>
          <div className="text-center">
            <p className="font-medium text-sm">Upload Photos</p>
            <p className="text-text-muted text-xs">
              Up to {max} images • PNG, JPG
            </p>
          </div>
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
        {value.map((img, index) => (
          <div
            key={index}
            className="group h-24 rounded-lg overflow-hidden border border-border relative"
          >
            <img
              // IMPORTANT: Fallback to .url if .preview (local blob) doesn't exist
              src={img.preview || img.url}
              alt={`preview-${index}`}
              className="w-full h-full object-cover"
            />

            {/* REMOVE BUTTON */}
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-1 right-1 bg-black/50 hover:bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-all"
            >
              <LuX size={14} />
            </button>
          </div>
        ))}

        {/* PLACEHOLDERS (Fills up to 2 slots if empty) */}
        {Array.from({ length: Math.max(0, 2 - value.length) }).map((_, i) => (
          <div
            key={`placeholder-${i}`}
            className="h-24 rounded-lg bg-muted/50 border border-border/50 flex items-center justify-center"
          >
            <LuCamera className="text-border text-xl" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;
