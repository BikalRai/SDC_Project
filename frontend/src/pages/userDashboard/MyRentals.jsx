import UserDashboardTitle from "@/components/header/UserDashboardTitle";
import { cancelRent, fetchMyRentals } from "@/slices/rent.slice";
import { QRCodeCanvas } from "qrcode.react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DotLoader } from "react-spinners";
import { toast } from "react-toastify";

const MyRentals = () => {
  const { rentals, loading } = useSelector((state) => state.rent);
  const dispatch = useDispatch();

  const [showTokenModal, setShowTokenModal] = useState(false);
  const [activeToken, setActiveToken] = useState("");

  // ✅ New state for cancel confirmation
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [rentalToCancel, setRentalToCancel] = useState(null);

  const handleShowToken = (token) => {
    setActiveToken(token);
    setShowTokenModal(true);
  };

  // ✅ Handle cancel click - show confirmation modal
  const handleCancelClick = (rental) => {
    setRentalToCancel(rental);
    setShowCancelModal(true);
  };

  // ✅ Confirm cancellation
  const handleConfirmCancel = async () => {
    if (!rentalToCancel) return;

    try {
      await dispatch(cancelRent(rentalToCancel.rentalId)).unwrap();
      toast.success("Rental cancelled successfully!");
      setShowCancelModal(false);
      setRentalToCancel(null);

      // Refresh rentals list
      dispatch(fetchMyRentals());
    } catch (error) {
      toast.error(error?.message || "Failed to cancel rental");
    }
  };

  useEffect(() => {
    dispatch(fetchMyRentals());
  }, [dispatch]);

  // console.log(rentals, "myrentals");
  console.log(rentalToCancel, "rental id");

  return (
    <div className="grid gap-8 relative">
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
            {rentals?.length > 0 ? (
              rentals?.map((rent) => (
                <div
                  key={rent.rentalId}
                  className="grid grid-cols-[2fr_1fr_1fr_1.5fr] bg-background text-text-muted text-sm p-3 items-center 
                text-center border-b border-gray-300 hover:bg-card-bg transition"
                >
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

                  <div>{rent.item.dailyRate}</div>

                  <div>
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        rent.status === "COMPLETED"
                          ? "bg-green-100 text-green-700"
                          : rent.status === "CANCELLED"
                            ? "bg-red-100 text-red-700"
                            : rent.status === "RENTED"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {rent.status}
                    </span>
                  </div>

                  <div className="flex justify-center gap-4">
                    {rent.status !== "COMPLETED" &&
                    rent.status !== "CANCELLED" ? (
                      <>
                        {/* 1. Return Button */}
                        <button
                          onClick={() => handleShowToken(rent?.returnToken)}
                          className="bg-primary text-text-white px-4 py-1 rounded hover:bg-light-primary transition cursor-pointer"
                        >
                          Return Item
                        </button>

                        {/* 2. Cancel Button */}
                        <button
                          onClick={() => handleCancelClick(rent)}
                          className="bg-red-400 text-text-white px-4 py-1 rounded hover:bg-red-300 cursor-pointer transition"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      /* If it IS Completed or Cancelled, show a status label instead of buttons */
                      <div className="flex flex-col items-center">
                        <span className="text-gray-400 font-medium italic">
                          {rent.status === "COMPLETED"
                            ? "Closed (Completed)"
                            : "Closed (Cancelled)"}
                        </span>
                        <p className="text-[10px] text-gray-400">
                          No further actions available
                        </p>
                      </div>
                    )}
                    {/* <div> */}
                    {/* ✅ Only show cancel button if not completed */}
                    {/* {rent.status !== "COMPLETED" && (
                        <button
                          onClick={() => handleCancelClick(rent)}
                          className="bg-red-400 text-text-white px-4 py-1 rounded hover:bg-red-300 cursor-pointer transition"
                        >
                          Cancel
                        </button>
                      )} */}
                    {/* </div> */}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-text-muted">
                No items rented yet
              </div>
            )}
          </div>
        </div>
      )}

      {/* ✅ RETURN TOKEN MODAL */}
      {showTokenModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-2xl max-w-sm w-full text-center shadow-2xl transform transition-all">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Return Item
            </h3>
            <p className="text-gray-500 text-sm mb-6">
              The owner can scan this QR code or enter the manual token below.
            </p>

            {/* QR CODE DISPLAY */}
            <div className="flex justify-center mb-6 p-4 bg-white border rounded-xl shadow-inner">
              <QRCodeCanvas
                value={activeToken}
                size={180}
                level={"H"}
                includeMargin={true}
                imageSettings={{
                  src: "/favicon.ico",
                  x: undefined,
                  y: undefined,
                  height: 24,
                  width: 24,
                  excavate: true,
                }}
              />
            </div>

            {/* CLICKABLE TOKEN BACKUP */}
            <div
              className="bg-gray-100 p-3 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-200 transition mb-6"
              onClick={() => {
                navigator.clipboard.writeText(activeToken);
                toast.success("Token copied to clipboard!");
              }}
              title="Click to copy"
            >
              <p className="text-xs text-gray-400 uppercase font-bold mb-1">
                Manual Token (Click to copy)
              </p>
              <span className="text-lg font-mono font-bold text-primary break-all">
                {activeToken}
              </span>
            </div>

            <button
              onClick={() => setShowTokenModal(false)}
              className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-opacity-90 transition shadow-lg"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* ✅ CANCEL CONFIRMATION MODAL */}
      {showCancelModal && rentalToCancel && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-2xl max-w-md w-full shadow-2xl transform transition-all">
            {/* Warning Icon */}
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
            </div>

            {/* Modal Header */}
            <h3 className="text-2xl font-bold text-gray-800 mb-2 text-center">
              Cancel Rental?
            </h3>
            <p className="text-gray-500 text-sm mb-6 text-center">
              Are you sure you want to cancel this rental? This action cannot be
              undone.
            </p>

            {/* Rental Details */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-200">
              <div className="flex items-center gap-3">
                <img
                  src={rentalToCancel.item.images[0]}
                  alt={rentalToCancel.item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">
                    {rentalToCancel.item.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    Rs. {rentalToCancel.totalAmount}
                  </p>
                  <p className="text-xs text-gray-400">
                    Status: {rentalToCancel.status}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowCancelModal(false);
                  setRentalToCancel(null);
                }}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-300 transition"
              >
                Keep Rental
              </button>
              <button
                onClick={handleConfirmCancel}
                className="flex-1 bg-red-500 text-white py-3 rounded-xl font-semibold hover:bg-red-600 transition shadow-lg"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyRentals;
