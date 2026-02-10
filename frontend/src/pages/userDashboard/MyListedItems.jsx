import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import UserDashboardTitle from "@/components/header/UserDashboardTitle";
import { LuPlus, LuTrash2 } from "react-icons/lu";
import { CiEdit } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import {
  clearMessages,
  deleteItem,
  getUserListedItems,
} from "@/slices/item.slice";
import { getCategories } from "@/slices/category.slice";
import { DotLoader } from "react-spinners";
import { pickupRentItem, returnRentItem } from "@/slices/rent.slice";

const MyListedItems = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [confirmType, setConfirmType] = useState("");

  const { items, successMessage, loading } = useSelector((state) => state.item);

  const [showConfirmInput, setShowConfirmInput] = useState(null); // Tracks which item is being returned
  const [tokenValue, setTokenValue] = useState("");
  console.log(tokenValue);

  const handleActionSubmit = async (itemId) => {
    if (!tokenValue)
      return toast.error(
        `Please enter the token for ${confirmType.toLowerCase()}`,
      );

    try {
      if (confirmType === "PICKUP") {
        await dispatch(pickupRentItem(tokenValue)).unwrap();
        toast.success("Pickup confirmed! Rental is now active.");
      } else {
        await dispatch(returnRentItem(tokenValue)).unwrap();
        toast.success("Item returned successfully!");
      }

      setTokenValue("");
      setShowConfirmInput(null);
      dispatch(getUserListedItems());
    } catch (error) {
      toast.error(error?.message || "Invalid Token.");
    }
  };

  // Delete Handler
  const handleDelete = (id) => {
    if (!id) return;
    dispatch(deleteItem(id));
  };

  // Show success toast
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      setTimeout(() => dispatch(clearMessages()), 500);
    }
  }, [successMessage, dispatch]);

  // Fetch items + categories once
  useEffect(() => {
    dispatch(getUserListedItems());
    dispatch(getCategories());
  }, [dispatch]);

  // console.log(items);

  return (
    <div className="grid gap-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <UserDashboardTitle title="My Listed Items" />

        <PrimaryButton
          icon={<LuPlus />}
          btnText="Add new item"
          onClick={() => navigate("/user/add")}
        />
      </div>

      {/* Table */}
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
            {items?.length > 0 ? (
              items.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-[2fr_1fr_1fr_1.5fr] bg-background text-text-muted text-sm p-3 items-center 
                text-center border-b border-gray-300 hover:bg-card-bg transition"
                >
                  {/* Item Info */}
                  <div className="flex items-center gap-4 ps-8">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-12 h-12 object-contain rounded"
                    />

                    <div className="text-left">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-xs">
                        {item.category || "No Category"}
                      </p>
                    </div>
                  </div>

                  {/* Price */}
                  <div>{item.dailyRate}</div>

                  {/* Status */}
                  <div>{item.status}</div>

                  {/* Actions */}
                  <div className="flex justify-center gap-4 text-xl">
                    {item.status === "UNAVAILABLE" ||
                    item.status === "RENTED" ? (
                      <div className="flex flex-col items-center gap-2">
                        {showConfirmInput === item.id ? (
                          <div className="flex gap-2">
                            <input
                              type="text"
                              placeholder="Enter Token"
                              className="text-xs border p-1 rounded w-24 text-black"
                              value={tokenValue}
                              onChange={(e) => setTokenValue(e.target.value)}
                            />
                            <button
                              onClick={() => handleActionSubmit(item.id)}
                              className="text-xs bg-green-600 text-white px-2 py-1 rounded"
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() => setShowConfirmInput(null)}
                              className="text-xs text-red-500"
                            >
                              X
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              setShowConfirmInput(item.id);
                              // If item status is RENTED, we are waiting for RETURN.
                              // If UNAVAILABLE (waiting for pickup), we are doing PICKUP.
                              setConfirmType(
                                item.status === "RENTED" ? "RETURN" : "PICKUP",
                              );
                            }}
                            className={`text-xs text-white px-3 py-1 rounded transition ${
                              item.status === "RENTED"
                                ? "bg-primary"
                                : "bg-green-600"
                            }`}
                          >
                            {item.status === "RENTED"
                              ? "Confirm Return"
                              : "Confirm Pickup"}
                          </button>
                        )}
                      </div>
                    ) : (
                      <>
                        <CiEdit
                          className="cursor-pointer hover:text-primary transition-all duration-300"
                          onClick={() => navigate(`/user/edit-item/${item.id}`)}
                        />
                        <LuTrash2
                          className="cursor-pointer hover:text-red-500 transition-all duration-300"
                          onClick={() => handleDelete(item.id)}
                        />
                      </>
                    )}
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

export default MyListedItems;
