import React, { useState, useEffect, useContext } from "react";
import { Image } from "antd";
import NavbarTrans from "../../components/NavbarTrans";
import Footer from "../../components/Footer";
import NewsUp from "../../components/NewsUp";
import NewsDown from "../../components/NewsDown";
import axios from "axios";
import { useRouter } from "next/router";
import Auth from "../../utils/auth";
import Context from "../../context/Context";
import Head from "next/head";

const News = () => {
  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_URL;
  const [news, setNews] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [page, setPage] = useState(0);
  const { setIsLoading } = useContext(Context);

  const onDetail = (id) => {
    id &&
      router.push({
        pathname: `news/${id}`,
        query: {
          id: id,
        },
      });
  };

  const onBefore = () => {
    if (currentPage != 1) {
      setCurrentPage(currentPage - 1);
      setPage(page - 1);
    }
  };
  const onNext = () => {
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1);
      setPage(page + 1);
    }
  };

  useEffect(async () => {
    setIsLoading(true);
    const res = await axios.post(
      baseUrl + "get/news/less",
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
    setIsLoading(false);
    console.log(res, "medee");
    setNews(res?.data?.result);
  }, []);
  useEffect(() => {
    //  if(news % 10 > 0){

    //  }
    setTotalPage(Math.ceil(news?.length / 10));
  }, [news]);
  return (
    <div>
      <Head>
        <title>iFinance | Мэдээ </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className=" xl:fixed z-30 h-[100px] flex  overflow-hidden ">
        <div className="absolute z-30  flex flex-col w-full ">
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
      <div className="  relative ">
        <div className=" flex justify-center">
          <div className="xl:absolute z-20   flex flex-col  md:h-[200px] 2xl:h-[260px] mt-[20px] lg:mt-[90px] ml-[2vw] w-[1200px]  ">
            <div className=" mt-[20px]    lg:flex justify-between w-[300px] hidden">
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
            </div>
            <div className=" text-center  text-[#2E28D4]  my-auto font-poppins-semibold uppercase xl:flex  items-center xl:text-white  text-[36px] font-semibold">
              Мэдээ мэдээлэл
            </div>
          </div>
        </div>
        <Image
          className=" hidden lg:flex w-[100vw] mt-[100px]"
          preview={false}
          src="/img/dashboard.svg"
        />
      </div>

      <div className=" flex mx-auto  lg:w-[1245px]">
        <div className="  grid lg:grid-cols-2 gap-[30px]  grid-cols-1 ">
          {news?.slice(page * 10, page * 10 + 10)?.map((item, index) => {
            if (index % 2 == 0) {
              return (
                <div onClick={() => onDetail(item.news_id)}>
                  <NewsUp item={item} />
                </div>
              );
            }

            return (
              <div onClick={() => onDetail(item.news_id)}>
                <NewsDown item={item} />
              </div>
            );
          })}
        </div>
      </div>
      <div className=" flex justify-center mb-[100px]">
        <div className=" flex justify-center lg:justify-end  lg:w-[1245px]">
          <div className=" flex items-center  w-[250px] justify-between">
            <div className=" text-[#9CA6C0] text-[18px]  font-bold">
              {"0" + currentPage}
            </div>
            <div className=" w-[80px] h-[2px] bg-[#9CA6C0]"></div>
            <div className=" text-[#9CA6C0] text-[18px]  font-bold">
              {"0" + totalPage}
            </div>
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
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default News;
