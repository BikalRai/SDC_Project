import AppLayout from "@/components/layout/AppLayout";
import AppNavBar from "@/components/navbar/AppNavBar";
import { confirmPayment } from "@/slices/rent.slice";
import { LucideCheckCircle } from "lucide-react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const encodedData = searchParams.get("data");
  const dispatch = useDispatch();
  console.log(searchParams, encodedData, "log in payment success");

  useEffect(() => {
    if (encodedData) {
      const decodedString = atob(encodedData);
      const responseData = JSON.parse(decodedString);

      console.log("Decoded eSewa response:", responseData);

      // ✅ Extract rental ID from transaction_uuid (format: RENT-28-1770364956057)
      const transactionUuid = responseData.transaction_uuid;
      console.log("Transaction UUID:", transactionUuid);

      // ✅ Split and get the rental ID (second part) as a NUMBER
      const parts = transactionUuid.split("-");
      const rentalId = parseInt(parts[1], 10); // ✅ Convert to integer

      console.log("Extracted Rental ID:", rentalId);
      console.log("Rental ID type:", typeof rentalId);

      if (!rentalId || isNaN(rentalId)) {
        console.error("Invalid rental ID extracted");
        toast.error("Invalid payment confirmation data");
        return;
      }

      // Call backend to confirm payment
      const verifyPayment = async () => {
        try {
          await dispatch(confirmPayment(rentalId)).unwrap();
          toast.success("Payment confirmed successfully!");
          console.log("Payment successful.");
        } catch (error) {
          console.error("Verification failed", error);
          toast.error("Payment verification failed");
        }
      };

      verifyPayment();
    }
  }, [encodedData, dispatch]);
  return (
    <AppLayout>
      <AppNavBar />
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <LucideCheckCircle className="text-green-500 text-6xl mb-4" />
        <h2 className="text-2xl font-bold">Payment Successful!</h2>
        <p className="text-gray-500">
          Your rental order is now being processed.
        </p>
        <button
          onClick={() => navigate("/user/rentals")}
          className="mt-6 bg-primary text-white px-6 py-2 rounded"
        >
          Go to My Rentals
        </button>
      </div>
    </AppLayout>
  );
};

export default PaymentSuccess;
