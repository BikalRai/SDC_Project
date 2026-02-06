import React, { useState } from "react";
import ReContainer from "../containers/ReContainer";
import SectionHeader from "../header/SectionHeader";
import PopularCard from "../card/PopularCard";
import SecondaryButton from "../buttons/SecondaryButton";
import { useSelector } from "react-redux";
import { DotLoader } from "react-spinners";

const MostPopularSection = () => {
  // Display limit
  const [visible, setVisible] = useState(4);

  const { allItems, loading } = useSelector((state) => state.item);

  // Load more handler
  const handleLoadMore = () => {
    setVisible((prev) => prev + 4); // load 4 more cards
  };

  return (
    <ReContainer>
      <section className="mt-20">
        <div className="bg-background rounded-[8px] py-8 px-10">
          <SectionHeader header="Most Popular Products" />
          {loading ? (
            <div className="flex items-center justify-center">
              <DotLoader />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6  mt-6">
                {allItems?.slice(0, visible).map((item) => (
                  <PopularCard key={item.id} item={item} />
                ))}
              </div>
              {visible < allItems?.length && (
                <div className="flex justify-center items-center mt-8">
                  <SecondaryButton
                    btnText="load more"
                    onClick={handleLoadMore}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </ReContainer>
  );
};

export default MostPopularSection;
