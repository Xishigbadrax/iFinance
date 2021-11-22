import React from "react";
import Link from "next/link";
import { Button } from "antd";
import { UserOutlined } from "@ant-design/icons";

const Sidebar = ({ Signup, Login, userName, Logout, isLogin }) => {
  return (
    <div className="w-full bg-gray-900">
      <div className="sidebar">
        {isLogin && (
          <div className=" flex items-center w-[12.5rem] h-[3.75rem]  bg-gradient-to-r from-[#AC27FD] to-[#2E28D4] justify-center rounded-[60px]">
            <div>
              <UserOutlined className="text-[20px] text-white" />
            </div>
            <div className="text-[14px] text-white font-semibold ml-1 pt-1 font-sans">
              {/* {userName} */}
              Khishigbadrakh
            </div>
          </div>
        )}
        <div>
          <ul className="lg:flex lg:justify-around  lg:w-[40rem] lg:pt-3">
            <li className=" text-lg ">
              <Link href="/">
                <a className=" text-white font-semibold">Эхлэл</a>
              </Link>
            </li>
            <li className=" text-lg">
              <Link href="/">
                <a className=" text-white font-semibold">Үнийн санал</a>
              </Link>
            </li>
            <li className=" text-lg">
              <Link href="/">
                <a className=" text-white font-semibold">Үйлчилгээ</a>
              </Link>
            </li>
            <li className=" text-lg">
              <Link href="/">
                <a className=" text-white font-semibold">Холбоо барих</a>
              </Link>
            </li>
          </ul>
        </div>

        { !isLogin && (
          <div className="">
            <div className=" h-[48px]">
              <Button
                onClick={() => Signup(true)}
                className=" mr-5 h-[48px] w-[145px] rounded-[43px] bg-white text-[#AC27FD] text-[14px] font-bold border-[#AC27FD]"
                type="primary"
              >
                Бүртгүүлэх
              </Button>
            </div>
            <div className="mt-2">
              <Button
                className=" h-[48px] w-[145px] rounded-[43px] bg-gradient-to-r from-[#2E28D4] to-[#AC27FD] border-none text-[white] text-[14px] font-bold"
                onClick={() => Login(true)}
                type="primary"
              >
                Нэвтрэх
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
