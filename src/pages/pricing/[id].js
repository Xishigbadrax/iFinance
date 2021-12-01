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
  Select,
  message,
} from "antd";

import Auth from "../../utils/auth";
// import { useRouter } from "next/router";
import axios from "axios";
import Context from "../../context/Context";
import Footer from "../../components/Footer";
import { set } from "js-cookie";

const Pricing = ({ id }) => {
  // const router = useRouter();
  // const { id } = router.query;
  // console.log(id, 'this is id')

  const { Option } = Select;
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
  const [userID, setuserID] = useState(null);

  const [numberOfProgram, setNumberOfProgram] = useState(0);
  const [programPrice, setProgramPrice] = useState(0);
  const [programPriceSeason, setProgramPriceSeason] = useState(0);
  const [programPriceYear, setProgramPriceYear] = useState(0);
  const [serverPrice, setServerPrice] = useState(0);
  const [serverPriceSeason, setServerPriceSeason] = useState(0);
  const [serverPriceYear, setServerPriceYear] = useState(0);
  const [pServerPrice, setpServerPrice] = useState(0);
  const [cServerPrice, setcServerPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [discountSeason, setDiscountSeason] = useState(0);
  const [discountYear, setDiscountYear] = useState(0);
  const [tax, setTax] = useState(1);
  const [taxPrice, setTaxPrice] = useState(0);
  const [taxPriceSeason, setTaxPriceSeason] = useState(0);
  const [taxPriceYear, setTaxPriceYear] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalPriceSeason, setTotalPriceSeason] = useState(0);
  const [totalPriceYear, setTotalPriceYear] = useState(0);
  const [serverId, setServerId] = useState(0);

  const [physicalServer, setPhysicalServer] = useState();
  const [cloudServer, setCloudServer] = useState();

  const [serverState1, setServerState1] = useState(false);
  const [serverState2, setServerState2] = useState(false);
  const [serverState3, setServerState3] = useState(false);

  // const [isChecked, setIsChecked] = useState([]);

  const handleChange = (value) => {
    console.log(value, "serveree");
    value && setServerId(value[1]);
    value && setpServerPrice(Number(value[2]));
    setServerState1((prev) => !prev);
  };

  const handleChange2 = (value) => {
    console.log(value, "serveree2");
    value && setServerId(value[1]);
    value && setcServerPrice(Number(value[2]));
    setServerState2((prev) => !prev);
  };
  const onChangerServerPrice1 = () => {
    setServerPrice(pServerPrice);
    setServerState1((prev) => !prev);
  };
  const onChangerServerPrice2 = () => {
    setServerPrice(cServerPrice);
    setServerState2((prev) => !prev);
  };
  const onChangerServerPrice3 = () => {
    setServerState3((prev) => !prev);
  };
  useEffect(async () => {
    setuserID(Auth.getUserId());
    setSid(Auth.getToken());

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
        setPhysicalServer(response.data.result?.physical);
        setCloudServer(response.data.result?.cloud);
        setTax(response.data.result?.tax_amount);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onPurchase = async () => {
    console.log(sid, "siddd");
    console.log(userID, "userIdddd");
    var productIds = [];

    state.map((item) => {
      productIds.push(item.product_id);
    });

    console.log(serverId, productIds, "odoooldoo");

    var data = {
      jsonrpc: 2.0,
      params: {
        db: baseDB,
        uid: userID,
        server_id: serverId,
        payment_type: "qpay",
        product_ids: productIds,
      },
    };
    console.log(data, "dataaa");
    const res = await axios.post(baseUrl + "create/invoice", data, {
      headers: {
        "Set-Cookie": "session_id=" + sid,
        "Content-Type": "application/json",
      },
    });
    if (res.data.result && res.data.result) {
      message.success("Хүсэлт амжилттай биеллээ.");
    } else if (res.data.error) {
      message.warning(res.data.error.data.message);
    } else {
      message.warning("Хүсэлт амжилтгүй");
    }
    console.log(res, "purchase res");
  };

  const isChecked = (item) => {
    if (state.includes(item)) {
      let filtered = state.filter(function (el) {
        return el != item;
      });
      setState(filtered);
      // console.log(filtered, 'ggggg')
    } else {
      setState([...state, item]);
    }
  };

  useEffect(() => {
    console.log(state, "product idiii");
    setNumberOfProgram(state.length);
    var a = 0;
    var sale = 0;
    state.map((item) => {
      a += item.product_price;
      sale +=
        Number(item.product_price) * (Number(item.product_discount) / 100);
    });
    setProgramPrice(a);
    setDiscount(sale);

    console.log(serverId, "server Idii");
  }, [state]);

  useEffect(() => {
    setTotalPrice(programPrice + serverPrice - discount);
    setTaxPrice((Number(programPrice) + Number(serverPrice)) / Number(tax));
    setTaxPriceSeason(((programPrice + serverPrice) * 3) / Number(tax));
    setTaxPriceYear(((programPrice + serverPrice) * 12) / Number(tax));
    setProgramPriceSeason(Number(programPrice) * 3);
    setProgramPriceYear(Number(programPrice) * 12);
    console.log(tax, taxPrice, "zaa");
  }, [programPrice]);
  useEffect(() => {
    setTotalPriceSeason(Number(totalPrice) * 3 + serverPrice - discountSeason);
    setTotalPriceYear(Number(totalPrice) * 12 + serverPrice - discountYear);
  }, [totalPrice]);
  useEffect(() => {
    setDiscountSeason(Number(discount) * 3);
    setDiscountYear(Number(discount) * 12);
  }, [discount]);
  useEffect(() => {
    setServerPriceSeason(Number(serverPrice) * 3);
    setServerPriceYear(Number(serverPrice) * 12);
  }, [serverPrice]);
  useEffect(() => {
    console.log(serverState1, "serverstateee1");
  }, [serverState1]);
  useEffect(() => {
    console.log(serverState2, "serverstateee2");
  }, [serverState2]);
  useEffect(() => {
    console.log(serverState3, "serverstateee3");
  }, [serverState3]);
  useEffect(() => {
    serverState1 && setServerPrice(pServerPrice);
    console.log(pServerPrice, serverPrice, "ppppp");
  }, [pServerPrice]);
  useEffect(() => {
    serverState2 && setServerPrice(cServerPrice);
  }, [cServerPrice]);

  return (
    <div>
      <div className="relative w-[vw]">
        <div className="absolute z-20 flex flex-col w-full h-full">
          <div className="w-full flex justify-center h-1/3">
            <NavbarTrans />
          </div>
          <div className="hidden my-auto font-poppins-semibold uppercase xl:flex justify-center items-center text-white h-2/3 text-[36px] font-semibold">
            Үнийн санал
          </div>
        </div>

        <Image className=" w-[100vw]" preview={false} src="/img/Slider.svg" />
      </div>
      <div className=" xl:hidden mt-10  my-auto font-poppins-semibold uppercase flex justify-center items-center text-[#2E28D4] h-2/3 text-[36px] font-semibold">
        Үнийн санал
      </div>
      <div className=" xl:mt-[80px] flex flex-col md:flex-col xl:flex-row  flex justify-center">
        <div className=" flex  justify-center ">
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

            <div className=" mt-[1.875rem]  shadow-custom">
              <div className="pl-2  flex text-[1.5rem] text-white items-center xl:w-[48.125rem] h-[3.875rem] rounded-t-xl bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD] ">
                1. ББСБ Зээлийн модуль
              </div>
              <div className="  grid grid-cols-1 xl:grid-cols-2 gap-4 xl:w-[48.125rem] xl:pl-6 pb-[30px] px-2">
                {mainData &&
                  mainData.map((item, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() => isChecked(item)}
                        className={
                          state.includes(item)
                            ? "mt-[24px] xl:w-[349px] h-auto  rounded-[8px] border-[1px] border-[#2E28D4] "
                            : "mt-[24px] xl:w-[349px] h-auto  rounded-[8px] border-[1px] border-[#9CA6C0] "
                        }
                      >
                        <div className=" p-[20px]  flex justify-between">
                          <div
                            // onClick={() => isChecked(item)}

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
                                    <div className=" text-[#9CA6C0] text-[12px] mt-5 ml-2 ">
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
                              {item.is_required ? (
                                <Checkbox checked disabled />
                              ) : (
                                <Checkbox checked={state.includes(item)} />
                              )}
                            </div>
                            <div></div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            <div className=" mt-[1.875rem] mb-[30px] shadow-custom">
              <div className=" pl-2 flex text-[1.5rem] text-white items-center xl:w-[49.125rem] h-[3.875rem] rounded-t-xl bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD] ">
                Нэмэлт Модулиуд:
              </div>
              <div className="grid xl:grid-cols-2 gap-4  xl:pl-6 pb-[30px] xl:w-[48.125rem] px-2 ">
                {additionalData?.map((item, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => isChecked(item)}
                      className={
                        state.includes(item)
                          ? "mt-[24px] xl:w-[349px] h-auto  rounded-[8px] border-[1px] border-[#2E28D4]"
                          : "mt-[24px] xl:w-[349px] h-auto  rounded-[8px] border-[1px] border-[#9CA6C0]"
                      }
                    >
                      <div className=" p-[20px]  flex justify-between">
                        <div
                          // onClick={() => isChecked(item)}

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
                                  <div className=" text-[#9CA6C0] text-[12px] mt-5 ml-2 ">
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
                          {item.is_required ? (
                                <Checkbox checked disabled />
                              ) : (
                                <Checkbox checked={state.includes(item)} />
                              )}
                          </div>
                          <div></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className=" mt-[1.875rem] mb-[30px] shadow-custom">
              <div className=" pl-2 flex  text-[1.5rem] text-white items-center xl:w-[49.125rem] h-[3.875rem] rounded-t-xl bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD] ">
                Сервер байршуулах:
              </div>
              <div>
                <div className=" mx-[24px]  p-[24px xl:w-[722px] xl:mx-[24px] border-[1px] border-[#9CA6C0] mt-[24px] rounded-[8px]">
                  <div className=" p-[20px]">
                    <div className=" flex w-full  justify-between">
                      <div className="text-[#2F3747] text-[16px] font-semibold">
                        1. Itools.mn Физик серверт байршуулах
                      </div>
                      <div className="flex flex-col xl:flex-row w-[10vw] justify-around items-center">
                        <div className=" text-[#2F3747] text-[16px] font-semibold">
                          {pServerPrice}₮
                        </div>
                        <div className=" text-[#9CA6C0] text-[10px] xl:text-[12px] font-semibold ">
                          1 сард
                        </div>
                        <div>
                          {/* className={serverState2 || serverState3 ? " cursor-not-allowed" : null} */}

                          {/* <Checkbox
                            disabled={
                              serverState2 || serverState3 ? true : false
                            }
                            onClick={() => onChangerServerPrice1()}
                          /> */}
                        </div>
                      </div>
                    </div>
                    <div className=" mt-[16px]">
                      <Select
                        disabled={serverState2 || serverState3 ? true : false}
                        defaultValue="Сонгох"
                        // style={{ width: 300 }}
                        className=" w-[300px] xl:w-[556px]"
                        allowClear
                        onChange={handleChange}
                      >
                        {physicalServer?.map((item, index) => {
                          return (
                            <Option
                              key={index}
                              value={[
                                <div
                                  key={index}
                                  className=" flex justify-between"
                                >
                                  <div>{item.server_name}</div>
                                  <div>CPU Cores: {item.server_cpu}</div>
                                  <div>Ram: {item.server_ram}</div>
                                  <div>Hard: {item.server_hard}</div>
                                  <div>{item.server_price} ₮</div>
                                </div>,
                                item.server_id,
                                item.server_price,
                              ]}
                            >
                              <div className=" flex justify-between">
                                <div>{item.server_name}</div>
                                <div>CPU Cores: {item.server_cpu}</div>
                                <div>Ram: {item.server_ram}</div>
                                <div>Hard: {item.server_hard}</div>
                                <div>{item.server_price} ₮</div>
                              </div>
                            </Option>
                          );
                        })}
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" w-full">
                <div className=" mx-[24px]  xl:w-[722px] xl:mx-[24px] border-[1px] border-[#9CA6C0] mt-[24px] rounded-[8px]">
                  <div className=" p-[20px]">
                    <div className=" flex w-full  justify-between">
                      <div className="text-[#2F3747] text-[16px] font-semibold">
                        2. Cloud.mn Клауд Платформ
                      </div>
                      <div className="flex flex-col xl:flex-row w-[10vw] justify-around items-center">
                        <div className=" text-[#2F3747] text-[16px] font-semibold">
                          {cServerPrice}₮
                        </div>
                        <div className=" text-[#9CA6C0] text-[10px] xl:text-[12px] font-semibold ">
                          1 сард
                        </div>
                        <div>
                          {/* <Checkbox
                            disabled={
                              serverState1 || serverState3 ? true : false
                            }
                            onClick={() => onChangerServerPrice2()}
                          /> */}
                        </div>
                      </div>
                    </div>
                    <div className=" mt-[16px]">
                      <Select
                        disabled={serverState1 || serverState3 ? true : false}
                        defaultValue="Сонгох"
                        // style={{ width: 300 }}
                        allowClear
                        className=" w-[300px] xl:w-[556px]"
                        onChange={handleChange2}
                      >
                        {cloudServer?.map((item, index) => {
                          return (
                            <Option
                              key={index}
                              value={[
                                <div
                                  key={index}
                                  className=" flex justify-between"
                                >
                                  <div>{item.server_name}</div>
                                  <div>CPU Cores: {item.server_cpu}</div>
                                  <div>Ram: {item.server_ram}</div>
                                  <div>Hard: {item.server_hard}</div>
                                  <div>{item.server_price} ₮</div>
                                </div>,
                                item.server_id,
                                item.server_price,
                              ]}
                            >
                              <div className=" flex justify-between">
                                <div>{item.server_name}</div>
                                <div>CPU Cores: {item.server_cpu}</div>
                                <div>Ram: {item.server_ram}</div>
                                <div>Hard: {item.server_hard}</div>
                                <div>{item.server_price} ₮</div>
                              </div>
                            </Option>
                          );
                        })}
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" w-full pb-[17px]">
                <div className="   xl:w-[722px] mx-[24px] border-[1px] border-[#9CA6C0] mt-[24px]  rounded-[8px]">
                  <div className=" p-[20px]">
                    <div className=" flex w-full  justify-between">
                      <div className="text-[#2F3747] text-[16px] font-semibold">
                        3. Өөрсдийн сервер дээр байршуулах
                      </div>
                      <div className="">
                        <Checkbox
                          disabled={serverState1 || serverState2 ? true : false}
                          onClick={() => onChangerServerPrice3()}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" flex justify-center">
          <div className=" ml-[10px] w-[370px]   xl:h-[625px] shadow-custom rounded-[8px] ">
            <Tabs className="payment" defaultActiveKey="1">
              <TabPane tab="САР" key="1">
                <div className=" flex flex-col justify-center items-center">
                  <div className=" flex justify-between  w-[322px]">
                    <div className=" text-[#2F3747] text-[16px] font-medium">
                      {numberOfProgram} програм
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
                  <div className=" flex justify-between w-[322px]">
                    <div className=" text-[#2F3747] text-[16px] font-medium">
                      НӨАТ
                    </div>
                    <div className="text-[#2F3747] text-[16px] font-semibold">
                      {taxPrice}₮
                    </div>
                  </div>
                  <Divider className="bill" />
                  <div className=" flex justify-between w-[322px] ">
                    <div className=" text-[#2F3747] text-[16px] font-medium">
                      Хөнгөлөлт
                    </div>
                    <div className="text-[#30D82E] text-[16px] font-semibold">
                       {discount != 0 ? -discount : 0}₮
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
                        Those apps are free as long as you don't need more apps
                        or hosting options.
                      </p>
                    </div>
                  </div>
                  <div className=" flex justify-center mt-[30px]">
                    {sid ? (
                      <Button
                        className=" text-[14px] font-bold w-[200px] h-[48px] text-white rounded-[43px] bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD] border-none"
                        type="primary"
                        onClick={onPurchase}
                      >
                        Захиалга хийх
                      </Button>
                    ) : (
                      <Button
                        className=" text-[14px] font-bold w-[200px] h-[48px] text-white rounded-[43px] bg-[#9CA6C0] border-none"
                        type="primary"
                        onClick={onPurchase}
                        disabled
                      >
                        Захиалга хийх
                      </Button>
                    )}
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
                <div className=" flex flex-col justify-center items-center">
                  <div className=" flex justify-between  w-[322px]">
                    <div className=" text-[#2F3747] text-[16px] font-medium">
                      {numberOfProgram} програм
                    </div>
                    <div className="text-[#2F3747] text-[16px] font-semibold">
                      {programPriceSeason}₮
                    </div>
                  </div>
                  <Divider className="bill" />

                  <div className=" flex justify-between w-[322px]">
                    <div className=" text-[#2F3747] text-[16px] font-medium">
                      Сервер
                    </div>
                    <div className="text-[#2F3747] text-[16px] font-semibold">
                      {serverPriceSeason}₮
                    </div>
                  </div>
                  <Divider className="bill" />
                  <div className=" flex justify-between w-[322px]">
                    <div className=" text-[#2F3747] text-[16px] font-medium">
                      НӨАТ
                    </div>
                    <div className="text-[#2F3747] text-[16px] font-semibold">
                      {taxPriceSeason}₮
                    </div>
                  </div>
                  <Divider className="bill" />
                  <div className=" flex justify-between w-[322px] ">
                    <div className=" text-[#2F3747] text-[16px] font-medium">
                      Хөнгөлөлт
                    </div>
                    <div className="text-[#30D82E] text-[16px] font-semibold">
                    {discount != 0 ? -discount : 0}₮
                    </div>
                  </div>
                  <Divider className="bill" />

                  <div className=" flex justify-between w-[322px]">
                    <div className=" text-[#2F3747] text-[16px] font-semibold">
                      Нийт төлбөр
                    </div>
                    <div className="text-[#2F3747] text-[16px] font-semibold">
                      {totalPriceSeason}₮
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
                        Those apps are free as long as you don't need more apps
                        or hosting options.
                      </p>
                    </div>
                  </div>
                  <div className=" flex justify-center mt-[30px]">
                    {sid ? (
                      <Button
                        className=" text-[14px] font-bold w-[200px] h-[48px] text-white rounded-[43px] bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD] border-none"
                        type="primary"
                        onClick={onPurchase}
                      >
                        Захиалга хийх
                      </Button>
                    ) : (
                      <Button
                        className=" text-[14px] font-bold w-[200px] h-[48px] text-white rounded-[43px] bg-[#9CA6C0] border-none"
                        type="primary"
                        onClick={onPurchase}
                        disabled
                      >
                        Захиалга хийх
                      </Button>
                    )}
                  </div>
                  <div className=" mx-[24px] my-[30px]">
                    <p className="text-[14px] text-[#9CA6C0] font-normal">
                      (1) New customers get a discount on the initial number of
                      users purchased. ($6.00 USD instead of $8.00 USD).
                    </p>
                  </div>
                </div>
              </TabPane>
              <TabPane tab="ЖИЛ" key="3">
                <div className=" flex flex-col justify-center items-center">
                  <div className=" flex justify-between  w-[322px]">
                    <div className=" text-[#2F3747] text-[16px] font-medium">
                      {numberOfProgram} програм
                    </div>
                    <div className="text-[#2F3747] text-[16px] font-semibold">
                      {programPriceYear}₮
                    </div>
                  </div>
                  <Divider className="bill" />

                  <div className=" flex justify-between w-[322px]">
                    <div className=" text-[#2F3747] text-[16px] font-medium">
                      Сервер
                    </div>
                    <div className="text-[#2F3747] text-[16px] font-semibold">
                      {serverPriceYear}₮
                    </div>
                  </div>
                  <Divider className="bill" />
                  <div className=" flex justify-between w-[322px]">
                    <div className=" text-[#2F3747] text-[16px] font-medium">
                      НӨАТ
                    </div>
                    <div className="text-[#2F3747] text-[16px] font-semibold">
                      {taxPriceYear}₮
                    </div>
                  </div>
                  <Divider className="bill" />
                  <div className=" flex justify-between w-[322px] ">
                    <div className=" text-[#2F3747] text-[16px] font-medium">
                      Хөнгөлөлт
                    </div>
                    <div className="text-[#30D82E] text-[16px] font-semibold">
                    {discount != 0 ? -discount : 0}₮
                    </div>
                  </div>
                  <Divider className="bill" />

                  <div className=" flex justify-between w-[322px]">
                    <div className=" text-[#2F3747] text-[16px] font-semibold">
                      Нийт төлбөр
                    </div>
                    <div className="text-[#2F3747] text-[16px] font-semibold">
                      {totalPriceYear}₮
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
                        Those apps are free as long as you don't need more apps
                        or hosting options.
                      </p>
                    </div>
                  </div>
                  <div className=" flex justify-center mt-[30px]">
                    {sid ? (
                      <Button
                        className=" text-[14px] font-bold w-[200px] h-[48px] text-white rounded-[43px] bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD] border-none"
                        type="primary"
                        onClick={onPurchase}
                      >
                        Захиалга хийх
                      </Button>
                    ) : (
                      <Button
                        className=" text-[14px] font-bold w-[200px] h-[48px] text-white rounded-[43px] bg-[#9CA6C0] border-none"
                        type="primary"
                        onClick={onPurchase}
                        disabled
                      >
                        Захиалга хийх
                      </Button>
                    )}
                  </div>
                  <div className=" mx-[24px] my-[30px]">
                    <p className="text-[14px] text-[#9CA6C0] font-normal">
                      (1) New customers get a discount on the initial number of
                      users purchased. ($6.00 USD instead of $8.00 USD).
                    </p>
                  </div>
                </div>
              </TabPane>
            </Tabs>
          </div>
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
