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
      className={`px-6 py-3 rounded-sm text-sm text-white bg-primary hover:bg-light-primary transition cursor-pointer ${className}`}
      {...props}
    >
      {icon ? (
        <p className='flex items-center gap-2'>
          <span>{icon}</span>
          <span className='hidden md:inline'>{btnText}</span>
        </p>
      ) : (
        <p>{btnText}</p>
      )}
    </button>
  );
};

export default PrimaryButton;
