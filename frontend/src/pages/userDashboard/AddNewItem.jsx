import UserDashboardTitle from "@/components/header/UserDashboardTitle";
import ImageUploader from "@/components/image/ImageUploader";
import FormLabel from "@/components/label/FormLabel";
import { IoIosArrowDown } from "react-icons/io";
import React from "react";
import KiSelect from "@/components/input/KiSelect";
import KiInput from "@/components/input/KiInput";
import TertiaryButton from "@/components/buttons/TertiaryButton";
import PrimaryButton from "@/components/buttons/PrimaryButton";

const categories = [
  { id: 1, name: "scooter" },
  { id: 2, name: "electronic" },
  { id: 3, name: "book" },
];

const statuses = [
  { id: 1, name: "available" },
  { id: 2, name: "rented" },
  { id: 3, name: "unavailable" },
];

const AddNewItem = () => {
  return (
    <div>
      <div>
        <UserDashboardTitle title={`List Your Item`} />
        <p className='text-text-muted tex-sm'>
          Add photos and details about your item to get ready for renters.
        </p>
      </div>
      <form className='grid lg:grid-cols-2 gap-8 mt-5 pb-10'>
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
                />
              </div>
            </div>
            <div className='grid gap-1'>
              <FormLabel labelText='Description' htmlFor='description' />
              <div className='border border-border rounded'>
                <textarea
                  name='description'
                  id='description'
                  rows={5}
                  className='w-full h-full resize-none outline-0 border-0 px-8 py-3'
                  placeholder='Describe your item, its condition, and any usage rules.'
                ></textarea>
              </div>
            </div>
            <div className='flex items-center justify-between gap-10'>
              <KiSelect arr={categories} labelText='category' />
              <KiInput
                name='location'
                placeholderText='e.g., Kathmandu, Lalitpur'
              />
            </div>
          </div>
          <div className='bg-background px-10 py-8 grid gap-5'>
            <h1 className='text-2xl font-semibold'>Pricing & Availability</h1>
            <div className='flex items-center justify-between gap-10'>
              <KiInput name='price per day' placeholderText='e.g., 1350' />
              <KiSelect arr={statuses} labelText='status' />
            </div>
          </div>
          <div className='w-fit flex items-center gap-5 ms-auto'>
            <TertiaryButton btnText='Cancel' />
            <PrimaryButton btnText='Post Item' />
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddNewItem;
