import { IoIosArrowDown } from "react-icons/io";
import FormLabel from "../label/FormLabel";

const KiSelect = ({ arr }) => {
  return (
    <div className='max-w-md'>
      <div>
        <FormLabel labelText={`Category`} />
      </div>
      <div className='flex items-center justify-between gap-2 border border-border rounded text-text-muted relative'>
        <select
          name='category'
          id='category'
          className='appearance-none outline-0 border-0 w-full px-8 py-3'
        >
          {arr.map((item) => (
            <option key={item.id} value={item.name} className='p-2'>
              {`${item.name[0].toUpperCase()}${item.name
                .slice(1)
                .toLowerCase()}`}
            </option>
          ))}
        </select>
        <div className='absolute right-0 top-1/2 -translate-y-1/2 -translate-x-4'>
          <IoIosArrowDown />
        </div>
      </div>
    </div>
  );
};

export default KiSelect;
