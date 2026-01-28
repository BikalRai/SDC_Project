import UserDashboardTitle from "@/components/header/UserDashboardTitle";
import FormLabel from "@/components/label/FormLabel";
import React, { useEffect, useState } from "react";
import KiSelect from "@/components/input/KiSelect";
import KiInput from "@/components/input/KiInput";
import TertiaryButton from "@/components/buttons/TertiaryButton";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  clearMessages,
  fetchItemById,
  updateItem,
} from "@/slices/item.slice";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import ImageUploader from "@/components/image/ImageUploader";
import SpecificationInput from "@/components/SpecificationInput";
import { uploadToCloudinary } from "@/utils/cloudinary";

const statuses = [
  { id: 1, status: "available" },
  { id: 2, status: "rented" },
  { id: 3, status: "unavailable" },
];

const conditions = [
  { id: 1, status: "new" },
  { id: 2, status: "excellent" },
  { id: 3, status: "good" },
  { id: 4, status: "fair" },
  { id: 5, status: "poor" },
];

const categories = [
  { id: 1, name: "VEHICLE" },
  { id: 2, name: "SCOOTER" },
  { id: 3, name: "BIKE" },
  { id: 4, name: "CAR" },
  { id: 5, name: "BOOK" },
  {
    id: 6,
    name: "ELECTRONICS",
  },
  {
    id: 7,
    name: "FURNITURE",
  },
  { id: 8, name: "TOOLS" },
  { id: 9, name: "SPORTS_EQUIPMENT" },
  { id: 10, name: "CAMERA" },
  { id: 11, name: "OTHER" },
];

