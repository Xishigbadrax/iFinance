import React from "react";
import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import Context from "../../context/Context";
import NavbarTrans from "../../components/NavbarTrans";
import Footer from "../../components/Footer";
import { Tabs, Image, Button } from "antd";
import Head from "next/head";

const Service = () => {
  const { TabPane } = Tabs;
  return (
    <div>
      <div className="relative h-[100px] flex  overflow-hidden">
        <div className="absolute z-20 flex flex-col w-full h-full">
          <div className="w-full flex justify-center mb-2 ">
            <NavbarTrans />
          </div>

          {/* <div className=" hidden    my-auto font-poppins-semibold uppercase lg:flex justify-center items-center text-white h-2/3 text-[36px] font-semibold">
            Манай бүтээгдэхүүн
          </div> */}
        </div>
        <Image
          className="w-[100vw] h-[100px] scale-150 my-auto bg-blue-500 lg:h-auto"
          preview={false}
          src="/img/Slider.svg"
        />
      </div>
        <div className=" w-full flex justify-center">
          <Image className=" my-[100px]" preview={false} src="/img/soon.svg" />
        </div>
      <Footer />
    </div>
  );
};

export default Service;
