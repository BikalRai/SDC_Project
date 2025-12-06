import PopularCard from "@/components/card/PopularCard";
import GridLayout from "@/components/layout/GridLayout";
import { useSelector } from "react-redux";

const Book = () => {
  const { items } = useSelector((state) => state.item);
  const bookItems = items.filter(
    (item) => item.category.toLowerCase() === "book"
  );
  console.log(bookItems, "book items");
  return (
    <GridLayout>
      {items
        .filter((item) => item.category.toLowerCase() === "book")
        .map((item) => (
          <PopularCard key={item?.id} item={item} />
        ))}
    </GridLayout>
  );
};

export default Book;
