import FloatingBlobs from "../FloatingBlobs";

const AppLayout = ({ children }) => {
  return (
    <FloatingBlobs>
      <div className='max-w-[1440px] px-[120px] mx-auto'>{children}</div>
    </FloatingBlobs>
  );
};

export default AppLayout;
