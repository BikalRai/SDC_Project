import PopularCard from "@/components/card/PopularCard";
import GridLayout from "@/components/layout/GridLayout";
import { useSelector } from "react-redux";

const Electronic = () => {
  const { items } = useSelector((state) => state.item);
  return (
    <GridLayout>
      {items.map((item) => (
        <PopularCard key={item?.id} item={item} />
      ))}
    </GridLayout>
  );
};

export default Electronic;
