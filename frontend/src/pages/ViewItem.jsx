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
import { createRental } from "@/slices/rent.slice";
import { calculateDays } from "@/utils/date";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { DotLoader } from "react-spinners";

const ViewItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { item, loading } = useSelector((state) => state.item);
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());

  const [selectedImage, setSelectedImage] = useState(item?.images[0] || "");

  useEffect(() => {
    if (!id) return;

    dispatch(fetchItemById(Number(id)));
  }, [id]);

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

    dispatch(
      createRental({
        itemId: item.id,
        startDate: startDate.format("YYYY-MM-DD"),
        endDate: endDate.format("YYYY-MM-DD"),
        totalAmount,
      }),
    )
      .unwrap()
      .then(() => {
        toast.success("Rental created successfully.");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  // console.log(item);

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
              className="flex items-center gap-2 text-primary hover:underline mb-6"
            >
              <LuArrowLeft /> Back
            </button>

            {/* Layout */}
            <div className="grid md:grid-cols-2 items-start gap-10 p-6 rounded-xl shadow-lg border border-gray-200">
              {/* Image Section */}
              <div className="grid grid-rows-[1fr_200px]">
                <div className="w-full h-full">
                  <img
                    // src={selectedImage}
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsCq6plOr0C_lt_ZRFT7zb5fPs2Qfs2qyVEw&s"
                    alt={item.name}
                    className="rounded-xl aspect-square w-full h-full object-fit"
                  />
                </div>
                <div className="">
                  {item.images.length === 0 && <p>No images</p>}
                  <Swiper
                    modules={[Navigation]}
                    navigation
                    pagination={{ clickable: true }}
                    spaceBetween={10}
                    slidesPerView={4}
                    className="w-full mt-9"
                  >
                    {item?.images.map((img, i) => (
                      <SwiperSlide key={i}>
                        <div
                          className="h-[80px] w-[80px] lg:h-[116px] lg:w-[116px] rounded-xl border cursor-pointer overflow-hidden"
                          onClick={() => setSelectedImage(img)}
                        >
                          <img
                            src={img}
                            alt="image"
                            className="h-full w-full object-contain object-center"
                            style={{ minHeight: "100%", minWidth: "100%" }}
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>

              <div>
                {/* Details Section */}
                <div className="space-y-4">
                  <h1 className="text-lg font-bold text-text-black p-1 border-b border-b-gray-300">
                    {item.name}
                  </h1>
                  {/* Status */}
                  <div className="flex items-center justify-between flex-wrap p-1 border-b border-b-gray-300">
                    <div
                      className={`px-4 py-1  inline-block rounded-full text-sm font-medium ${
                        item.status.toLowerCase() === "available"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {item.status}
                    </div>
                    <p>Rs. {item.dailyRate}/day</p>
                  </div>
                  <div className="p-1 border-b border-b-gray-300">
                    <p>{item.description}</p>
                  </div>

                  {/* specifications */}
                  <div className="p-1 border-b border-b-gray-300">
                    <p>
                      Category: {item.category[0].toUpperCase()}
                      {item.category.slice(1).toLowerCase()}
                    </p>
                    <p>Brand: {item.brand}</p>
                    <p>
                      Condition: {item.condition[0].toUpperCase()}
                      {item.condition.slice(1).toLowerCase()}
                    </p>
                    <p>
                      Posted Date: {new Date(item.createdAt).toLocaleString()}
                    </p>
                    <p>Rented by: {item.totalRented}</p>
                  </div>

                  <div className="flex items-center justify-between gap-5 flex-wrap">
                    <PickDate
                      label="Start Date"
                      value={startDate}
                      onChange={(newValue) => setStartDate(newValue)}
                    />

                    <PickDate
                      label="End Date"
                      value={endDate}
                      onChange={(newValue) => setEndDate(newValue)}
                    />
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={handleRentSubmit}
                    disabled={
                      item.status.toLowerCase() === "available" ? false : true
                    }
                    className={`mt-6 px-5 py-2 rounded text-white text-lg transition cursor-pointer ${
                      item.status.toLowerCase() === "available"
                        ? "bg-primary hover:bg-light-primary"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {item.status.toLowerCase() === "available"
                      ? "Rent Now"
                      : "Currently Unavailable"}
                  </button>
                </div>
                <div className="mt-5">
                  <ItemReviews />
                </div>
              </div>
            </div>
          </div>
        )}
      </ReContainer>
    </AppLayout>
  );
};

export default ViewItem;
