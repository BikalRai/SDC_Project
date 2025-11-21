import { Outlet } from "react-router-dom";
import UserDashboardHeader from "../navbar/UserDashboardHeader";
import UserDashboardNavBar from "../navbar/UserDashboardNavBar";
import UserDashboardContentLayout from "./UserDashboardContentLayout";

const UserDashboardLayout = () => {
  return (
    <div className="h-dvh bg-background transition-all duration-300 grid grid-cols-[80px_1fr] md:grid-cols-[240px_1fr] text-text-black overflow-hidden">
      
      {/* SIDEBAR */}
      <div className="h-full sticky top-0 overflow-y-auto">
        <UserDashboardNavBar />
      </div>

      {/* RIGHT SIDE */}
      <div className="flex flex-col h-full overflow-hidden">
        
        {/* HEADER */}
        <div className="sticky top-0 z-10 bg-background">
          <UserDashboardHeader />
        </div>

        {/* CONTENT SCROLLS HERE */}
        <div className="flex-1 overflow-y-auto">
          <UserDashboardContentLayout>
            <Outlet />
          </UserDashboardContentLayout>
        </div>
      </div>

    </div>
  );
};

export default UserDashboardLayout;
