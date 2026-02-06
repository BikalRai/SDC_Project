import { useSelector } from "react-redux";
import ItemCard from "../components/card/ItemCard";
import PopularCard from "@/components/card/PopularCard";
import GridLayout from "@/components/layout/GridLayout";
import { DotLoader } from "react-spinners";

const Vehicle = () => {
  const { allItems, loading } = useSelector((state) => state.item);
  // console.log(items);
  const vehicleItems = allItems.filter((item) =>
    ["vehicle", "car", "scooter"].includes(item?.category?.toLowerCase()),
  );
  return (
    <div>
      {loading ? (
        <DotLoader />
      ) : (
        <GridLayout>
          {vehicleItems.map((item) => (
            <PopularCard key={item.id} item={item} />
          ))}
        </GridLayout>
      )}
    </div>
  );
};

export default Vehicle;
