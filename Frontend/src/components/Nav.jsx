import React, { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineSearch } from "react-icons/md";
import { FaOpencart } from "react-icons/fa";
import { useSelector } from "react-redux";

function Nav() {
  const { userData } = useSelector((state) => state.user);
  const [showinfo, setShowInfo] = useState(false);
  return (
    <div className="w-full h-[80px] flex items-center justify-between md:justify-center gap-[30px] px-[20px] fixed top-0 z-[9999] bg-[#fff9f6] m-2">
      <h1 className="text-3xl font-bold mb-2 text-[#ff4d2d] text-center">
        GMax
      </h1>
      {/* location and search  */}
      <div className="md:w-[60%] lg:w-[40%] h-[70px] bg-white shadow-xl rounded-lg items-center gap-[20px] hidden md:flex">
        {/* location details */}
        <div className="flex items-center w-[30%] overflow-hidden gap-[10px] px-[10px] border-r-[2px] border-gray-400">
          <FaLocationDot size={25} className="text-[#ff4d2d]" />
          <div className="w-[80%] truncate text-gray-600">Anantapur</div>
        </div>
        {/* search details  */}
        <div className="w-[80%] flex items-center gap-[10px]">
          <MdOutlineSearch size={25} className="text-[#ff4d2d]" />
          <input
            type="text"
            placeholder="Search Delicious Food .."
            className="px-[10px] text-gray-700 outline-0 w-full"
          />
        </div>
      </div>
      {/* cart section  */}
      <div className="flex items-center justify-center  gap-6">
        <MdOutlineSearch size={25} className="text-[#ff4d2d] md:hidden" />
        <div className="relative cursor-pointer">
          <FaOpencart size={25} className="text-[#ff4d2d]" />
          <span className="absolute right-[-9px] top-[-12px] text-[#ff4d2d] ">
            0
          </span>
        </div>
        <button className="hidden md:block px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] text-sm font-medium">
          My Orders
        </button>
        <div
          className="w-[40px] h-[40px] rounded-b-2xl rounded-ee-2xl flex items-center justify-center bg-[#ff4d2d] text-white text-[18px] shadow-xl font-semibold cursor-pointer"
          onClick={() => setShowInfo((prev) => !prev)}
        >
          {userData?.fullName.slice(0, 1)}
        </div>
        {showinfo && (
          <div className="fixed top-[80px] right-[10px] md:right-[2%] lg:right-[18%] w-[180px] bg-white shadow-2xl rounded-xl p-[20px] flex flex-col gap-[10px] z-[9999] md:">
            <div className="text-[17px] truncate font-semibold">
              {userData?.fullName}
            </div>
            <div className="md:hidden text-[#ff4d2d] font-semibold cursor-pointer">
              My Orders
            </div>
            <div className="text-[#ff4d2d] font-semibold cursor-pointer">
              Log Out
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Nav;
