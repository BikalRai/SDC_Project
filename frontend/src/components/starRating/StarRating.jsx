import { useState } from "react";
import Star from "./Star";

const StarRating = ({ maxRating }) => {
  const [rating, setRating] = useState(0);
  const [tempRating, setTempRating] = useState(0);

  const handleRate = (rating) => {
    setRating(rating);
  };

  return (
    <div>
      <div className='flex items-center gap-1'>
        {Array.from({ length: maxRating }, (_, i) => (
          <div key={i + 1}>
            <Star
              key={i}
              full={tempRating ? tempRating >= 1 + 1 : rating >= 1 + 1}
              onRate={() => handleRate(i + 1)}
              onHoverIn={() => setTempRating(i + 1)}
              onHoverOut={() => setTempRating(0)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default StarRating;
