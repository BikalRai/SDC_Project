const UserDashboardContentLayout = ({ children }) => {
  return (
    <div className='p-4 md:p-8 lg:p-12 bg-card-bg w-full h-screen'>
      {children}
    </div>
  );
};

export default UserDashboardContentLayout;
