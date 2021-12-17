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
      <div className=" my-[100px] ml-[100px] ">
      <Tabs tabPosition="left" defaultActiveKey="1">
        <TabPane tab={
        <span className=" flex items-center">
          <Image className="" preview={false} width={30} height={30} src="/img/u1.svg" />
          <span className="ml-2">
          ERP хөгжүүлэлт
          </span>
        
        </span>
      } key="1">
          Content of Tab Pane 1
        </TabPane>
        <TabPane tab={
        <span className=" flex items-center">
          <Image className="" preview={false} width={30} height={30} src="/img/u2.svg" />
          <span className="ml-2">
          Вебсайт хөгжүүлэлт
          </span>
        
        </span>
      } key="2">
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab={
        <span className=" flex items-center">
          <Image className="" preview={false} width={30} height={30} src="/img/u3.svg" />
          <span className="ml-2">
          Мобайл апп хөгжүүлэлт
          </span>
        
        </span>
      } key="3">
          Content of Tab Pane 3
        </TabPane>
        <TabPane tab={
        <span className=" flex items-center">
          <Image className="" preview={false} width={30} height={30} src="/img/u4.svg" />
          <span className="ml-2">
          Систем интеграцчилал
          </span>
        
        </span>
      } key="4">
          Content of Tab Pane 3
        </TabPane>
        <TabPane tab={
        <span className=" flex items-center">
          <Image className="" preview={false} width={30} height={30} src="/img/u5.svg" />
          <span className="ml-2">
          Тусламж, дэмжлэг
          </span>
        
        </span>
      } key="5">
          Content of Tab Pane 3
        </TabPane>
        <TabPane tab={
        <span className=" flex items-center">
          <Image className="" preview={false} width={30} height={30} src="/img/u6.svg" />
          <span className="ml-2">
          Сервер арчилгаа
          </span>
        
        </span>
      } key="6">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default Service;
