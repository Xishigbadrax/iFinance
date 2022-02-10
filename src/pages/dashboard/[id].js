import React from "react";
import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import Auth from "../../utils/auth";
import axios from "axios";
import Context from "../../context/Context";
import Navbar from "../../components/Navbar/navbar";
import Footer from "../../components/Footer";
import { Tabs, Image, Button, message, Spin } from "antd";
import NavbarTrans from "../../components/NavbarTrans";
import parse from "html-react-parser";
import Head from "next/head";

const CategoryId = () => {
  const router = useRouter();

  const { id } = router.query;
  const { sessionId, setIsLoading } = useContext(Context);
  const { TabPane } = Tabs;
  const baseUrl = process.env.NEXT_PUBLIC_URL;
  const baseDB = process.env.NEXT_PUBLIC_DB;

  const [mainProduct, setMainProduct] = useState();
  const [additionalProduct, setAdditionalProduct] = useState();
  const [categoryName, setCategoryName] = useState();
  const [cartLogin, setCartLogin] = useState(false);
  const [cartRender, setcartRender] = useState(1);
  const [darkMode, setDarkMode] = useState(null);

  const onCart = async (id, type) => {
    const res = await axios.post(
      baseUrl + "add/cart_list",
      {
        jsonrpc: 2.0,
        params: {
          uid: Auth.getUserId(),
          product_id: id,
          type: type,
        },
      },

      {
        headers: {
          "Set-Cookie": "session_id=" + sessionId,
          "Content-Type": "application/json",
        },
      }
    );
    // console.log(res, "sagsand nemeh res");
    res?.data?.id == null ? cartSuccess() : message.error("Амжилтгүй");

    setcartRender(cartRender + 1);
  };

  const cartSuccess = () => {
    message.success("Амжилттай сагсанд нэмэгдлээ");
  };
  const onCartLogin = () => {
    setCartLogin(!cartLogin);
    // console.log(cartLogin);
  };
  const fetchData = async () => {
    setIsLoading(true);
    const res = await axios.post(
      baseUrl + "get/product_list_by_category",
      {
        jsonrpc: 2.0,
        params: {
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
    res.data.result && setMainProduct(res.data.result.main_products),
      res.data.result &&
        setAdditionalProduct(res.data.result.additional_products),
      res.data.result &&
        setCategoryName(res.data.result.main_products[0]?.product_category);
    setIsLoading(false);
    // console.log(res.data.result, "medeenuud");
  };

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
    <div className="">
      <Head>
        <title>iFinance | Танилцуулга</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className=" xl:fixed z-30 h-[100px] flex  overflow-hidden ">
        <div className="absolute z-10  flex flex-col w-full  ">
          <div className="w-full flex justify-center mb-2 ">
            <NavbarTrans
              cartLogin={cartLogin}
              cartRender={cartRender}
              darkaa={setDarkMode}
            />
          </div>

          {/* <div className=" hidden    my-auto font-poppins-semibold uppercase lg:flex justify-center items-center text-white h-2/3 text-[36px] font-semibold">
            Манай бүтээгдэхүүн
          </div> */}
        </div>
        <Image
          className="w-[100vw] h-[100px] scale-150 my-auto  lg:h-auto"
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
      <div className="  relative   ">
        <div className="xl:absolute z-20    flex flex-col w-full md:h-[200px] 2xl:h-[260px] justify-center mt-[90px] ">
          <div className=" mt-[20px] 2xl:ml-[20vw] md:ml-[7vw]  lg:flex justify-between w-[450px] hidden">
            <div>
              <Image preview={false} src="/img/home.svg" />
            </div>
            <div className="text-white text-[14px] font-semibold ">
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
                Бүтээгдэхүүн
              </a>
            </div>
            <div>
              <Image preview={false} src="/img/right.svg" />
            </div>
            <div className="text-white  text-[14px] font-semibold">
              {categoryName}
            </div>
          </div>
          <div className=" text-center 2xl:pl-[20vw]    md:pl-[7vw] text-[#2E28D4]  my-auto font-poppins-semibold uppercase xl:flex  items-center xl:text-white  text-[36px] font-semibold">
            {categoryName}
          </div>
        </div>

        <Image
          className=" hidden lg:flex w-[100vw] mt-[100px]"
          preview={false}
          src={
            darkMode == "dark" ? "/img/darkDashboard.svg" : "/img/dashboard.svg"
          }
        />
      </div>
      <div className=" 2xl:pl-[200px]  z-10  mb-[20px] dark:bg-[#08194B]  ">
        <Tabs defaultActiveKey="1" className="angil">
          <TabPane className="mainTab" tab="Үндсэн модуль" key="1">
            <div className=" lg:mt-[20px] ">
              <div className="hidden bg-gradient-to-tr from-[#2E28D4] xl:ml-[5px] to-[#AC27FD] w-[375px] h-[48px] xl:flex items-center rounded-t-[4px]">
                <p className=" pl-[24px] text-[18px] pt-[12px] text-white mb-2">
                  Ангилал
                </p>
              </div>
              <div className="hidden lg:flex">
                <Tabs className="module" tabPosition="left">
                  {mainProduct &&
                    mainProduct.map((item, index) => {
                      // var content = "dsadas";
                      // var urlRegex =/(g;
                      var content = item.product_description.toString();
                      // .toString().replace( "/web", 'https://test.ifinance.mn/web');

                      // console.log(content, "contentteee");
                      return (
                        <TabPane
                          className="test"
                          tab={
                            <div className="flex  items-center  ">
                              {item.product_icon ? (
                                <Image
                                  className=""
                                  preview={false}
                                  width="48px"
                                  height="48px"
                                  src={
                                    "data:image/png;base64," + item.product_icon
                                  }
                                />
                              ) : (
                                <Image
                                  className=""
                                  preview={false}
                                  width="48px"
                                  height="48px"
                                  src="/img/default.png"
                                />
                              )}
                              <div className="ml-2 text-[15px] mt-4">
                                <p className=" "> {item.product_name} </p>
                              </div>
                            </div>
                          }
                          key={index}
                        >
                          <div className="xl:w-[770px]   shadow-lg rounded mb-[40px] px-[30px] mr-[20px] pb-[30px] ">
                            <p className=" ">{parse(content)} </p>

                            <div className="flex"></div>
                            <div className=" mt-2 flex justify-center">
                              <div className=" w-full flex flex-col md:flex-row justify-between">
                                {/* <Button
                                    // onClick={() => }
                                    type="primary"
                                   
                                    className=" w-[236px] h-[48px] rounded-[43px] bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD] border-none text-[14px] font-bold"
                                  >
                                    Сагсанд нэмэх
                                  </Button>
                                )  */}

                                {Auth.getToken() == "undefined" ||
                                Auth.getToken() == null ? (
                                  <Button
                                    onClick={
                                      Auth.getToken()
                                        ? () => onCart(item.product_id, 1)
                                        : () => onCartLogin()
                                    }
                                    type="primary"
                                    className=" w-[236px] h-[48px] rounded-[43px] hover:text-white hover:bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD]  bg-white border-[1px] border-[#9CA6C0] text-[#9CA6C0] text-[14px] font-bold"
                                  >
                                    Сагсанд хийх
                                  </Button>
                                ) : (
                                  <Button
                                    onClick={() => onCart(item.product_id, 1)}
                                    type="primary"
                                    className=" w-[236px] h-[48px] rounded-[43px] text-white bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD]   border-[1px]   text-[14px] font-bold"
                                  >
                                    Сагсанд хийх
                                  </Button>
                                )}

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
              <div className=" lg:hidden ">
                <Tabs className="module" tabPosition="top">
                  {mainProduct &&
                    mainProduct.map((item, index) => {
                      var content = item.product_description.toString();
                      return (
                        <TabPane
                          tab={
                            <div className="">
                              <div className="flex items-center">
                                {item.product_icon ? (
                                  <Image
                                    className="medee"
                                    preview={false}
                                    width="48px"
                                    height="48px"
                                    src={
                                      "data:image/png;base64," +
                                      item.product_icon
                                    }
                                  />
                                ) : (
                                  <Image
                                    className="medee"
                                    preview={false}
                                    width="48px"
                                    height="48px"
                                    src="/img/default.png"
                                  />
                                )}
                                <div className="">{item.product_name}</div>
                              </div>
                            </div>
                          }
                          key={index}
                        >
                          <div className="  xl:w-[770px] lg:mr-6 flex flex-col justify-center xl:mr-0 shadow-custom rounded  px-[30px]  lg:p-[30px] ">
                            <p>{parse(content)} </p>

                            <div className=" mt-2 flex">
                              <div className="  w-[500px] flex flex-col md:flex-row ">
                                <div className=" flex flex-col  items-center">
                                  <Button
                                    onClick={
                                      Auth.getToken()
                                        ? () => onCart(item.product_id, 1)
                                        : () => onCartLogin()
                                    }
                                    type="primary"
                                    className=" w-[236px] h-[48px] rounded-[43px]  hover:text-white hover:bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD]  bg-white border-[1px] border-[#9CA6C0] text-[#9CA6C0] text-[14px] font-bold"
                                  >
                                    Сагсанд хийх
                                  </Button>
                                  <Button
                                    onClick={() => onDetails(id)}
                                    type="primary"
                                    className=" mt-2 w-[236px] h-[48px] rounded-[43px] bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD] border-none text-[14px] font-bold"
                                  >
                                    Худалдан авах
                                  </Button>
                                </div>
                              </div>
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
            <div className=" mt-[20px] ">
              <div className="hidden bg-gradient-to-tr from-[#2E28D4] xl:ml-[5px] to-[#AC27FD] w-[375px] h-[48px] lg:flex items-center  rounded-t-[4px] ">
                <p className=" pl-[24px] text-[18px] pt-[12px] text-white mb-2">
                  Ангилал
                </p>
              </div>
              <div className="hidden xl:flex">
                <Tabs className="module" tabPosition="left">
                  {additionalProduct &&
                    additionalProduct.map((item, index) => {
                      var content = item.product_description.toString();

                      return (
                        <TabPane
                          className="test"
                          tab={
                            <div className="flex  items-center   w-[380px] ">
                              {item.product_icon ? (
                                <Image
                                  className=""
                                  preview={false}
                                  width="48px"
                                  height="48px"
                                  src={
                                    "data:image/png;base64," + item.product_icon
                                  }
                                />
                              ) : (
                                <Image
                                  className=""
                                  preview={false}
                                  width="48px"
                                  height="48px"
                                  src="/img/default.png"
                                />
                              )}
                              <div className=" w-[250px] ml-2  text-[15px] flex justify-start ">
                                {item.product_name}
                              </div>
                            </div>
                          }
                          key={index}
                        >
                          <div className="xl:w-[770px]   shadow-lg rounded mb-[40px] px-[30px] mr-[20px] pb-[30px] ">
                            <p className=" ">{parse(content)} </p>

                            <div className="flex"></div>
                            <div className=" mt-2 flex justify-center">
                              <div className="  w-full flex flex-col md:flex-row justify-between">
                                <Button
                                  onClick={
                                    Auth.getToken()
                                      ? () => onCart(item.product_id, 1)
                                      : () => onCartLogin()
                                  }
                                  type="primary"
                                  className=" w-[236px] h-[48px] rounded-[43px]  hover:text-white hover:bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD]  bg-white border-[1px] border-[#9CA6C0] text-[#9CA6C0] text-[14px] font-bold"
                                >
                                  Сагсанд хийх
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
                  {additionalProduct &&
                    additionalProduct.map((item, index) => {
                      return (
                        <TabPane
                          className="test"
                          tab={
                            <div className="flex items-center  ">
                              {item.product_icon ? (
                                <Image
                                  className=""
                                  preview={false}
                                  width="48px"
                                  height="48px"
                                  src={
                                    "data:image/png;base64," + item.product_icon
                                  }
                                />
                              ) : (
                                <Image
                                  className=""
                                  preview={false}
                                  width="48px"
                                  height="48px"
                                  src="/img/default.png"
                                />
                              )}
                              <div
                                className="ml-[22px]"
                                style={{ fontSize: "12px" }}
                              >
                                {item.product_name}
                              </div>
                            </div>
                          }
                          key={index}
                        >
                          <div className=" text-justify xl:w-[770px] lg:mr-6 xl:mr-0 shadow-custom rounded mb-[40px]  px-[30px] pb-[30px]  ">
                            <p> {parse(item.product_description)} </p>
                            <div className=" mt-2 flex  ">
                              <div className="  w-[500px] flex flex-col md:flex-row ">
                                <div className=" flex flex-col  items-center">
                                  <Button
                                    onClick={
                                      Auth.getToken()
                                        ? () => onCart(item.product_id, 1)
                                        : () => onCartLogin()
                                    }
                                    type="primary"
                                    className=" w-[236px] h-[48px] rounded-[43px]  hover:text-white hover:bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD]  bg-white border-[1px] border-[#9CA6C0] text-[#9CA6C0] text-[14px] font-bold"
                                  >
                                    Сагсанд хийх
                                  </Button>
                                  <Button
                                    onClick={() => onDetails(id)}
                                    type="primary"
                                    className=" w-[236px] h-[48px] mt-4 rounded-[43px] bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD] border-none text-[14px] font-bold"
                                  >
                                    Худалдан авах
                                  </Button>
                                </div>
                              </div>
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
