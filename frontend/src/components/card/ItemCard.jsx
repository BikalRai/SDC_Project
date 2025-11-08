import { MdShoppingCart } from "react-icons/md";
import { FaChevronRight } from "react-icons/fa6";

const ItemCard = () => {
  return (
    <div className='p-5 grid gap-4 rounded-[8px] hover:bg-card-bg hover:shadow-lg transition cursor-pointer'>
      <div className='lg:max-h-80 relative'>
        <img
          src='https://images.unsplash.com/photo-1588627541420-fce3f661b779?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687'
          alt=''
          className='w-full h-full object-cover [clip-path:polygon(12%_0%,100%_0%,100%_88%,88%_100%,0%_100%,0%_12%)]'
        />
        <div className='absolute bottom-0 -right-4'>
          <MdShoppingCart className='fill-primary w-6 h-6 hover:fill-light-primary transition cursor-pointer' />
        </div>
      </div>
      <div className='grid gap-4'>
        <h3 className='text-xl font-semibold'>Aprilia SR 125 </h3>
        <hr />
        <h4 className='font-semibold'>Rs. 1,200/day </h4>
        <div className='font-medium'>
          <p className='text-text-muted'>Riding gear includes</p>
          <div>
            <p className='flex items-center gap-2 text-sm'>
              <span>
                <FaChevronRight />
              </span>
              <span className='text-text-muted'>Helmet</span>
            </p>
            <p className='flex items-center gap-2 text-sm'>
              <span>
                <FaChevronRight />
              </span>
              <span className='text-text-muted'>Raincoat</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
