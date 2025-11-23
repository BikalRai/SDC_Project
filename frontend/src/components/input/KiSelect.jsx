import { IoIosArrowDown } from "react-icons/io";
import FormLabel from "../label/FormLabel";

const KiSelect = ({ arr, labelText, onChangeFunc }) => {
  return (
    <div className='grid gap-1 flex-1'>
      <div>
        <FormLabel
          labelText={`${labelText[0].toUpperCase()}${labelText
            .slice(1)
            .toLowerCase()}`}
          htmlFor={labelText}
        />
      </div>
      <div className='flex items-center justify-between gap-2 border border-border rounded text-text-muted relative'>
        <select
          name={labelText}
          id={labelText}
          className='appearance-none outline-0 border-0 w-full px-8 py-3'
          onChange={onChangeFunc}
        >
          {arr.map((item) => (
            <option
              key={item.id}
              value={item.status ? item.status : item.id}
              className='p-2'
            >
              {`${(item.name || item.status)[0].toUpperCase()}${(
                item.name || item.status
              )
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
