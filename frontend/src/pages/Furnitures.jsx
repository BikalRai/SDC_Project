import PopularCard from "@/components/card/PopularCard";
import GridLayout from "@/components/layout/GridLayout";
import { useSelector } from "react-redux";
import { DotLoader } from "react-spinners";

const Furnitures = () => {
  const { allItems, loading } = useSelector((state) => state.item);
  return (
    <div>
      {loading ? (
        <div className="flex items-center justify-center">
          <DotLoader />
        </div>
      ) : (
        <GridLayout>
          {allItems
            .filter((item) => item?.category.toLowerCase() === "furniture")
            .map((item) => (
              <PopularCard key={item?.id} item={item} />
            ))}
        </GridLayout>
      )}
    </div>
  );
};

export default Furnitures;
