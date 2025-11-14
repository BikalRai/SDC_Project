import React from "react";
import { LuSearch } from "react-icons/lu";

const NavSearch = ({ submitFunc }) => {
  return (
    <form
      className='flex items-center gap-3 rounded p-3 bg-[#E2E8F0] group text-text-muted text-sm border border-[#E2E8F0] focus-within:border-primary transition-all duration-300'
      onSubmit={submitFunc}
    >
      <button type='submit'>
        <LuSearch />
      </button>
      <input
        type='text'
        placeholder='Search'
        className='w-full border-0 outline-0'
      />
    </form>
  );
};

export default NavSearch;
