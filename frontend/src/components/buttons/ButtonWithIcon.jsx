const ButtonWithIcon = ({ icon, btnText, onClick }) => {
  return (
    <button
      type='button'
      className='px-6 py-3 rounded-sm text-sm flex items-center justify-center gap-4 cursor-pointer border border-primary bg-transparent hover:bg-card-bg transition'
      onClick={onClick}
    >
      {icon}
      {btnText}
    </button>
  );
};

export default ButtonWithIcon;
