const ContainerLg = ({ className = "", children }) => {
  return (
    <div className={`w-full min-w-96 p-5 md:max-w-[768px] md:p-6 lg:max-w-[1440px] lg:px-[120px] lg:py-8 mx-auto ${className}`}>
      {children}
    </div>
  );
};

export default ContainerLg;
