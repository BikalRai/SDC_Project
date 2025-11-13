import UserDashboardNavBar from "../navbar/UserDashboardNavBar";

const UserDashboardLayout = () => {
  return (
    <div className='min-h-dvh transition-all duration-300 grid grid-cols-[80px_1fr] md:grid-cols-[240px_1fr] text-text-black'>
      <div className='min-h-full'>
        <UserDashboardNavBar />
      </div>
      <div className=''>
        <h1>content</h1>
      </div>
    </div>
  );
};

export default UserDashboardLayout;
