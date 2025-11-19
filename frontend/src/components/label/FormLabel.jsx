const FormLabel = ({ labelText, htmlFor }) => {
  return (
    <label htmlFor={htmlFor} className='font-medium'>
      {labelText}
    </label>
  );
};

export default FormLabel;
