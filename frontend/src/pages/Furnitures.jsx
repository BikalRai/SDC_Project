import PopularCard from "@/components/card/PopularCard";
import GridLayout from "@/components/layout/GridLayout";
import { useSelector } from "react-redux";

const Furnitures = () => {
  const { allItems } = useSelector((state) => state.item);
  return (
    <GridLayout>
      {allItems
        .filter((item) => item?.category.toLowerCase() === "furniture")
        .map((item) => (
          <PopularCard key={item?.id} item={item} />
        ))}
    </GridLayout>
  );
};

export default Furnitures;
