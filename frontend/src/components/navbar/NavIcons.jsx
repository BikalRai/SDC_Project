// eslint-disable-next-line no-unused-vars
const NavIcons = ({ icon: Icon, title }) => {
  return (
    <div>
      {
        <Icon
          className='text-base md:text-lg lg:text-xl cursor-pointer hover:text-primary transition-all duration-300'
          title={title}
        />
      }
    </div>
  );
};

export default NavIcons;
