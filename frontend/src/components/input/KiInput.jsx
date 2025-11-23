import FormLabel from "../label/FormLabel";

const KiInput = ({ name, placeholderText, onChangeFunc }) => {
  return (
    <div className='grid gap-1 flex-1'>
      <div>
        <FormLabel
          labelText={`${name[0].toUpperCase()}${name.slice(1).toLowerCase()}`}
          htmlFor={name}
        />
      </div>
      <div className='border border-border rounded group focus-within:border-primary'>
        <input
          type='text'
          id={name}
          name={name}
          placeholder={placeholderText}
          className='outline-0 border-0 w-full py-3 ps-6'
          onChange={onChangeFunc}
        />
      </div>
    </div>
  );
};

export default KiInput;
