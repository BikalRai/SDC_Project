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
import { getCategories } from "@/slices/category.slice";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import ImageUploader from "@/components/image/ImageUploader";
import SpecificationInput from "@/components/SpecificationInput";

const statuses = [
  { id: 1, status: "available" },
  { id: 2, status: "rented" },
  { id: 3, status: "unavailable" },
];

const conditions = [
  { id: 1, status: "great" },
  { id: 2, status: "good" },
  { id: 3, status: "poor" },
];

const AddNewItem = () => {
  const [itemData, setItemData] = useState({
    title: "",
    description: "",
    categoryId: "1",
    location: "",
    rate: "",
    status: "available",
    specifications: [],
  });

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories } = useSelector((state) => state.category);
  const { successMessage, item } = useSelector((state) => state.item);
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

    if (!itemData.categoryId) {
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
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    const payload = {
      ...itemData,
      rate: Number(itemData.rate),
      images: images.map((img) => img.file),
    };

    try {
      editMode
        ? dispatch(updateItem({ id: Number(id), updateData: payload }))
        : dispatch(addItem(payload));
    } catch (err) {
      toast.error("Something went wrong");
      setLoading(false);
    }
  };

  /* -------------------- EFFECTS -------------------- */
  useEffect(() => {
    dispatch(clearMessages());
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    if (id) dispatch(fetchItemById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (id && item) {
      setItemData({
        title: item?.title || "",
        description: item?.description || "",
        categoryId: item?.category?.id || "",
        location: item?.location || "",
        rate: item?.rate || "",
        status: item?.status || "available",
        specifications: item?.specifications || [],
      });
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
                value={itemData.categoryId}
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
              btnText={loading ? "Posting..." : "Post Item"}
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
