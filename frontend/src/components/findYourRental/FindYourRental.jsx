import ItemCard from "../card/ItemCard";
import ReContainer from "../containers/ReContainer";
import SectionHeader from "../header/SectionHeader";
import { useState } from "react";
import { useNavigate, Outlet, useLocation} from "react-router-dom";

const FindYourRental = () => {
  const categories = ["Vehicle", "Furniture", "Electronics", "Clothes"];
  const location = useLocation();
  
  const navigate = useNavigate();

  // Get current category from path
  const activeCategory =
    categories.find((cat) =>
      location.pathname.toLowerCase().includes(cat.toLowerCase())
    ) || "Vehicle";

  return (
    <ReContainer>
      <section className="mt-20">
        <div className="bg-background rounded-[8px] py-8 px-10">
          <div>
            <SectionHeader header="Find Your Rental" />
          </div>
          {/* Badge */}
          <div className="flex flex-col items-center mt-6">
            {/* Toggle Group */}
            <div className="flex overflow-hidden border-2 border-gray-300 rounded-2xl bg-white shadow-sm mb-8">
              {categories.map((category, index) => {
                const isActive = activeCategory === category;

                // Determine dynamic border radius
                const radiusClass =
                  index === 0
                    ? "rounded-l-xl"
                    : index === categories.length - 1
                    ? "rounded-r-xl"
                    : "rounded-none";

                return (
                  <button
                    key={index}
                    onClick={() => navigate(`/find/${category.toLowerCase()}`)}
                    className={`
                      ${radiusClass}
                      relative px-6 py-2 font-medium transition-all duration-300
                      focus:outline-none
                      ${
                        isActive
                          ? "bg-gray-700 text-white shadow-inner"
                          : "bg-transparent text-gray-700 hover:bg-gray-200"
                      }
                    `}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            {/* Item Grid */}
              <Outlet />
          </div>
        </div>
      </section>
    </ReContainer>
  );
};

export default FindYourRental;
