import UserDashboardTitle from "@/components/header/UserDashboardTitle";
import { fetchMyRentals } from "@/slices/rent.slice";
import { QRCodeCanvas } from "qrcode.react";
import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { LuTrash2 } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { DotLoader } from "react-spinners";

const MyRentals = () => {
  const { rentals, loading } = useSelector((state) => state.rent);
  const dispatch = useDispatch();

  const [showTokenModal, setShowTokenModal] = useState(false);
  const [activeToken, setActiveToken] = useState("");

  const handleShowToken = (token) => {
    setActiveToken(token);
    setShowTokenModal(true);
  };

  useEffect(() => {
    dispatch(fetchMyRentals());
  }, []);

  // console.log(rentals);

  return (
    <div className="grid gap-8 relative">
      {" "}
      {/* added relative for modal positioning */}
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
                      className={`px-2 py-1 rounded text-xs ${rent.status === "COMPLETED" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}
                    >
                      {rent.status}
                    </span>
                  </div>

                  <div className="flex justify-center gap-4">
                    {rent.status !== "COMPLETED" ? (
                      <button
                        onClick={() => handleShowToken(rent?.returnToken)}
                        className="bg-primary text-white px-4 py-1 rounded hover:bg-opacity-90 transition"
                      >
                        Return Item
                      </button>
                    ) : (
                      <span className="text-gray-400">Returned</span>
                    )}
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
                level={"H"} // High error correction
                includeMargin={true}
                imageSettings={{
                  src: "/favicon.ico", // Optional: put your logo in the middle
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
                alert("Token copied to clipboard!");
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
    </div>
  );
};

export default MyRentals;
