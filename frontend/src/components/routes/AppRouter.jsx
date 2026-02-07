import Home from "@/pages/Home";
import Login from "@/pages/login";
import Register from "@/pages/register";
import MyListedItems from "@/pages/userDashboard/MyListedItems";
import { useSelector } from "react-redux";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import UserDashboardLayout from "../layout/UserDashboardLayout";
import AddNewItem from "@/pages/userDashboard/AddNewItem";
import ProfileAndSettings from "../../pages/userDashboard/ProfileAndSettings";
import MyRentals from "@/pages/userDashboard/MyRentals";
import FindYourRental from "../findYourRental/FindYourRental";
import Vehicle from "@/pages/vehicle";
import Furnitures from "@/pages/Furnitures";
import Electronic from "@/pages/Electronic";
import NotFoundPage from "@/pages/NotFoundPage";
import AdminDashboard from "@/pages/static pages/AdminDashboard";
import AdminPayment from "@/pages/static pages/AdminPayment";
import PaymentProcess from "@/pages/static pages/PaymentProcess";
import OAuth2Redirect from "@/pages/OAuth2Redirect";
import Checkout from "@/pages/Checkout";
import AboutUsPage from "@/pages/AboutUsPage";
import ViewItem from "@/pages/ViewItem";
import KycView from "@/pages/static pages/KycView";
import KycList from "@/pages/static pages/KycList";
import PaymentSuccess from "@/pages/PaymentSuccess";
import PaymentFailure from "@/pages/PaymentFailure";
import KycForm from "../kyc/KycForm";
import SystemSettings from "@/pages/static pages/SystemSettings";
import HowItWorks from "@/pages/HowItWorks";

const RequireUserAuth = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} replace />;
  }

  return children;
};

const RequireAdminAuth = ({ children }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} replace />;
  }

  if (user?.role.toLowerCase() !== "admin") {
    return <Navigate to={"/login"} replace />;
  }

  return children;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/oauth2/redirect",
    element: <OAuth2Redirect />,
  },
  {
    path: "/about",
    element: <AboutUsPage />,
  },
  {
    path: "/howitworks",
    element: <HowItWorks />,
  },
  {
    path: "/view-item/:id",
    element: <ViewItem />,
  },
  {
    path: "/view-item/:id/checkout",
    element: (
      <RequireUserAuth>
        <Checkout />
      </RequireUserAuth>
    ),
  },
  {
    path: "/user",
    element: (
      <RequireUserAuth>
        <UserDashboardLayout />
      </RequireUserAuth>
    ),
    children: [
      { path: "dashboard", element: <MyListedItems /> },
      { path: "add", element: <AddNewItem /> },
      { path: "edit-item/:id", element: <AddNewItem /> },
      { path: "rentals", element: <MyRentals /> },
      { path: "settings", element: <ProfileAndSettings /> },
      { path: "settings/kyc", element: <KycForm /> },
    ],
  },
  {
    path: "/categories",
    element: <FindYourRental />,
    children: [
      { index: true, element: <Vehicle /> },
      { path: "vehicle", element: <Vehicle /> },
      { path: "furniture", element: <Furnitures /> },
      { path: "electronic", element: <Electronic /> },
      // {path: "book", element: <Vehicle/>},
    ],
  },
  { path: "/kyc", element: <KycForm /> },
  { path: "/payment/success", element: <PaymentSuccess /> },
  { path: "/payment/failure", element: <PaymentFailure /> },
  { path: "/admin-dashboard", element: <AdminDashboard /> },
  { path: "/admin-payment", element: <AdminPayment /> },
  { path: "/kyc-view", element: <KycView /> },
  { path: "/kyc-list", element: <KycList /> },
  { path: "/settings", element: <SystemSettings /> },
  { path: "/payment-process", element: <PaymentProcess /> },
  // {path: "/admin-dashboard", element: <RequireAdminAuth>
  //   <AdminDashboard/>
  // </RequireAdminAuth>},
  // {path: "/admin-payment", element: <RequireAdminAuth>
  //   <AdminPayment/>
  // </RequireAdminAuth>},
  // {path: "/kyc-view", element: <RequireAdminAuth>
  //   <KycView/>
  // </RequireAdminAuth>},
  // {path: "/kyc-list", element: <RequireAdminAuth>
  //   <KycList/>
  // </RequireAdminAuth>},
  // {path: "/payment-process", element: <RequireAdminAuth>
  //   <PaymentProcess/>
  // </RequireAdminAuth>},
  { path: "*", element: <NotFoundPage /> },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
