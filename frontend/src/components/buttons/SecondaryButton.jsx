const SecondaryButton = ({ btnText }) => {
  return (
    <button className='px-6 py-3 rounded-sm text-sm text-primary border border-primary hover:text-text-white hover:bg-primary transition cursor-pointer'>
      {btnText}
    </button>
  );
};

export default SecondaryButton;
