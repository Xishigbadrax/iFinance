import React from "react";
import Link from "next/link";
import { Button, Image } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Auth from "../../utils/auth";

const Sidebar = ({ Signup, Login, userName, Logout, isLogin }) => {
  console.log(userName, "namee");
  return (
    <div className="w-full">
      <div className="sidebar">
        <Image preview={false} src="/img/Logo2.svg" />
        {Auth.getToken() && (
          <div className=" flex items-center w-[12.5rem] h-[3.75rem]  bg-gradient-to-r from-[#AC27FD] to-[#2E28D4] justify-center rounded-[60px]">
            <div>
              <UserOutlined className="text-[20px] text-white" />
            </div>
            <div className="text-[14px] text-white font-semibold ml-1 pt-1 font-sans">
              {Auth.getName()}
            </div>
          </div>
        )}
        <div className=" mt-2">
          <ul className="lg:flex lg:justify-around  lg:w-[40rem] lg:pt-3">
            <li className=" text-lg ">
              <Link href="/">
                <a className=" text-white font-semibold">Эхлэл</a>
              </Link>
            </li>
            <li className=" text-lg">
              <Link href="/dashboard">
                <a className=" text-white font-semibold">Бүтээгдэхүүн</a>
              </Link>
            </li>
            <li className=" text-lg">
              <Link href="/pricing">
                <a className=" text-white font-semibold">Үнийн санал</a>
              </Link>
            </li>
            <li className=" text-lg">
              <Link href="/order">
                <a className=" text-white font-semibold">Миний Захиалга</a>
              </Link>
            </li>
            <li className=" text-lg">
              <Link href="/cart">
                <a className=" text-white font-semibold">Миний сагс</a>
              </Link>
            </li>
            <li className=" text-lg">
              <Link href="/info">
                <a className=" text-white font-semibold">Миний мэдээлэл</a>
              </Link>
            </li>
          </ul>
        </div>

        {!Auth.getToken() ? (
          <div className="">
            <div className=" h-[48px]">
              <Button
                onClick={() => Signup(true)}
                className=" mr-5 h-[48px] w-[145px] rounded-[43px] bg-transparent text-white text-[14px] font-bold border-white"
                type="primary"
              >
                Бүртгүүлэх
              </Button>
            </div>
            <div className="mt-2">
              <Button
                className=" h-[48px] w-[145px] rounded-[43px] bg-white border-none text-[#2E28D4] text-[14px] font-bold"
                onClick={() => Login(true)}
                type="primary"
              >
                Нэвтрэх
              </Button>
            </div>
          </div>
        ) : (
          <div className="mt-2">
            <Button
              className=" h-[48px] w-[145px] rounded-[43px] bg-white border-none text-[#2E28D4] text-[14px] font-bold"
              onClick={() => Logout(2)}
              type="primary"
            >
              Гарах
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
