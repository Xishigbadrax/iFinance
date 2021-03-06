import React, { useState, useEffect, useContext, Fragment } from "react";
import styles from "../../styles/Home.module.css";
import NavbarTrans from "../components/NavbarTrans";
import Auth from "../utils/auth";
import Footer from "../components/Footer";
import { MaskedInput } from "antd-mask-input";
import { Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import {
  Button,
  Image,
  Carousel,
  Modal,
  Form,
  Input,
  Checkbox,
  Select,
  message,
} from "antd";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import Loader from "react-loader-spinner";
import Head from "next/head";
import { theme } from "../../tailwind.config";
import axios from "axios";
import Context from "../context/Context";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  const { TextArea } = Input;
  const { Option } = Select;
  const { setIsLoading } = useContext(Context);
  const [onhover, setOnHover] = useState(false);
  const [onhover2, setOnHover2] = useState(false);
  const [onhover3, setOnHover3] = useState(false);
  const [demoModal, setDemoModal] = useState(false);
  const [darkMode, setDarkMode] = useState(null);
  const [country, setCountry] = useState(null);
  const [lang, setLang] = useState(null);
  const [test, setTest] = useState(1);
  const [slideLength, setSlideLength] = useState(null);
  const [news, setNews] = useState([]);
  const baseUrl = process.env.NEXT_PUBLIC_URL;
  const [isShowing, setIsShowing] = useState(false);

  const slideContent = [
    {
      id: 1,
      name: "Технологийн дэвшлийг таньд мэдрүүлнэ",
      description:
        " Технологийн дэвшилтэт эрин зуунд танай байгууллагын дотоод системийг хийж гүйцэтгэхээс гадна Финтек шилжилтрүү хөтлөн авч орох болно. Сүүлийн үеийн тренд болсо н lend.mn, storepay.mn, pocket.mn гэх мэт санхүүгийн үйл ажиллагааг  технологийн тусламжтайгаар өдөр тутмын үйл ажиллагаандаа хэрэгжүүлэх боломжийг таньд олгоно. Та санаагаа захиал. Бид гүйцэлдүүлэе.",
      image: "/img/z1.svg",
    },
    {
      id: 2,
      name: " Мэргэжлийн тусламж үйлчилгээ",
      description:
        "Санхүү болон технологийн салбарт дор хаяж 3-5 жилийн туршлагатай мэргэжилтнүүд таньд тулгарсан асуудал, хэрэгтэй шийдлийг хэлэлцэж, асуудлыг шийдвэрлэнэ.",
      image: "/img/z2.svg",
    },
    {
      id: 3,
      name: "	Харилцагч та илүү зардалгүй ",
      description:
        " Танай байгууллага програм байршуулах сервер худалдаж авах, IT-н ажилтан, алба хэлтэс ажиллуулах гэх мэт толгой өвтгөсөн илүү зардал гаргах шаардлагагүй",
      image: "/img/z3.svg",
    },
    {
      id: 4,
      name: "	Насан туршийн хамтын үйл ажиллагаа",
      description:
        " 	Бид ашигаас илүү харилцагчийн сэтгэл ханамжийг илүүд үзэх учраас насан туршийнд тэмүүлсэн урт хугацааны хамтын ажиллагааг санал болгодгоороо давуу талтай",
      image: "/img/z4.svg",
    },
    {
      id: 5,
      name: "	Төлбөрийн уян хатан нөхцөл",
      description:
        "	Харилцагч та өөрийн шаардлагад нийцсэн буюу яг хэрэгтэй  бүтээгдэхүүн үйлчилгээг сонгон худалдаж авах, бидний цаашдын үйл ажиллагаанд хэрэгцээтэй гэсэн нэмэлт хөгжүүлэлт хийлгэвэл хөнгөлөлт, урамшуулал эдлэх боломжтой",
      image: "/img/z5.svg",
    },
  ];

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
          slidesToShow: 6,
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

  const onDemo = () => {
    setDemoModal(true);
  };
  const onDetail = (id) => {
    id &&
      router.push({
        pathname: `news/${id}`,
        query: {
          id: id,
        },
      });
  };
  const onFinishDemo = async (values) => {
    setIsLoading(true);
    // console.log("Success:", values);
    const res = await axios.post(
      baseUrl + "set/demo",
      {
        jsonrpc: 2.0,
        params: {
          surname: values.surname,
          firstname: values.firstname,
          email: values.email,
          phone: values.phone,
          company: values.company,
          company_register: values.company_register,
          country: values.country,
          language: values.language,
          description: values.description,
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
    // console.log(res, "demo res");
    res?.data?.result && window.open(res?.data?.result, "_blank").focus();
    handleCancel();
    message.success("Амжилттай");
  };

  // useEffect(() => {
  //   console.log(darkMode, "<==");
  // }, [darkMode]);

  const handleCancel = () => {
    setDemoModal(false);
  };

  const onBefore = () => {
    if (test == 1) {
      setTest(slideLength);
    } else {
      setTest(test - 1);
    }
    // setIsShowing((isShowing) => !isShowing);
  };
  const onNext = () => {
    if (test == slideLength) {
      setTest(1);
    } else {
      setTest(test + 1);
    }
    // setIsShowing((isShowing) => !isShowing);
  };

  useEffect(async () => {
    setSlideLength(slideContent.length);
    const res = await axios.post(
      baseUrl + "get/lang",
      {
        jsonrpc: 2.0,
        params: {},
      },

      {
        headers: {
          "Set-Cookie": "session_id=" + Auth.getToken(),
          "Content-Type": "application/json",
        },
      }
    );

    console.log(res, "lang res");
    setCountry(res?.data?.result?.country_list);
    setLang(res?.data?.result?.lang_list);

    setNews(res?.data?.result?.news_list?.slice(0, 3));
    // console.log(res2, "medee");
  }, []);

  // console.log(news, "test");
  // useEffect(() => {
  //   console.log(country);
  // },[country])

  return (
    // <div >
    //     <Navbar />
    //     <div className=" w-full flex justify-center mt-[100px]  items-center h-[35vh]">
    //     <Image preview={false} src="/img/soon.svg" />
    //     </div>
    //     <Footer />
    // </div>

    <div className=" overflow-hidden">
      <Head>
        <title>iFinance | Интеллижент Финанс ХХК</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="relative  w-full">
        <div id="head" className=" absolute z-20 flex flex-col w-full h-full">
          <div className="w-full flex justify-center">
            <NavbarTrans darkaa={setDarkMode} />
          </div>
          <div className=" hidden  xl:flex w-full justify-center  items-center 2xl:mt-[20px] md:mt-[-75px]">
            <div>
              <div className=" text-[16px] lg:text-[24px] 2xl:text-[36px] xl:text-white font-poppins-semibold xl:w-[600px]">
                Бид танай байгууллагын цахим өвийг бүтээнэ!
              </div>
              <br />
              <div className=" xl:text-white text-[16px] font-normal mb-[24px]">
                Монголын хамгийн анхны SAAS ERP бүтээгдэхүүн
              </div>
              <div className=" flex mt-[40px]">
                <div>
                  <Button
                    onClick={onDemo}
                    className=" w-[166px] h-[48px] rounded-[43px] bg-white text-[#2E28D4] text-[14px] font-poppins-semibold border-none mr-[24px]"
                  >
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
            <div className="hidden md:scale-75 2xl:scale-100 xl:block">
              {darkMode == "dark" ? (
                <Image preview={false} src="/img/darkHomeImg.svg" />
              ) : (
                <Image preview={false} src="/img/homeImg.svg" />
              )}
            </div>
          </div>
        </div>
        <div className="2xl:h-[580px] overflow-hidden">
          {darkMode == "dark" ? (
            <Image
              className="w-[100vw]"
              preview={false}
              src="/img/DarkSlider.svg"
            />
          ) : (
            <Image
              className="w-[100vw]"
              preview={false}
              src="/img/realSilder.svg"
            />
          )}
        </div>
      </div>

      <div className=" xl:hidden dark:bg-[#08194B] pb-4">
        <div className="xl:hidden dark:bg-[#08194B] mt-[-10vh] md:mt-[-15vh] flex justify-center">
          <Image
            className="h-40 w-40 md:w-[300px] md:h-[300px]  "
            preview={false}
            src="/img/homeImg.svg"
          />
        </div>
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
            <Button
              onClick={onDemo}
              className=" w-[166px] h-[48px] rounded-[43px] bg-[#2E28D4] text-white xl:bg-white xl:text-[#2E28D4] text-[14px] font-bold border-none mr-[24px]"
            >
              Демо
            </Button>
          </div>
          <div>
            <a href="/contact">
              <Button className=" w-[166px] h-[48px] rounded-[43px] bg-transparent text-[#2E28D4]  xl:text-white font-bold border-[1px] border-[#2E28D4] xl:border-white">
                Холбоо барих
              </Button>
            </a>
          </div>
        </div>
      </div>
      <div className=" dark:bg-[#08194B]">
        <div className=" pt-[78px]">
          <div className=" flex items-center justify-center">
            <div className=" bg-[#2E28D4] h-[1px] w-[48px] "></div>
            <div className="text-[#2E28D4] text-[11px] font-semibold mx-[16px] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-tr from-[#3C8CE7] to-[#00EAFF] ">
              01 Байгууллага
            </div>
            <div className=" bg-[#2E28D4] h-[1px] w-[48px]"></div>
          </div>

          <div className=" text-[#2F3747] text-[24px] font-bold flex justify-center text-center dark:text-white ">
            Хамтран ажиллагч байгууллагууд
          </div>
          <div className=" w-full flex justify-center mt-[40px]">
            <div className=" flex  items-center">
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
                    <Image
                      className=""
                      preview={false}
                      src="/img/itools2.svg"
                    />
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
              </div>
            </div>
          </div>
        </div>
        <div></div>
        <div className=" mt-[100px] ">
          <div className=" flex items-center justify-center">
            <div className=" bg-[#2E28D4] h-[1px] w-[48px] "></div>
            <div className="text-[#2E28D4] text-[11px] font-semibold mx-[16px] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-tr from-[#3C8CE7] to-[#00EAFF] ">
              02 Үйлчилгээ
            </div>
            <div className=" bg-[#2E28D4] h-[1px] w-[48px]"></div>
          </div>
          <div className=" text-[#2F3747] text-[24px] font-bold flex justify-center dark:text-white">
            Үйлчилгээний төрөл
          </div>
          <div className=" w-full ">
            <div className=" flex justify-center ">
              <div className=" w-[250px]  lg:w-[85vw] max-w-[1200px]">
                <Slider className=" " {...settings}>
                  <div className=" p-5">
                    <div className="  xl:w-[170px] h-[184px] dark:bg-[#1D3888] rounded-[8px]  bg-white shadow-lg   flex flex-col justify-center items-center">
                      <div>
                        <Image preview={false} src="/img/u1.svg" />
                      </div>
                      <div className="  text-[#2F3747] text-[16px] font-semibold w-[110px] text-center dark:text-white">
                        ERP хөгжүүлэлт
                      </div>
                    </div>
                  </div>
                  <div className=" p-5">
                    <div className="dark:bg-[#1D3888] rounded-[8px]  lg:mt-0 xl:w-[170px] h-[184px] bg-white shadow-lg  flex flex-col justify-center items-center">
                      <div>
                        <Image preview={false} src="/img/u2.svg" />
                      </div>
                      <div className=" dark:text-white text-[#2F3747] text-[16px] font-semibold w-[110px] text-center">
                        Вебсайт хөгжүүлэлт
                      </div>
                    </div>
                  </div>
                  <div className=" p-5">
                    <div className="dark:bg-[#1D3888] rounded-[8px]  md:mt-0 xl:w-[170px] h-[184px] bg-white shadow-lg  flex flex-col justify-center items-center">
                      <div>
                        <Image preview={false} src="/img/u3.svg" />
                      </div>
                      <div className="dark:text-white text-[#2F3747] text-[16px] font-semibold w-[110px] text-center">
                        Мобайл апп хөгжүүлэлт
                      </div>
                    </div>
                  </div>
                  <div className=" p-5">
                    <div className=" dark:bg-[#1D3888] rounded-[8px] md:mt-0 xl:my-0 xl:w-[170px] h-[184px] bg-white shadow-lg  flex flex-col justify-center items-center">
                      <div>
                        <Image preview={false} src="/img/u4.svg" />
                      </div>
                      <div className="dark:text-white text-[#2F3747] text-[16px] font-semibold w-[110px] text-center">
                        Систем интеграцчилал
                      </div>
                    </div>
                  </div>
                  <div className=" p-5">
                    <div className=" dark:bg-[#1D3888] rounded-[8px]  lg:mt-0 xl:w-[170px] h-[184px] bg-white shadow-lg  flex flex-col justify-center items-center">
                      <div>
                        <Image preview={false} src="/img/u5.svg" />
                      </div>
                      <div className="dark:text-white text-[#2F3747] text-[16px] font-semibold w-[110px] text-center">
                        Тусламж, дэмжлэг
                      </div>
                    </div>
                  </div>
                  <div className=" p-5">
                    <div className=" dark:bg-[#1D3888] rounded-[8px] lg:mt-0 xl:w-[170px] h-[184px] bg-white shadow-lg  flex flex-col justify-center items-center">
                      <div>
                        <Image preview={false} src="/img/u6.svg" />
                      </div>
                      <div className="dark:text-white text-[#2F3747] text-[16px] font-semibold w-[110px] text-center">
                        Сервер арчилгаа
                      </div>
                    </div>
                  </div>
                  <div className=" p-5">
                    <div className="dark:bg-[#1D3888] rounded-[8px] md:mt-0 xl:w-[170px] h-[184px] bg-white shadow-lg  flex flex-col justify-center items-center">
                      <div>
                        <Image preview={false} src="/img/u3.svg" />
                      </div>
                      <div className="dark:text-white  text-[#2F3747] text-[16px] font-semibold w-[110px] text-center">
                        Мобайл апп хөгжүүлэлт
                      </div>
                    </div>
                  </div>
                </Slider>
              </div>
            </div>
          </div>
        </div>

        <div className="dark:bg-[#172757] ">
          <div className=" w-full bg-[#9CA6C0] bg-opacity-10 mt-[100px]">
            <div className=" flex items-center justify-center pt-[80px]">
              <div className=" bg-[#2E28D4] h-[1px] w-[48px] "></div>
              <div className="text-[#2E28D4] text-[11px] font-semibold mx-[16px] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-tr from-[#3C8CE7] to-[#00EAFF] ">
                03 Давуу тал
              </div>
              <div className=" bg-[#2E28D4] h-[1px] w-[48px]"></div>
            </div>
            <div className=" text-[#2F3747] text-[24px] font-bold flex justify-center dark:text-white">
              Бүтээгдэхүүний онцлог
            </div>
            <div className=" w-full flex justify-center mt-[40px]">
              <div className=" max-w-[1920px] grid md:grid-cols-2 lg:grid-cols-4 grid-cols-1 gap-6 lg:min-w-[1200px]  pb-[100px]">
                <div>
                  <div>
                    <Image preview={false} src="/img/b1.svg" />
                  </div>
                  <div className=" dark:text-white dark:opacity-50 dark:hover:opacity-100 text-[#2F3747] hover:text-transparent bg-clip-text hover:bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD] text-[18px] w-[270px] font-bold">
                    Ахисан түвшний санхүүгийн бүртгэл
                  </div>
                  <div className=" dark:text-white dark:opacity-30 dark:hover:opacity-60 w-[270px] text-[#2F3747] text-[16px] font-normal text-justify text-opacity-60 ">
                    Монгол улсын стандартад бүрэн нийцсэн санхүү нягтлан бодох
                    бүртгэлийн бүх төрлийн үйл ажиллагаа, мөнгөн гүйлгээнүүдийг
                    нарийвчилсан шинжилгээ хийх боломжтой
                  </div>
                </div>
                <div className=" mt-[50px] md:mt-[0px]">
                  <div>
                    <Image preview={false} src="/img/b2.svg" />
                  </div>
                  <div className=" dark:text-white dark:opacity-50 dark:hover:opacity-100 text-[#2F3747] hover:text-transparent bg-clip-text hover:bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD] text-[18px] w-[270px] font-bold">
                    Олон хэлбэрт харилцаа холбооны хэрэгсэл
                  </div>
                  <div className=" dark:text-white dark:opacity-30 dark:hover:opacity-60 w-[270px] text-[#2F3747] text-[16px] font-normal text-justify text-opacity-60 ">
                    Онлайн хурал хийх, олон орны хэл дээр ажиллах, бүрэн автомат
                    мессэж болон имэйл мэдэгдэл илгээх боломжтой
                  </div>
                </div>
                <div className=" xl:mt-0">
                  <div>
                    <Image preview={false} src="/img/b3.svg" />
                  </div>
                  <div className=" dark:text-white dark:opacity-50 dark:hover:opacity-100 text-[#2F3747] hover:text-transparent bg-clip-text hover:bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD] text-[18px] w-[270px] font-bold">
                    Байршил хамаарахгүй цаг хугацаа хэмнэсэн
                  </div>
                  <div className=" dark:text-white dark:opacity-30 dark:hover:opacity-60 w-[270px] text-[#2F3747] text-[16px] font-normal text-justify text-opacity-60 ">
                    Интернэттэй л бол дэлхийн хаанаас ч өөрийн цагийн бүсээс
                    тухайн цагт шууд ашиглах боломжтой
                  </div>
                </div>
                <div className=" mt-[50px] md:mt-[0px]">
                  <div>
                    <Image preview={false} src="/img/b4.svg" />
                  </div>
                  <div className=" dark:text-white dark:opacity-50 dark:hover:opacity-100 text-[#2F3747] hover:text-transparent bg-clip-text hover:bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD] text-[18px] w-[270px] font-bold">
                    Хамгийн сүүлийн үеийн технологи
                  </div>
                  <div className=" dark:text-white dark:opacity-30 dark:hover:opacity-60 w-[270px] text-[#2F3747] text-[16px] font-normal text-justify text-opacity-60 ">
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
      </div>
      <div className=" dark:bg-[#08194B]">
        <div className=" pt-[100px]">
          <div className=" flex items-center justify-center">
            <div className=" bg-[#2E28D4] h-[1px] w-[48px] "></div>
            <div className="text-[#2E28D4] text-[11px] font-semibold mx-[16px] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-tr from-[#3C8CE7] to-[#00EAFF] ">
              04 Байгууллагын давуу тал
            </div>
            <div className=" bg-[#2E28D4] h-[1px] w-[48px]"></div>
          </div>
          <div className=" flex justify-center xl">
            <div className=" dark:text-white w-[250px] xl:w-auto text-center text-[#2F3747] text-[24px] font-bold flex justify-center">
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
                  <div className=" dark:text-white text-[#2F3747]  text-[18px] lg:w-[300px] xl:w-[470px] font-bold">
                    <span className=" dark:text-white text-[#F01A63] ">
                      Та худалдан авалт хийсэн цагаас эхлэн
                    </span>{" "}
                    <span className=" dark:opacity-60">
                      бидний нэг хэсэг болж нэгдсэнээр БИД болно.
                    </span>
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
                    <div className=" dark:text-white mb-2  lg:w-[550px] ml-2 xl:text-[16px]  text-[14px] font-semibold text-[#2F3747] ">
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
                    <div className=" dark:text-white mb-2 xl:w-[550px] ml-2 xl:text-[16px]  text-[14px] font-semibold text-[#2F3747]">
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
                    <div className=" dark:text-white mb-2 xl:w-[550px] ml-2 xl:text-[16px]  text-[14px] font-semibold text-[#2F3747]">
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
                    <div className=" dark:text-white xl:w-[550px] ml-2 xl:text-[16px]  text-[14px] font-semibold text-[#2F3747]">
                      Бид нэгнээ үргэлж дэмждэг. Бид нэгэндээ үргэлж нээлттэй
                      байж, өөриймсөг хандлагаар тусалж чаддаг.{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" dark:bg-[#08194B]">
        <div className="pt-[100px]">
          <div className=" flex items-center justify-center">
            <div className=" bg-[#2E28D4] h-[1px] w-[48px] "></div>
            <div className="text-[#2E28D4] text-[11px] font-semibold mx-[16px] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-tr from-[#3C8CE7] to-[#00EAFF] ">
              05 Байгууллагын давуу тал
            </div>
            <div className=" bg-[#2E28D4] h-[1px] w-[48px]"></div>
          </div>
          <div className="flex justify-center">
            <div className=" dark:text-white w-[300px] md:w-[600px] text-center xl:w-auto text-[#2F3747] text-[24px] font-bold flex justify-center">
              Манай бүтээгдэхүүнийг сонгох шалтгаан
            </div>
          </div>
          <div className=" flex justify-center mt-[40px] ">
            <div className=" relative 2xl:w-[1100px] flex justify-center  flex-col pb-[100px] ">
              <div className=" lg:h-[350px]   h-[630px]">
                {slideContent?.map((item, index) => {
                  // if (item.id == test) {
                  return (
                    <Transition
                      as={Fragment}
                      show={item.id == test ? true : false}
                      enter="transform transition duration-[400ms]"
                      enterFrom="opacity-0 rotate-[-120deg] scale-50"
                      enterTo="opacity-100 rotate-0 scale-100"
                      leave="transform duration-150 transition ease-in-out"
                      leaveFrom="opacity-100 rotate-0 scale-100 "
                      leaveTo="opacity-0 scale-95 "
                    >
                      <div className=" flex justify-between flex-col lg:flex-row ">
                        <div className=" flex justify-center">
                          <div>
                            <p className=" dark:text-white  text-[18px] text-[#2F3747] font-bold">
                              {item.name}
                            </p>
                            <div className="flex justify-center">
                              <p className="   w-[300px] dark:text-white dark:opacity-60   h-[280px] lg:h-auto text-[#2F3747] text-[16px] text-opacity-60 xl:w-[470px] md:w-[470px]  ">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div>
                          <Image preview={false} src={item.image} />
                        </div>
                      </div>
                    </Transition>
                  );
                  // }
                })}
              </div>
              <div className=" flex justify-center lg:justify-start">
                <div className=" flex items-center  w-[250px] justify-between">
                  <div
                    onClick={() => onBefore()}
                    className=" hover:bg-[#2E28D426] cursor-pointer w-[40px] h-[40px] rounded-[50px] border-[1px] flex justify-center items-center"
                  >
                    <Image preview={false} src="/img/arrow2.svg" />
                  </div>
                  <div
                    onClick={() => onNext()}
                    className="hover:bg-[#2E28D426] cursor-pointer w-[40px] h-[40px] rounded-[50px] border-[1px] flex justify-center items-center"
                  >
                    <Image preview={false} src="/img/arrow.svg" />
                  </div>
                  <div className=" text-[#9CA6C0] text-[18px]  font-bold">
                    {"0" + test}
                  </div>
                  <div className=" w-[80px] h-[2px] bg-[#9CA6C0]"></div>
                  <div className=" text-[#9CA6C0] text-[18px]  font-bold">
                    {"0" + slideLength}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <div className=" w-full flex justify-center mt-[20px] xl:mt-[40px]">
            <div className=" w-full  ">
              <div className=" flex justify-center ">
                <div className=" w-[250px]  md:w-[65vw] max-w-[1750px] ">
                  <Slider className="" {...settings2}>
                    <div className=" p-5">
                      <div className=" w-auto flex flex-col xl:flex-row  justify-center">
                        <div className=" md:mr-[40px] ">
                          <div className=" flex justify-center text-center">
                            <p className=" dark:text-white w-[300px] text-[18px] text-[#2F3747] font-bold">
                              Технологийн дэвшлийг таньд мэдрүүлнэ
                            </p>
                          </div>
                          <div className=" flex justify-center ">
                            <p className=" dark:text-white dark:opacity-60 text-[#2F3747] text-[16px] text-opacity-60 xl:w-[470px] md:w-[470px] w-[300px] text-justify">
                              Технологийн дэвшилтэт эрин зуунд танай
                              байгууллагын дотоод системийг хийж гүйцэтгэхээс
                              гадна Финтек шилжилтрүү хөтлөн авч орох болно.
                              Сүүлийн үеийн тренд болсо н lend.mn, storepay.mn,
                              pocket.mn гэх мэт санхүүгийн үйл ажиллагааг
                              технологийн тусламжтайгаар өдөр тутмын үйл
                              ажиллагаандаа хэрэгжүүлэх боломжийг таньд олгоно.
                              Та санаагаа захиал. Бид гүйцэлдүүлэе.
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
                      <div className=" w-auto flex flex-col  2xl:flex-row  justify-center">
                        <div className=" md:mr-[40px] ">
                          <div className=" flex justify-center text-center">
                            <p className=" dark:text-white w-[300px] text-[18px] text-[#2F3747] font-bold">
                              Технологийн дэвшлийг таньд мэдрүүлнэ
                            </p>
                          </div>
                          <div className=" flex justify-center ">
                            <p className=" dark:text-white dark:opacity-60 text-[#2F3747] text-[16px] text-opacity-60 xl:w-[470px] md:w-[470px] w-[300px] text-justify">
                              Технологийн дэвшилтэт эрин зуунд танай
                              байгууллагын дотоод системийг хийж гүйцэтгэхээс
                              гадна Финтек шилжилтрүү хөтлөн авч орох болно.
                              Сүүлийн үеийн тренд болсо н lend.mn, storepay.mn,
                              pocket.mn гэх мэт санхүүгийн үйл ажиллагааг
                              технологийн тусламжтайгаар өдөр тутмын үйл
                              ажиллагаандаа хэрэгжүүлэх боломжийг таньд олгоно.
                              Та санаагаа захиал. Бид гүйцэлдүүлэе.
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
          </div> */}
        </div>
      </div>

      <div className=" dark:bg-[#172757]">
        <div className=" w-full bg-[#9CA6C0] bg-opacity-10 pb-[100px]">
          <div className=" flex items-center justify-center pt-[80px]">
            <div className=" bg-[#2E28D4] h-[1px] w-[48px] "></div>
            <div className="text-[#2E28D4] text-[11px] font-semibold mx-[16px] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-tr from-[#3C8CE7] to-[#00EAFF] ">
              06 Боломж
            </div>
            <div className=" bg-[#2E28D4] h-[1px] w-[48px]"></div>
          </div>
          <div className=" flex justify-center">
            <div className=" dark:text-white w-[300px] md:w-auto xl:w-auto text-[#2F3747] text-[24px] font-bold flex justify-center">
              Бүх платформуудад ашиглагдах боломжтой
            </div>
          </div>
          <div className=" w-full flex justify-center mt-[40px]">
            <div className=" max-w-[1220px]  w-[300px]  flex flex-col xl:flex-row xl:w-[70vw] justify-between ">
              <div className="  flex flex-col justify-between  h-[300px]">
                <div className="  ">
                  <div className="flex justify-center md:justify-start">
                    <Image preview={false} src="/img/app.svg" />
                  </div>
                  <p className=" dark:text-white h-[60px]   text-[#2F3747] text-[18px] font-bold mt-[24px] flex justify-center md:justify-start">
                    Андройд гар утасны апп
                  </p>
                  <p className=" dark:text-white dark:opacity-60 text-[#2F3747] text-justify text-[16px] font-normal text-opacity-60 md:w-[370px] lg:w-[250px] ">
                    Андройд үйлдлийн системд ажиллах гар утасны аппликейшин
                    татах.
                  </p>
                </div>
                <div className=" flex justify-center  md:justify-start">
                  <a
                    target="_blank"
                    href="https://play.google.com/store/apps/details?id=com.odoo.mobile&hl=en&gl=US"
                  >
                    {darkMode == "dark" ? (
                      <Image preview={false} src="/img/darkApp1.svg" />
                    ) : (
                      <Image preview={false} src="/img/app1.svg" />
                    )}
                  </a>
                </div>
              </div>
              <div className=" my-10 xl:mt-0">
                <div className=" h-[300px]  justify-between flex flex-col ">
                  <div>
                    <div className="flex justify-center md:justify-start">
                      <Image preview={false} src="/img/ifin.svg" />
                    </div>
                    <p className=" h-[60px] dark:text-white text-[#2F3747] text-[18px] font-bold mt-[24px] w-[300px] flex justify-center ">
                      SaaS болон Cloud суурьтай програм хангамж
                    </p>
                    <p className=" dark:text-white dark:opacity-60 text-justify text-[#2F3747] text-[16px] font-normal text-opacity-60 md:w-[370px] lg:w-[250px] ">
                      SaaS болон Cloud програм хангамжийн танилцуулга харах.
                    </p>
                  </div>
                  <div>
                    <div className=" flex justify-center md:justify-start">
                      <a target="_blank" href="https://ifinance.mn">
                        {darkMode == "dark" ? (
                          <Image preview={false} src="/img/darkApp2.svg" />
                        ) : (
                          <Image preview={false} src="/img/ifin1.svg" />
                        )}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className=" h-[300px]  justify-between flex flex-col">
                  <div>
                    <div className="flex justify-center md:justify-start">
                      <Image preview={false} src="/img/play.svg" />
                    </div>
                    <p className="h-[60px] dark:text-white flex justify-center  text-[#2F3747] text-[18px] font-bold mt-[24px] md:justify-start">
                      IOS гар утасны апп
                    </p>
                    <p className=" dark:text-white dark:opacity-60 text-justify text-[#2F3747] text-[16px] font-normal text-opacity-60 md:w-[370px] lg:w-[250px] ">
                      IOS үйлдлийн системд ажиллах гар утасны аппликейшин татах.
                    </p>
                  </div>
                  <div>
                    <div className=" flex justify-center mt-[40px] md:justify-start">
                      <a
                        target="_blank"
                        href="https://apps.apple.com/us/app/odoo/id1272543640"
                      >
                        {darkMode == "dark" ? (
                          <Image preview={false} src="/img/darkApp3.svg" />
                        ) : (
                          <Image preview={false} src="/img/play1.svg" />
                        )}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" dark:bg-[#08194B]">
        <div className=" flex items-center justify-center pt-[80px]">
          <div className=" bg-[#2E28D4] h-[1px] w-[48px] "></div>
          <div className="text-[#2E28D4] text-[11px] font-semibold mx-[16px] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-tr from-[#3C8CE7] to-[#00EAFF] ">
            07 Байгууллагын давуу тал
          </div>
          <div className=" bg-[#2E28D4] h-[1px] w-[48px]"></div>
        </div>
        <div className=" flex justify-center items-center ">
          <div className=" xl:w-[1170px]    ">
            <div className=" text-center dark:text-white w-[300px] md:w-auto xl:w-auto text-[#2F3747] text-[24px] font-bold flex justify-center">
              Санхүүгийн мэдээ мэдээлэл
            </div>
            <Link href="/news">
              <div className=" flex  justify-end cursor-pointer">
                <div className=" text-[#2F3747] text-[14px] font-medium mr-[10px]">
                  Бүгдийг харах
                </div>
                <div>
                  <Image preview={false} src="/img/arrow.svg" />
                </div>
              </div>
            </Link>
          </div>
        </div>
        <div className=" w-full justify-center flex mt-[40px] ">
          <div className=" grid lg:grid-cols-3 grid-cols-1 gap-4 w-[1170px]">
            {news?.map((item, index) => {
              return (
                <div
                  key={index}
                  onClick={() => onDetail(item.news_id)}
                  className="  w-[370px] flex flex-col  items-center cursor-pointer dark:hover:bg-[#2E28D4] dark:hover:bg-opacity-20 hover:shadow-lg pb-[24px] rounded-[8px]"
                >
                  <div className=" w-[370px] flex flex-col h-[265px]  items-center  relative">
                    <div className=" ">
                      {/* <Image preview={false} src="/img/testNews.svg" /> */}
                      <Image
                        className=" rounded-[8px]"
                        preview={false}
                        src={"data:image/png;base64," + item.news_image}
                      />
                    </div>
                    <div className=" flex justify-center items-center absolute bottom-0 w-[175px] h-[40px] bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD] rounded-[20px] ">
                      <div className=" mt-1">
                        <Image preview={false} src="/img/timer.svg" />
                      </div>
                      <div className=" ml-[10px] text-white">
                        {item.created_date.slice(0, 10)}
                      </div>
                    </div>
                  </div>
                  <div className=" text-[#2F3747] text-[18px] font-bold w-[322px] dark:text-white mt-[24px]">
                    {item.title}
                  </div>
                  <div className=" text-[#2F3747] text-[16px] w-[322px] mt-[16px] opacity-60 dark:text-white">
                    {item.content_less}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className=" dark:bg-[#08194B]">
        <div className=" w-full flex justify-center pt-[100px] pb-[100px]">
          <div className=" dark:bg-[#101C66] h-[600px] md:h-auto max-w-[1150px] flex flex-col md:flex-row xl:flex-row md:justify-around md:w-[90vw] xl:w-[65vw] w-full xl:h-[228px] items-center bg-[#2E28D4]  bg-opacity-5 xl:items-center lg:items-start justify-around">
            <div className=" flex justify-center">
              <div>
                <div className=" text-[48px] text-[#F01A63] font-bold dark:text-white">
                  5000+
                </div>
                <div className=" text-[16px] text-[#9CA6C0] w-[140px] text-center">
                  Жилд хандсан хүний тоо
                </div>
              </div>
            </div>
            <div className=" bg-[#9CA6C0] w-[1px] h-[80px] bg-opacity-30"></div>
            <div className=" flex justify-center">
              <div>
                <div className=" text-[48px] text-[#2E28D4] font-bold dark:text-white">
                  1200+
                </div>
                <div className=" text-[16px] text-[#9CA6C0] w-[140px] text-center">
                  Улиралд хандсан хүний тоо
                </div>
              </div>
            </div>
            <div className=" bg-[#9CA6C0] w-[1px] h-[80px] bg-opacity-30"></div>
            <div className="">
              <div className=" text-[48px] text-[#AC27FD] font-bold dark:text-white">
                400+
              </div>
              <div className=" text-[16px] text-[#9CA6C0] w-[140px] text-center ">
                Сард хандсан хүний тоо
              </div>
            </div>
            <div className=" bg-[#9CA6C0] w-[1px] h-[80px] bg-opacity-30"></div>
            <div>
              <div className=" text-[48px] text-[#011F70] font-bold dark:text-white">
                13+
              </div>
              <div className=" text-[16px] text-[#9CA6C0] w-[140px] text-center">
                Өдөрт хандсан хүний тоо
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" w-full">
        <div className="tursh  w-full  ">
          <div className="flex flex-col justify-center dark:bg-[#172757]  md:flex-row">
            <div className="relative">
              <div className="h-full w-full absolute z-10 flex flex-col  items-center justify-center left-100px ">
                <div className=" z-10 mt-[5vh] lg:mt-0 ml-[17vw] lg:ml-0">
                  <Carousel
                    autoplay
                    dots={false}
                    className=" w-[353px] md:w-[400px] overflow-hidden"
                  >
                    <div className=" w-[300px] md:w-[370px] mt-[80px]">
                      <div style={contentStyle} className="flex flex-col   ">
                        <div className=" flex flex-col justify-start w-[300px]  lg:w-[400px] ">
                          <div className="">Quotes</div>

                          <div>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Bibendum eget vitae elementum condimentum est
                            non faucibus.
                          </div>
                        </div>
                        <div className=" flex justify-start mt-[40px] items-center">
                          <div>
                            <Image preview={false} src="/img/q1.png" />
                          </div>
                          <div className=" flex flex-col ml-2">
                            <div>Cameron Williamson</div>
                            <div>Designer</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className=" w-[300px] md:w-[370px] mt-[80px]">
                      <div style={contentStyle} className="flex flex-col   ">
                        <div className=" flex flex-col justify-start w-[300px]  lg:w-[400px]">
                          <div className="">Quotes</div>

                          <div>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Bibendum eget vitae elementum condimentum est
                            non faucibus.
                          </div>
                        </div>
                        <div className=" flex justify-start mt-[40px] items-center">
                          <div>
                            <Image preview={false} src="/img/q1.png" />
                          </div>
                          <div className=" flex flex-col ml-2">
                            <div>Cameron Williamson</div>
                            <div>Designer</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className=" w-[300px] md:w-[370px] mt-[80px] ">
                      <div style={contentStyle} className="flex flex-col   ">
                        <div className=" flex flex-col justify-start w-[300px]  lg:w-[400px] ">
                          <div className=" ">Quotes</div>

                          <div>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Bibendum eget vitae elementum condimentum est
                            non faucibus.
                          </div>
                        </div>
                        <div className=" flex justify-start mt-[40px] items-center">
                          <div>
                            <Image preview={false} src="/img/q1.png" />
                          </div>
                          <div className=" flex flex-col ml-2">
                            <div>Cameron Williamson</div>
                            <div>Designer</div>
                          </div>
                        </div>
                      </div>
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
      <div>
        <Footer />
      </div>
      <Modal
        className="demoModal"
        visible={demoModal}
        onCancel={handleCancel}
        footer={[]}
      >
        <div className="">
          {darkMode == "dark" ? (
            <Image preview={false} src="/img/Logo2.svg" />
          ) : (
            <Image preview={false} src="/img/logo.png" />
          )}
          <div className="  mt-[20px] text-[24px] font-semibold text-transparent bg-clip-text bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD]  dark:text-white ">
            Instant access
          </div>
          <div className=" mt-[30px]">
            <Form
              name="basic"
              // labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              onFinish={onFinishDemo}
              autoComplete="off"
            >
              <div className=" grid grid-cols-1 lg:grid-cols-2  gap-x-10  ">
                <div>
                  <Form.Item
                    name="surname"
                    rules={[
                      {
                        required: true,
                        message: "Хэрэглэгчийн овог оруулна уу!",
                      },
                    ]}
                  >
                    <Input
                      maxLength={30}
                      className=" lg:w-[440px] h-[3rem] rounded-[41px] dark:text-white"
                      id="normal_signup_name"
                      placeholder="Овог*"
                    />
                  </Form.Item>
                </div>

                <div>
                  <Form.Item
                    name="firstname"
                    rules={[
                      {
                        required: true,
                        message: "Хэрэглэгчийн нэр оруулна уу!",
                      },
                    ]}
                  >
                    <Input
                      className=" lg:w-[440px] h-[3rem] rounded-[41px] dark:text-white"
                      maxLength={30}
                      id="normal_signup_name"
                      placeholder="Нэр*"
                    />
                  </Form.Item>
                </div>
                <div>
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Хэрэглэгчийн email оруулна уу!",
                      },
                    ]}
                  >
                    <Input
                      className=" lg:w-[440px] h-[3rem] rounded-[41px] dark:text-white"
                      id="normal_signup_name"
                      placeholder="И-мэйл*"
                    />
                  </Form.Item>
                </div>

                <div>
                  <Form.Item
                    name="phone"
                    rules={[
                      {
                        required: true,
                        message: "Хэрэглэгчийн утас оруулна уу!",
                      },
                    ]}
                  >
                    <MaskedInput
                      mask="11111111"
                      className=" lg:w-[440px] h-[3rem] rounded-[41px] dark:text-white"
                      id="normal_signup_name"
                      placeholder="Утасны дугаар*"
                    />
                  </Form.Item>
                </div>
                <div>
                  <Form.Item
                    name="company"
                    rules={[
                      {
                        required: true,
                        message: "Байгууллагын нэр оруулна уу!",
                      },
                    ]}
                  >
                    <Input
                      className=" lg:w-[440px] h-[3rem] rounded-[41px] dark:text-white"
                      id="normal_signup_name"
                      maxLength={50}
                      placeholder="Байгууллагын нэр*"
                    />
                  </Form.Item>
                </div>

                <div>
                  <Form.Item
                    name="company_register"
                    rules={[
                      {
                        required: true,
                        message: "Байгууллагын регистэр оруулна уу!",
                      },
                    ]}
                  >
                    <MaskedInput
                      mask="1111111"
                      className=" lg:w-[440px] h-[3rem] rounded-[41px] dark:text-white"
                      id="normal_signup_name"
                      placeholder="Байгууллагын регистэр*"
                    />
                  </Form.Item>
                </div>
                <div className="">
                  <Form.Item
                    name="country"
                    rules={[
                      {
                        required: true,
                        message: "Улсаа сонгоно уу!",
                      },
                    ]}
                  >
                    <Select
                      className="demoldoo lg:w-[440px] dark:text-white"
                      placeholder="Улс сонгох"
                      allowClear
                    >
                      {country?.map((item, index) => {
                        return (
                          <Option key={index} value={item.code}>
                            {item.name}
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </div>
                <div className="">
                  <Form.Item
                    name="language"
                    rules={[
                      {
                        required: true,
                        message: "Хэрэглэгчийн нэрээ оруулна уу!",
                      },
                    ]}
                  >
                    <Select
                      className="demoldoo lg:w-[440px] dark:text-white"
                      placeholder="Хэл сонгох"
                    >
                      {lang?.map((item, index) => {
                        return <Option value={item.code}>{item.name}</Option>;
                      })}
                    </Select>
                  </Form.Item>
                </div>
                <Form.Item className=" lg:w-[910px]" name="description">
                  <TextArea
                    className=" h-[120px] rounded-[8px] dark:text-white"
                    placeholder="Зарцуулалтын шалтгаан"
                  />
                </Form.Item>
              </div>
              <div className=" flex justify-between">
                <div>
                  <Form.Item name="agreement">
                    <Checkbox className=" dark:text-[#9CA6C0]">
                      Хүлээн зөвшөөрч байна
                    </Checkbox>
                  </Form.Item>
                </div>
                <div className=" text-[blue] cursor-pointer dark:text-[#3C8CE7]">
                  Гэрээг харах
                </div>
              </div>
              <Form.Item name="remember">
                <div className=" flex justify-center">
                  <Button
                    style={{
                      backgroundImage:
                        "linear-gradient(45deg, #2E28D4, #AC27FD)",
                    }}
                    className=" dark:text-black dark:bg-gradient-to-br from-[#3C8CE7] to-[#00EAFF]  text-[14px] font-bold w-[200px] h-[48px] text-white rounded-[43px]  border-none"
                    type="primary"
                    htmlType="submit"
                  >
                    Илгээх
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Modal>
    </div>
  );
}
