import React from "react";
import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import Auth from "../../utils/auth";
import axios from "axios";
import Context from "../../context/Context";
import Navbar from "../../components/Navbar/navbar";
import Footer from "../../components/Footer";
import { Tabs, Image, Button } from "antd";
import parse from "html-react-parser";
import Head from 'next/head';

const CategoryId = () => {
  const router = useRouter();

  const { id } = router.query;
  const { sessionId } = useContext(Context);
  const { TabPane } = Tabs;
  const baseUrl = process.env.NEXT_PUBLIC_URL;
  const baseDB = process.env.NEXT_PUBLIC_DB;

  const [mainProduct, setMainProduct] = useState();
  const [additionalProduct, setAdditionalProduct] = useState();
  const [categoryName, setCategoryName] = useState();
  const [images, setImages] = useState();
  const [angilal, setAngilal] = useState(false);

  const onCart = async (id) =>{
    const res = await axios.post(
      baseUrl + "add/cart_list",
      {
        jsonrpc: 2.0,
        params: {
          db: baseDB,
          uid: Auth.getUserId(),
          product_id: id,
        },
      },

      {
        headers: {
          "Set-Cookie": "session_id=" + sessionId,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res, "sagsand nemeh res");
  }

  const fetchData = async () => {
    const res = await axios.post(
      baseUrl + "get/product_list_by_category",
      {
        jsonrpc: 2.0,
        params: {
          db: baseDB,
          category_id: id,
        },
      },

      {
        headers: {
          "Set-Cookie": "session_id=" + sessionId,
          "Content-Type": "application/json",
        },
      }
    )
    res.data.result && setMainProduct(res.data.result.main_products),
    res.data.result && setAdditionalProduct(res.data.result.additional_products),
    res.data.result && setCategoryName(res.data.result.main_products[0].product_category),
    console.log(res.data.result.main_products[0].product_category, sessionId, "medeenuud")

    // const res2 = await axios.get(
    //    "http://192.168.0.143/web/image/576/accounting 1.png",
    //   {
    //     jsonrpc: 2.0,
    //     // params: {
    //     //   db: baseDB,
    //     // },
    //   },

    //   {
    //     headers: {
    //       "Set-Cookie": "session_id=" + sessionId,
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );
    // console.log(res2, "zurag")
  };
  // fetchData();

  const onDetails = (id) => {
    id &&
      router.push({
        pathname: `/pricing/${id}`,
        query: {
          id: id,
        },
      });
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <div>
        <Head>
        <title>iFinance | Танилцуулга</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Navbar />
      <div className="  relative w-[vw]">
        <div className="xl:absolute z-20 flex flex-col w-full h-full justify-center text-center">
          <div className="  xl:pl-[375px] text-[#2E28D4]  my-auto font-poppins-semibold uppercase xl:flex  items-center xl:text-white h-2/3 text-[36px] font-semibold">
            { categoryName }
          </div>
        </div>
        <Image
          className=" hidden xl:flex w-[100vw]"
          preview={false}
          src="/img/dashboard.svg"
        />
      </div>
      <div className=" xl:pl-[375px] z-10  mb-[11.813rem]">
        <Tabs defaultActiveKey="1" className="">
          <TabPane className="mainTab" tab="Үндсэн модуль" key="1">
            <div className=" mt-[80px]">
              <div className="hidden bg-gradient-to-tr from-[#2E28D4] xl:ml-[5px] to-[#AC27FD] w-[375px] h-[48px] xl:flex items-center rounded-t-xl">
                <p className=" pl-[24px] text-[18px] pt-[12px] text-white mb-2">
                  Ангилал
                </p>
              </div>
              <div className="hidden xl:flex">
                <Tabs className="module" tabPosition="left">
                  {mainProduct &&
                    mainProduct.map((item, index) => {
                      // var content = "dsadas";
                      // var urlRegex =/(g;
                      var content = item.product_description.toString().replace( "/web", 'https://test.ifinance.mn/web');
                    
                      // console.log(content, "contentteee");
                      return (
                        <TabPane
                          className="test"
                          tab={
                            <div className="flex items-center  ">
                              {
                                <Image
                                  className=""
                                  preview={false}
                                  width="48px"
                                  height="48px"
                                  src={
                                    "data:image/png;base64," + item.product_icon
                                  }
                                />
                              }
                              <div className="ml-[22px]" style={{ fontSize: "12px" }}>
                                {item.product_name}
                              </div>
                            </div>
                          }
                          key={index}
                        >
                          <div className="xl:w-[770px] mr-6 xl:mr-0 shadow-custom rounded mb-[40px] mt-[10px] p-[30px] ">
                            {/* <div>
                              {item.product_images && (
                                <Image
                                  preview={false}
                                  src={
                                    "data:image/png;base64," +
                                    item.product_images[2]
                                  }
                                />
                              )}
                            </div> */}
                          {/* <img src="https://test.ifinance.mn/web/image/605/260420641_4476133815838329_6902069086329202614_n.jpeg" /> */}
                            <p>{parse(content)} </p>
                            {/* <Image alt="tst" src="https://test.ifinance.mn/web/image/605/.jpg" /> */}
                            <div className="flex">
                              {/* {item.product_images[0] ? (
                                <div>
                                  <Image
                                    preview={false}
                                    src={
                                      "data:image/png;base64," +
                                      item.product_images[0]
                                    }
                                  />
                                </div>
                              ) : null} */}
                              {/* {item.product_images[1] ? (
                                <div>
                                  <Image
                                    preview={false}
                                    src={
                                      "data:image/png;base64," +
                                      item.product_images[1]
                                    }
                                  />
                                </div>
                              ) : null} */}
                            </div>
                            <div className=" mt-2 flex justify-center">
                              <div className="  w-[500px] flex flex-col md:flex-row justify-between">
                              <Button
                                onClick={() => onCart(item.product_id)}
                                type="primary"
                                className=" w-[236px] h-[48px] rounded-[43px] bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD] border-none text-[14px] font-bold"
                              >
                                Сагсанд нэмэх
                              </Button>
                              <Button
                                onClick={() => onDetails(id)}
                                type="primary"
                                className=" w-[236px] h-[48px] rounded-[43px] bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD] border-none text-[14px] font-bold"
                              >
                                Худалдан авах
                              </Button>
                             </div>
                            </div>
                          </div>
                        </TabPane>
                      );
                    })}
                </Tabs>
              </div>
              <div className=" xl:hidden">
                <Tabs className="module" tabPosition="top">
                  {mainProduct &&
                    mainProduct.map((item, index) => {
                      return (
                        <TabPane
                          className="test"
                          tab={
                            <div className="flex items-center  ">
                              {
                                <Image
                                  className=""
                                  preview={false}
                                  width="48px"
                                  height="48px"
                                  src={
                                    "data:image/png;base64," + item.product_icon
                                  }
                                />
                              }
                              <div className="ml-[22px]" style={{ fontSize: "12px" }}>
                                {item.product_name}
                              </div>
                            </div>
                          }
                          key={index}
                        >
                          <div className=" text-justify xl:w-[770px] mr-6 xl:mr-0 shadow-custom rounded mb-[40px] mt-[10px] p-[30px] ">
                        
                            <p> {item.product_description} </p>
                            <div className="flex">
                           
                            </div>
                            <div className=" mt-2 flex justify-center">
                              <Button
                                onClick={() => onDetails(id)}
                                type="primary"
                                className=" w-[236px] h-[48px] rounded-[43px] bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD] border-none text-[14px] font-bold"
                              >
                                Үйлчилгээтэй танилцах
                              </Button>
                            </div>
                          </div>
                        </TabPane>
                      );
                    })}
                </Tabs>
              </div>
            </div>
          </TabPane>
          <TabPane className="mainTab" tab="Нэмэлт модуль" key="2">
          <div className=" mt-[80px]">
              <div className="hidden bg-gradient-to-tr from-[#2E28D4] xl:ml-[5px] to-[#AC27FD] w-[375px] h-[48px] xl:flex items-center  rounded-t-xl ">
                <p className=" pl-[24px] text-[18px] pt-[12px] text-white mb-2">
                  Ангилал
                </p>
              </div>
              <div className="hidden xl:flex">
                <Tabs className="module" tabPosition="left">
                  {additionalProduct &&
                    additionalProduct.map((item, index) => {
                    
                      var content = item.product_description.toString().replace( "/web", 'https://test.ifinance.mn/web');
                    
                     
                      return (
                        <TabPane
                          className="test"
                          tab={
                            <div className="flex items-center  ">
                              {
                                <Image
                                  className=""
                                  preview={false}
                                  width="48px"
                                  height="48px"
                                  src={
                                    "data:image/png;base64," + item.product_icon
                                  }
                                />
                              }
                              <div className="ml-[22px]" style={{ fontSize: "12px" }}>
                                {item.product_name}
                              </div>
                            </div>
                          }
                          key={index}
                        >
                          <div className="xl:w-[770px] mr-6 xl:mr-0 shadow-custom rounded mb-[40px] mt-[10px] p-[30px] ">
                         
                          {/* <img src="https://test.ifinance.mn/web/image/605/260420641_4476133815838329_6902069086329202614_n.jpeg" /> */}
                            <p>{parse(content)} </p>
                            {/* <Image alt="tst" src="https://test.ifinance.mn/web/image/605/.jpg" /> */}
                            <div className="flex">
                             
                            </div>
                            <div className=" mt-2 flex justify-center">
                              {/* <Button
                                onClick={() => onDetails(id)}
                                type="primary"
                                className=" w-[236px] h-[48px] rounded-[43px] bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD] border-none text-[14px] font-bold"
                              >
                                Үйлчилгээтэй танилцах
                              </Button> */}
                              
                              <div className="  w-[500px] flex flex-col md:flex-row justify-between">
                                <Button
                                  onClick={() => onCart(item.product_id)}
                                  type="primary"
                                  className=" w-[236px] h-[48px] rounded-[43px] bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD] border-none text-[14px] font-bold"
                                >
                                  Сагсанд нэмэх
                                </Button>
                                <Button
                                  onClick={() => onDetails(id)}
                                  type="primary"
                                  className=" w-[236px] h-[48px] rounded-[43px] bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD] border-none text-[14px] font-bold"
                                >
                                  Худалдан авах
                                </Button>
                             </div>
                            </div>
                          </div>
                        </TabPane>
                      );
                    })}
                </Tabs>
              </div>
              <div className=" xl:hidden">
                <Tabs className="module" tabPosition="top">
                  {mainProduct &&
                    mainProduct.map((item, index) => {
                      return (
                        <TabPane
                          className="test"
                          tab={
                            <div className="flex items-center  ">
                              {
                                <Image
                                  className=""
                                  preview={false}
                                  width="48px"
                                  height="48px"
                                  src={
                                    "data:image/png;base64," + item.product_icon
                                  }
                                />
                              }
                              <div className="ml-[22px]" style={{ fontSize: "12px" }}>
                                {item.product_name}
                              </div>
                            </div>
                          }
                          key={index}
                        >
                          <div className=" text-justify xl:w-[770px] mr-6 xl:mr-0 shadow-custom rounded mb-[40px] mt-[10px] p-[30px] ">
                        
                            <p> {item.product_description} </p>
                            <div className="flex">
                           
                            </div>
                            <div className=" mt-2 flex justify-center">
                              <Button
                                onClick={() => onDetails(id)}
                                type="primary"
                                className=" w-[236px] h-[48px] rounded-[43px] bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD] border-none text-[14px] font-bold"
                              >
                                Үйлчилгээтэй танилцах
                              </Button>
                            </div>
                          </div>
                        </TabPane>
                      );
                    })}
                </Tabs>
              </div>
            </div>
          </TabPane>
        </Tabs>
      </div>
      <div className="">
      <Footer />
      </div>
    </div>
  );
};

export default CategoryId;
