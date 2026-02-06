import PopularCard from "@/components/card/PopularCard";
import GridLayout from "@/components/layout/GridLayout";
import { useSelector } from "react-redux";

const Electronic = () => {
  const { allItems } = useSelector((state) => state.item);
  return (
    <GridLayout>
      {allItems
        .filter((item) => item.category.toLowerCase() === "electronics")
        .map((item) => (
          <PopularCard key={item?.id} item={item} />
        ))}
    </GridLayout>
  );
};

export default Electronic;