const AddNewItem = () => {
  const [itemData, setItemData] = useState({
    title: "",
    description: "",
    category: "VEHICLE",
    brand: "",
    model: "",
    location: "",
    rate: "",
    status: "available",
    condition: "good",
    specifications: [],
  });

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { successMessage, item, error } = useSelector((state) => state.item);
  const { id } = useParams();

  const editMode = Boolean(id);

  const handleItemChange = (e) => {
    const { name, value } = e.target;
    setItemData((prev) => ({ ...prev, [name]: value }));
  };

  /* -------------------- VALIDATION -------------------- */
  const validateForm = () => {
    if (!itemData.title.trim()) {
      toast.error("Item name is required");
      return false;
    }

    if (!itemData.category) {
      toast.error("Please select a category");
      return false;
    }

    if (!itemData.rate || isNaN(itemData.rate)) {
      toast.error("Please enter a valid daily rate");
      return false;
    }

    if (itemData.specifications.length === 0) {
      toast.error("Please add at least one specification");
      return false;
    }

    if (!editMode && images.length === 0) {
      toast.error("Please upload at least one image");
      return false;
    }

    return true;
  };

  /* -------------------- SUBMIT -------------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      // 1. Separate new uploads from existing images
      const existingUrls = images
        .filter((img) => !img.file && img.url)
        .map((img) => img.url);

      const newFiles = images.filter((img) => img.file).map((img) => img.file);

      // 2. Upload only new files to Cloudinary
      const uploadedUrls = await Promise.all(
        newFiles.map((file) => uploadToCloudinary(file)),
      );

      // 3. Combine both
      const finalImages = [...existingUrls, ...uploadedUrls];

      const payload = {
        ...itemData,
        title: itemData.title, // Fixed: use itemData, not item
        name: itemData.title, // Depending on what your backend expects
        status: itemData.status.toUpperCase(),
        condition: itemData.condition.toUpperCase(),
        dailyRate: itemData.rate,
        images: finalImages,
      };

      if (editMode) {
        dispatch(updateItem({ id, updateData: payload }));
      } else {
        dispatch(addItem(payload));
      }
    } catch (err) {
      console.error("Submit Error:", err);
      toast.error("Operation failed");
      setLoading(false);
    }
  };

  /* -------------------- EFFECTS -------------------- */
  useEffect(() => {
    dispatch(clearMessages());
  }, [dispatch]);

  useEffect(() => {
    if (id) dispatch(fetchItemById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (error) {
      dispatch(clearMessages());
    }
  }, [dispatch, error]);

  useEffect(() => {
    if (id && item) {
      setItemData({
        title: item?.name || "",
        description: item?.description || "",
        category: item?.category || "VEHICLE",
        brand: item?.brand || "",
        model: item?.model || "",
        location: item?.location || "",
        rate: item?.dailyRate || "",
        status: item?.status?.toLowerCase() || "available",
        condition: item?.condition?.toLowerCase() || "good",
        specifications: item?.specifications || [],
      });

      // CRITICAL: Map existing URLs to the format your Uploader expects
      if (item.images && item.images.length > 0) {
        setImages(
          item.images.map((imgUrl) => ({
            url: imgUrl, // This allows the UI to display the existing image
            isExisting: true, // Useful flag to skip re-uploading
          })),
        );
      }
    }
  }, [id, item]);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(clearMessages());
      setLoading(false);
      navigate("/user/dashboard");
    }
  }, [dispatch, successMessage, navigate]);

  /* -------------------- UI -------------------- */
  return (
    <div className="space-y-6">
      <div>
        <UserDashboardTitle title="List Your Item" />
        <p className="text-sm text-text-muted">
          Add photos and details about your item to get ready for renters.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-10 pb-12"
      >
        {/* LEFT */}
        <div className="space-y-4">
          <h2 className="font-semibold text-lg">Item Photos</h2>
          <ImageUploader value={images} onChange={setImages} />
        </div>

        {/* RIGHT */}
        <div className="space-y-8">
          {/* BASIC */}
          <div className="bg-background rounded-xl px-10 py-8 space-y-6">
            <h2 className="text-xl font-semibold">Basic Information</h2>

            <div className="space-y-1">
              <FormLabel labelText="Item Name" />
              <input
                name="title"
                value={itemData.title}
                onChange={handleItemChange}
                placeholder="e.g. Honda Activa"
                className="w-full border border-border rounded-lg px-4 py-3 outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <KiSelect
                arr={categories}
                labelText="category"
                onChangeFunc={handleItemChange}
                value={itemData.category}
              />
              <KiSelect
                arr={conditions}
                labelText="condition"
                onChangeFunc={handleItemChange}
                value={itemData.condition}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <KiInput
                name="brand"
                placeholderText="Brand"
                onChangeFunc={handleItemChange}
              />
              <KiInput
                name="model"
                placeholderText="Model"
                onChangeFunc={handleItemChange}
              />
            </div>
          </div>

          {/* DETAILS */}
          <div className="bg-background rounded-xl px-10 py-8 space-y-6">
            <h2 className="text-xl font-semibold">Details & Specs</h2>

            <textarea
              name="description"
              rows={4}
              value={itemData.description}
              onChange={handleItemChange}
              placeholder="Description"
              className="w-full border border-border rounded-lg px-4 py-3 resize-none outline-none"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <KiInput
                name="location"
                placeholderText="Location"
                onChangeFunc={handleItemChange}
                value={itemData.location}
              />

              <SpecificationInput
                value={itemData.specifications}
                onChange={(specs) =>
                  setItemData((prev) => ({
                    ...prev,
                    specifications: specs,
                  }))
                }
              />
            </div>
          </div>

          {/* PRICING */}
          <div className="bg-background rounded-xl px-10 py-8 space-y-6">
            <h2 className="text-xl font-semibold">Pricing & Availability</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
              <div className="flex items-center border border-border rounded-lg px-4 py-3">
                <input
                  name="rate"
                  value={itemData.rate}
                  onChange={handleItemChange}
                  placeholder="Rs 1350"
                  className="w-full outline-none"
                />
                <span className="text-sm text-text-muted">/day</span>
              </div>

              <KiSelect
                arr={statuses}
                labelText="status"
                onChangeFunc={handleItemChange}
                value={itemData.status}
              />
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-4">
            <TertiaryButton btnText="Cancel" />
            <PrimaryButton
              btnText={
                loading ? "Posting..." : editMode ? "Update" : "Post Item"
              }
              type="submit"
              disabled={loading}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddNewItem;
