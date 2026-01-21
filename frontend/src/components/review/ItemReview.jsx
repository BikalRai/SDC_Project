import React from "react";
import ItemReviewRating from "./ItemReviewRating";

const ItemReview = ({ item }) => {
  return (
    <div className='grid gap-5 p-4 bg-card-bg rounded'>
      <ItemReviewRating rating={item.rating} />
      <p>{item.content}</p>
    </div>
  );
};

export default ItemReview;
