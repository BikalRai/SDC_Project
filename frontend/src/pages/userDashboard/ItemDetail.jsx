import { useState } from "react";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { LuUpload } from "react-icons/lu";
import ImageUploader from "@/components/image/ImageUploader";

const ItemDetail = () => {
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Scooter");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("available");

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map((file) => URL.createObjectURL(file));
    setImages([...images, ...urls].slice(0, 10)); // max 10 images
  };

  const handlePost = () => {
    if (
      !title.trim() ||
      !description.trim() ||
      !location.trim() ||
      !price.trim() ||
      images.length === 0
    ) {
      toast.error("Please fill all fields and upload at least one image!");
      return;
    }

    Swal.fire({
      title: "Are you sure you want to post this item?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "green",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, post it",
    }).then((result) => {
      if (result.isConfirmed) {
        // Reset all fields
        setTitle("");
        setDescription("");
        setLocation("");
        setPrice("");
        setCategory("Scooter");
        setStatus("available");
        setImages([]);
        toast.success("Item posted successfully!");
      }
    });
  };

  // Reload the page on cancel
  const handleCancel = () => {
    Swal.fire({
      title: "Are you sure you want to cancel this post?",
      text: "your entries will be reverted",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "green",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, revert it",
    }).then((result) => {
      if (result.isConfirmed) {
        toast.success("Item cancelled successfully!");
        setTitle("");
        setDescription("");
        setLocation("");
        setPrice("");
        setCategory("Scooter");
        setStatus("available");
        setImages([]);
      }
    });
  };

  return (
    <div className="p-8 grid grid-cols-2 gap-8 bg-gray-50 min-h-screen">
      {/* Left - Images */}
      <div>
        <ImageUploader
          onUpload={handleImageUpload}
          className="h-96 bg-gray-100"
        />

        {/* Thumbnails Grid */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          {images.map((img, idx) => (
            <div key={idx} className="relative w-full h-24">
              <img
                src={img}
                alt={`Item ${idx}`}
                className="w-full h-full object-cover object-top rounded"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Right - Details */}
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
          <h2 className="font-semibold text-lg">Item Details</h2>
          <div>
            <TextField
              fullWidth
              label="Item Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Honda Activa"
              size="small"
            />
          </div>

          <div>
            <TextField
              fullWidth
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your item, its condition, and any usage rules."
              multiline
              rows={4}
              size="small"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormControl fullWidth size="small">
              <InputLabel>Category</InputLabel>
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                label="Category"
              >
                <MenuItem value="Scooter">Scooter</MenuItem>
                <MenuItem value="Bike">Bike</MenuItem>
                <MenuItem value="Car">Car</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., Balambu, Kathmandu"
              size="small"
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
          <h2 className="font-semibold text-lg">Pricing & Availability</h2>
          <div className="grid grid-cols-2 gap-4 items-center">
            <TextField
              type="number"
              fullWidth
              label="Price"
              value={price}
              onChange={(e) => {
                const value = Number(e.target.value);
                setPrice(value < 1 ? 1 : value);
              }}
              placeholder="Rs per day"
              size="small"
            />

            <FormControl fullWidth size="small">
              <InputLabel>Status</InputLabel>
              <Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                label="Status"
              >
                <MenuItem value="available">Available</MenuItem>
                <MenuItem value="rented">Rented Out</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            className="px-4 py-2 rounded bg-gray-200 text-gray-700"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <PrimaryButton btnText="Post Item" onClick={handlePost} />
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
