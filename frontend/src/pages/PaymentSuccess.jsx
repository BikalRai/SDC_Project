import AppLayout from "@/components/layout/AppLayout";
import AppNavBar from "@/components/navbar/AppNavBar";
import { LucideCheckCircle } from "lucide-react";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const encodedData = searchParams.get("data");

  useEffect(() => {
    if (encodedData) {
      // Decode the base64 response from eSewa to see transaction details
      const decodedString = atob(encodedData);
      const responseData = JSON.parse(decodedString);
      console.log("eSewa Success Data:", responseData);

      // TODO: Call your backend /api/rentals/verify-payment with responseData
    }
  }, [encodedData]);
  return (
    <AppLayout>
      <AppNavBar />
      <div className='flex flex-col items-center justify-center min-h-[50vh]'>
        <LucideCheckCircle className='text-green-500 text-6xl mb-4' />
        <h2 className='text-2xl font-bold'>Payment Successful!</h2>
        <p className='text-gray-500'>
          Your rental order is now being processed.
        </p>
        <button
          onClick={() => navigate("/user/rentals")}
          className='mt-6 bg-primary text-white px-6 py-2 rounded'
        >
          Go to My Rentals
        </button>
      </div>
    </AppLayout>
  );
};

export default PaymentSuccess;
