const ButtonWithIcon = ({ icon, btnText }) => {
  return (
    <button className='px-6 py-3 rounded-sm text-sm flex items-center justify-center gap-4 cursor-pointer border border-primary bg-transparent hover:bg-card-bg transition'>
      {icon}
      {btnText}
    </button>
  );
};

export default ButtonWithIcon;
