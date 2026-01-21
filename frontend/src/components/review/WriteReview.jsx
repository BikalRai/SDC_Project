import { useState } from "react";
import StarRating from "../starRating/StarRating";
import PrimaryButton from "../buttons/PrimaryButton";

const WriteReview = ({ maxRating = 5, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const handleSubmit = () => {
    if (!rating || !review.trim()) return;

    onSubmit?.({
      rating,
      review,
    });

    setRating(0);
    setReview("");
  };
  return (
    <div className='bg-white p-4 rounded-xl shadow-sm max-w-lg'>
      {/* Star rating */}
      <StarRating maxRating={maxRating} onRate={setRating} value={rating} />

      {/* Review input */}
      <textarea
        className='w-full mt-3 p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary'
        rows={4}
        placeholder='Write your review here...'
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />

      {/* Submit */}
      <div className='mt-3 text-right'>
        <PrimaryButton btnText='Submit Review' onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default WriteReview;
