import { useState } from "react";
import ItemReview from "./ItemReview";
import WriteReview from "./WriteReview";

const reviews = [
  { id: 1, content: "content 1", rating: 3 },
  { id: 2, content: "content 2", rating: 3 },
  { id: 3, content: "content 3 ", rating: 3 },
];

const ItemReviews = () => {
  const [showReviewForm, setShowReviewForm] = useState(false);

  return (
    <div className='grid gap-5 bg-background rounded p-5'>
      <div className='flex items-center justify-between'>
        <h1 className='text-text-black font-bold text-xl'>Reviews</h1>
        <p
          className='text-sm cursor-pointer border-b-2 border-b-primary text-primary hover:text-light-primary hover:border-b-light-primary  transition'
          onClick={() => setShowReviewForm((prev) => !prev)}
        >
          {showReviewForm ? "Cancel" : "Write a review"}
        </p>
      </div>
      <div>{showReviewForm && <WriteReview />}</div>
      <div className='grid gap-4'>
        {reviews.map((review) => (
          <ItemReview key={review.id} item={review} />
        ))}
      </div>
    </div>
  );
};

export default ItemReviews;
