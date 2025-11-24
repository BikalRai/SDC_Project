const UserDashboardContentLayout = ({ children }) => {
  return (
    <div className='p-4 md:p-8 lg:p-12 bg-card-bg w-full h-auto min-h-[90vh]'>
      {children}
    </div>
  );
};

export default UserDashboardContentLayout;
