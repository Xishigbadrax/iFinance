import Link from "next/link";
import React from "react";
import Navbar from "../components/Navbar/navbar";
import Footer from "../components/Footer";
import { Button, Image } from "antd";

export default function FourOhFour() {
  return (
    <div className=" ">
      <Navbar />
      <div className=" w-full  flex justify-center ">
        <div className=" flex mt-[50px] items-center ">
          <div className=" items-center">
            <p className=" text-[#2F3747] font-bold text-[48px] w-[470px]">
              Уучлаарай энэ хуудас олдсонгүй.
            </p>
            <p className=" text-[#9CA6C0] text-[18px] font-bold">
              Нүүр хуудасруу буцах бол энд дарна уу!
            </p>
            <Button
              className=" border-none w-[200px] h-[48px] rounded-[43px] text-[14px] font-bold bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD]"
              type="primary"
            >
             <a href="/"> Нүүр хуудас</a>
            </Button>
          </div>
          <div className=" mb-[-6px]">
            <Image preview={false} src="/img/404.svg" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
