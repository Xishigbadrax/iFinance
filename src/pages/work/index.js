import React from "react";
import NavbarTrans from "../../components/NavbarTrans";
import Footer from "../../components/Footer";
import { Image } from "antd";

const Work = () => {
    return <div>
        <div className="relative  w-full">
        <div id="head" className=" absolute z-20 flex flex-col w-full h-full">
          <div className="w-full flex justify-center">
            <NavbarTrans  />
          </div>
          <div className=" hidden  md:flex w-full justify-center  items-center lg:mt-[30px] 2xl:mt-[100px]">
            <div>
              <div className=" text-[16px]  md:text-[36px] md:text-white font-poppins-semibold uppercase">
              Нээлттэй ажлын байр
              </div>
            </div>
          </div>
        </div>
        <div className=" 2xl:h-[347px] overflow-hidden ">

        <Image className=" w-[100vw]" preview={false} src="/img/Slider.svg" />
        </div>
      </div>
        <div className=" text-[24px] flex justify-center test">
        Сонгон шалгаруулалтын дараалал
        </div>
            <div className=" relative w-[270px] h-[200px] bg-gray-100 flex justify-center">
                <div className=" w-[100px] h-[100px] bg-black rounded-[50px] absolute top-[-20%] ayguu">12</div>
            </div>
      <div>
          <Footer />
      </div>
    </div>
}

export default Work;