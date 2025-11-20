import { LuUpload } from "react-icons/lu";

const ImageUploader = () => {
  return (
    <div>
      <div className='bg-background p-8 rounded'>
        <div className='border border-dashed border-text-muted rounded flex flex-col justify-center items-center p-8 relative'>
          <div className='flex flex-col justify-center items-center gap-8'>
            <div className='bg-[#3b82f830] w-12 h-12  rounded-full flex items-center justify-center'>
              <LuUpload className='stroke-primary text-3xl' />
            </div>
            <p className='text-text-muted'>Upload files. Add up to 5 images.</p>
          </div>
          <input
            type='file'
            className='w-full h-full cursor-pointer  absolute opacity-0 top-0 left-0'
          />
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;
