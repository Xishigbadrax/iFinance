import React from "react";
import { Image, Divider } from "antd";
import Inter from "typeface-inter";
import Poppins from "typeface-poppins";

const Footer = () => {
  return (
    <div className=" w-full lg:h-[339px] ">
      <div style={{backgroundImage: "linear-gradient(to right, #473EDA, #B33DFD)" }}  className=" dark:bg-gradient-to-r from-[#2E28D4] to-[#2E28D4] ">
        <div className="  justify-center    flex   items-center lg:h-[89px]">
          <div className="  flex flex-col pt-4 pb-4 xl:justify-between xl:w-[60vw] md:w-[80vw] md:justify-between  md:flex-row xl:flex-row xl:pt-0 xl:pb-0 max-w-[1920px]">
            <div className=" flex items-center">
              <div className="flex items-center mr-2">
                <Image preview={false} src="/img/call.svg" />
              </div>
              <div
                className=" text-white text-[16px]"
                style={{
                  fontFamily: Inter,
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "19px",
                  opacity: 0.7,
                }}
              >
                <strong>Утас:</strong>
                <br /> +976 72777000
              </div>
            </div>
            <div className=" flex items-center my-3 xl:mx-[95px] ">
              <div className="flex items-center mr-2">
                <Image preview={false} src="/img/mail.svg" />
              </div>
              <div
                className=" text-white text-[16px]  w-[110px] "
                style={{
                  fontFamily: Inter,
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "19px",
                  opacity: 0.7,
                }}
              >
                <strong>Имэйл хаяг:</strong> info@ifinance.mn
              </div>
            </div>
            <div className=" flex items-center ">
              <div className="flex items-center mr-2">
                <Image preview={false} src="/img/address.svg" />
              </div>
              <div
                className=" text-white text-[16px] w-[200px] xl:w-[350px] md:w-[300px]"
                style={{
                  fontFamily: Inter,
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "19px",
                  opacity: 0.7,
                }}
              >
                <strong>Хаяг:</strong> Реженси Ресидэнс, 16 Олимпын гудамж,
                14220, Улаанбаатар хот,
                <br />
                Монгол улс
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{backgroundImage: "linear-gradient(to right, #2E28D4, #AC27FD)" }} className="  dark:bg-gradient-to-r from-[#011F70] to-[#011F70]  hidden w-full  min-h-[15.625rem]  md:flex flex-col justify-center items-center">
        <div className=" mt-4 md:mt-0">
          <Image preview={false} src="/img/Logo2.svg" />
        </div>
        <br />
        <div className=" max-w-[600px] flex justify-center">
          <ul
            className=" flex flex-col md:w-[600px] xl:w-[600px] justify-between md:flex-row"
            style={{
              fontFamily: Poppins,
              fontWeight: 600,
              fontStyle: "SemiBold",
              fontSize: "11px",
              lineHeight: "16.5px",
              opacity: 0.7,
            }}
          >
            <li>
              <a href="/" className=" text-white ">
                Эхлэл
              </a>
            </li>
            <li>
              <a className=" text-white ">Мэдээ</a>
            </li>
            <li>
              <a href="/dashboard" className=" text-white ">
                Бүтээгдэхүүн
              </a>
            </li>
            <li>
              <a href="/pricing" className=" text-white ">
                Үнийн санал
              </a>
            </li>
            <li>
              <a href="/service" className=" text-white">
                Үйлчилгээ
              </a>
            </li>
            <li>
              <a href="/contact" className=" text-white">
                Холбоо барих
              </a>
            </li>
            <li>
              <a className=" text-white">Нээлттэй ажлын байр</a>
            </li>
          </ul>
        </div>
        <div className=" w-[60%] ">
          <Divider
            className=" bg-[#9CA6C0]  leading-1 "
            style={{ opacity: 0.2 }}
          />
        </div>

        <div className="w-[21rem] flex justify-between">
          <a href="https://www.facebook.com/ifinance.mn" target={"_blank"}>
            <Image className=" w-[50px]" preview={false} src="/img/fb.svg" />{" "}
          </a>
          <Image className=" w-[50px]" preview={false} src="/img/insta.svg" />
          <Image className=" w-[50px]" preview={false} src="/img/youtube.svg" />
          <Image className=" w-[50px]" preview={false} src="/img/twit.svg" />
          <Image className=" w-[50px]" preview={false} src="/img/link.svg" />
        </div>
      </div>
      <div className=" flex justify-center">
        <div
          className=" flex flex-col md:flex-row md:w-[1920px] xl:flex-row px-10 justify-around"
          style={{ paddingTop: "22px", paddingBottom: "17px" }}
        >
          <div
            className=" text-[#011F70] text-[14px] font-normal text-center"
            style={{ fontFamily: Poppins }}
          >
            Бүх эрх хуулиар хамгаалагдсан © 2022. Интеллижент Финанс ХХК
          </div>
          <div className=" flex items-center justify-center">
            <div className=" ">
              <a
                href="#head"
                className="text-[#011F70] text-[14px] font-normal"
                style={{ fontFamily: Poppins }}
              >
                {" "}
                Дээш буцах{" "}
              </a>
            </div>
            <div className=" pt-2 ml-1">
              <a href="#head">
                <Image preview={false} src="/img/up.svg" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
