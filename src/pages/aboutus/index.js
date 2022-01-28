import React from "react";
import NavbarTrans from "../../components/NavbarTrans";
import Footer from "../../components/Footer";
import Head from "next/head";
import { Image } from "antd";

const Aboutus = () => {
  return (
    <div>
      <Head>
        <title>iFinance | Бидний тухай</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="relative  w-full">
        <div id="head" className=" absolute z-20 flex flex-col w-full h-full">
          <div className="w-full flex justify-center">
            <NavbarTrans />
          </div>
          <div className=" hidden  md:flex w-full justify-center  items-center lg:mt-[30px] 2xl:mt-[100px]">
            <div>
              <div className=" text-[16px]  md:text-[36px] md:text-white font-poppins-semibold uppercase">
                БИДНИЙ ТУХАЙ
              </div>
            </div>
          </div>
        </div>
        <div className=" 2xl:h-[347px] overflow-hidden ">
          <Image className=" w-[100vw]" preview={false} src="/img/Slider.svg" />
        </div>
      </div>
      <div className=" mt-[100px]">
        <h1 className="flex justify-center text-[24px] font-bold">
          Захиралын мэндчилгээ
        </h1>
        <div className=" flex justify-center flex-col lg:flex-row">
          <div>
            <Image preview={false} src="/img/a1.png" />
          </div>
          <div className=" w-[] lg:w-[770px] ml-[30px]">
            <div className=" text-[16px] text-[#2F3747] opacity-60 lg:h-[440px]  leading-10 ">
              Class aptent taciti sociosqu ad litora torquent per conubia nostra
              per inceptos himenaeos mauris in erat justo nullam ac urna felis
              dapibus condimentum sit amet augue sed non. Neque elit sed utir
              imperdiet nisi proin condimentum fermentum nunce etiam pharetra
              erat sed fermentu feugiat velit mauris egestas quam ut aliquam
              massa nisl quis neque. Duis sed odio sit amet nibh vulputate
              cursus sit amet mauris morbi accumsan neque porro quisquam est,
              qui dolorem ipsum ipsum velit nam nec tellus tincidunt auctor
              ornare odio sed non consequat auctor. Lorem Ipsum proin gravida
              quia dolor sit amet consectetur velit quia auctor sociosqu
              sollicitudin lorem quis bibendum auctor consequat Duis sed odio
              sit amet nibh vulputate cursus sit amet mauris morbi accumsan
              neque porro quisquam est, qui dolorem ipsum ipsum velit nam nec
              tellus tincidunt auctor ornare odio sed non consequat auctor.
            </div>
            <div className="flex justify-between text-[24px] font-bold flex-col lg:flex-row">
              <div>Гүйцэтгэх захирал</div>
              <div>Э. Хишигбадрах</div>
            </div>
          </div>
        </div>
      </div>
      <div className=" bg-[#9CA6C0] bg-opacity-10 flex flex-col justify-center items-center mt-[100px]">
        <div className="text-[#2F3747] text-[24px] font-bold pt-[80px]">
          Бидний зарчим
        </div>
        <div className=" flex mt-[40px] pb-[100px] flex-col lg:flex-row  ">
          <div className="  w-[340px]  lg:w-[370px]  h-[289px] hover:bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD] cursor-pointer hover:text-white bg-white flex flex-col justify-center items-center rounded-[4px] shadow-lg">
            <div>
              <Image preview={false} src="/img/unet.svg" />
            </div>
            <div className="text-[18px] font-bold">Үнэт зүйл</div>
            <div className=" w-[290px]  text-[16px] opacity-60  mt-[16px] ">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Scelerisque viverra diam non nisl vel.
            </div>
          </div>
          <div className="  lg:w-[370px]  h-[289px] hover:bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD] cursor-pointer hover:text-white bg-white flex flex-col justify-center items-center rounded-[4px] shadow-lg my-[30px] lg:my-0 lg:mx-[30px]">
            <div>
              <Image preview={false} src="/img/unet2.svg" />
            </div>
            <div className="text-[18px] font-bold">Үнэт зүйл</div>
            <div className=" w-[290px]  text-[16px] opacity-60 mt-[16px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Scelerisque viverra diam non nisl vel.
            </div>
          </div>
          <div className="  lg:w-[370px]  h-[289px] hover:bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD] cursor-pointer hover:text-white bg-white flex flex-col justify-center items-center rounded-[4px] shadow-lg ">
            <div>
              <Image preview={false} src="/img/unet3.svg" />
            </div>
            <div className="text-[18px] font-bold">Үнэт зүйл</div>
            <div className=" w-[290px]  text-[16px] opacity-60 mt-[16px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Scelerisque viverra diam non nisl vel.
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center pb-[100px]">
        <div className="text-[#2F3747] text-[24px] font-bold pt-[80px]">
          Баг хамт олон
        </div>
        <div className="flex mt-[40px] flex-col lg:flex-row">
          <div>
            <Image preview={false} src="/img/unet4.svg" />
          </div>
          <div className=" text-[16px] text-[#2F3747] opacity-60 lg:w-[370px] leading-9 ml-[30px] ">
            Class aptent taciti sociosqu ad litora torquent per conubia nostra
            per inceptos himenaeos mauris in erat justo nullam ac urna felis
            dapibus condimentum sit amet augue sed non. Neque elit sed utir
            imperdiet nisi proin condimentum fermentum nunce etiam pharetra erat
            sed fermentu feugiat velit mauris egestas quam ut aliquam massa nisl
            quis neque. Duis sed odio sit amet nibh vulputate cursus sit amet
            mauris morbi accumsan neque porro quisquam est, qui dolorem ipsum
            ipsum velit nam nec tellus tincidunt auctor ornare odio sed non
            consequat auctor.
          </div>
        </div>
      </div>
      <div className=" bg-[#9CA6C0] bg-opacity-10 flex flex-col justify-center items-center mt-[100px] pb-[100px]">
        <div className="text-[#2F3747] text-[24px] font-bold pt-[80px]">
          Баг хамт олон
        </div>
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-[40px]">
          <div className=" w-[270px] h-[360px] relative">
            <div>
              <Image preview={false} src="/img/unet5.svg" />
            </div>
            <div className=" absolute bottom-0 left-0 w-full bg-white h-[89px] px-4">
              <div className="  text-[#2F3747] text-[16px] font-bold mt-[16px]">
                Цолмонбаатар
              </div>
              <div className=" flex justify-between mt-[8px] text-[#9CA6C0] items-center">
                <div>UI Designer</div>
                <div className=" flex w-[60px] justify-between ">
                  <div>
                    <a href="https://www.facebook.com" target="_blank">
                      <Image preview={false} src="/img/facebook.svg" />
                    </a>
                  </div>
                  <div>
                    <a href="https://www.facebook.com" target="_blank">
                      <Image preview={false} src="/img/twitter.svg" />
                    </a>
                  </div>
                  <div>
                    <a href="https://www.facebook.com" target="_blank">
                      <Image preview={false} src="/img/ig.svg" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Aboutus;
