import { toast } from "react-toastify";

export const uploadToCloudinary = async (file) => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

  const formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);
  try {
    const res = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      toast.error("Failed to upload image.");
    }
    const data = await res.json();
    return data.secure_url;
  } catch (error) {
    console.error("Cloudinary error:", error);
  }
};
