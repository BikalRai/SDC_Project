import UserDashboardTitle from "@/components/header/UserDashboardTitle";
import ImageUploader from "@/components/image/ImageUploader";
import FormLabel from "@/components/label/FormLabel";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";
import ItemDetail from "./ItemDetail";

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
        <p className="text-text-muted tex-sm">
          Add photos and details about your item to get ready for renters.
        </p>
        <ItemDetail />
      </div>
    </div>
  );
};

export default AddNewItem;
