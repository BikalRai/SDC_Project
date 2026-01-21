import { Rating, Stack } from "@mui/material";

const ItemReviewRating = ({ rating }) => {
  return (
    <Stack spacing={1}>
      <Rating value={rating} precision={0.5} readOnly />
    </Stack>
  );
};

export default ItemReviewRating;
