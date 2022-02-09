import React, { useEffect, useState, useContext } from "react";
import NavbarTrans from "../../components/NavbarTrans";
import Footer from "../../components/Footer";
import { Image } from "antd";
import { useRouter } from "next/router";
import Auth from "../../utils/auth";
import axios from "axios";
import Context from "../../context/Context";

const NewsId = () => {
  const router = useRouter();
  const { id } = router.query;
  const baseUrl = process.env.NEXT_PUBLIC_URL;
  const [data, setData] = useState();
  // console.log(id, "idii");
  const { setIsLoading } = useContext(Context);

  useEffect(async () => {
    setIsLoading(true);
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
    setIsLoading(false);
    setData(res?.data?.result[0]);
    console.log(res, "detail medee");
  }, []);
  return (
    <div>
      <div className=" xl:fixed z-30 h-[100px] flex  overflow-hidden ">
        <div className="absolute z-30  flex flex-col w-full h-full">
          <div className="w-full flex justify-center mb-2 ">
            <NavbarTrans />
          </div>
        </div>
        <Image
          className="w-[100vw] h-[100px] scale-150 my-auto bg-blue-500 lg:h-auto"
          preview={false}
          src="/img/Slider.svg"
        />
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
      <div className=" flex justify-center mt-[80px] mb-[20px]">
        <div className="flex  w-[1170px] justify-between">
          <div
            className=" w-[770px]  shadow-md
        "
          >
            <div>
              <Image
                preview={false}
                src={"data:image/png;base64," + data?.news_image}
              />
            </div>
            <div>
              <div className=" flex justify-between m-[30px]">
                <div className=" flex">
                  <div>
                    {" "}
                    <Image
                      className=" opacity-40"
                      preview={false}
                      src="/img/clock.svg"
                    />
                  </div>
                  <div className=" ml-[10px] opacity-40">
                    {data?.created_date.slice(11, 16)}
                  </div>
                </div>
                <div className=" flex">
                  <div>
                    {" "}
                    <Image
                      className=" opacity-40"
                      preview={false}
                      src="/img/calendar.svg"
                    />
                  </div>
                  <div className=" ml-[10px] opacity-40">
                    {data?.created_date.slice(0, 10)}
                  </div>
                </div>
              </div>
            </div>
            <div className=" px-[30px]">
              <div className=" text-[#2F3747] text-[30px] font-bold">
                {data?.title}
              </div>
              <div
                className=" mt-[24px]"
                dangerouslySetInnerHTML={{ __html: data?.content_more }}
              ></div>
            </div>
          </div>
          <div className=" w-[370px] ">
            <div className="">
              <div className=" text-white flex items-center pl-[30px]  text-[18px] font-bold w-full h-[48px] bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD] rounded-t-[4px]">
                Бусад мэдээ
              </div>
              <div className=" w-full h-[168px] flex justify-center mt-[30px] shadow-md ">
                <div className=" flex w-[338px] justify-between">
                  <div className="">
                    <Image
                      preview={false}
                      className=" object-cover w-[100px] h-[133px]"
                      src="/img/test.jpg"
                    />
                  </div>
                  <div className=" w-[220px]">
                    <div className=" text-[#2F3747] text-[16px] font-semibold">
                      Poster MockUp PSD - Interior Scene
                    </div>
                    <div className=" text-[#2F3747] text-[16px]">
                      Class aptent taciti sociosqu ad litora torquent per con...
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default NewsId;
