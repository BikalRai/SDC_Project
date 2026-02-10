import PopularCard from "@/components/card/PopularCard";
import GridLayout from "@/components/layout/GridLayout";
import { getAllItems } from "@/slices/item.slice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DotLoader } from "react-spinners";

const Book = () => {
  const { allItems, loading } = useSelector((state) => state.item);
  const dispatch = useDispatch();
  const bookItems = allItems.filter(
    (item) => item.category.toLowerCase() === "book",
  );

  useEffect(() => {
    dispatch(getAllItems());
  }, []);
  return (
    <div>
      {loading ? (
        <div className="flex items-center justify-center">
          <DotLoader />
        </div>
      ) : (
        <GridLayout>
          {bookItems
            .filter((item) => item.category.toLowerCase() === "book")
            .map((item) => (
              <PopularCard key={item?.id} item={item} />
            ))}
        </GridLayout>
      )}
    </div>
  );
};

export default Book;
