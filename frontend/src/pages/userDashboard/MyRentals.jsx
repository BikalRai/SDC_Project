import UserDashboardTitle from "@/components/header/UserDashboardTitle";
import { fetchMyRentals } from "@/slices/rent.slice";
import React, { useEffect } from "react";
import { CiEdit } from "react-icons/ci";
import { LuTrash2 } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { DotLoader } from "react-spinners";

const MyRentals = () => {
  const { rentals, loading } = useSelector((state) => state.rent);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMyRentals());
  }, []);

  return (
    <div className="grid gap-8">
      <div>
        <UserDashboardTitle title="My Rentals" />
      </div>

      {loading ? (
        <div className="min-h-max p-20 flex items-center justify-center">
          <DotLoader />
        </div>
      ) : (
        <div className="overflow-x-auto bg-card-bg rounded drop-shadow-xl border-gray-500">
          {/* Table Header */}
          <div className="grid grid-cols-[2fr_1fr_1fr_1.5fr] min-w-[900px] text-text-black font-medium p-3 border-b border-gray-300">
            <div className="ps-8 text-left">ITEM</div>
            <div className="text-center">PRICE</div>
            <div className="text-center">STATUS</div>
            <div className="text-center">ACTIONS</div>
          </div>

          {/* Table Body */}
          <div className="min-w-[900px]">
            {rentals?.data?.length > 0 ? (
              rentals.data.map((rent) => (
                <div
                  key={rent.id}
                  className="grid grid-cols-[2fr_1fr_1fr_1.5fr] bg-background text-text-muted text-sm p-3 items-center 
                text-center border-b border-gray-300 hover:bg-card-bg transition"
                >
                  {/* Item Info */}
                  <div className="flex items-center gap-4 ps-8">
                    <img
                      src={rent.item.images[0]}
                      alt={rent.item.name}
                      className="w-12 h-12 object-contain rounded"
                    />

                    <div className="text-left">
                      <p className="font-medium">{rent.item.name}</p>
                      <p className="text-xs">
                        {rent.item.category || "No Category"}
                      </p>
                    </div>
                  </div>

                  {/* Price */}
                  <div>{rent.item.dailyRate}</div>

                  {/* Status */}
                  <div>{rent.item.status}</div>

                  {/* Actions */}
                  <div className="flex justify-center gap-4 text-xl">
                    <CiEdit
                      className="cursor-pointer hover:text-primary transition-all duration-300"
                      // onClick={() => navigate(`/user/edit-item/${item.id}`)}
                    />

                    <LuTrash2
                      className="cursor-pointer hover:text-red-500 transition-all duration-300"
                      // onClick={() => handleDelete(item.id)}
                    />
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-text-muted">
                No items listed yet
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyRentals;
