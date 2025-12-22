export const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "sdc-project"); // replace with your upload preset

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/dextbyghk/image/upload", // replace your_cloud_name
    {
      method: "POST",
      body: formData,
    }
  );
  const data = await res.json();
  return data.secure_url;
};
