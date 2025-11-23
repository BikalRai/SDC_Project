import UserDashboardTitle from "@/components/header/UserDashboardTitle";
import ImageUploader from "@/components/image/ImageUploader";
import FormLabel from "@/components/label/FormLabel";
import { IoIosArrowDown } from "react-icons/io";
import React, { useEffect, useState } from "react";
import KiSelect from "@/components/input/KiSelect";
import KiInput from "@/components/input/KiInput";
import TertiaryButton from "@/components/buttons/TertiaryButton";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import { useDispatch, useSelector } from "react-redux";
import { addItem, clearAddItemMessages } from "@/slices/item.slice";
import { getCategories } from "@/slices/category.slice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const statuses = [
  { id: 1, status: "available" },
  { id: 2, status: "rented" },
  { id: 3, status: "unavailable" },
];

const AddNewItem = () => {
  const [itemData, setItemData] = useState({
    title: "",
    description: "",
    categoryId: 1,
    location: "",
    rate: "",
    status: "available",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories } = useSelector((state) => state.category);
  const { successMessage } = useSelector((state) => state.item);

  const handleItemChange = (e) => {
    const { name, value } = e.target;

    setItemData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      dispatch(addItem(itemData));
      setItemData({
        title: "",
        description: "",
        categoryId: 1,
        location: "",
        rate: "",
        status: "available",
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (successMessage) {
      toast.success("Item added successfully.");
      dispatch(clearAddItemMessages());
      navigate("/user/dashboard");
    }

    dispatch(getCategories());
  }, [dispatch, successMessage, navigate]);

  return (
    <div>
      <div>
        <UserDashboardTitle title={`List Your Item`} />
        <p className='text-text-muted tex-sm'>
          Add photos and details about your item to get ready for renters.
        </p>
      </div>
      <form
        className='grid lg:grid-cols-2 gap-8 mt-5 pb-10'
        onSubmit={handleSubmit}
      >
        <div>
          <ImageUploader />
          <div>You currently have no images....</div>
        </div>
        <div className='grid gap-11'>
          <div className='bg-background px-10 py-8 grid gap-5'>
            <h1 className='text-2xl font-semibold'>Item Details</h1>
            <div className='grid gap-1'>
              <FormLabel labelText='Item Title' htmlFor='title' />
              <div className='outline-0 border border-border py-3 px-8 rounded group focus-within:border-primary transition-all duration-300'>
                <input
                  type='text'
                  className='border-0 outline-0 w-full'
                  placeholder='e.g. Honda Activa'
                  id='title'
                  name='title'
                  onChange={handleItemChange}
                />
              </div>
            </div>
            <div className='grid gap-1'>
              <FormLabel labelText='Description' htmlFor='description' />
              <div className='border border-border rounded'>
                <textarea
                  name='description'
                  id='description'
                  onChange={handleItemChange}
                  rows={5}
                  className='w-full h-full resize-none outline-0 border-0 px-8 py-3'
                  placeholder='Describe your item, its condition, and any usage rules.'
                ></textarea>
              </div>
            </div>
            <div className='flex items-center justify-between gap-10'>
              <KiSelect
                arr={categories}
                labelText='category'
                onChangeFunc={handleItemChange}
              />
              <KiInput
                name='location'
                placeholderText='e.g., Kathmandu, Lalitpur'
                onChangeFunc={handleItemChange}
              />
            </div>
          </div>
          <div className='bg-background px-10 py-8 grid gap-5'>
            <h1 className='text-2xl font-semibold'>Pricing & Availability</h1>
            <div className='flex items-center justify-between gap-10'>
              <KiInput
                name='rate'
                placeholderText='e.g., 1350'
                onChangeFunc={handleItemChange}
              />
              <KiSelect
                arr={statuses}
                labelText='status'
                onChangeFunc={handleItemChange}
              />
            </div>
          </div>
          <div className='w-fit flex items-center gap-5 ms-auto'>
            <TertiaryButton btnText='Cancel' />
            <PrimaryButton btnText='Post Item' type='submit' />
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddNewItem;
