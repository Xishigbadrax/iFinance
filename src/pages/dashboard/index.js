import React, { useState, useEffect, useContext } from "react";
import NavbarTrans from "../../components/NavbarTrans";
import Router from "next/router";
import Auth from "../../utils/auth";
import { Image, Collapse, Button } from "antd";
import axios from "axios";
import Context from "../../context/Context";
import Footer from "../../components/Footer";
import { useRouter } from "next/router";

const Dashboard = () => {
  const { Panel } = Collapse;
  const router = useRouter();
  const [sid, setSid] = useState();
  const [list, setList] = useState([]);
  const [bgHover, setBgHover] = useState(false);
  const [serverType, setServerType] = useState([]);
  const baseUrl = process.env.NEXT_PUBLIC_URL;
  const baseDB = process.env.NEXT_PUBLIC_DB;
  // console.log(baseUrl + "get/category_list", "baseurl");
  useEffect(async () => {
    // console.log(Auth.getToken(), "siddd");
    setSid(Auth.getToken());
    // Auth.getToken() == null || Auth.getToken() == undefined
    //   ? Router.push("/")
    //   : null;

    const res = await axios.post(
      baseUrl + "get/category_list",
      {
        jsonrpc: 2.0,
        params: {
          db: baseDB,
        },
      },

      {
        headers: {
          "Set-Cookie": "session_id=" + sid,
          "Content-Type": "application/json",
        },
      }
    );
    setList(res.data.result);
    console.log(res, "ehnii");

    
    // console.log(res, "listtttt");
  }, []);

  const onCategory = (id) => {
    id &&
      router.push({
        pathname: `dashboard/${id}`,
        query: {
          id: id,
        },
      });
  };
  // console.log(list, "odooo");

  return (
    <div className="">
      {/* <div className=" relative w-full">
        <img className=" absolute w-full h-auto z-[-1]" src="/img/Slider.svg" /> */}
      {/* </div> */}

      <div className="relative w-full ">
        <div className="absolute z-20 flex flex-col w-full h-full">
          <div className="w-full flex justify-center mb-2 ">
            <NavbarTrans  />
          </div>
          
          <div className=" hidden  my-auto font-poppins-semibold uppercase xl:flex justify-center items-center text-white h-2/3 text-[36px] font-semibold">
            Манай бүтээгдэхүүн
          </div>
        </div>
        <Image className=" w-full  h-auto " preview={false} src="/img/Slider.svg" />
      </div>

      <div className=" w-full flex justify-center mt-10 z-[-1]">
        <div className=" grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 xl:grid-cols-4 xl:gap-4 ">
          {list &&
            list.map((item, index) => {
              var a = 0;
              return (
                <div
                  key={index}
                  onClick={() => onCategory(item.category_id)}
                  
                  className=" relative flex flex-col justify-center items-center w-[16.875rem] h-[16rem] border-[1px] hover:bg-gradient-to-tr hover: from-[#011F70] to-[#AC27FD]  text-[24px] hover:text-white font-semibold rounded-[4px] cursor-pointer text-[#2E28D4] border-[#2E28D4] "
                >
                  <div className=" absolute z-60 bottom-[0rem] right-[1rem] text-[#AC27FD]  text-[120px] text-opacity-5">
                    {Number(index) + 1}
                  </div>
                  <div className=" bg-white h-[100px] w-[100px] flex justify-center items-center rounded-[50px]">
                  <Image
                    preview={false}
                    className=" "
                    src={"data:image/png;base64," + item.category_image}
                  />
                  </div>
                  <div className=" w-full flex justify-center items-center ">
                    <div className=" flex justify-center items-center text-center  ">
                      {item.category_name}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <div className="flex justify-center">
        <p className=" text-[24px] font-semibold mt-[6.25rem]">
          Сервер байршуулах сонголт
        </p>
      </div>

      <div className=" w-full flex flex-col justify-center px-4">
        <div className=" flex justify-center">
          <Collapse
            accordion
            expandIconPosition="right"
            className=" w-[73.125rem] bg-white  border-[#2E28D4]  mb-2"
          >
            <Panel header="АйТүүлс ХХК" key="1">
              <p className=" text-[14px] text-[#9CA6C0]">
                Сервер байршуулах үйлчилгээ нь дата төвийн үндсэн үйлчилгээнии
                нэг бөгөөд хэрэглэгчийн бодит сервер төхөөрөмжийг олон улсын
                стандартад нийцсэн байр талбай, орчин, сүлжээ, цахилгаан тэжээл,
                тэдгээрийн нөөц холболт, тасралтгүй ажиллагаагаар хангах
                үйлчилгээ юм. Хэрэв та онлайн системд шаардлагатай сервер, тоног
                төхөөрөмжөө аль хэдийнээ худалдан авсан, дэлхийн стандартад
                нийцсэн орчин, хязгааргүй хурдны интернет холболт бүхий хямд
                төлбөртэй дата төв хайж байгаа бол энэхүү үйлчилгээ танд
                тохирно.
              </p>
              <div className=" flex justify-center">
                <Button
                  className=" w-[14.75rem] h-[3rem] rounded-[43px] bg-gradient-to-r from-[#2E28D4] to-[#AC27FD] font-bold text-[14px]"
                  type="primary f"
                >
                  Үйлчилгээтэй танилцах
                </Button>
              </div>
            </Panel>
          </Collapse>
        </div>
        <div className=" flex justify-center">
          <Collapse
            accordion
            expandIconPosition="right"
            className=" w-[73.125rem] bg-white  border-[#2E28D4]  mb-2"
          >
            <Panel header="АйКлауд.мн" key="1">
              <p className=" font-semibold text-[16px]">SAAS гэж юу вэ ?</p>
              <p className=" text-[14px] text-[#9CA6C0]">
                Software as a Service (SaaS) нь Клауд дэд бүтэц дээр ажиллаж буй
                бэлэн лицензтэй систем/програм бөгөөд хэрэглэгчид сар болон
                жилээр subscription хэлбэрээр төлбөр төлөн хэрэглэх боломжтой.
                Хэрэглэгчид програм хангамжийн архитектур, програм хангамжийн
                засвар үйлчилгээ, суурь дэд бүтцийг хянах, удирдах шаардлагагүй
                бөгөөд зөвхөн вэбсайтаар хандан клауд дэд бүтэцтэй бэлэн
                програмыг хэрэглэнэ гэсэн үг. Жишээлбэл, таны SaaS аппликейшний
                Ази, Европ дахь хэрэглэгчдийн тоо огцом өсч байгаа тохиолдолд
                эрэлтдээ тохируулан нөөц, хүчин чадлаа бүрэн нэмэх боломжтой.
              </p>
              <div className=" flex justify-center">
                <Button
                  className=" w-[14.75rem] h-[3rem] rounded-[43px] bg-gradient-to-r from-[#2E28D4] to-[#AC27FD] font-bold text-[14px]"
                  type="primary f"
                >
                  Үйлчилгээтэй танилцах
                </Button>
              </div>
            </Panel>
          </Collapse>
        </div>
        
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
