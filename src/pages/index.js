import React, { useState } from "react";
import styles from "../../styles/Home.module.css";
import NavbarTrans from "../components/NavbarTrans";
import Auth from "../utils/auth";
import Footer from "../components/Footer";
import { Button, Image, Carousel } from "antd";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import Loader from "react-loader-spinner";
import Head from "next/head";


export default function Home() {
  const [onhover, setOnHover] = useState(false);
  const [onhover2, setOnHover2] = useState(false);
  const [onhover3, setOnHover3] = useState(false);
  const [onhover4, setOnHover4] = useState(false);
  const contentStyle = {
    height: "350px",

    color: "#fff",
    width: "370px",
    lineHeight: "1.5rem",
    textAlign: "start",
    // background: "red"
  };
  const settings = {
    arrows: true,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
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
  const settings2 = {
    arrows: true,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1900,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
    ],
  };

  return (
    // <div >
    //     <Navbar />
    //     <div className=" w-full flex justify-center mt-[100px]  items-center h-[35vh]">
    //     <Image preview={false} src="/img/soon.svg" />
    //     </div>
    //     <Footer />
    // </div>

    <div className="">
      <Head>
        <title>iFinance | Интеллижент Финанс ХХК</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="relative  w-full">
        <div id="head" className=" absolute z-20 flex flex-col w-full h-full">
          <div className="w-full flex justify-center">
            <NavbarTrans />
          </div>
          <div className=" hidden  xl:flex w-full justify-center  items-center mt-[100px]">
            <div>
              <div className=" text-[16px]  xl:text-[36px] xl:text-white font-poppins-semibold xl:w-[600px]">
                Бид танай байгууллагын цахим өвийг бүтээнэ!
              </div>
              <br />
              <div className=" xl:text-white text-[16px] font-normal mb-[24px]">
                Монголын хамгийн анхны SAAS ERP бүтээгдэхүүн
              </div>
              <div className=" flex mt-[40px]">
                <div>
                  <Button className=" w-[166px] h-[48px] rounded-[43px] bg-white text-[#2E28D4] text-[14px] font-poppins-semibold border-none mr-[24px]">
                    Демо
                  </Button>
                </div>
                <div>
                  <Button className=" font-poppins-semibold w-[166px] h-[48px] rounded-[43px] bg-transparent  text-white border-[1px] border-white">
                    <a href="/contact">Холбоо барих</a>
                  </Button>
                </div>
              </div>
            </div>
            <div className="hidden xl:block">
              <Image preview={false} src="/img/homeImg.svg" />
            </div>
          </div>
        </div>
        <Image className=" w-[100vw] h-auto" preview={false} src="/img/homeBack.svg" />
      </div>
      <div className="xl:hidden mt-[-10vh] md:mt-[-15vh] flex justify-center">
        <Image
          className="h-40 w-40 md:w-[300px] md:h-[300px]  "
          preview={false}
          src="/img/homeImg.svg"
        />
      </div>
      <div className=" xl:hidden">
        <div className="flex justify-center">
          <div className=" text-center w-[300px] text-[16px] md:text-[36px] md:w-[500px] text-[#2E28D4] xl:text-[36px] xl:text-white font-semibold xl:w-[571px]">
            Бид танай байгууллагын цахим өвийг бүтээнэ!
          </div>
        </div>
        <div className=" flex justify-center ">
          <div className=" w-[300px] xl:text-white text-center mt-4 text-[16px] md:text-[20px] font-normal mb-[24px]">
            Монголын хамгийн анхны SAAS ERP бүтээгдэхүүн
          </div>
        </div>

        <div className=" flex justify-around xl:mt-[40px]">
          <div>
            <Button className=" w-[166px] h-[48px] rounded-[43px] bg-[#2E28D4] text-white xl:bg-white xl:text-[#2E28D4] text-[14px] font-bold border-none mr-[24px]">
              Демо
            </Button>
          </div>
          <div>
            <Button className=" w-[166px] h-[48px] rounded-[43px] bg-transparent text-[#2E28D4]  xl:text-white font-bold border-[1px] border-[#2E28D4] xl:border-white">
              Холбоо барих
            </Button>
          </div>
        </div>
      </div>
      <div className=" mt-[78px] ">
        <div className=" flex items-center justify-center">
          <div className=" bg-[#2E28D4] h-[1px] w-[48px] "></div>
          <div className="text-[#2E28D4] text-[11px] font-semibold mx-[16px]">
            01 Байгууллага
          </div>
          <div className=" bg-[#2E28D4] h-[1px] w-[48px]"></div>
        </div>

        <div className=" text-[#2F3747] text-[24px] font-bold flex justify-center text-center">
          Хамтран ажиллагч байгууллагууд
        </div>
        <div className=" w-full flex justify-center mt-[40px]">
          <div className=" flex ">
            <div className="  max-w-[1200px]  flex  flex-col items-start space-y-10 md:space-y-0 md:grid md:grid-cols-3 xl:flex-row   xl:w-[50vw]">
              <div
                className="flex pl-12 md:pl-0"
                onMouseEnter={() => setOnHover(true)}
                onMouseLeave={() => setOnHover(false)}
              >
                <div>
                  {onhover ? (
                    <Image className="" preview={false} src="/img/ict2.svg" />
                  ) : (
                    <Image preview={false} src="/img/ict.svg" />
                  )}
                </div>
              </div>
              <div
                className="flex justify-center pl-12 md:pl-0"
                onMouseEnter={() => setOnHover2(true)}
                onMouseLeave={() => setOnHover2(false)}
              >
                {onhover2 ? (
                  <Image className="" preview={false} src="/img/itools2.svg" />
                ) : (
                  <Image preview={false} src="/img/itools.svg" />
                )}
              </div>
              <div
                className="flex justify-center pl-12 md:pl-0"
                onMouseEnter={() => setOnHover3(true)}
                onMouseLeave={() => setOnHover3(false)}
              >
                {onhover3 ? (
                  <Image className="" preview={false} src="/img/fibo2.svg" />
                ) : (
                  <Image preview={false} src="/img/fibo.svg" />
                )}
              </div>
              {/* <div
                className="flex justify-center"
                onMouseEnter={() => setOnHover4(true)}
                onMouseLeave={() => setOnHover4(false)}
              >
                {onhover4 ? (
                  <Image className="" preview={false} src="/img/cloud2.svg" />
                ) : (
                  <Image preview={false} src="/img/cloud.svg" />
                )}
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <div className=" mt-[100px] ">
        <div className=" flex items-center justify-center">
          <div className=" bg-[#2E28D4] h-[1px] w-[48px] "></div>
          <div className="text-[#2E28D4] text-[11px] font-semibold mx-[16px]">
            02 Үйлчилгээ
          </div>
          <div className=" bg-[#2E28D4] h-[1px] w-[48px]"></div>
        </div>
        <div className=" text-[#2F3747] text-[24px] font-bold flex justify-center">
          Үйлчилгээний төрөл
        </div>
        <div className=" w-full ">
          <div className=" flex justify-center ">
            <div className=" w-[250px]  lg:w-[65vw] max-w-[1200px]">
              <Slider className=" " {...settings}>
                <div className=" p-5">
                  <div className="  xl:w-[170px] h-[184px] bg-white shadow-lg   flex flex-col justify-center items-center">
                    <div>
                      <Image preview={false} src="/img/u1.svg" />
                    </div>
                    <div className="  text-[#2F3747] text-[16px] font-semibold w-[110px] text-center">
                      ERP хөгжүүлэлт
                    </div>
                  </div>
                </div>
                <div className=" p-5">
                  <div className=" mt-4 lg:mt-0 xl:w-[170px] h-[184px] bg-white shadow-lg  flex flex-col justify-center items-center">
                    <div>
                      <Image preview={false} src="/img/u2.svg" />
                    </div>
                    <div className=" text-[#2F3747] text-[16px] font-semibold w-[110px] text-center">
                      Вебсайт хөгжүүлэлт
                    </div>
                  </div>
                </div>
                <div className=" p-5">
                  <div className=" mt-4 md:mt-0 xl:w-[170px] h-[184px] bg-white shadow-lg  flex flex-col justify-center items-center">
                    <div>
                      <Image preview={false} src="/img/u3.svg" />
                    </div>
                    <div className=" text-[#2F3747] text-[16px] font-semibold w-[110px] text-center">
                      Мобайл апп хөгжүүлэлт
                    </div>
                  </div>
                </div>
                <div className=" p-5">
                  <div className=" mt-4 md:mt-0 xl:my-0 xl:w-[170px] h-[184px] bg-white shadow-lg  flex flex-col justify-center items-center">
                    <div>
                      <Image preview={false} src="/img/u4.svg" />
                    </div>
                    <div className=" text-[#2F3747] text-[16px] font-semibold w-[110px] text-center">
                      Систем интеграцчилал
                    </div>
                  </div>
                </div>
                <div className=" p-5">
                  <div className="  mt-4 lg:mt-0 xl:w-[170px] h-[184px] bg-white shadow-lg  flex flex-col justify-center items-center">
                    <div>
                      <Image preview={false} src="/img/u5.svg" />
                    </div>
                    <div className=" text-[#2F3747] text-[16px] font-semibold w-[110px] text-center">
                      Тусламж, дэмжлэг
                    </div>
                  </div>
                </div>
                <div className=" p-5">
                  <div className=" mt-4 lg:mt-0 xl:w-[170px] h-[184px] bg-white shadow-lg  flex flex-col justify-center items-center">
                    <div>
                      <Image preview={false} src="/img/u6.svg" />
                    </div>
                    <div className=" text-[#2F3747] text-[16px] font-semibold w-[110px] text-center">
                      Сервер арчилгаа
                    </div>
                  </div>
                </div>
                <div className=" p-5">
                  <div className=" mt-4 md:mt-0 xl:w-[170px] h-[184px] bg-white shadow-lg  flex flex-col justify-center items-center">
                    <div>
                      <Image preview={false} src="/img/u3.svg" />
                    </div>
                    <div className=" text-[#2F3747] text-[16px] font-semibold w-[110px] text-center">
                      Мобайл апп хөгжүүлэлт
                    </div>
                  </div>
                </div>
              </Slider>
            </div>
          </div>
        </div>
        {/* <div className=" max-w-[1920px] flex flex-col xl:flex-row text-center  md:h-auto w-[65vw] justify-between ">
            <div className=" xl:w-[170px] h-[184px] bg-white shadow-custom flex flex-col justify-center items-center">
              <div>
                <Image preview={false} src="/img/u1.svg" />
              </div>
              <div className="  text-[#2F3747] text-[16px] font-semibold w-[110px]">
                ERP хөгжүүлэлт
              </div>
            </div>
            <div className=" mt-4 lg:mt-0 xl:w-[170px] h-[184px] bg-white shadow-custom flex flex-col justify-center items-center">
              <div>
                <Image preview={false} src="/img/u2.svg" />
              </div>
              <div className=" text-[#2F3747] text-[16px] font-semibold w-[110px] ">
                Вебсайт хөгжүүлэлт
              </div>
            </div>
            <div className=" mt-4 md:mt-0 xl:w-[170px] h-[184px] bg-white shadow-custom flex flex-col justify-center items-center">
              <div>
                <Image preview={false} src="/img/u3.svg" />
              </div>
              <div className=" text-[#2F3747] text-[16px] font-semibold w-[110px]">
                Мобайл апп хөгжүүлэлт
              </div>
            </div>
            <div className=" mt-4 md:mt-0 xl:my-0 xl:w-[170px] h-[184px] bg-white shadow-custom flex flex-col justify-center items-center">
              <div>
                <Image preview={false} src="/img/u4.svg" />
              </div>
              <div className=" text-[#2F3747] text-[16px] font-semibold w-[110px]">
                Систем интеграцчилал
              </div>
            </div>
            <div className="  mt-4 lg:mt-0 xl:w-[170px] h-[184px] bg-white shadow-custom flex flex-col justify-center items-center">
              <div>
                <Image preview={false} src="/img/u5.svg" />
              </div>
              <div className=" text-[#2F3747] text-[16px] font-semibold w-[110px]">
                Тусламж, дэмжлэг
              </div>
            </div>
            <div className=" mt-4 lg:mt-0 xl:w-[170px] h-[184px] bg-white shadow-custom flex flex-col justify-center items-center">
              <div>
                <Image preview={false} src="/img/u6.svg" />
              </div>
              <div className=" text-[#2F3747] text-[16px] font-semibold w-[110px]">
                Сервер арчилгаа
              </div>
            </div>
          </div> */}
      </div>
      <div className="">
        <div className=" w-full bg-[#9CA6C0] bg-opacity-10 mt-[100px]">
          <div className=" flex items-center justify-center pt-[80px]">
            <div className=" bg-[#2E28D4] h-[1px] w-[48px] "></div>
            <div className="text-[#2E28D4] text-[11px] font-semibold mx-[16px]">
              03 Давуу тал
            </div>
            <div className=" bg-[#2E28D4] h-[1px] w-[48px]"></div>
          </div>
          <div className=" text-[#2F3747] text-[24px] font-bold flex justify-center">
            Бүтээгдэхүүний онцлог
          </div>
          <div className=" w-full flex justify-center mt-[40px]">
            <div className=" max-w-[1920px] flex flex-col md:flex-col xl:flex-row  lg:min-w-[1200px] justify-between pb-[100px]">
              <div>
                <div>
                  <Image preview={false} src="/img/b1.svg" />
                </div>
                <div className=" text-[#2F3747] hover:text-transparent bg-clip-text hover:bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD] text-[18px] w-[270px] font-bold">
                  Ахисан түвшний санхүүгийн бүртгэл
                </div>
                <div className=" w-[270px] text-[#2F3747] text-[16px] font-normal text-justify text-opacity-60">
                  Монгол улсын стандартад бүрэн нийцсэн санхүү нягтлан бодох
                  бүртгэлийн бүх төрлийн үйл ажиллагаа, мөнгөн гүйлгээнүүдийг
                  нарийвчилсан шинжилгээ хийх боломжтой
                </div>
              </div>
              <div className=" mt-[50px] md:mt-[0px]">
                <div>
                  <Image preview={false} src="/img/b2.svg" />
                </div>
                <div className=" text-[#2F3747] hover:text-transparent bg-clip-text hover:bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD] text-[18px] w-[270px] font-bold">
                  Олон хэлбэрт харилцаа холбооны хэрэгсэл
                </div>
                <div className=" w-[270px] text-[#2F3747] text-[16px] text-justify font-normal text-opacity-60">
                  Онлайн хурал хийх, олон орны хэл дээр ажиллах, бүрэн автомат
                  мессэж болон имэйл мэдэгдэл илгээх боломжтой
                </div>
              </div>
              <div className=" mt-[50px] xl:mt-0">
                <div>
                  <Image preview={false} src="/img/b3.svg" />
                </div>
                <div className=" text-[#2F3747] hover:text-transparent bg-clip-text hover:bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD] text-[18px] w-[270px] font-bold">
                  Байршил хамаарахгүй цаг хугацаа хэмнэсэн
                </div>
                <div className=" w-[270px] text-justify text-[#2F3747] text-[16px] font-normal text-opacity-60">
                  Интернэттэй л бол дэлхийн хаанаас ч өөрийн цагийн бүсээс
                  тухайн цагт шууд ашиглах боломжтой
                </div>
              </div>
              <div className=" mt-[50px] md:mt-[0px]">
                <div>
                  <Image preview={false} src="/img/b4.svg" />
                </div>
                <div className=" text-[#2F3747] hover:text-transparent bg-clip-text hover:bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD] text-[18px] w-[270px] font-bold">
                  Хамгийн сүүлийн үеийн технологи
                </div>
                <div className=" w-[270px] text-justify text-[#2F3747] text-[16px] font-normal text-opacity-60">
                  iFinance бүтээгдэхүүн нь дэлхийн ERP цогц систем болох
                  Odoo.com -н 15.0 буюу сүүлийн үеийн хувилбарт суурилсан
                  технологитой холбогдож, бүхий л мэдээлэл солилцох бүрэн
                  боломжтой.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" mt-[100px]">
        <div className=" flex items-center justify-center">
          <div className=" bg-[#2E28D4] h-[1px] w-[48px] "></div>
          <div className="text-[#2E28D4] text-[11px] font-semibold mx-[16px] ">
            04 Байгууллагын давуу тал
          </div>
          <div className=" bg-[#2E28D4] h-[1px] w-[48px]"></div>
        </div>
        <div className=" flex justify-center xl">
          <div className=" w-[250px] xl:w-auto text-center text-[#2F3747] text-[24px] font-bold flex justify-center">
            Бусдаас ялгарах манай давуу тал
          </div>
        </div>
        <div>
          <div className=" w-full flex justify-center mt-[40px]">
            <div className=" max-w-[1200px] flex flex-col xl:flex-row w-[65%]   justify-between">
              <div>
                <div className=" ">
                  <Image preview={false} src="/img/d1.svg" />
                </div>
                <div className=" text-[#2F3747]  text-[18px] lg:w-[300px] xl:w-[470px] font-bold">
                  <span className=" text-[#F01A63] ">
                    Та худалдан авалт хийсэн цагаас эхлэн
                  </span>{" "}
                  бидний нэг хэсэг болж нэгдсэнээр БИД болно.{" "}
                </div>
              </div>
              <div className=" mt-10 xl:mt-0">
                <div className="flex ">
                  <div className="flex flex-col items-center w-[48px]">
                    <div className="h-[48px] w-[48px] bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD] rounded-[50px] flex justify-center items-center text-white font-bold text-[18px]">
                      1
                    </div>
                    <div className=" bg-[#AC27FD] w-[1px] h-[30px] my-[4px]"></div>
                  </div>
                  <div className=" mb-2  lg:w-[550px] ml-2 xl:text-[16px]  text-[14px] font-semibold text-[#2F3747] ">
                    Бид шинэ санааг боловсруулж хамгийн үр ашигтай, зөв гэсэн
                    шийдлийг гаргаж чаддаг.
                  </div>
                </div>
                <div className="flex">
                  <div className="flex flex-col items-center w-[48px]">
                    <div className="font-bold text-[18px] h-[48px] w-[48px] bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD] rounded-[50px] flex justify-center items-center text-white">
                      2
                    </div>
                    <div className=" bg-[#AC27FD] w-[1px] h-[30px] my-[4px]"></div>
                  </div>
                  <div className="mb-2 xl:w-[550px] ml-2 xl:text-[16px]  text-[14px] font-semibold text-[#2F3747]">
                    Бид хамгийн сүүлийн үеийн програм хангамж дээр хөгжүүлэлт
                    хийж, түүнийгээ ашиглаж чаддаг.{" "}
                  </div>
                </div>
                <div className="flex">
                  <div className="flex flex-col items-center w-[48px]">
                    <div className="font-bold text-[18px] h-[48px] w-[48px] bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD] rounded-[50px] flex justify-center items-center text-white">
                      3
                    </div>
                    <div className=" bg-[#AC27FD] w-[1px] h-[30px] my-[4px]"></div>
                  </div>
                  <div className="mb-2 xl:w-[550px] ml-2 xl:text-[16px]  text-[14px] font-semibold text-[#2F3747]">
                    Бид дотоодын болон гадны системтэй интеграц буюу холболт
                    хийж чаддаг.{" "}
                  </div>
                </div>
                <div className="flex">
                  <div className="flex flex-col items-center w-[48px]">
                    <div className="font-bold text-[18px] h-[48px] w-[48px] bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD] rounded-[50px] flex justify-center items-center text-white">
                      4
                    </div>
                  </div>
                  <div className=" xl:w-[550px] ml-2 xl:text-[16px]  text-[14px] font-semibold text-[#2F3747]">
                    Бид нэгнээ үргэлж дэмждэг. Бид нэгэндээ үргэлж нээлттэй
                    байж, өөриймсөг хандлагаар тусалж чаддаг.{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[100px]">
        <div className=" flex items-center justify-center">
          <div className=" bg-[#2E28D4] h-[1px] w-[48px] "></div>
          <div className="text-[#2E28D4] text-[11px] font-semibold mx-[16px]">
            05 Байгууллагын давуу тал
          </div>
          <div className=" bg-[#2E28D4] h-[1px] w-[48px]"></div>
        </div>
        <div className="flex justify-center">
          <div className=" w-[300px] md:w-[600px] text-center xl:w-auto text-[#2F3747] text-[24px] font-bold flex justify-center">
            Манай бүтээгдэхүүнийг сонгох шалтгаан
          </div>
        </div>
        <div className=" w-full flex justify-center mt-[20px] xl:mt-[40px]">
          <div className=" w-full  ">
            <div className=" flex justify-center ">
              <div className=" w-[250px] md:w-[65vw] max-w-[1750px]">
                <Slider className="" {...settings2}>
                  <div className=" p-5">
                    <div className=" w-auto flex flex-col lg:flex-row  justify-center">
                      <div className=" mr-[130px]">
                        <div className=" flex justify-center text-center">
                          <p className=" w-[300px] text-[18px] text-[#2F3747] font-bold">
                            Технологийн дэвшлийг таньд мэдрүүлнэ
                          </p>
                        </div>
                        <div className=" flex justify-center ">
                          <p className=" text-[#2F3747] text-[16px] text-opacity-60 xl:w-[470px] md:w-[470px] w-[300px] text-justify ">
                            Технологийн дэвшилтэт эрин зуунд танай байгууллагын
                            дотоод системийг хийж гүйцэтгэхээс гадна Финтек
                            шилжилтрүү хөтлөн авч орох болно. Сүүлийн үеийн
                            тренд болсо н lend.mn, storepay.mn, pocket.mn гэх
                            мэт санхүүгийн үйл ажиллагааг технологийн
                            тусламжтайгаар өдөр тутмын үйл ажиллагаандаа
                            хэрэгжүүлэх боломжийг таньд олгоно. Та санаагаа
                            захиал. Бид гүйцэлдүүлэе.
                          </p>
                        </div>
                      </div>
                      <div>
                        <div>
                          <Image preview={false} src="/img/robot.svg" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className=" p-5">
                    <div className=" max-w-[1920px] flex flex-col xl:flex-row xl:w-[60vw]  justify-center">
                      <div className=" mr-[130px]">
                        <div className=" flex justify-center text-center">
                          <p className=" w-[300px] text-[18px] text-[#2F3747] font-bold">
                            Технологийн дэвшлийг таньд мэдрүүлнэ
                          </p>
                        </div>
                        <div className=" flex justify-center">
                          <p className=" text-[#2F3747] text-[16px] text-opacity-60 xl:w-[470px] md:w-[470px] w-[300px] text-justify ">
                            Технологийн дэвшилтэт эрин зуунд танай байгууллагын
                            дотоод системийг хийж гүйцэтгэхээс гадна Финтек
                            шилжилтрүү хөтлөн авч орох болно. Сүүлийн үеийн
                            тренд болсо н lend.mn, storepay.mn, pocket.mn гэх
                            мэт санхүүгийн үйл ажиллагааг технологийн
                            тусламжтайгаар өдөр тутмын үйл ажиллагаандаа
                            хэрэгжүүлэх боломжийг таньд олгоно. Та санаагаа
                            захиал. Бид гүйцэлдүүлэе.
                          </p>
                        </div>
                      </div>
                      <div>
                        <div>
                          <Image preview={false} src="/img/robot.svg" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" w-full bg-[#9CA6C0] bg-opacity-10 pb-[100px]">
        <div className=" flex items-center justify-center pt-[80px]">
          <div className=" bg-[#2E28D4] h-[1px] w-[48px] "></div>
          <div className="text-[#2E28D4] text-[11px] font-semibold mx-[16px]">
            06 Боломж
          </div>
          <div className=" bg-[#2E28D4] h-[1px] w-[48px]"></div>
        </div>
        <div className=" flex justify-center">
          <div className=" w-[300px] md:w-auto xl:w-auto text-[#2F3747] text-[24px] font-bold flex justify-center">
            Бүх платформуудад ашиглагдах боломжтой
          </div>
        </div>
        <div className=" w-full flex justify-center mt-[40px]">
          <div className=" max-w-[1920px]  w-[300px]  flex flex-col xl:flex-row xl:w-[55vw] justify-between">
            <div className="  ">
              <div className="flex justify-center md:justify-start">
                <Image preview={false} src="/img/app.svg" />
              </div>
              <p className=" text-[#2F3747] text-[18px] font-bold mt-[24px] flex justify-center md:justify-start">
                Андройд гар утасны апп
              </p>
              <p className=" text-[#2F3747] text-justify text-[16px] font-normal text-opacity-60 md:w-[370px] lg:w-[250px] ">
                Андройд үйлдлийн системд ажиллах гар утасны аппликейшин татах.
              </p>
              <div className=" flex justify-center mt-[40px] md:justify-start">
                <a
                  target="_blank"
                  href="https://play.google.com/store/apps/details?id=com.odoo.mobile&hl=en&gl=US"
                >
                  {" "}
                  <Image preview={false} src="/img/app1.svg" />{" "}
                </a>
              </div>
            </div>
            <div className=" my-10 xl:mt-0">
              <div className="flex justify-center md:justify-start">
                <Image preview={false} src="/img/ifin.svg" />
              </div>
              <p className=" text-[#2F3747] text-[18px] font-bold mt-[24px] w-[300px] flex justify-center ">
                SaaS болон Cloud суурьтай програм хангамж
              </p>
              <p className=" text-justify text-[#2F3747] text-[16px] font-normal text-opacity-60 md:w-[370px] lg:w-[250px] ">
                SaaS болон Cloud програм хангамжийн танилцуулга харах.
              </p>
              <div className=" flex justify-center mt-[40px] md:justify-start">
                <a target="_blank" href="https://ifinance.mn">
                  <Image preview={false} src="/img/ifin1.svg" />
                </a>
              </div>
            </div>
            <div>
              <div className="flex justify-center md:justify-start">
                <Image preview={false} src="/img/play.svg" />
              </div>
              <p className=" flex justify-center  text-[#2F3747] text-[18px] font-bold mt-[24px] md:justify-start">
                IOS гар утасны апп
              </p>
              <p className=" text-justify text-[#2F3747] text-[16px] font-normal text-opacity-60 md:w-[370px] lg:w-[250px] ">
                IOS үйлдлийн системд ажиллах гар утасны аппликейшин татах.
              </p>
              <div className=" flex justify-center mt-[40px] md:justify-start">
                <a
                  target="_blank"
                  href="https://apps.apple.com/us/app/odoo/id1272543640"
                >
                  <Image preview={false} src="/img/play1.svg" />
                </a>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" w-full flex justify-center mt-[100px]">
        <div className=" h-[600px] md:h-auto max-w-[1920px] flex flex-col md:flex-row xl:flex-row md:justify-around md:w-[70vw] xl:w-[65vw] w-full xl:h-[228px] items-center bg-[#2E28D4]  bg-opacity-5 xl:items-center lg:items-start justify-around">
          <div className=" flex justify-center">
            <div>
              <div className=" text-[48px] text-[#F01A63] font-bold">5000+</div>
              <div className=" text-[16px] text-[#9CA6C0] w-[140px] text-center">
                Жилд хандсан хүний тоо
              </div>
            </div>
          </div>
          <div className=" bg-[#9CA6C0] w-[1px] h-[80px] bg-opacity-30">
          </div>
          <div className=" flex justify-center">
            <div>
              <div className=" text-[48px] text-[#2E28D4] font-bold">1200+</div>
              <div className=" text-[16px] text-[#9CA6C0] w-[140px] text-center">
                Улиралд хандсан хүний тоо
              </div>
            </div>
          </div>
          <div className=" bg-[#9CA6C0] w-[1px] h-[80px] bg-opacity-30">
          </div>
          <div className="">
            <div className=" text-[48px] text-[#AC27FD] font-bold">400+</div>
            <div className=" text-[16px] text-[#9CA6C0] w-[140px] text-center ">
              Сард хандсан хүний тоо
            </div>
          </div>
          <div className=" bg-[#9CA6C0] w-[1px] h-[80px] bg-opacity-30">
          </div>
          <div>
            <div className=" text-[48px] text-[#011F70] font-bold">13+</div>
            <div className=" text-[16px] text-[#9CA6C0] w-[140px] text-center">
              Өдөрт хандсан хүний тоо
            </div>
          </div>
        </div>
      </div>
      <div className=" w-full">
        <div className="tursh mt-[100px] w-full  ">
          <div className="flex flex-col justify-center  md:flex-row">
            <div className="relative">
              <div className="h-full w-full absolute z-10 flex flex-col  items-center justify-center left-100px ">
                <div className=" z-10">
                  <Carousel autoplay className=" w-[353px] md:w-[400px] overflow-hidden">
                    <div className=" w-[300px] md:w-[370px] ">
                      <div style={contentStyle} className="flex flex-col   ">
                        <div className=" mt-[55px] md:mt-[0px]">Quotes</div>
                        <div className=" flex justify-start mt-[30px]">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Bibendum eget vitae elementum condimentum est
                          non faucibus.
                        </div>
                        <div className=" flex justify-start mt-[40px] items-center">
                          <div>
                            <Image src="/img/q1.png" />
                          </div>
                          <div className=" flex flex-col ml-2">
                            <div>Cameron Williamson</div>
                            <div>Designer</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className=" w-[370px] ">
                      <h3 style={contentStyle} className=" flex flex-col ">
                        <div className=" mt-[55px] md:mt-[0px]">Quotes2</div>
                        <div className=" flex justify-start mt-[30px]">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Bibendum eget vitae elementum condimentum est
                          non faucibus. 
                        </div>
                        <div className=" flex justify-start mt-[40px] items-center">
                          <div>
                            <Image src="/img/q1.png" />
                          </div>
                          <div className=" flex flex-col ml-2">
                            <div>Cameron Williamson</div>
                            <div>Designer</div>
                          </div>
                        </div>
                      </h3>
                    </div>
                    <div className=" w-[370px] ">
                      <h3 style={contentStyle} className=" flex flex-col ">
                        <div className=" mt-[55px] md:mt-[0px]">Quotes3</div>
                        <div className=" flex justify-start mt-[30px]">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Bibendum eget vitae elementum condimentum est
                          non faucibus. 
                        </div>
                        <div className=" flex justify-start mt-[40px] items-center">
                          <div>
                            <Image src="/img/q1.png" />
                          </div>
                          <div className=" flex flex-col ml-2 ">
                            <div>Cameron Williamson</div>
                            <div>Designer</div>
                          </div>
                        </div>
                      </h3>
                    </div>
                  </Carousel>
                </div>
              </div>
              <Image preview={false} src="/img/f1.svg" />
            </div>
            <div>
              <div className="">
                <Image preview={false} src="/img/f2.svg" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
