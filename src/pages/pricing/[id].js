import React, { useState, useEffect, useContext } from "react";
import NavbarTrans from "../../components/NavbarTrans";
import {
  Skeleton,
  Divider,
  Card,
  Avatar,
  Checkbox,
  Tabs,
  Image,
  Button,
} from "antd";

import Auth from "../../utils/auth";
// import { useRouter } from "next/router";
import axios from "axios";
import Context from "../../context/Context";
import Footer from "../../components/Footer";

const Pricing = ({ id }) => {
  // const router = useRouter();
  // const { id } = router.query;
  // console.log(id, 'this is id')

  const { Meta } = Card;
  const { TabPane } = Tabs;
  const [sid, setSid] = useState();
  const [numberOfUser, setNumberOfUser] = useState(0);
  const [costOfNumber, setCostOfNumber] = useState(0);
  const [mainData, setMainData] = useState();
  const [additionalData, setAdditionalData] = useState();
  const baseUrl = process.env.NEXT_PUBLIC_URL;
  const baseDB = process.env.NEXT_PUBLIC_DB;
  const [state, setState] = useState([]);

  const [programPrice, setProgramPrice] = useState(1000000);
  const [serverPrice, setServerPrice] = useState(200000);
  const [discount, setDiscount] = useState(-60000);
  const [totalPrice, setTotalPrice] = useState(1140000);

  useEffect(async () => {
    // console.log(Auth.getToken(), "siddd");

    // Auth.getToken() == null || Auth.getToken() == undefined
    //   ? Router.push("/")
    //   : null;

    // setSid(Auth.getToken());

    await axios
      .post(
        baseUrl + "get/product_list_to_purchase",
        {
          jsonrpc: 2.0,
          params: {
            category_id: id,
            db: baseDB,
          },
        },

        {
          headers: {
            "Set-Cookie": "session_id=" + sid,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response, "ggg");
        setMainData(response.data.result?.main_products),
          setAdditionalData(response.data.result?.additional_products);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const isChecked = (item) => {
    // if (state.includes(item)) {
    //   let filtered = state.filter(function(el) {
    //     return el != item
    //   })

    //   console.log(filtered, 'ggggg')
    // } else {
    setState([...state, item]);
    // }
  };

  // useEffect(() => {
  //   console.log(typeof state, state)

  // }, [state])

  // useEffect(() => {
  //   console.log(additionalData, 'uurchlugdluu')
  // }, [additionalData])

  return (
    <div>
      <div className="relative w-[vw]">
        <div className="absolute z-20 flex flex-col w-full h-full">
          <div className="w-full flex justify-center h-1/3">
            <NavbarTrans />
          </div>
          <div className="my-auto font-poppins-semibold uppercase flex justify-center items-center text-white h-2/3 text-[36px] font-semibold">
            Үнийн санал
          </div>
        </div>
        <Image className=" w-[100vw]" preview={false} src="/img/Slider.svg" />
      </div>
      <div className=" mt-[80px] flex ml-[375px]">
        <div className=" flex justify-center ">
          <div className=" w-full ">
            <div>
              <p className=" border-l-2 border-[#2E28D4] text-[#2E28D4] pl-2 text-[24px] font-semibold mt-4 ">
                Хэрэглэгчийн тоо
              </p>
            </div>

            {/* Niit hereglegch boddog heseg */}

            {/* <div className=" flex items-center  ">
              <div className=" flex items-center w-[9.375rem] h-[3rem] bg-[#9CA6C080] bg-opacity-50 justify-around rounded-[4px] ">
                <div
                  className="cursor-pointer"
                  onClick={() => setNumberOfUser(numberOfUser - 1)}
                >
                  <Image preview={false} src="/img/minus.png" />
                </div>
                <div>{numberOfUser}</div>
                <div
                  className="cursor-pointer"
                  onClick={() => setNumberOfUser(numberOfUser + 1)}
                >
                  <Image preview={false} src="/img/add.png" />
                </div>
              </div>
              <div className=" ml-2 text-[16px] font-semibold">
                ${costOfNumber} USD/user/month
              </div>
            </div> */}

            <div className=" mt-[1.875rem]">
              <div className=" pl-2 flex text-[1.5rem] text-white items-center w-[48.125rem] h-[3.875rem] rounded-t-lg bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD] ">
                1. ББСБ Зээлийн модуль
              </div>
              <div className="grid grid-cols-2 gap-4 w-[48.125rem]">
                {mainData &&
                  mainData.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className=" mt-[24px] w-[349px] h-auto bg-gray-50 rounded-[8px] border-[1px] border-[#9CA6C0]"
                      >
                        <div className=" p-[20px]  flex justify-between">
                          <div
                            onClick={() => isChecked(item)}
                            className="flex flex-col"
                          >
                            <div className="text-[#2F3747] font-semibold text-[16px]">
                              {item.product_name}
                            </div>
                            <div className=" flex">
                              {item.product_discount == 0 ? (
                                <div className=" flex">
                                  <div className="text-[#2F3747] text-[16px] font-semibold mt-4 ">
                                    {item.product_price}₮
                                  </div>
                                  {item.product_price_type == "year" ? (
                                    <div className=" text-[#9CA6C0] text-[12px]  mt-6 ml-2 ">
                                      1 жилд
                                    </div>
                                  ) : item.product_price_type == "month" ? (
                                    <div className=" text-[#9CA6C0] text-[12px] mt-6 ml-2 ">
                                      1 сард
                                    </div>
                                  ) : null}
                                </div>
                              ) : (
                                <div className="flex  justify-between">
                                  <div className="flex">
                                    <div className="text-[#2F3747] text-[16px] font-semibold mt-4 ">
                                      {Number(item.product_price) -
                                        Number(item.product_price) *
                                          (Number(item.product_discount) / 100)}
                                      ₮
                                    </div>
                                    <div className="text-[#2F3747] ml-3 line-through text-[12px] font-semibold mt-5  text-opacity-50">
                                      {item.product_price}₮
                                    </div>
                                    {item.product_price_type == "year" ? (
                                      <div className=" text-[#9CA6C0] text-[12px]  mt-5 ml-2 ">
                                        1 жилд
                                      </div>
                                    ) : item.product_price_type == "month" ? (
                                      <div className=" text-[#9CA6C0] text-[12px]  mt-5 ml-2 ">
                                        1 сард
                                      </div>
                                    ) : null}
                                  </div>
                                  <div className=" flex justify-center w-[71px] h-[24px] bg-[#F01A634D] bg-opacity-30 ml-[32px]  mt-5 text-[#F01A63] text-[13px] items-center font-medium">
                                  -{item.product_discount}% off
                                  </div>

                                     
                                </div>
                              )}
                            </div>
                          </div>
                          <div>
                            <div>
                              <Checkbox />
                            </div>
                            <div></div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            <div className=" mt-[1.875rem] mb-[30px]">
              <div className=" pl-2 flex text-[1.5rem] text-white items-center w-[48.125rem] h-[3.875rem] rounded-t-lg bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD] ">
                Нэмэлт Модулиуд:
              </div>
              <div className="grid grid-cols-2 gap-4 w-[48.125rem]">
                {additionalData?.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className=" mt-[24px] w-[349px] h-[104px] bg-gray-50 rounded-[8px] border-[1px] border-[#9CA6C0]"
                    >
                      <div className=" p-[20px]  flex justify-between">
                        <div className="flex flex-col">
                          <div>{item.product_name}</div>
                          <div> {item.product_price}₮ </div>
                        </div>
                        <div>
                          <div>
                            <Checkbox />
                          </div>
                          <div></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className=" ml-[30px] w-[370px] h-[595px]  ">
          <Tabs className="payment" defaultActiveKey="1">
            <TabPane tab="ЖИЛД" key="1">
              <div className=" flex flex-col justify-center items-center">
                <div className=" flex justify-between  w-[322px]">
                  <div className=" text-[#2F3747] text-[16px] font-medium">
                    3 программ
                  </div>
                  <div className="text-[#2F3747] text-[16px] font-semibold">
                    {programPrice}₮
                  </div>
                </div>
                <Divider className="bill" />
                <div className=" flex justify-between w-[322px]">
                  <div className=" text-[#2F3747] text-[16px] font-medium">
                    Сервер
                  </div>
                  <div className="text-[#2F3747] text-[16px] font-semibold">
                    {serverPrice}₮
                  </div>
                </div>
                <Divider className="bill" />
                <div className=" flex justify-between w-[322px] ">
                  <div className=" text-[#2F3747] text-[16px] font-medium">
                    Хөнгөлөлт
                  </div>
                  <div className="text-[#30D82E] text-[16px] font-semibold">
                    {discount}₮
                  </div>
                </div>
                <Divider className="bill" />

                <div className=" flex justify-between w-[322px]">
                  <div className=" text-[#2F3747] text-[16px] font-semibold">
                    Нийт төлбөр
                  </div>
                  <div className="text-[#2F3747] text-[16px] font-semibold">
                    {totalPrice}₮
                  </div>
                </div>
                <Divider className="bill" />

                <div className=" w-full  flex flex-col justify-center items-center">
                  <div className="text-[13px] text-[#9CA6C0] font-normal">
                    (2) Billed annually: $216.00 USD
                  </div>
                  <div className=" flex w-[322px] h-[86px] bg-[#F09A1A] bg-opacity-10 rounded-[4px] mt-[16px]">
                    <div className=" pt-[16px] pl-[17px] pr-[17px]">
                      <Image src="/img/warning.png" />
                    </div>
                    <p className=" pt-[16px] pr-[16px] text-[#F09A1A] text-[13px] font-medium">
                      Those apps are free as long as you don't need more apps or
                      hosting options.
                    </p>
                  </div>
                </div>
                <div className=" flex justify-center mt-[30px]">
                  <Button
                    className=" text-[14px] font-bold w-[200px] h-[48px] rounded-[43px] bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD] border-none"
                    type="primary"
                  >
                    Захиалга хийх
                  </Button>
                </div>
                <div className=" mx-[24px] my-[30px]">
                  <p className="text-[14px] text-[#9CA6C0] font-normal">
                    (1) New customers get a discount on the initial number of
                    users purchased. ($6.00 USD instead of $8.00 USD).
                  </p>
                </div>
              </div>
            </TabPane>
            <TabPane tab="УЛИРАЛ" key="2">
              Content of Tab Pane 2
            </TabPane>
            <TabPane tab="САРД" key="3">
              Content of Tab Pane 3
            </TabPane>
          </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Pricing;

export async function getServerSideProps(context) {
  return {
    props: {
      id: context.query.id,
    }, // will be passed to the page component as props
  };
}
