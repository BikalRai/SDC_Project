import AppLayout from "@/components/layout/AppLayout";
import AppNavBar from "@/components/navbar/AppNavBar";
import { useNavigate } from "react-router-dom";

const PaymentFailure = () => {
  const navigate = useNavigate();
  return (
    <AppLayout>
      <AppNavBar />
      <div className='flex flex-col items-center justify-center min-h-[50vh]'>
        <h2 className='text-2xl font-bold text-red-500'>Payment Failed</h2>
        <p>Something went wrong with your transaction.</p>
        <button
          onClick={() => navigate("/")}
          className='mt-6 bg-gray-800 text-white px-6 py-2 rounded'
        >
          Return Home
        </button>
      </div>
    </AppLayout>
  );
};

export default PaymentFailure;
