import React from "react";
import { NavLink, Link } from "react-router-dom";
import { HiHome } from "react-icons/hi";
import { IoIosArrowForward } from "react-icons/io";

import { categories } from "../utils/data";

import chowstagramLogoBlack from "../assets/chowstagram-logo-black.png";

const isNotActiveStyle =
  "flex items-center px-5 gap-3 text-gray-500 hover:text-gray-900 transition-all duration-200 ease-in-out capitalize";
const isActiveStyle =
  "flex items-center px-5 gap-3 font-extrabold border-r-2 text-gray-900 border-gray-900 transition-all duration-200 ease-in-out capitalize";

// const isNotActiveStyle =
// 'flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize';
// const isActiveStyle =
//   'flex items-center px-5 gap-3 font-extrabold border-r-2 border-black transition-all duration-200 ease-in-out capitalize';

const Sidebar = ({ closeToggle, user }) => {
  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false);
  };

  return (
    <div className="flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 hide-scrollbar">
      <div className="flex flex-col">
        <Link
          to="/"
          className="flex px-5 gap-2 my-6 pt-1 w-275 items-center"
          onClick={handleCloseSidebar}
        >
          <img
            src={chowstagramLogoBlack}
            alt="chowstagramLogoBlack"
            className="w-full rounded-lg shadow-sm"
          />
        </Link>

        <div className="flex flex-col gap-5">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
            onClick={handleCloseSidebar}
          >
            <HiHome />
            Live Feed
          </NavLink>

          <h3 className="mt-2 px-5 text-base 2xl:text-xl">Discover</h3>

          {/* {categories.slice(0, categories.length - 1).map((category) => ( */}
          {categories.slice(0, categories.length).map((category) => (
            <NavLink
              to={`/category/${category.name}`}
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }
              onClick={handleCloseSidebar}
              key={category.name}
            >
              <img
                src={category.image}
                alt="categoryimage"
                className="w-8 h-8 rounded-lg shadow-sm"
              />

              {category.name}
            </NavLink>
          ))}
        </div>
      </div>

      {user && (
        <Link
          to={`user-profile/${user._id}`}
          className="flex my-5 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3"
          onClick={handleCloseSidebar}
        >
          <img
            src={user.image}
            className="w-10 h-10 rounded-lg"
            alt="user-profile"
          />

          <p>{user.userName}</p>

          <IoIosArrowForward />
        </Link>
      )}
    </div>
  );
};

export default Sidebar;
