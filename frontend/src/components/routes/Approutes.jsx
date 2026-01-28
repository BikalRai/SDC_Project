// import AboutUsPage from "@/pages/AboutUsPage";
// import Checkout from "@/pages/Checkout";
// import CompleteProfile from "@/pages/completeProfile";
// import Home from "@/pages/Home";
// import Login from "@/pages/Login";
// import NotFoundPage from "@/pages/NotFoundPage";
// import OAuth2Redirect from "@/pages/OAuth2Redirect";
// import Register from "@/pages/Register";
// import Vehicle from "@/pages/vehicle";
// import { Navigate, Route, Routes } from "react-router-dom";
// import MyListedItems from "@/pages/userDashboard/MyListedItems";
// import AddNewItem from "@/pages/userDashboard/AddNewItem";
// import MyRentals from "@/pages/userDashboard/MyRentals";
// import ProfileAndSettings from "@/pages/userDashboard/ProfileAndSettings";
// import UserDashboardLayout from "../layout/UserDashboardLayout";
// import ItemDetail from "@/pages/userDashboard/ItemDetail";
// import ViewItem from "@/pages/ViewItem";
// import JoinAsProvider from "@/pages/joinAsProvider";
// import ProviderResources from "@/pages/ProviderResources";
// import VerificationProcess from "@/pages/VerificationProcess";
// import ProviderApp from "@/pages/ProviderApp";
// import Profile from "@/pages/profile";
// import FindYourRental from "../findYourRental/FindYourRental";
// import Furnitures from "@/pages/Furnitures";
// import Electronic from "@/pages/Electronic";
// import KycForm from "../kyc/KycForm";
// import AdminDashboard from "@/pages/static pages/AdminDashboard";
// import AdminPayment from "@/pages/static pages/AdminPayment";
// import KycView from "@/pages/static pages/KycView";
// import KycList from "@/pages/static pages/KycList";
// import PaymentProcess from "@/pages/static pages/PaymentProcess";

// const Approutes = () => {
//   return (
//     <>
//       <Routes>
//         <Route path='/' element={<Home />} />
//         <Route path='/find' element={<FindYourRental />}>
//           <Route index element={<Vehicle />} />
//           <Route path='furniture' element={<Furnitures />} />
//           <Route path='electronic' element={<Electronic />} />
//           <Route path='book' element={<Vehicle />} />
//         </Route>
//         <Route path='/oauth2/redirect' element={<OAuth2Redirect />} />
//         <Route path='/login' element={<Login />} />
//         <Route path='/register' element={<Register />} />
//         <Route path='/checkout' element={<Checkout />} />
//         <Route path='/about' element={<AboutUsPage />} />
//         <Route path='view-item/:id' element={<ViewItem />} />
//         <Route path='/user' element={<UserDashboardLayout />}>
//           <Route index element={<Navigate to='dashboard' replace />} />
//           <Route path='dashboard' element={<MyListedItems />} />
//           <Route path='add' element={<AddNewItem />} />
//           <Route path='rentals' element={<MyRentals />} />
//           <Route path='settings' element={<ProfileAndSettings />} />
//           <Route path='item-detail' element={<ItemDetail />} />
//           <Route path='profile' element={<Profile />} />
//           {/* <Route path="view-item" element={<ViewItem />} /> */}
//         </Route>
//         <Route path='/kyc' element={<KycForm />} />
//         <Route path='/join-as-provider' element={<JoinAsProvider />} />
//         <Route path='/provider-resources' element={<ProviderResources />} />
//         <Route path='/verification-process' element={<VerificationProcess />} />
//         <Route path='/provider-app' element={<ProviderApp />} />
//         <Route path='/complete-profile' element={<CompleteProfile />} />
//         <Route path='*' element={<NotFoundPage />} />

//         {/* Static Pages */}
//         <Route path='/admin-dashboard' element={<AdminDashboard />} />
//         <Route path='/admin-payment' element={<AdminPayment />} />
//         <Route path='/kyc-view' element={<KycView />} />
//         <Route path='/Kyc-list' element={<KycList />} />
//         <Route path='/payment-process' element={<PaymentProcess />} />
//       </Routes>
//     </>
//   );
// };

// export default Approutes;
