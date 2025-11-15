import UserDashboardTitle from "@/components/header/UserDashboardTitle";
import React from "react";

const AddNewItem = () => {
  return (
    <div>
      <div>
        <UserDashboardTitle title={`List Your Item`} />
        <p className='text-text-muted tex-sm'>
          Add photos and details about your item to get ready for renters.
        </p>
      </div>
    </div>
  );
};

export default AddNewItem;
