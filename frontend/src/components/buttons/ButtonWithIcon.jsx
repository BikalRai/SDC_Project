const ButtonWithIcon = ({ icon, btnText, onClick }) => {
  return (
    <button
      type='button'
      className='px-6 py-3 rounded-sm text-sm  cursor-pointer border border-primary bg-transparent hover:bg-card-bg transition'
      onClick={onClick}
    >
      {icon ? (
        <div className='flex items-center justify-center gap-4'>
          <span>{icon}</span>
          <span>{btnText}</span>
        </div>
      ) : (
        <div>{btnText}</div>
      )}
    </button>
  );
};

export default ButtonWithIcon;
