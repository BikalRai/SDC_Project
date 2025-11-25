// import { LuUpload } from "react-icons/lu";

// const ImageUploader = () => {
//   return (
//     <div>
//       <form className='bg-background p-8 rounded'>
//         <div className='border border-dashed border-text-muted rounded flex flex-col justify-center items-center p-8 relative'>
//           <div className='flex flex-col justify-center items-center gap-8'>
//             <div className='bg-[#3b82f830] w-12 h-12  rounded-full flex items-center justify-center'>
//               <LuUpload className='stroke-primary text-3xl' />
//             </div>
//             <p className='text-text-muted'>Upload files. Add up to 5 images.</p>

//             {/* <button className='font-semibold rounded bg-[#3b82f830] py-3.5 px-10 cursor-pointer hover:bg-primary hover:text-text-white transition duration-300'>
//               Browse File
//             </button> */}
//           </div>
//           <input
//             type='file'
//             className='w-full h-full cursor-pointer  absolute opacity-0 top-0 left-0'
//           />
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ImageUploader;

import React from "react";
import { LuUpload } from "react-icons/lu";

const ImageUploader = ({ onUpload, max = 10, className }) => {
  return (
    <div className="p-4 bg-gray-200">
      <div
        className={`
        border-2 border-dashed border-gray-300 rounded-lg p-8 
        flex flex-col items-center justify-center bg-gray-100
        relative cursor-pointer ${className}`}
      >
        <div className="bg-[#3b82f830] w-12 h-12 rounded-full flex items-center justify-center">
          <LuUpload className="stroke-primary text-3xl" />
        </div>

        <div className="text-center text-gray-400 mt-2">
          Drag & Drop Images or Browse Files. Add up to {max} photos.
        </div>

        {/* Full click area input */}
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={onUpload}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default ImageUploader;
