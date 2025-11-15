import { Outlet } from "react-router-dom";
import UserDashboardHeader from "../navbar/UserDashboardHeader";
import UserDashboardNavBar from "../navbar/UserDashboardNavBar";
import UserDashboardContentLayout from "./UserDashboardContentLayout";

const UserDashboardLayout = () => {
  return (
    <div className='h-dvh bg-background transition-all duration-300 grid grid-cols-[80px_1fr] md:grid-cols-[240px_1fr] text-text-black'>
      <div className='min-h-full'>
        <UserDashboardNavBar />
      </div>
      <div className='flex flex-col h-full'>
        <div className='sticky top-0'>
          <UserDashboardHeader />
        </div>
        <div>
          <UserDashboardContentLayout>
            <Outlet />
          </UserDashboardContentLayout>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardLayout;
