import React from "react";
import { Image, Divider } from "antd";
import Inter from 'typeface-inter'
import Poppins from 'typeface-poppins'

const Footer = () => {
  
  return (
    <div className=" w-full   h-[21.188rem] mt-[11.813rem]">
      <div className="  h-auto flex justify-center  bg-gradient-to-r from-[#473EDA] to-[#B33DFD]  items-center h-[89px]">
        <div className=" flex flex-col pt-4 pb-4  lg:justify-between lg:w-[60vw]  md:flex-row lg:flex-row lg:pt-0 lg:pb-0">
          <div className=" flex items-center">
            <div className="flex items-center mr-2">
              <Image preview={false} src="/img/call.svg" style={{ paddingRight: "16px" }}/>
            </div>
            <div className=" text-white text-[16px]" style={{fontFamily: Inter, fontStyle: "normal", fontWeight: 400, lineHeight: "19px", opacity: 0.7}}><strong>Утас:</strong><br/> 976 89977771</div>
          </div>
          <div className=" flex items-center my-2 lg:mx-[95pxm]">
            <div className="flex items-center mr-2">
              <Image preview={false} src="/img/mail.svg" style={{ paddingRight: "16px" }}/>
            </div>
            <div className=" text-white text-[16px]  w-[110px] " style={{fontFamily: Inter, fontStyle: "normal", fontWeight: 400, lineHeight: "19px", opacity: 0.7}}>
              <strong>Имэйл хаяг:</strong> info@ifinance.mn
            </div>
          </div>
          <div className=" flex items-center mr-2">
            <div className="flex items-center mr-2">
              <Image preview={false} src="/img/address.svg" style={{ paddingRight: "16px" }}/>
            </div>
            <div className=" text-white text-[16px] w-[350px]" style={{fontFamily: Inter, fontStyle: "normal", fontWeight: 400, lineHeight: "19px", opacity: 0.7}}>
              <strong>Хаяг:</strong> Реженси Ресидэнс, 16 Олимпын гудамж, 14220, Улаанбаатар хот,<br/>
              Монгол улс
            </div>
          </div>
        </div>
      </div>
      <div className=" w-full  min-h-[15.625rem] bg-gradient-to-r from-[#2E28D4] to-[#AC27FD] flex flex-col justify-center items-center">
        <div className=" mt-4 md:mt-0">
          <Image preview={false} src="/img/Logo2.svg" />
        </div>
        <br/>
        <div className=" max-w-[600px] flex justify-center">
          <ul className=" flex flex-col md:w-[600px] lg:w-[600px] justify-between md:flex-row" style={{ fontFamily: Poppins, fontWeight: 600, fontStyle: "SemiBold", fontSize: "11px", lineHeight: "16.5px", opacity: 0.7 }}>
            <li>
              <a className=" text-white">Эхлэл</a>
            </li>
            <li>
              <a className=" text-white ">Мэдээ</a>
            </li>
            <li>
              <a className=" text-white ">Бүтээгдэхүүн</a>
            </li>
            <li>
              <a className=" text-white ">Үнийн санал</a>
            </li>
            <li>
              <a className=" text-white">Үйлчилгээ</a>
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
          <Divider className=" bg-[#9CA6C0]  leading-1 " style={{ opacity: 0.2 }}/>
        </div>

        <div className="w-[14.5rem] flex justify-between">
          <Image preview={false} src="/img/fb.svg" />
          <Image preview={false} src="/img/insta.svg" />
          <Image preview={false} src="/img/youtube.svg" />
          <Image preview={false} src="/img/twit.svg" />
          <Image preview={false} src="/img/link.svg" />
        </div>
      </div>
      <div className=" flex flex-col lg:flex-row px-10 justify-around" style={{ paddingTop: "22px", paddingBottom: "17px" }}>
        <div className=" text-[#011F70] text-[14px] font-normal text-center" style={{ fontFamily: Poppins }}>Бүх эрх хуулиар хамгаалагдсан © 2022. Интеллижент Финанс ХХК</div>
        <div className=" flex items-center justify-center">
         
            <div className=" "><a href="#head" className="text-[#011F70] text-[14px] font-normal" style={{ fontFamily: Poppins }}> Дээш буцах </a></div>
            <div className=" pt-2 ml-1"><a href="#head" ><Image preview={false} src="/img/up.svg" /></a></div>
          
        </div>
      </div>
    </div>
  );
};

export default Footer;
