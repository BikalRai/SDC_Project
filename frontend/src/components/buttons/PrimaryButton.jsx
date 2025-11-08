const PrimaryButton = ({ btnText }) => {
  return (
    <button className='px-6 py-3 rounded-sm text-sm text-text-white bg-primary cursor-pointer hover:bg-light-primary transition'>
      <div>{btnText}</div>
    </button>
  );
};

export default PrimaryButton;
