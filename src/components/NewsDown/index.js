import React from "react";
import { Image, Button } from "antd";

const NewsDown = () => {
  return (
    
      <div className=" w-[300px] lg:w-[570px] h-[580px] rounded-[8px] m-10 shadow-md ">
     
        <div className=" flex justify-between m-[30px]">
          <div className=" flex">
            <div>
              {" "}
              <Image className=" opacity-40" preview={false} src="/img/clock.svg" />
            </div>
            <div className=" ml-[10px] opacity-40">05:55</div>
          </div>
          <div className=" flex">
            <div>
              {" "}
              <Image className=" opacity-40" preview={false} src="/img/calendar.svg" />
            </div>
            <div className=" ml-[10px] opacity-40">11.01.2022</div>
          </div>
        </div>
        <div className=" mx-[30px]">
          <div className=" text-[#2F3747] font-bold text-[18px]">
            Poster MockUp PSD - Interior Scene
          </div>
          <div className=" text-[16px] text-[#2F3747] opacity-60 mt-[16px]">
            This little clear crystal mouse is so happy with her little cheese
            in Light Topaz crystal! The delicate whiskers, tail and ears show
            great attention to detail. 
          </div>
        </div>
        <div className=" flex items-center justify-end mr-[30px] mt-[24px]">
          <div className=" mr-[8px] text-[14px] text-[#9CA6C0]">Read more</div>
          <div className=" cursor-pointer w-[30px] h-[30px] bg-[#2E28D426] flex items-center justify-center rounded-[50px] bg-opacity-60 ">
            <Image preview={false} src="/img/arrow.svg" />
          </div>
        </div>
        <div className=" mt-[31px]">
          <Image className=" rounded-[8px] lg:h-[290px] w-[570px]" preview={false} src="/img/test.jpg" />
        </div>
      </div>
        
    
  );
};

export default NewsDown;
