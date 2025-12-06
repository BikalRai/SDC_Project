const PrimaryButton = ({
  btnText,
  className = "",
  onClick,
  icon,
  type = "button",
  ...props
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-6 py-3 rounded-sm text-sm text-white bg-primary hover:bg-light-primary transition-all duration-300 cursor-pointer ${className} group`}
      {...props}
    >
      {icon ? (
        <p className='flex items-center justify-center gap-4'>
          <span className='transition-all duration-300 translate-x-3 group-hover:-translate-x-1'>
            {btnText}
          </span>
          <span className='opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300'>
            {icon}
          </span>
        </p>
      ) : (
        <p>{btnText}</p>
      )}
    </button>
  );
};

export default PrimaryButton;
