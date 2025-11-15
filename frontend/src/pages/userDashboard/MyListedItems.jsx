import PrimaryButton from "@/components/buttons/PrimaryButton";
import UserDashboardTitle from "@/components/header/UserDashboardTitle";
import { LuPlus } from "react-icons/lu";

const MyListedItems = () => {
  return (
    <div>
      <div className='flex items-center justify-between'>
        <UserDashboardTitle title={`My Listed Items`} />
        <PrimaryButton icon={<LuPlus />} btnText={`Add new item`} />
      </div>
      <div>
        <div className='grid grid-cols-[3fr_1fr_1fr_1fr] bg-text-muted text-text-white place-items-center font-medium'>
          <div>TITLE</div>
          <div>PRICE</div>
          <div>STATUS</div>
          <div>ACTIONS</div>
        </div>
      </div>
    </div>
  );
};

export default MyListedItems;
