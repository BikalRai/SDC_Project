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
  const [activeTab, setActiveTab] = useState("lister");

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

    navigate(`/view-item/${item.id}/checkout`, {
      state: {
        itemId: item.id,
        name: item.name,
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
          <div className="min-h-[60vh] flex items-center justify-center">
            <DotLoader />
          </div>
        ) : (
          <div>
            {/* Back Button */}
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-primary hover:underline mb-6"
            >
              <LuArrowLeft />
              Back
            </button>

            {/* Main Card */}
            <div className="grid md:grid-cols-2 items-start gap-10 p-6 rounded-xl shadow-2xl border border-gray-200">
              {/* Image Section */}
              <div className="grid grid-rows-[1fr_auto] gap-6">
                <div className="w-full aspect-square border rounded-xl overflow-hidden">
                  <img
                    src={selectedImage}
                    alt={item?.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-[1.02]"
                  />
                </div>

                <Swiper
                  modules={[Navigation]}
                  navigation
                  spaceBetween={10}
                  slidesPerView={4}
                  className="w-full"
                >
                  {item?.images?.map((img, index) => (
                    <SwiperSlide key={index}>
                      <div
                        onClick={() => setSelectedImage(img)}
                        className={`h-[80px] w-[80px] lg:h-[116px] lg:w-[116px] rounded-xl border cursor-pointer overflow-hidden transition
                          ${
                            selectedImage === img
                              ? "ring-2 ring-primary"
                              : "hover:ring-1 hover:ring-primary/50"
                          }`}
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

              {/* Details Section */}
              <div className="space-y-5">
                <h1 className="text-xl font-semibold text-gray-900 border-b pb-2">
                  {item?.name}
                </h1>

                <div className="flex items-center justify-between flex-wrap gap-3">
                  <span
                    className={`px-4 py-1 rounded-full text-sm font-medium ${
                      item?.status?.toLowerCase() === "available"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {item?.status}
                  </span>

                  <p className="text-lg font-semibold text-primary">
                    Rs. {item?.dailyRate}
                    <span className="text-sm text-gray-500 font-normal">
                      {" "}
                      / day
                    </span>
                  </p>
                </div>

                <p className="text-gray-700">{item?.description}</p>

                {/* Specifications */}
                <div className="rounded-xl text-sm space-y-1 bg-white p-4 shadow-sm">
                  <p>
                    Category:{" "}
                    {item?.category?.charAt(0).toUpperCase() +
                      item?.category?.slice(1).toLowerCase()}
                  </p>
                  <p>Brand: {item?.brand}</p>
                  <p>
                    Condition:{" "}
                    {item?.condition?.charAt(0).toUpperCase() +
                      item?.condition?.slice(1).toLowerCase()}
                  </p>
                  <p>
                    Posted Date:{" "}
                    {new Date(item?.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                    })}
                  </p>
                  <p>Rented by: {item?.totalRented}</p>
                </div>

                {/* Date Pickers */}
                <div className="flex flex-wrap gap-5">
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

                {/* Action Button */}
                <button
        onClick={() => navigate(`/profile/${user.id}`)}
        className="w-full mt-2 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-light-primary transition"
      >
        Rent Now
      </button>

                {/* Tabs */}
                <div className="mt-6">
                  <div className="flex gap-4 border-b mb-4">
                    <button
                      onClick={() => setActiveTab("lister")}
                      className={`px-5 py-2 text-sm font-medium border-b-2 transition-all ${
                        activeTab === "lister"
                          ? "border-primary text-primary bg-primary/5"
                          : "border-transparent text-gray-500 hover:text-primary"
                      }`}
                    >
                      Lister Details
                    </button>

                    <button
                      onClick={() => setActiveTab("reviews")}
                      className={`px-5 py-2 text-sm font-medium border-b-2 transition-all ${
                        activeTab === "reviews"
                          ? "border-primary text-primary bg-primary/5"
                          : "border-transparent text-gray-500 hover:text-primary"
                      }`}
                    >
                      Reviews
                    </button>
                  </div>

                  {activeTab === "lister" && (
                    <ListerDetails user={item?.user} />
                  )}
                  {activeTab === "reviews" && <ItemReviews />}
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
