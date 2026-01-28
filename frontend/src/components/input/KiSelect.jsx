import { IoIosArrowDown } from "react-icons/io";
import FormLabel from "../label/FormLabel";

const KiSelect = ({ arr = [], labelText, onChangeFunc, value }) => {
  // Capitalize label safely
  const formattedLabel =
    labelText?.charAt(0).toUpperCase() +
    labelText?.slice(1).toLowerCase();

  return (
    <div className="grid gap-1 flex-1">
      {/* Label */}
      <FormLabel labelText={formattedLabel} htmlFor={labelText} />

      {/* Select wrapper */}
      <div className="relative flex items-center border border-border rounded text-text-muted">
        <select
          name={labelText}
          id={labelText}
          className="appearance-none w-full bg-transparent outline-none border-none px-8 py-3 cursor-pointer"
          onChange={onChangeFunc}
          value={value}
        >
          {arr.map((item) => {
            const optionLabel =
              item?.name || item?.status || "Unknown";

            const optionValue =
              item?.status ?? item?.id ?? optionLabel;

            return (
              <option key={item?.id ?? optionValue} value={optionValue}>
                {optionLabel.charAt(0).toUpperCase() +
                  optionLabel.slice(1).toLowerCase()}
              </option>
            );
          })}
        </select>

        {/* Dropdown icon */}
        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
          <IoIosArrowDown />
        </div>
      </div>
    </div>
  );
};

export default KiSelect;
