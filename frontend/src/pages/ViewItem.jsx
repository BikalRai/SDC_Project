import { useParams, useNavigate } from "react-router-dom";
import { LuArrowLeft } from "react-icons/lu";
import { useEffect, useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import AppNavBar from "@/components/navbar/AppNavBar";
import ReContainer from "@/components/containers/ReContainer";
import { useDispatch, useSelector } from "react-redux";
import { fetchItemById } from "@/slices/item.slice";
import PickDate from "@/components/date/PickDate";
import ItemReviews from "@/components/review/ItemReviews";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import { calculateDays } from "@/utils/date";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { DotLoader } from "react-spinners";
import ListerDetails from "./ListerDetails";
const ViewItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { item, loading } = useSelector((state) => state.item);

  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    if (id) {
      dispatch(fetchItemById(Number(id)));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (item?.images?.length > 0) {
      setSelectedImage(item.images[0]);
    }
  }, [item]);

  const days = calculateDays(startDate, endDate);
  const totalAmount = days === 0 ? item?.dailyRate : days * item?.dailyRate;

  const handleRentSubmit = () => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      navigate("/login");
      return;
    }
    if (days === 0) {
      toast.error("Start date or/and end date not selected.");
      return;
    }
    navigate(`/view-item/${item?.id}/checkout`, {
      state: {
        itemId: item?.id,
        name: item?.name,
        image: selectedImage,
        dailyRate: item.dailyRate,
        startDate: startDate.format("YYYY-MM-DD"),
        endDate: endDate.format("YYYY-MM-DD"),
        days,
        totalAmount,
      },
    });
  };

  return (
    <AppLayout>
      <AppNavBar />
      <ReContainer>
        {loading ? (
          <div className="min-h-dvh w-full flex items-center justify-center">
            <DotLoader />
          </div>
        ) : (
          <div className="h-full">
            {/* Back Button */}
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-primary hover:underline transition mb-6 cursor-pointer"
            >
              <LuArrowLeft />
              Back
            </button>

            {/* Layout Grid */}
            <div className="grid md:grid-cols-2 items-start gap-10 p-6 rounded-xl shadow-2xl border border-gray-200">
              {/* LEFT COLUMN: Image Section */}
              <div className="grid grid-rows-[1fr_auto]">
                <div className="w-full border border-gray-300 rounded-lg overflow-hidden">
                  <img
                    src={selectedImage || "https://via.placeholder.com/400"}
                    alt={item?.name || "Loading item..."}
                    className="rounded-xl aspect-square w-full object-cover"
                  />
                </div>

                <div className="mt-4">
                  {item?.images?.length === 0 && <p>No images</p>}
                  <Swiper
                    modules={[Navigation]}
                    navigation
                    spaceBetween={10}
                    slidesPerView={4}
                    className="w-full mt-4"
                  >
                    {item?.images?.map((img, i) => (
                      <SwiperSlide key={i}>
                        <div
                          className="h-[80px] w-[80px] lg:h-[116px] lg:w-[116px] rounded-xl border cursor-pointer overflow-hidden"
                          onClick={() => setSelectedImage(img)}
                        >
                          <img
                            src={img}
                            alt="thumbnail"
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>

              {/* RIGHT COLUMN: Details Section */}
              <div className="space-y-4">
                <h1 className="text-lg font-bold text-text-black p-1 border-b border-b-gray-300">
                  {item?.name}
                </h1>

                <div className="flex items-center justify-between flex-wrap p-1 border-b border-b-gray-300">
                  <div
                    className={`px-4 py-1 inline-block rounded-full text-sm font-medium ${
                      item?.status?.toLowerCase() === "available"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {item?.status}
                  </div>
                  <p>Rs. {item?.dailyRate}/day</p>
                </div>

                <div className="p-1 border-b border-b-gray-300">
                  <p>{item?.description}</p>
                </div>

                <div className="p-1 border-b border-b-gray-300">
                  <p>
                    Category:{" "}
                    {item?.category
                      ? item.category.charAt(0).toUpperCase() +
                        item.category.slice(1).toLowerCase()
                      : "N/A"}
                  </p>
                  <p>Brand: {item?.brand}</p>
                  <p>
                    Condition:{" "}
                    {item?.condition
                      ? item.condition.charAt(0).toUpperCase() +
                        item.condition.slice(1).toLowerCase()
                      : "N/A"}
                  </p>
                  <p>
                    Posted Date:{" "}
                    {item?.createdAt
                      ? new Date(item.createdAt).toLocaleString()
                      : "N/A"}
                  </p>
                  <p>Rented by: {item?.totalRented || 0}</p>
                </div>

                <div className="flex items-center justify-between gap-5 flex-wrap">
                  <PickDate
                    label="Start Date"
                    value={startDate}
                    onChange={setStartDate}
                  />
                  <PickDate
                    label="End Date"
                    value={endDate}
                    onChange={setEndDate}
                  />
                </div>

                <button
                  onClick={handleRentSubmit}
                  disabled={item?.status?.toLowerCase() !== "available"}
                  className={`mt-6 px-5 py-2 rounded text-white text-lg transition cursor-pointer w-full ${
                    item?.status?.toLowerCase() === "available"
                      ? "bg-primary hover:bg-light-primary"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  {item?.status?.toLowerCase() === "available"
                    ? "Rent Now"
                    : "Currently Unavailable"}
                </button>

                <div className="mt-5">
                  <ItemReviews />
                </div>
              </div>
              {/* End of Right Column */}
            </div>
            {/* End of Layout Grid */}
          </div>
        )}
      </ReContainer>
    </AppLayout>
  );
};

export default ViewItem;
