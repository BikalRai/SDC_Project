import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import UserDashboardTitle from "@/components/header/UserDashboardTitle";
import { LuPlus, LuTrash2 } from "react-icons/lu";
import { CiEdit } from "react-icons/ci";
import Swal from "sweetalert2";
import { HiViewfinderCircle } from "react-icons/hi2";

const initialItems = [
  {
    id: 1,
    name: "NTorq 125",
    type: "Scooter",
    img: "https://images.unsplash.com/photo-1554223789-df81106a45ed?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: "1500",
    status: "available",
  },
  {
    id: 2,
    name: "NTorq 125",
    type: "Scooter",
    img: "https://images.unsplash.com/photo-1554223789-df81106a45ed?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: "1200",
    status: "rented out",
  },
];

const MyListedItems = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState(initialItems);

  const handleEdit = (id) => navigate(`/user/item-detail/${id}`);
  const handleView = (id) => navigate(`/user/view-item/${id}`);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setItems((prev) => prev.filter((item) => item.id !== id));
        toast.success("Item deleted successfully!");
      }
    });
  };

  return (
    <div className="grid gap-8">
      <div className="flex items-center justify-between">
        <UserDashboardTitle title="My Listed Items" />
        <PrimaryButton icon={<LuPlus />} btnText="Add new item" />
      </div>

      <div className="overflow-x-auto bg-card-bg rounded drop-shadow-xl border-gray-500">
        {/* Header */}
        <div className="grid grid-cols-[2fr_1fr_1fr_1.5fr] min-w-[900px] text-text-black font-medium p-3 border-b border-gray-300">
          <div className="ps-8 text-left">ITEM</div>
          <div className="text-center">PRICE</div>
          <div className="text-center">STATUS</div>
          <div className="text-center">ACTIONS</div>
        </div>

        {/* Items */}
        <div className="min-w-[900px]">
          {items.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-[2fr_1fr_1fr_1.5fr] bg-background text-text-muted text-sm p-3 items-center text-center border-b border-gray-300 hover:bg-card-bg transition"
            >
              <div className="flex items-center gap-4 ps-8">
                <img
                  src={item.img}
                  className="w-12 h-12 object-cover rounded"
                />
                <div className="text-left">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-xs">{item.type}</p>
                </div>
              </div>

              <div>{item.price}</div>

              <div
                className={`rounded-2xl bg-gray-200 text-gray-600 pt-1 align-middle ${
                  item.status === "available"
                    ? "text-green-600 bg-green-200"
                    : "text-red-500 bg-red-200"
                }`}
              >
                {item.status}
              </div>

              <div className="flex justify-center gap-4 text-xl">
                <HiViewfinderCircle
                  onClick={() => handleView(item.id)}
                  className="cursor-pointer hover:text-primary"
                />

                <CiEdit
                  onClick={() => handleEdit(item.id)}
                  className="cursor-pointer hover:text-primary"
                />
                <LuTrash2
                  onClick={() => handleDelete(item.id)}
                  className="cursor-pointer hover:text-red-500"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyListedItems;
