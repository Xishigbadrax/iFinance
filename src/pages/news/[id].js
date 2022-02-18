import React, { useEffect, useState, useContext } from "react";
import NavbarTrans from "../../components/NavbarTrans";
import Footer from "../../components/Footer";
import { Image } from "antd";
import { useRouter } from "next/router";
import Auth from "../../utils/auth";
import axios from "axios";
import Slider from "react-slick";
import Context from "../../context/Context";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import Head from "next/head";

const NewsId = () => {
  const router = useRouter();
  const { id } = router.query;
  const baseUrl = process.env.NEXT_PUBLIC_URL;
  const [data, setData] = useState();
  const [more, setMore] = useState();
  const [subId, setSubId] = useState(null);
  const [special, setSpecial] = useState();
  const [newsUri, setnewsUri] = useState();
  const [newsTitle, setnewsTitle] = useState();
  const [newsDesc, setnewsDesc] = useState();
  const [newsImg, setnewsImg] = useState();

  // console.log(id, "idii");
  const { setIsLoading } = useContext(Context);

  const settings = {
    arrows: true,
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
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
  const onDetail = (id) => {
    id &&
      router.push({
        pathname: `news/${id}`,
        query: {
          id: id,
        },
      });
  };

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
    setIsLoading(false);
    setData(res?.data?.result?.single[0]);
    setMore(res?.data?.result?.more);
    setSpecial(res?.data?.result?.special);
    console.log(res, "detail medee");
  }, [id]);
  useEffect(() => {
    console.log(window.location.href, "Zzzz");
    setnewsUri(window.location.href);
    console.log(data?.title, "rere");
    setnewsTitle(data?.title);
    // setnewsDesc(data?.content_more);
    setnewsImg("data:image/png;base64," + data?.news_image);
  }, [data]);
  return (
    <div>
      <Head>
        {/* <meta property="og:description" content={newsDesc} /> */}
        <title>iFinance | Мэдээ мэдээлэл</title>
        {/* <meta property="og:url" content={newsUri} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={newsTitle} />
      <meta property="og:image" content={newsImg} /> */}
        <meta property="fb:app_id" content="516247196361202" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={newsTitle} />
        <meta
          property="og:description"
          content="Аливаа байгууллагын хувьд эрхэлж буй бизнесээ хянаж тогтвортой гүйцэтгэл, өсөлттэй байлгахын тулд нягтлан бодох бүртгэл, санхүүгийн удирдлагын шилдэг программ хангамжийн шийдэл хамгийн чухалд тооцогддог. Тиймээс аж ахуй нэгж, бизнесийн байгууллагууд санхүүгийн цогц шийдлийг нэг дор шингээсэн, үүлэн технологид суурилсан системийг /Saas ERP/ үйл ажиллагаандаа нэвтрүүлж нөөцийг оновчтой хуваарилж, зардлыг бууруулж, үр ашигтай ажиллахад чиглэсэн шийдэлд [&hellip;]"
        />
        <meta property="og:url" content="https://www.ictgroup.mn/1227/" />
        <meta property="og:site_name" content="АйСиТи групп" />
        <meta
          property="article:publisher"
          content="https://www.facebook.com/ictgroupmongolia"
        />
        <meta
          property="article:published_time"
          content="2022-02-12T08:56:40+00:00"
        />
        <meta
          property="article:modified_time"
          content="2022-02-12T09:00:01+00:00"
        />
        <meta
          property="og:image"
          content="https://www.ictgroup.mn/wp-content/uploads/2022/02/272381896_669970770707619_8650509537384539062_n.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="628" />
        <meta property="og:image:type" content="image/png" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <div className=" xl:fixed z-30 h-[100px] flex  overflow-hidden ">
        <div className="absolute z-30  flex flex-col w-full ">
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
      <div className="  relative  ">
        <div className=" flex justify-center ">
          <div className="xl:absolute z-20   flex flex-col  md:h-[200px] 2xl:h-[260px] xl:mt-[90px]  ml-[2vw] w-[1200px]  ">
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
            <div className=" hidden text-center  text-[#2E28D4]  my-auto font-poppins-semibold uppercase xl:flex  items-center xl:text-white  text-[36px] font-semibold">
              Мэдээ мэдээлэл
            </div>
          </div>
        </div>
        <div className=" hidden   xl:flex  h-[348px] overflow-hidden">
          <Image
            className="w-[100vw] mt-[100px]"
            preview={false}
            src="/img/dashboard.svg"
          />
        </div>
      </div>
      <div className=" flex justify-center mt-[20px]  lg:mt-[80px] mb-[20px]">
        <div className="flex flex-col lg:flex-row w-[1170px] justify-between">
          <div
            className=" 2xl:w-[770px]  shadow-md
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
              {more?.map((item, index) => {
                return (
                  <Link
                    href={`/news/${item.news_id}?id=${item.news_id}`}
                    key={{ index }}
                  >
                    <div
                      id={index}
                      className=" cursor-pointer w-full h-[168px] flex justify-center mt-[30px] shadow-md "
                    >
                      <div className=" flex w-[338px] justify-between">
                        <div className="">
                          <Image
                            preview={false}
                            className=" object-cover w-[100px] h-[133px]"
                            src={"data:image/png;base64," + item.news_image}
                          />
                        </div>
                        <div className=" w-[220px] h-[150px]  overflow-hidden ">
                          <div className=" text-[#2F3747] text-[16px] font-semibold">
                            {item.title}
                          </div>
                          <div className=" text-[#2F3747] text-[16px]   overflow-hidden">
                            {item.content_less}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className=" w-full bg-[#9CA6C0] bg-opacity-10 flex justify-center">
        <div className=" max-w-[1326px] lg:w-[1170px]  w-[300px]">
          <div className=" text-[24px] text-[#2F3747] font-bold pt-[80px]">
            Онцлох мэдээ
          </div>
          <div className=" mt-[40px] pb-[100px] ">
            <Slider className=" " {...settings}>
              {special?.map((item, index) => {
                return (
                  <Link
                    href={`/news/${item.news_id}?id=${item.news_id}`}
                    key={{ index }}
                  >
                    <div className="  bg-white shadow-md pb-2  2xl:w-[370px] lg:w-[300px] cursor-pointer ">
                      <div className=" w-full ">
                        <Image
                          height={230}
                          preview={false}
                          src={"data:image/png;base64," + item?.news_image}
                        />
                      </div>
                      <div className=" m-[20px]">
                        <div className=" flex justify-between ">
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
                              {/* {"5465465"} */}
                              {item?.created_date.slice(11, 16)}
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
                              {/* {"84465 "} */}
                              {item?.created_date.slice(0, 10)}
                            </div>
                          </div>
                        </div>
                        <div className=" text-[#151515] text-[18px] font-bold my-[14px]">
                          {item.title}
                        </div>
                        <div className=" text-[#666666] text-[16px] opacity-60 ">
                          {item.content_less}
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </Slider>
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
