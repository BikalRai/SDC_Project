import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react"; // Added useState
import AppLayout from "@/components/layout/AppLayout";
import ReContainer from "@/components/containers/ReContainer";
import { createRental } from "@/slices/rent.slice";
import { toast } from "react-toastify";
import { LuCalendar, LuCreditCard, LuWallet, LuBanknote } from "react-icons/lu"; // Added icons
import AppNavBar from "@/components/navbar/AppNavBar";
import { buildEsewaPayload, submitEsewaForm } from "@/utils/payment.helper";

const Checkout = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.rent);

  // 1. Track the selected payment method
  const [paymentMethod, setPaymentMethod] = useState("COD");

  useEffect(() => {
    if (!state) {
      navigate(`/view-item/${id}`, { replace: true });
    }
  }, [state, id, navigate]);

  if (!state) return null;

  const handleConfirmRental = () => {
    const rentalData = {
      itemId: state.itemId,
      startDate: state.startDate,
      endDate: state.endDate,
      totalAmount: state.totalAmount,
      paymentMethod: paymentMethod,
    };

    dispatch(createRental(rentalData))
      .unwrap()
      .then((res) => {
        if (paymentMethod === "ESEWA") {
          toast.info("Preparing eSewa Payment...");

          // 1. Generate the payload using the state from navigation
          const esewaPayload = buildEsewaPayload(state);

          // 2. Submit the hidden form
          submitEsewaForm(esewaPayload);
        } else {
          toast.success("Rental confirmed via COD!");
          navigate("/user/rentals");
        }
      })
      .catch((err) => toast.error(err));
  };

  return (
    <AppLayout>
      <AppNavBar />
      <ReContainer>
        <div className='max-w-4xl mx-auto py-10'>
          <h1 className='text-3xl font-bold mb-8'>Confirm Your Rental</h1>

          <div className='grid md:grid-cols-3 gap-8'>
            <div className='md:col-span-2 space-y-6'>
              {/* Item Summary */}
              <div className='bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex gap-4 items-center'>
                <img
                  src={state.image}
                  alt={state.name}
                  className='w-24 h-24 rounded-lg object-cover'
                />
                <div>
                  <h2 className='text-xl font-semibold'>{state.name}</h2>
                  <p className='text-gray-500 font-medium text-lg'>
                    Rs. {state.dailyRate} / day
                  </p>
                </div>
              </div>

              {/* Rental Period */}
              <div className='bg-white p-6 rounded-xl border border-gray-200 shadow-sm'>
                <h3 className='font-bold mb-4 flex items-center gap-2'>
                  <LuCalendar /> Rental Period
                </h3>
                <div className='flex justify-between text-lg'>
                  <div>
                    <p className='text-sm text-gray-500'>From</p>
                    <p className='font-medium'>{state.startDate}</p>
                  </div>
                  <div className='text-right'>
                    <p className='text-sm text-gray-500'>To</p>
                    <p className='font-medium'>{state.endDate}</p>
                  </div>
                </div>
                <p className='mt-4 pt-4 border-t text-primary font-medium'>
                  Duration: {state.days} Day{state.days > 1 ? "s" : ""}
                </p>
              </div>

              {/* PAYMENT SELECTION SECTION */}
              <div className='bg-white p-6 rounded-xl border border-gray-200 shadow-sm'>
                <h3 className='font-bold mb-4 flex items-center gap-2'>
                  <LuWallet /> Select Payment Method
                </h3>
                <div className='grid grid-cols-2 gap-4'>
                  {/* eSEWA Option */}
                  <div
                    onClick={() => setPaymentMethod("ESEWA")}
                    className={`cursor-pointer p-4 border-2 rounded-xl flex flex-col items-center gap-2 transition-all ${paymentMethod === "ESEWA" ? "border-green-500 bg-green-50" : "border-gray-100 hover:border-gray-300"}`}
                  >
                    <div className='w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white text-xl font-bold'>
                      e
                    </div>
                    <span className='font-semibold'>eSEWA</span>
                  </div>

                  {/* COD Option */}
                  <div
                    onClick={() => setPaymentMethod("COD")}
                    className={`cursor-pointer p-4 border-2 rounded-xl flex flex-col items-center gap-2 transition-all ${paymentMethod === "COD" ? "border-primary bg-blue-50" : "border-gray-100 hover:border-gray-300"}`}
                  >
                    <LuBanknote
                      className={`text-3xl ${paymentMethod === "COD" ? "text-primary" : "text-gray-400"}`}
                    />
                    <span className='font-semibold'>Cash on Delivery</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Price Breakdown Sidebar */}
            <div className='bg-gray-50 p-6 rounded-xl border border-gray-200 h-fit'>
              <h3 className='font-bold mb-6 text-xl'>Order Summary</h3>
              <div className='space-y-3 pb-6 border-b'>
                <div className='flex justify-between'>
                  <span>Subtotal</span>
                  <span>Rs. {state.totalAmount}</span>
                </div>
                <div className='flex justify-between text-green-600'>
                  <span>Service Fee</span>
                  <span>FREE</span>
                </div>
              </div>
              <div className='flex justify-between py-6 text-xl font-bold'>
                <span>Total</span>
                <span>Rs. {state.totalAmount}</span>
              </div>

              <button
                onClick={handleConfirmRental}
                disabled={loading}
                className='w-full bg-primary hover:bg-light-primary text-white py-4 rounded-lg font-bold transition flex items-center justify-center gap-2 shadow-lg active:scale-95'
              >
                {loading ? (
                  "Processing..."
                ) : (
                  <>
                    <LuCreditCard /> Confirm & Pay via {paymentMethod}
                  </>
                )}
              </button>
              <p className='text-xs text-gray-400 mt-4 text-center'>
                Secure checkout powered by your platform.
              </p>
            </div>
          </div>
        </div>
      </ReContainer>
    </AppLayout>
  );
};

export default Checkout;
