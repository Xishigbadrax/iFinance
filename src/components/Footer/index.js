import React from "react";
import { Image, Divider } from "antd";

const Footer = () => {
  return (
    <div className="w-full   h-[21.188rem] mt-[11.813rem] mb-0">
      <div className=" w-full h-[5.563rem] bg-gradient-to-r from-[#473EDA] to-[#B33DFD] flex justify-center items-center">
        <div className=" flex  justify-around w-[70%]">
          <div className=" flex items-center">
            <div className="flex items-center mr-2">
              <Image preview={false} src="/img/call.png" />
            </div>
            <div className=" text-white text-[16px]">Утас: 976 89977771</div>
          </div>
          <div className=" flex items-center mr-2">
            <div className="flex items-center mr-2">
              <Image preview={false} src="/img/mail.png" />
            </div>
            <div className=" text-white  w-[110px]">
              Имэйл хаяг: info@ifinance.mn
            </div>
          </div>
          <div className=" flex items-center mr-2">
            <div className="flex items-center mr-2">
              <Image preview={false} src="/img/address.png" />
            </div>
            <div className=" text-white w-[250px]">
              Хаяг: Реженси Ресидэнс, 16 Олимпын гудамж, 14220, Улаанбаатар хот,
              Монгол улс
            </div>
          </div>
        </div>
      </div>
      <div className=" w-full h-[15.625rem] bg-gradient-to-r from-[#2E28D4] to-[#AC27FD] flex flex-col justify-center items-center">
        <div className="">
          <Image preview={false} src="/img/Logo2.svg" />
        </div>
        <div className="  w-[600px]">
          <ul className=" flex justify-between">
            <li>
              <a className=" text-white">Эхлэл</a>
            </li>
            <li>
              <a className=" text-white">Үнийн санал</a>
            </li>
            <li>
              <a className=" text-white">Үйлчилгээ</a>
            </li>
            <li>
              <a className=" text-white">Мэдээ</a>
            </li>
            <li>
              <a className=" text-white">Холбоо барих</a>
            </li>
            <li>
              <a className=" text-white">Нээлттэй ажлын байр</a>
            </li>
          </ul>
        </div>
        <div className=" w-[60%] ">
          <Divider className=" bg-[#9CA6C0]  leading-1 " />
        </div>

        <div className="w-[14.5rem] flex justify-between">
          <Image preview={false} src="/img/fb.svg" />
          <Image preview={false} src="/img/insta.svg" />
          <Image preview={false} src="/img/youtube.svg" />
          <Image preview={false} src="/img/twit.svg" />
          <Image preview={false} src="/img/link.svg" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
