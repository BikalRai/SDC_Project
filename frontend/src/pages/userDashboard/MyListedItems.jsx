import PrimaryButton from "@/components/buttons/PrimaryButton";
import UserDashboardTitle from "@/components/header/UserDashboardTitle";
import { LuPlus, LuTrash2 } from "react-icons/lu";
import { CiEdit } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { clearMessages, deleteItem, getAllItems } from "@/slices/item.slice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories } from "@/slices/category.slice";
import { toast } from "react-toastify";

const MyListedItems = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, successMessage } = useSelector((state) => state.item);

  const handleDelete = (id) => {
    dispatch(deleteItem(id));
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      setTimeout(() => dispatch(clearMessages()), 500);
    }
  }, [successMessage]);

  useEffect(() => {
    dispatch(getAllItems());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <div className='grid gap-8'>
      <div className='flex items-center justify-between'>
        <UserDashboardTitle title={`My Listed Items`} />
        <PrimaryButton icon={<LuPlus />} btnText='Add new item' />
      </div>
      <div className='overflow-x-auto bg-card-bg rounded drop-shadow-xl border-gray-500'>
        {/* Header */}
        <div
          className='grid grid-cols-[2fr_1fr_1fr_1fr] min-w-[800px] 
                  text-text-black font-medium p-3 border-b border-b-gray-300'
        >
          <div className='text-left ps-8'>ITEM</div>
          <div className='text-center'>PRICE</div>
          <div className='text-center'>STATUS</div>
          <div className='text-center'>ACTIONS</div>
        </div>

        {/* Items */}
        <div className='min-w-[800px]'>
          {items.map((item) => (
            <div
              key={item.id}
              className='grid grid-cols-[2fr_1fr_1fr_1fr] bg-background 
                   text-text-muted text-sm p-3 text-center items-center border-b border-b-gray-300 hover:bg-card-bg transition-all duration-300 cursor-pointer'
            >
              <div className='flex items-center gap-4 ps-8'>
                <img
                  src={item.img}
                  alt={item.title}
                  className='w-12 h-12 object-cover rounded'
                />
                <div className='text-left'>
                  <p className='font-medium'>{item.title}</p>
                  <p className='text-xs'>{item.category.name}</p>
                </div>
              </div>

              <div>{item.rate}</div>
              <div>{item.status}</div>

              <div className='flex justify-center gap-4 text-xl'>
                <CiEdit
                  className='cursor-pointer hover:text-primary transition-all duration-300'
                  onClick={() => navigate(`/user/edit/${item.id}`)}
                />
                <LuTrash2
                  className='cursor-pointer hover:text-red-500 transition-all duration-300'
                  onClick={() => handleDelete(item.id)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyListedItems;
