import FloatingBlobs from "../FloatingBlobs";

const AppLayout = ({ children }) => {
  return (
    <>
      <FloatingBlobs>
        <div className='min-h-dvh text-text-black'>{children}</div>
      </FloatingBlobs>
    </>
  );
};

export default AppLayout;
