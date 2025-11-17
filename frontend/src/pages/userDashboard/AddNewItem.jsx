import UserDashboardTitle from "@/components/header/UserDashboardTitle";
import ImageUploader from "@/components/image/ImageUploader";
import FormLabel from "@/components/label/FormLabel";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

const categories = [
  { id: 1, name: "scooter" },
  { id: 2, name: "electronic" },
  { id: 3, name: "book" },
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
      <div>
        <ImageUploader />
      </div>
      <form className='bg-background'>
        <h1 className='text-2xl font-semibold'>Item Details</h1>
        <div>
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
        <div>
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
        <div>
          <div>
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>Category</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                label='Age'
              >
                {categories.map((category) => (
                  <MenuItem key={category.id}>{`${
                    category.name[0]
                  }${category.name.slice(1).toLowerCase()}`}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddNewItem;
