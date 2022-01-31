import React, { useEffect } from "react";
import NavbarTrans from "../../components/NavbarTrans";
import Footer from "../../components/Footer";
import { Image } from "antd";
import { useRouter } from "next/router";
import Auth from "../../utils/auth";
import axios from "axios";

const NewsId = () => {
  const router = useRouter();
  const { id } = router.query;
  const baseUrl = process.env.NEXT_PUBLIC_URL;
  console.log(id, "idii");
  useEffect(async () => {
    const res = await axios.post(
      baseUrl + "get/news/more",
      {
        jsonrpc: 2.0,
        params: {
          news_id: id,
        },
      },

      {
        headers: {
          "Set-Cookie": "session_id=" + Auth.getToken(),
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res, "detail medee");
  }, []);
  return (
    <div>
      <div className=" xl:fixed z-30 h-[100px] flex  overflow-hidden ">
        <div className="absolute z-30  flex flex-col w-full h-full">
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

        {/* 
        news.map((item, itex) => {
          if((index % 2) == 0){
           return <desheH item/>
          }

          return <doshoo item= {item}/>
        }) */}
      </div>
      <div className="  relative ">
        <div className=" flex justify-center">
          <div className="xl:absolute z-20   flex flex-col  md:h-[200px] 2xl:h-[260px] mt-[90px]  ml-[2vw] w-[1200px]  ">
            <div className=" mt-[20px]    lg:flex justify-between w-[350px] hidden">
              <div>
                <Image preview={false} src="/img/home.svg" />
              </div>
              <div className="text-white text-[14px] font-semibold">
                <a href="/" className="text-white text-[14px] font-semibold">
                  Нүүр хуудас
                </a>
              </div>
              <div>
                <Image preview={false} src="/img/right.svg" />
              </div>
              <div className="">
                <a
                  href="/dashboard"
                  className="text-white text-[14px] font-semibold"
                >
                  Мэдээ мэдээлэл
                </a>
              </div>
              <div>
                <Image preview={false} src="/img/right.svg" />
              </div>
              <div className="">
                <a
                  href="/dashboard"
                  className="text-white text-[14px] font-semibold"
                >
                  Мэдээ
                </a>
              </div>
            </div>
            <div className=" text-center  text-[#2E28D4]  my-auto font-poppins-semibold uppercase xl:flex  items-center xl:text-white  text-[36px] font-semibold">
              Мэдээ мэдээлэл
            </div>
          </div>
        </div>
        <div className=" bg-black h-[348px] overflow-hidden">
          <Image
            className=" hidden lg:flex w-[100vw] mt-[100px]"
            preview={false}
            src="/img/dashboard.svg"
          />
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default NewsId;
