import React from "react";
import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import Auth from "../../utils/auth";
import axios from "axios";
import Context from "../../context/Context";
import Navbar from "../../components/Navbar/navbar";
import Footer from "../../components/Footer";
import { Tabs, Image, Button } from "antd";

const CategoryId = () => {
  const router = useRouter();
  const { id } = router.query;
  const { sessionId } = useContext(Context);
  const { TabPane } = Tabs;
  const baseUrl = process.env.NEXT_PUBLIC_URL;
  const baseDB = process.env.NEXT_PUBLIC_DB;

  const [mainProduct, setMainProduct] = useState();
  const [images, setImages] = useState();
  const [angilal, setAngilal] = useState(false);

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
    );

    res.data && setMainProduct(res.data.result.main_products);
    console.log(res, sessionId, "medeenuud");
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
      <Navbar />
      <div className="  relative w-[vw]">
        <div className="xl:absolute z-20 flex flex-col w-full h-full justify-center text-center">
          
          <div className="  xl:pl-[375px] text-[#2E28D4]  my-auto font-poppins-semibold uppercase xl:flex  items-center xl:text-white h-2/3 text-[36px] font-semibold">
          ББСБ Зээлийн модуль 
          </div>
        </div>
        <Image className=" hidden xl:flex w-[100vw]" preview={false} src="/img/dashboard.svg" />
      </div>
      <div className=" xl:pl-[375px] z-10  mb-[11.813rem]">
        <Tabs defaultActiveKey="1" className="">
          <TabPane className="mainTab" tab="Үндсэн модуль" key="1">
            <div className=" mt-[80px]">
              <div className="hidden bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD] w-[375px] h-[48px] xl:flex items-center  rounded-t-xl ">
                <p className=" pl-[24px] text-[18px] pt-[12px] text-white mb-2">
                  Ангилал
                </p>
              </div>
            <div className="hidden xl:flex">
              <Tabs className="module" tabPosition="left">
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
                                src={
                                  "data:image/png;base64," + item.product_icon
                                }
                              />
                            }
                            <div className="ml-[22px]">{item.product_name}</div>
                          </div>
                        }
                        
                        key={index}
                      >
                        <div className="xl:w-[770px] mr-6 xl:mr-0 shadow-custom rounded mb-[40px] mt-[10px] p-[30px] ">
                          <div>
                            { item.product_images &&
                            <Image
                              preview={false}
                              src={
                                "data:image/png;base64," +
                                item.product_images[2]
                              }
                            />
                              }
                          </div>
                          <p> {item.product_description} </p>
                          <div className="flex">
                            <div>
                              <Image
                                preview={false}
                                src={
                                  "data:image/png;base64," +
                                  item.product_images[0]
                                }
                              />
                            </div>
                            <div>
                              <Image
                                preview={false}
                                src={
                                  "data:image/png;base64," +
                                  item.product_images[1]
                                }
                              />
                            </div>
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
                                src={
                                  "data:image/png;base64," + item.product_icon
                                }
                              />
                            }
                            <div className="ml-[22px]">{item.product_name}</div>
                          </div>
                        }
                        
                        key={index}
                      >
                        <div className=" text-justify xl:w-[770px] mr-6 xl:mr-0 shadow-custom rounded mb-[40px] mt-[10px] p-[30px] ">
                          <div>
                            { item.product_images &&
                            <Image
                              preview={false}
                              src={
                                "data:image/png;base64," +
                                item.product_images[2]
                              }
                            />
                              }
                          </div>
                          <p> {item.product_description} </p>
                          <div className="flex">
                            <div>
                              <Image
                                preview={false}
                                src={
                                  "data:image/png;base64," +
                                  item.product_images[0]
                                }
                              />
                            </div>
                            <div>
                              <Image
                                preview={false}
                                src={
                                  "data:image/png;base64," +
                                  item.product_images[1]
                                }
                              />
                            </div>
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
          <TabPane tab="Нэмэлт модуль" key="2">
            Нэмэлт модуль
          </TabPane>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default CategoryId;
