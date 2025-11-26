import { useParams, useNavigate } from "react-router-dom";
import { LuArrowLeft } from "react-icons/lu";
import { useEffect, useState } from "react";

const dummyItems = [
  {
    id: 1,
    name: "NTorq 125",
    type: "Scooter",
    img: "https://images.unsplash.com/photo-1554223789-df81106a45ed?q=80&w=1170",
    price: "1500",
    status: "available",
    description:
      "A stylish, sporty 125cc scooter with excellent pickup and road stability.",
  },
  {
    id: 2,
    name: "MT-15 V2",
    type: "Bike",
    img: "https://images.unsplash.com/photo-1554223789-df81106a45ed?q=80&w=1170",
    price: "2500",
    status: "rented out",
    description:
      "A powerful modern bike known for best-in-class mileage and pickup.",
  },
];

const ViewItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);

  useEffect(() => {
    if (!id) return;
    const found = dummyItems.find((i) => String(i.id) === String(id));
    if (!found) {
      console.warn("Item not found for id:", id);
    }
    setItem(found || null);
  }, [id]);

  if (!item) return <div className="p-6">Item not found</div>;

  return (
    <div className="p-6 h-full">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-primary hover:underline mb-6"
      >
        <LuArrowLeft /> Back
      </button>

      {/* Layout */}
      <div className="grid md:grid-cols-2 gap-10 bg-card-bg p-6 rounded-xl shadow-lg border border-gray-200">
        {/* Image Section */}
        <div className="flex items-center justify-center">
          <img
            src={item.img}
            alt={item.name}
            className="rounded-xl shadow-md w-full max-h-[450px] object-cover"
          />
        </div>

        {/* Details Section */}
        <div className="space-y-5">
          <h1 className="text-3xl font-bold text-text-black">{item.name}</h1>
          <p className="text-text-muted text-lg">{item.type}</p>

          {/* Status */}
          <span
            className={`px-4 py-1 inline-block rounded-full text-sm font-medium ${
              item.status === "available"
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
            }`}
          >
            {item.status}
          </span>

          {/* Price */}
          <div className="text-2xl font-semibold text-primary">
            Rs {item.price} / day
          </div>

          {/* Description */}
          <p className="text-text-muted leading-relaxed">{item.description}</p>

          {/* Action Button */}
          <button
            disabled={item.status !== "available"}
            className={`mt-6 w-full py-3 rounded-lg text-white text-lg transition ${
              item.status === "available"
                ? "bg-primary hover:bg-light-primary"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {item.status === "available" ? "Rent Now" : "Currently Unavailable"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewItem;
