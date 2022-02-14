import React, { useEffect, useState } from "react";
import NavbarTrans from "../../components/NavbarTrans";
import Footer from "../../components/Footer";
import { Image, Tabs } from "antd";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Auth from "../../utils/auth";
import axios from "axios";

const Work = () => {
  const baseUrl = process.env.NEXT_PUBLIC_URL;
  const { TabPane } = Tabs;
  const [data, setData] = useState();
  const settings = {
    arrows: true,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1900,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  useEffect(async () => {
    const res = await axios.post(
      baseUrl + "get/employment_info",
      {
        jsonrpc: 2.0,
        params: {},
      },

      // .post(`/mails/users/sendVerificationMail`, null, { params: {
      //   mail,
      //   firstname
      // }})

      {
        headers: {
          "Set-Cookie": "session_id=" + Auth.getToken(),
          "Content-Type": "application/json",
        },
      }
    );
    setData(res?.data?.result[0]);
    console.log(res, "ajil ");
  }, []);
  return (
    <div>
      <div className="relative  w-full">
        <div id="head" className=" absolute z-20 flex flex-col w-full h-full">
          <div className="w-full flex justify-center">
            <NavbarTrans />
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
      <div className="bg-[#9CA6C0] bg-opacity-10 relative pt-[60px] pb-[100px]">
        <div className=" text-[24px] flex justify-center test">
          Сонгон шалгаруулалтын дараалал
        </div>
        <div className=" flex justify-center">
          <div className=" flex mt-[110px] 2xl:w-[1170px] justify-between">
            <div className=" relative w-[270px] h-[200px] bg-white flex justify-center rounded-[4px]">
              <div className=" w-[100px] h-[100px] bg-[#F5F6F9]  rounded-[50px] absolute top-[-20%] ayguu flex justify-center items-center ">
                <div className=" text-white text-[24px] font-bold w-[80px] h-[80px] bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD] rounded-[50px] ayguu flex justify-center items-center ">
                  01
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className=" text-[#000000] text-[18px] font-bold">
                  Анкет хүлээн авах
                </div>
                <div className=" absolute bottom-0  w-[160px] h-[5px] bg-[#2E28D4]"></div>
              </div>
            </div>
            <div className=" relative w-[270px] h-[200px] bg-white flex justify-center rounded-[4px]">
              <div className=" w-[100px] h-[100px] bg-[#F5F6F9]  rounded-[50px] absolute top-[-20%] ayguu flex justify-center items-center ">
                <div className=" text-white text-[24px] font-bold w-[80px] h-[80px] bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD] rounded-[50px] ayguu flex justify-center items-center ">
                  01
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className=" text-[#000000] text-[18px] font-bold">
                  Анкет хүлээн авах
                </div>
                <div className=" absolute bottom-0  w-[160px] h-[5px] bg-[#2E28D4]"></div>
              </div>
            </div>
            <div className=" relative w-[270px] h-[200px] bg-white flex justify-center rounded-[4px] ">
              <div className=" w-[100px] h-[100px] bg-[#F5F6F9]  rounded-[50px] absolute top-[-20%] ayguu flex justify-center items-center ">
                <div className=" text-white text-[24px] font-bold w-[80px] h-[80px] bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD] rounded-[50px] ayguu flex justify-center items-center ">
                  01
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className=" text-[#000000] text-[18px] font-bold">
                  Анкет хүлээн авах
                </div>
                <div className=" absolute bottom-0  w-[160px] h-[5px] bg-[#2E28D4]"></div>
              </div>
            </div>
            <div className=" relative w-[270px] h-[200px] bg-white flex justify-center rounded-[4px]">
              <div className=" w-[100px] h-[100px] bg-[#F5F6F9]  rounded-[50px] absolute top-[-20%] ayguu flex justify-center items-center ">
                <div className=" text-white text-[24px] font-bold w-[80px] h-[80px] bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD] rounded-[50px] ayguu flex justify-center items-center ">
                  01
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className=" text-[#000000] text-[18px] font-bold">
                  Анкет хүлээн авах
                </div>
                <div className=" absolute bottom-0  w-[160px] h-[5px] bg-[#2E28D4]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" w-full flex justify-center">
        <div>
          <div className=" text-[24px] text-[#000000] font-bold flex justify-center pt-[80px]">
            Нээлттэй ажлын байр
          </div>
          <div className=" w-full mt-[40px]">
            <div className=" flex justify-center ">
              <div className=" w-[250px]  lg:w-[85vw] max-w-[1326px]">
                <Slider className=" " {...settings}>
                  <div className="  cursor-pointer">
                    <div className=" bg-[#9CA6C0] bg-opacity-20 mx-[30px] h-[60px] flex justify-center items-center rounded-[4px]">
                      <div className=" text-[#2F3747] opacity-60 text-[18px] font-bold">
                        Front-End Хөгжүүлэгч
                      </div>
                    </div>
                  </div>
                  <div className="  ">
                    <div className=" bg-[#9CA6C0] bg-opacity-20 mx-[30px] h-[60px] flex justify-center items-center rounded-[4px]">
                      <div className=" text-[#2F3747] opacity-60 text-[18px] font-bold">
                        Front-End Хөгжүүлэгч
                      </div>
                    </div>
                  </div>
                  <div className="  ">
                    <div className=" bg-[#9CA6C0] bg-opacity-20 mx-[30px] h-[60px] flex justify-center items-center rounded-[4px]">
                      <div className=" text-[#2F3747] opacity-60 text-[18px] font-bold">
                        Front-End Хөгжүүлэгч
                      </div>
                    </div>
                  </div>
                  <div className="  ">
                    <div className=" bg-[#9CA6C0] bg-opacity-20 mx-[30px] h-[60px] flex justify-center items-center rounded-[4px]">
                      <div className=" text-[#2F3747] opacity-60 text-[18px] font-bold">
                        Front-End Хөгжүүлэгч
                      </div>
                    </div>
                  </div>
                  <div className="  ">
                    <div className=" bg-[#9CA6C0] bg-opacity-20 mx-[30px] h-[60px] flex justify-center items-center rounded-[4px]">
                      <div className=" text-[#2F3747] opacity-60 text-[18px] font-bold">
                        Front-End Хөгжүүлэгч
                      </div>
                    </div>
                  </div>
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" flex justify-center mb-[100px]">
        <div className=" w-[970px] h-[941px] shadow-md mt-[40px]">
          <div className=" m-[30px] relative">
            <div className=" flex justify-between">
              <div className=" text-[#2E28D4] text-[20px] font-bold">
                Front-End Хөгжүүлэгч
              </div>
              <div className=" flex  justify-end ">
                <div className=" flex mr-[25px]">
                  <div>
                    {" "}
                    <Image
                      className=" opacity-40"
                      preview={false}
                      src="/img/clock.svg"
                    />
                  </div>
                  <div className=" ml-[10px] opacity-40">
                    04:00
                    {/* {item?.created_date.slice(11, 16)} */}
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
                    04:00
                    {/* {item?.created_date.slice(0, 10)} */}
                  </div>
                </div>
              </div>
            </div>
            <div
              dangerouslySetInnerHTML={{ __html: data?.job_description }}
            ></div>
            <div className=" absolute top-[50%] left-[20%] opacity-50">
              <Image preview={false} src="/img/work.svg" />
            </div>
            <Contact />
          </div>
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Work;

const Contact = () => {
  return (
    <div>
      <div className=" text-[#2F3747] text-[18px] font-bold">Холбоо барих</div>
      <div className="  justify-center    flex   items-center lg:h-[89px]">
        <div className="  flex flex-col pt-4 pb-4 xl:justify-around xl:w-[60vw] md:w-[80vw] md:justify-between  md:flex-row xl:flex-row xl:pt-0 xl:pb-0 max-w-[1920px]">
          <div className=" flex items-center">
            <div className="flex items-center mr-2">
              <Image preview={false} src="/img/call.svg" />
            </div>
            <div
              className=" text-black text-[16px]"
              style={{
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "19px",
                opacity: 0.7,
              }}
            >
              <strong>Утас:</strong>
              <br /> +976 72707007
            </div>
          </div>
          <div className=" flex items-center my-3 xl:mx-[95px] ">
            <div className="flex items-center mr-2">
              <Image preview={false} src="/img/mail.svg" />
            </div>
            <div
              className=" text-black text-[16px]  w-[110px] "
              style={{
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
              className=" text-black text-[16px] w-[200px] xl:w-[274px] md:w-[300px]"
              style={{
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "19px",
                opacity: 0.7,
              }}
            >
              <strong>Хаяг:</strong> Реженси Ресидэнс, 16 Олимпын гудамж, 14220,
              Улаанбаатар хот, Монгол улс
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
