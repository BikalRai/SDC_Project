const TertiaryButton = ({ btnText, onClickFunc, type }) => {
  return (
    <button
      type={type ? type : "button"}
      onClick={onClickFunc}
      className='border-0 px-6 py-3 rounded-sm cursor-pointer bg-transparent hover:text-primary transition'
    >
      {btnText}
    </button>
  );
};

export default TertiaryButton;
