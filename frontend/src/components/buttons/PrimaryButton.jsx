const PrimaryButton = ({ btnText, className = "", onClick, ...props }) => {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-sm text-sm text-white bg-primary hover:bg-light-primary transition cursor-pointer ${className}`}
      {...props}
    >
      {btnText}
    </button>
  );
};

export default PrimaryButton;
