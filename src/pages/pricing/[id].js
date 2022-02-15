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
  Modal,
  Input,
  Collapse,
} from "antd";
import helper from "../../utils/helper";

import Auth from "../../utils/auth";
// import { useRouter } from "next/router";
import axios from "axios";
import Context from "../../context/Context";
import Footer from "../../components/Footer";
import { set } from "js-cookie";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Head from "next/head";

const Pricing = ({ id }) => {
  // const router = useRouter();
  // const { id } = router.query;
  // console.log(id, 'this is id')

  const { setIsLoading } = useContext(Context);
  const { Panel } = Collapse;
  const [invoiceId, setInvoiceId] = useState(null);
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

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [bank, setBank] = useState();
  const [invoice, setInvoice] = useState();
  const [domain, setDomain] = useState();
  const [domainState, setDomainState] = useState(null);
  const [lock, setLock] = useState(false);
  const [open, setOpen] = useState([]);

  // const [isChecked, setIsChecked] = useState([]);

  const handleChange = (value) => {
    // console.log(value, "serveree");
    value && setServerId(value[1]);
    value && setpServerPrice(Number(value[2]));
    setServerState1((prev) => !prev);
  };
  const onChange = (itemIndex) => {
    if (open.includes(itemIndex)) {
      for (let i = 0; i < open.length; i++) {
        if (open[i] === itemIndex) {
          open.splice(i, 1);
        }
      }

      setOpen(open);
    } else {
      setOpen((prev) => [...prev, itemIndex]);
    }
  };
  const handleCancel = (value) => {
    setIsModalVisible(false);
  };
  const onCheck = async () => {
    setIsLoading(true);
    await axios
      .post(
        baseUrl + "subdomain/checker",
        {
          jsonrpc: 2.0,
          params: {
            domain: domain,
          },
        },

        {
          headers: {
            "Set-Cookie": "session_id=" + Auth.getToken(),
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        // console.log(response, "dom shalgah");
        setIsLoading(false);
        setDomainState(response.data.result);
        response?.data?.result == true ? setLock(true) : setLock(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange2 = (value) => {
    // console.log(value, "serveree2");
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
  const checkPayment = async () => {
    await axios
      .post(
        baseUrl + "check/invoice",
        {
          jsonrpc: 2.0,
          params: {
            uid: Auth.getUserId,
            invoice_id: invoiceId,
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
        // console.log(response, "check");
        if (response?.data?.result == true) {
          message.success(
            "Амжилттай төлөгдсөн. Та 5 минут хүлээх шаардлагатай. Захиалгын төлвийг Миний захиалгууд цэснээс харна уу"
          );
        } else if (response?.data?.result == false) {
          message.warning("Төлбөр төлөгдөөгүй");
        } else {
          message.warning("Нэхэмжлэл олдсонгүй");
        }
      });
  };
  useEffect(async () => {
    setIsLoading(true);
    setuserID(Auth.getUserId());
    setSid(Auth.getToken());

    await axios
      .post(
        baseUrl + "get/product_list_to_purchase",
        {
          jsonrpc: 2.0,
          params: {
            category_id: id,
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
        // console.log(response, "ggg");
        setAdditionalData(response.data.result?.additional_products);
        setMainData(response.data.result?.main_products),
          setPhysicalServer(response.data.result?.physical);
        setCloudServer(response.data.result?.cloud);
        setTax(response.data.result?.tax_amount);
        setIsLoading(false);
      })
      .catch((error) => {
        // console.log(error);
      });
  }, []);

  const onPurchase = async (type) => {
    setIsLoading(true);
    // console.log(sid, "siddd");
    // console.log(userID, "userIdddd");
    var productIds = [];

    state.map((item) => {
      productIds.push(item.product_id);
    });

    // console.log(serverId, productIds, "odoooldoo");

    var data = {
      jsonrpc: 2.0,
      params: {
        uid: userID,
        server_id: serverId,
        type: type,
        product_ids: productIds,
        domain: domain,
      },
    };
    // console.log(data, "dataaa");
    if (lock) {
      const res = await axios.post(baseUrl + "create/invoice", data, {
        headers: {
          "Set-Cookie": "session_id=" + sid,
          "Content-Type": "application/json",
        },
      });
      setIsLoading(false);
      if (res.data.result && res.data.result) {
        // message.success("Хүсэлт амжилттай биеллээ.");
        setBank(res.data.result.bank);
        setInvoiceId(res.data.result.invoice[0].invoice_id);
        setInvoice(res.data.result.invoice);
        setIsModalVisible(true);
      } else if (res.data.error) {
        message.warning("Алдаа гарлаа");
      } else {
        message.warning("Хүсэлт амжилтгүй");
      }
      // console.log(res, "purchase res");
    } else {
      message.warning("Домайнаа сонгоно уу!");
    }
  };

  const isChecked = (item, isRequired) => {
    if (!isRequired) {
      if (state.includes(item)) {
        let filtered = state.filter(function (el) {
          return el != item;
        });
        setState(filtered);
        // console.log(filtered, 'ggggg')
      } else {
        setState([...state, item]);
      }
    }
  };

  useEffect(() => {
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
    2;

    // console.log(serverId, "server Idii");
  }, [state]);

  useEffect(() => {
    setTotalPrice(programPrice + serverPrice - discount);
    setTaxPrice((Number(programPrice) + Number(serverPrice)) / Number(tax));
    setTaxPriceSeason(((programPrice + serverPrice) * 3) / Number(tax));
    setTaxPriceYear(((programPrice + serverPrice) * 12) / Number(tax));
    setProgramPriceSeason(Number(programPrice) * 3);
    setProgramPriceYear(Number(programPrice) * 12);
    // console.log(tax, taxPrice, "zaa");
  }, [programPrice, serverPrice]);
  useEffect(() => {
    // console.log(totalPrice * 3 + serverPrice * 3, "testtt");
    setTaxPrice(Number(totalPrice) / 10);
    setTaxPriceSeason((totalPrice * 3) / 10);
    setTaxPriceYear((totalPrice * 12) / 10);
    // console.log(
    //   serverPriceSeason,
    //   "<=>",
    //   programPriceSeason,
    //   "<=>",
    //   discountSeason,
    //   "<=>",
    //   totalPriceSeason,
    //   "uliral"
    // );
  }, [totalPrice]);
  useEffect(() => {
    setTotalPriceSeason(totalPrice * 3);
    setTotalPriceYear(totalPrice * 12);
    // console.log(totalPriceSeason, serverPrice, discountSeason, "uneee");
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
    // console.log(serverState1, "serverstateee1");
  }, [serverState1]);
  useEffect(() => {
    // console.log(serverState2, "serverstateee2");
  }, [serverState2]);
  useEffect(() => {
    // console.log(serverState3, "serverstateee3");
  }, [serverState3]);
  useEffect(() => {
    serverState1 && setServerPrice(pServerPrice);
    // console.log(pServerPrice, serverPrice, "ppppp");
  }, [pServerPrice]);

  useEffect(() => {
    serverState2 && setServerPrice(cServerPrice);
  }, [cServerPrice]);

  useEffect(async () => {
    var lglglg = [];

    if (additionalData) {
      var gArr = await Promise.all(
        additionalData.map((item) => {
          if (item.is_required === true) {
            return item;
          } else null;
        })
      );

      for (let i = 0; i < gArr.length; i++) {
        if (gArr[i]) {
          lglglg.push(gArr[i]);
        }
      }

      // console.log(gArr, "nemelt");
    }

    if (mainData) {
      var ggArray = await Promise.all(
        mainData.map((item) => {
          if (item.is_required === true) {
            return item;
          }
        })
      );

      for (let i = 0; i < ggArray.length; i++) {
        if (ggArray[i]) {
          lglglg.push(ggArray[i]);
        }
      }

      // console.log(lglglg, "ggwgwgwgwgw");
    }

    setState(lglglg);
    // console.log(lglglg, "lgggg");
  }, [mainData]);

  useEffect(() => {
    // console.log(totalPriceSeason, "season price");
  }, [totalPriceSeason]);

  // useEffect(() => {
  //   if (additionalData) {
  //     additionalData.map((item) => {
  //       if (item.is_required) {
  //         setState([...state, item]);
  //       }
  //     });
  //   }
  // }, [additionalData]);

  return (
    <div>
      <Head>
        <title>iFinance | Худалдан авах</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {/* <div className="relative  h-[100px] md:h-auto overflow-hidden md:overflow-visible">
        <div className="absolute z-20 flex flex-col w-full h-full">
          <div className="w-full flex justify-center h-[100px] fixed ">
            <NavbarTrans />
          </div>
          <div className="hidden my-auto uppercase xl:flex justify-center items-center text-white h-2/3 text-[36px] font-poppins-semibold">
            Үнийн санал
          </div>
        </div>

        <Image
          className=" w-[100vw] h-[100px] md:h-auto scale-150 md:scale-100"
          preview={false}
          src="/img/Slider.svg"
        />
      </div>
      <div className=" xl:hidden mt-10  my-auto font-poppins-semibold uppercase flex justify-center items-center text-[#2E28D4] h-2/3 text-[36px] font-semibold">
        Худалдан авах
      </div> */}
      <div className=" md:fixed z-30 h-[100px] flex  overflow-hidden">
        <div className="absolute z-30  flex flex-col w-full h-[100px]">
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
      <div className="  relative">
        <div className="xl:absolute z-20 flex flex-col w-full h-full justify-center mt-[90px] ">
          <div className=" mt-[20px] 2xl:ml-[20vw] md:ml-[7vw] lg:flex justify-between w-[450px] hidden">
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
                Бүтээгдэхүүн
              </a>
            </div>
            <div>
              <Image preview={false} src="/img/right.svg" />
            </div>
            <div className="text-white text-[14px] font-semibold">
              Худалдан авах
            </div>
          </div>
          <div className=" text-center 2xl:pl-[20vw] md:pl-[7vw] text-[#2E28D4]  my-auto font-poppins-semibold uppercase xl:flex  items-center xl:text-white h-2/3 text-[36px] font-semibold">
            Худалдан авах
          </div>
        </div>
        <Image
          className=" hidden xl:flex w-[100vw] mt-[100px]"
          preview={false}
          src="/img/dashboard.svg"
        />
      </div>
      <div className=" xl:mt-[80px] flex flex-col md:flex-col xl:flex-row   justify-center mb-[100px]">
        <div className=" flex  justify-center ">
          <div className=" w-full ">
            {/* <div>
              <p className=" border-l-2 border-[#2E28D4] text-[#2E28D4] pl-2 text-[24px] font-semibold mt-4 ">
                Хэрэглэгчийн тоо
              </p>
            </div> */}

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

            <div className="   shadow-custom">
              <div className="pl-2  flex text-[1.5rem] text-white items-center xl:w-[48.125rem] h-[3.875rem] rounded-t-xl bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD] ">
                {mainData && mainData[0]?.product_category}
              </div>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-5 lg:gap-4   xl:pl-6 pb-[30px] xl:w-[48.125rem] px-2 ">
                {mainData?.map((item, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => isChecked(item, item.is_required)}
                      className={`
                      ${item.is_required && "cursor-not-allowed"}
                      mt-[24px] xl:w-[140px] h-auto  rounded-[8px] border-[1px]  ${
                        state.includes(item)
                          ? "border-[#2E28D4]"
                          : "border-[#9CA6C0]"
                      }
                    `}
                    >
                      <div className=" p-[10px]  flex justify-between  ">
                        <div className="">
                          <div className="text-[#2F3747] w-[100px]  font-semibold text-[14px] h-[80px]">
                            {item.product_name}
                          </div>
                          <Divider className="price bg-black " />
                          <div className=" ">
                            {item.product_discount == 0 ? (
                              <div className=" flex w-[100px] justify-end">
                                <div className="text-[#2F3747] text-[16px] font-semibold mt-4 ">
                                  {helper.formatValue(item.product_price)}₮
                                </div>
                              </div>
                            ) : (
                              <div className="flex  justify-end">
                                <div className="flex w-[100px] items-center">
                                  <div className=" flex justify-center w-[100px] h-[24px] bg-[#F01A634D] bg-opacity-30 ml-[10px]  mt-5 text-[#F01A63] text-[13px] items-center font-medium">
                                    -{item.product_discount}%
                                  </div>

                                  <div className="text-[#2F3747] text-[16px] ml-[5px] font-semibold mt-4  ">
                                    {helper.formatValue(
                                      Number(item.product_price) -
                                        Number(item.product_price) *
                                          (Number(item.product_discount) / 100)
                                    )}
                                    ₮
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        <div>
                          <div>
                            {item.is_required ? (
                              <Checkbox checked />
                            ) : (
                              <Checkbox checked={state.includes(item)} />
                            )}
                          </div>
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
              <div className="grid grid-cols-2 gap-3  md:grid-cols-5 lg:gap-4   md:pl-4 pb-[30px] xl:w-[48.125rem] px-2 ">
                {additionalData?.map((item, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => isChecked(item, item.is_required)}
                      className={`
                      ${item.is_required && "cursor-not-allowed"}
                      mt-[24px] xl:w-[140px] h-auto  rounded-[8px] border-[1px]  ${
                        state.includes(item)
                          ? "border-[#2E28D4]"
                          : "border-[#9CA6C0]"
                      }
                    `}
                    >
                      <div className=" p-[10px]  flex justify-between  ">
                        <div className="">
                          <div className="text-[#2F3747] w-[100px]  font-semibold text-[14px] h-[80px]">
                            {item.product_name}
                          </div>
                          <Divider className="price bg-black " />
                          <div className=" ">
                            {item.product_discount == 0 ? (
                              <div className=" flex w-[100px] justify-end">
                                <div className="text-[#2F3747] text-[16px] font-semibold mt-4 ">
                                  {helper.formatValue(item.product_price)}₮
                                </div>
                              </div>
                            ) : (
                              <div className="flex  justify-end">
                                <div className="flex w-[100px] items-center">
                                  <div className=" flex justify-center w-[100px] h-[24px] bg-[#F01A634D] bg-opacity-30 ml-[10px]  mt-5 text-[#F01A63] text-[13px] items-center font-medium">
                                    -{item.product_discount}%
                                  </div>

                                  <div className="text-[#2F3747] text-[16px] ml-[5px] font-semibold mt-4  ">
                                    {helper.formatValue(
                                      Number(item.product_price) -
                                        Number(item.product_price) *
                                          (Number(item.product_discount) / 100)
                                    )}
                                    ₮
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        <div>
                          <div>
                            {item.is_required ? (
                              <Checkbox checked />
                            ) : (
                              <Checkbox checked={state.includes(item)} />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className=" flex flex-col mb-10 xl:mb-0">
          <div className=" lg:ml-[30px] w-[370px]   lg:h-[530px] shadow-custom rounded-[8px] ">
            <Tabs className="payment" defaultActiveKey="1">
              <TabPane tab="САР" key="1">
                <div className=" flex flex-col justify-center items-center">
                  <div className=" flex justify-between  w-[322px]">
                    <div className=" text-[#2F3747] text-[16px] font-medium">
                      {numberOfProgram} модуль
                    </div>
                    <div className="text-[#2F3747] text-[16px] font-semibold">
                      {helper.formatValue(programPrice)}₮
                    </div>
                  </div>
                  <Divider className="bill" />

                  <div className=" flex justify-between w-[322px]">
                    <div className=" text-[#2F3747] text-[16px] font-medium">
                      Сервер
                    </div>
                    <div className="text-[#2F3747] text-[16px] font-semibold">
                      {helper.formatValue(serverPrice)}₮
                    </div>
                  </div>
                  <Divider className="bill" />
                  <div className=" flex justify-between w-[322px]">
                    <div className=" text-[#2F3747] text-[16px] font-medium">
                      НӨАТ
                    </div>
                    <div className="text-[#2F3747] text-[16px] font-semibold">
                      {helper.formatValue(taxPrice)}₮
                    </div>
                  </div>
                  <Divider className="bill" />
                  <div className=" flex justify-between w-[322px] ">
                    <div className=" text-[#2F3747] text-[16px] font-medium">
                      Хөнгөлөлт
                    </div>
                    <div className="text-[#30D82E] text-[16px] font-semibold">
                      {helper.formatValue(discount != 0 ? -discount : 0)}₮
                    </div>
                  </div>
                  <Divider className="bill" />

                  <div className=" flex justify-between w-[322px]">
                    <div className=" text-[#2F3747] text-[16px] font-semibold">
                      Нийт төлбөр
                    </div>
                    <div className="text-[#2F3747] text-[16px] font-semibold">
                      {helper.formatValue(totalPrice)}₮
                    </div>
                  </div>
                  <Divider className="bill" />

                  <div className=" w-full  flex flex-col justify-center items-center">
                    {/* <div className="text-[13px] text-[#9CA6C0] font-normal">
                      (2) Billed annually: $216.00 USD
                    </div> */}
                    <div className=" flex w-[322px] h-[86px] bg-[#F09A1A] bg-opacity-10 rounded-[4px] mt-[16px]">
                      <div className=" pt-[16px] pl-[17px] pr-[17px]">
                        <Image preview={false} src="/img/warning.png" />
                      </div>
                      <p className=" pt-[16px] w-[300px] pr-[16px] text-[#F09A1A] text-[13px] font-medium">
                        Хэрвээ та клауд сервэр сонгосон бол таны сервэр
                        автоматаар үүсэж худалдан авсан бараанууд автоматаар
                        суугдана.
                      </p>
                    </div>
                  </div>
                  <div className=" flex justify-center mt-[30px] pb-4 lg:pb-0">
                    {sid ? (
                      <Button
                        className=" text-[14px] font-bold w-[200px] h-[48px] text-white rounded-[43px] bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD] border-none"
                        type="primary"
                        onClick={() => onPurchase("month")}
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
                  {/* <div className=" mx-[24px] my-[30px]">
                    <p className="text-[14px] text-[#9CA6C0] font-normal">
                      (1) New customers get a discount on the initial number of
                      users purchased. ($6.00 USD instead of $8.00 USD).
                    </p>
                  </div> */}
                </div>
              </TabPane>
              <TabPane tab="УЛИРАЛ" key="2">
                <div className=" flex flex-col justify-center items-center">
                  <div className=" flex justify-between  w-[322px]">
                    <div className=" text-[#2F3747] text-[16px] font-medium">
                      {numberOfProgram} модуль
                    </div>
                    <div className="text-[#2F3747] text-[16px] font-semibold">
                      {helper.formatValue(programPriceSeason)}₮
                    </div>
                  </div>
                  <Divider className="bill" />

                  <div className=" flex justify-between w-[322px]">
                    <div className=" text-[#2F3747] text-[16px] font-medium">
                      Сервер
                    </div>
                    <div className="text-[#2F3747] text-[16px] font-semibold">
                      {helper.formatValue(serverPriceSeason)}₮
                    </div>
                  </div>
                  <Divider className="bill" />
                  <div className=" flex justify-between w-[322px]">
                    <div className=" text-[#2F3747] text-[16px] font-medium">
                      НӨАТ
                    </div>
                    <div className="text-[#2F3747] text-[16px] font-semibold">
                      {helper.formatValue(taxPriceSeason)}₮
                    </div>
                  </div>
                  <Divider className="bill" />
                  <div className=" flex justify-between w-[322px] ">
                    <div className=" text-[#2F3747] text-[16px] font-medium">
                      Хөнгөлөлт
                    </div>
                    <div className="text-[#30D82E] text-[16px] font-semibold">
                      {helper.formatValue(
                        discountSeason != 0 ? -discountSeason : 0
                      )}
                      ₮
                    </div>
                  </div>
                  <Divider className="bill" />

                  <div className=" flex justify-between w-[322px]">
                    <div className=" text-[#2F3747] text-[16px] font-semibold">
                      Нийт төлбөр
                    </div>
                    <div className="text-[#2F3747] text-[16px] font-semibold">
                      {helper.formatValue(totalPriceSeason)}₮
                    </div>
                  </div>
                  <Divider className="bill" />

                  <div className=" w-full  flex flex-col justify-center items-center">
                    {/* <div className="text-[13px] text-[#9CA6C0] font-normal">
                      (2) Billed annually: $216.00 USD
                    </div> */}
                    <div className=" flex w-[322px] h-[86px] bg-[#F09A1A] bg-opacity-10 rounded-[4px] mt-[16px]">
                      <div className=" pt-[16px] pl-[17px] pr-[17px]">
                        <Image src="/img/warning.png" />
                      </div>
                      <p className=" pt-[16px] pr-[16px] w-[300px] text-[#F09A1A] text-[13px] font-medium">
                        Хэрвээ та клауд сервэр сонгосон бол таны сервэр
                        автоматаар үүсэж худалдан авсан бараанууд автоматаар
                        суугдана.
                      </p>
                    </div>
                  </div>
                  <div className=" flex justify-center mt-[30px]">
                    {sid ? (
                      <Button
                        className=" text-[14px] font-bold w-[200px] h-[48px] text-white rounded-[43px] bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD] border-none"
                        type="primary"
                        onClick={() => onPurchase("season")}
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
                  {/* <div className=" mx-[24px] my-[30px]">
                    <p className="text-[14px] text-[#9CA6C0] font-normal">
                      (1) New customers get a discount on the initial number of
                      users purchased. ($6.00 USD instead of $8.00 USD).
                    </p>
                  </div> */}
                </div>
              </TabPane>
              <TabPane tab="ЖИЛ" key="3">
                <div className=" flex flex-col justify-center items-center">
                  <div className=" flex justify-between  w-[322px]">
                    <div className=" text-[#2F3747] text-[16px] font-medium">
                      {numberOfProgram} модуль
                    </div>
                    <div className="text-[#2F3747] text-[16px] font-semibold">
                      {helper.formatValue(programPriceYear)}₮
                    </div>
                  </div>
                  <Divider className="bill" />

                  <div className=" flex justify-between w-[322px]">
                    <div className=" text-[#2F3747] text-[16px] font-medium">
                      Сервер
                    </div>
                    <div className="text-[#2F3747] text-[16px] font-semibold">
                      {helper.formatValue(serverPriceYear)}₮
                    </div>
                  </div>
                  <Divider className="bill" />
                  <div className=" flex justify-between w-[322px]">
                    <div className=" text-[#2F3747] text-[16px] font-medium">
                      НӨАТ
                    </div>
                    <div className="text-[#2F3747] text-[16px] font-semibold">
                      {helper.formatValue(taxPriceYear)}₮
                    </div>
                  </div>
                  <Divider className="bill" />
                  <div className=" flex justify-between w-[322px] ">
                    <div className=" text-[#2F3747] text-[16px] font-medium">
                      Хөнгөлөлт
                    </div>
                    <div className="text-[#30D82E] text-[16px] font-semibold">
                      {helper.formatValue(
                        discountYear != 0 ? -discountYear : 0
                      )}
                      ₮
                    </div>
                  </div>
                  <Divider className="bill" />

                  <div className=" flex justify-between w-[322px]">
                    <div className=" text-[#2F3747] text-[16px] font-semibold">
                      Нийт төлбөр
                    </div>
                    <div className="text-[#2F3747] text-[16px] font-semibold">
                      {helper.formatValue(totalPriceYear)}₮
                    </div>
                  </div>
                  <Divider className="bill" />

                  <div className=" w-full  flex flex-col justify-center items-center">
                    {/* <div className="text-[13px] text-[#9CA6C0] font-normal">
                      (2) Billed annually: $216.00 USD
                    </div> */}
                    <div className=" flex w-[322px] h-[86px] bg-[#F09A1A] bg-opacity-10 rounded-[4px] mt-[16px]">
                      <div className=" pt-[16px] pl-[17px] pr-[17px]">
                        <Image src="/img/warning.png" />
                      </div>
                      <p className=" pt-[16px] pr-[16px] w-[300px] text-[#F09A1A] text-[13px] font-medium">
                        Хэрвээ та клауд сервэр сонгосон бол таны сервэр
                        автоматаар үүсэж худалдан авсан бараанууд автоматаар
                        суугдана.
                      </p>
                    </div>
                  </div>
                  <div className=" flex justify-center mt-[30px]">
                    {sid ? (
                      <Button
                        className=" text-[14px] font-bold w-[200px] h-[48px] text-white rounded-[43px] bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD] border-none"
                        type="primary"
                        onClick={() => onPurchase("year")}
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
                  {/* <div className=" mx-[24px] my-[30px]">
                    <p className="text-[14px] text-[#9CA6C0] font-normal">
                      (1) New customers get a discount on the initial number of
                      users purchased. ($6.00 USD instead of $8.00 USD).
                    </p>
                  </div> */}
                </div>
              </TabPane>
            </Tabs>
          </div>
          <div className=" lg:ml-[30px] mt-[1.875rem] mb-[30px] shadow-custom  w-[375px]">
            <div className=" pl-2 flex  text-[1.5rem] text-white items-center lg:w-[375px] h-[3.875rem] rounded-t-[4px] bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD] ">
              Сервер байршуулах:
            </div>
            {/* <div>
              <div className=" mx-[24px]   lg:w-[330px] lg:mx-[24px] border-[1px] border-[#9CA6C0] mt-[24px] rounded-[8px]">
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
                    
                      </div>
                    </div>
                  </div>
                  <div className=" mt-[16px]">
                    <Select
                      disabled={serverState2 || serverState3 ? true : false}
                      defaultValue="Сонгох"
                     
                      className=" w-[280px] lg:w-[290px]"
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
            </div> */}
            <div className=" w-full">
              <div className=" mx-[24px]  lg:w-[330px] xl:mx-[24px] border-[1px] border-[#9CA6C0] mt-[24px] rounded-[8px]">
                <div className=" p-[20px]">
                  <div className=" flex w-full  justify-between">
                    <div className="text-[#2F3747] text-[16px] font-semibold">
                      1. Cloud.mn Клауд Платформ
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
                      className=" w-[280px] xl:w-[290px]"
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
              <div className="   lg:w-[330px] mx-[24px] border-[1px] border-[#9CA6C0] mt-[24px]  rounded-[8px]">
                <div className=" p-[20px]">
                  <div className=" flex w-full  justify-between">
                    <div className="text-[#2F3747] text-[16px] font-semibold">
                      2. Өөрсдийн сервер дээр байршуулах
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
          <div className=" w-[370px]  shadow-lg lg:ml-[30px] mt-5 rounded-[4px] p-[20px]">
            <div className="flex">
              <Input
                addonBefore="https://"
                addonAfter=".ifinance.mn"
                placeholder="Домайн нэр"
                disabled={lock}
                onChange={(e) => setDomain(e.target.value)}
              />
              <Button type="default" onClick={() => setLock(false)}>
                X
              </Button>
            </div>
            {domainState != null && (
              <div className=" flex justify-center mt-4">
                {domainState ? (
                  <p className=" text-green-500">Боломжтой</p>
                ) : (
                  <p className=" text-red-500">Боломжгүй</p>
                )}
              </div>
            )}
            <div className=" flex w-[322px] h-[86px] bg-[#F09A1A] bg-opacity-10 rounded-[4px] ">
              <div className=" pt-[16px] pl-[17px] pr-[17px]">
                <Image preview={false} src="/img/warning.png" />
              </div>
              <p className=" pt-[16px] w-[350px] pr-[16px] text-[#F09A1A] text-[13px] font-medium">
                Домайн хаягаа дараа нь өөрийн хаягаараа солих боломжтой.
              </p>
            </div>
            <div className=" flex justify-center mt-[30px]">
              {sid ? (
                <Button
                  className=" text-[14px] font-bold w-[200px] h-[48px] text-white rounded-[43px] bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD] border-none"
                  type="primary"
                  onClick={onCheck}
                >
                  Шалгах
                </Button>
              ) : (
                <Button
                  className=" text-[14px] font-bold w-[200px] h-[48px] text-white rounded-[43px] bg-[#9CA6C0] border-none"
                  type="primary"
                  disabled
                >
                  Шалгах
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <Modal
        title="Төлбөр төлөх"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[]}
        className="buy"
      >
        <Tabs className="buyTab" defaultActiveKey="1">
          <TabPane tab="QPay үйлчилгээ" key="1">
            <div>
              {invoice?.map((item, index) => {
                return (
                  <div className="flex justify-center">
                    <Image
                      className=""
                      preview={false}
                      src={"data:image/png;base64," + item.invoice_qr}
                    />
                  </div>
                );
              })}
            </div>
            <div className=" flex items-center md:w-[510px] bg-[#F09A1A] bg-opacity-10 rounded-[4px] h-[74px]">
              <div className="flex ">
                <div className=" mr-[17px] pl-[17px]">
                  <Image className="" preview={false} src="/img/warning.png" />
                </div>
                <div className="  md:w-[400px] text-[14px] text-[#F09A1A]  ">
                  Та энэ QRCode -ийг доорх банкуудын гар утасны аппликейшнийг
                  ашиглан уншуулж орлого хийнэ үү.
                </div>
              </div>
            </div>
            <div className="w-full flex justify-between mt-[16px]">
              <div className="  font-semibold text-[16px] text-[#2F3747]">
                Төлөх дүн
              </div>
              <div className=" font-semibold text-[16px] text-[#2F3747]">
                {invoice?.map((item) => {
                  return helper.formatValue(item.invoice_amount) + "₮";
                })}
              </div>
            </div>
            <Divider />
            <div className=" w-[300px] md:w-[510px] h-[250px] md:h-[176px] bg-[#F01A63] bg-opacity-10 rounded-[4px] flex items-center ">
              <div className=" flex flex-col  h-[240px] md:h-[144px] justify-between">
                <div className=" flex">
                  <div className=" mx-[17px]">
                    {" "}
                    <Image
                      className=""
                      preview={false}
                      src="/img/warningred.svg"
                    />
                  </div>
                  <div className=" w-[240px] md:w-[446px] text-[#F01A63] text-[13px] font-semibold">
                    Зөвхөн IFinance-д бүртгэлтэй дансаар орлого шилжүүлэхийг
                    анхаарна уу.
                  </div>
                </div>
                <div className=" flex">
                  <div className=" mx-[17px]">
                    {" "}
                    <Image
                      className=""
                      preview={false}
                      src="/img/warningred.svg"
                    />
                  </div>
                  <div className=" w-[240px] md:w-[446px] text-[#F01A63] text-[13px] font-semibold">
                    Орлогын гүйлгээний утга дээр зөвхөн бүртгэлтэй имэйл хаягаа
                    бичихийг анхаарна уу.
                  </div>
                </div>
                <div className=" flex w-full   ">
                  <div className=" mx-[17px]">
                    {" "}
                    <Image
                      className=""
                      preview={false}
                      src="/img/warningred.svg"
                    />
                  </div>
                  <div className=" w-[240px] md:w-[446px] text-[#F01A63] text-[13px] font-semibold">
                    Хэрэв өөр дансаар болон имэйл хаягийг буруу бичиж шилжүүлсэн
                    тохиолдолд таны худалдан авалт амжилтгүй болно.
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-[30px]">
              <Button
                onClick={checkPayment}
                type="primary"
                className=" w-[200px] h-[48px]   rounded-[43px] bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD] border-none text-[14px] font-bold"
              >
                Шалгах
              </Button>
            </div>
          </TabPane>
          <TabPane tab="БАНКНЫ ДАНСААР" key="2">
            {bank?.map((item, index) => {
              return (
                <Collapse
                  onChange={() => onChange(item)}
                  expandIcon={() =>
                    open.includes(item) ? (
                      <div>
                        <Image
                          preview={false}
                          className=" "
                          src="/img/payPlus2.svg"
                        />
                      </div>
                    ) : (
                      <div>
                        <Image preview={false} src="/img/payPlus.svg" />
                      </div>
                    )
                  }
                  className="alidaa"
                  expandIconPosition="right"
                  accordion
                >
                  <Panel
                    className=" paymentModal"
                    header={
                      <div className=" flex ">
                        <div>
                          <Image
                            className=" w-[40px] h-[40px] rounded-[8px]"
                            preview={false}
                            src={
                              "data:image/png;base64," + item.invoice_bank_logo
                            }
                          />
                        </div>
                        <div className=" ml-[16px]">{item.invoice_bank}</div>
                      </div>
                    }
                    key={index}
                  >
                    <div key={index}>
                      {/* <div className=" flex items-center mt-[20px]">
                        <div>
                          <Image
                            preview={false}
                            src={
                              "data:image/png;base64," + item.invoice_bank_logo
                            }
                          />
                        </div>
                        <div className=" ml-[16px] text-[24px] text-[#2F3747] font-bold">
                          {item.invoice_bank}
                        </div>
                      </div> */}

                      <div className=" w-full flex justify-between mt-[20px]">
                        <div>
                          <div className="text-[14px] text-[#2F3747] opacity-60 font-thin">
                            Дансны дугаар
                          </div>
                          <div className="text-[18px] text-[#2F3747] font-bold">
                            {item.invoice_bank_number}
                          </div>
                        </div>
                        <div className=" flex items-center">
                          <CopyToClipboard text={item.invoice_bank_number}>
                            <div
                              onClick={() =>
                                message.success("Амжилттай хуулагдлаа")
                              }
                              className=" flex items-center cursor-pointer"
                            >
                              <div className="">
                                <Image preview={false} src="/img/copy.svg" />
                              </div>
                              <div className="ml-[16px] text-[16px] text-[#2F3747] opacity-40 font-normal">
                                Хуулах
                              </div>
                            </div>
                          </CopyToClipboard>
                        </div>
                      </div>
                      <div className=" w-full flex justify-between mt-[20px]">
                        <div>
                          <div className="text-[14px] text-[#2F3747] opacity-60 font-thin">
                            Дансны нэр
                          </div>
                          <div className="text-[18px] text-[#2F3747] font-bold">
                            {item.invoice_bank_account_name}
                          </div>
                        </div>
                        <div className=" flex items-center">
                          <CopyToClipboard
                            text={item.invoice_bank_account_name}
                          >
                            <div
                              onClick={() =>
                                message.success("Амжилттай хуулагдлаа")
                              }
                              className=" flex items-center cursor-pointer"
                            >
                              <div className="">
                                <Image preview={false} src="/img/copy.svg" />
                              </div>
                              <div className="ml-[16px] text-[16px] text-[#2F3747] opacity-40 font-normal">
                                Хуулах
                              </div>
                            </div>
                          </CopyToClipboard>
                        </div>
                      </div>
                      <div className=" w-full flex justify-between mt-[20px]">
                        <div>
                          <div className="text-[14px] text-[#2F3747] opacity-60 font-thin">
                            Гүйлгээний утга
                          </div>
                          <div className="text-[18px] text-[#2F3747] font-bold">
                            {invoice?.map((item) => {
                              return item.invoice_name;
                            })}
                          </div>
                        </div>
                        <div className=" flex items-center">
                          <CopyToClipboard
                            text={invoice?.map((item) => {
                              return item.invoice_name;
                            })}
                          >
                            <div
                              onClick={() =>
                                message.success("Амжилттай хуулагдлаа")
                              }
                              className=" flex items-center cursor-pointer"
                            >
                              <div className="">
                                <Image preview={false} src="/img/copy.svg" />
                              </div>
                              <div className="ml-[16px] text-[16px] text-[#2F3747] opacity-40 font-normal">
                                Хуулах
                              </div>
                            </div>
                          </CopyToClipboard>
                        </div>
                      </div>
                      <div className=" w-full flex justify-between mt-[20px]">
                        <div>
                          <div className="text-[14px] text-[#2F3747] opacity-60 font-thin">
                            Төлөх дүн
                          </div>
                          <div className="text-[18px] text-[#2F3747] font-bold">
                            {invoice?.map((item) => {
                              return (
                                helper.formatValue(item.invoice_amount) + "₮"
                              );
                            })}
                          </div>
                        </div>
                        <div className=" flex items-center">
                          <CopyToClipboard
                            text={invoice?.map((item) => {
                              return item.invoice_amount;
                            })}
                          >
                            <div
                              onClick={() =>
                                message.success("Амжилттай хуулагдлаа")
                              }
                              className=" flex items-center cursor-pointer"
                            >
                              <div className="">
                                <Image preview={false} src="/img/copy.svg" />
                              </div>
                              <div className="ml-[16px] text-[16px] text-[#2F3747] opacity-40 font-normal">
                                Хуулах
                              </div>
                            </div>
                          </CopyToClipboard>
                        </div>
                      </div>
                      <div className=" flex items-center w-[510px] bg-[#F09A1A] bg-opacity-10 rounded-[4px] h-[74px] mt-[24px]">
                        <div className="flex ">
                          <div className=" mr-[17px] pl-[17px]">
                            <Image
                              className=""
                              preview={false}
                              src="/img/warning.png"
                            />
                          </div>
                          <div className=" w-[400px] text-[14px] text-[#F09A1A]  ">
                            Таны төлбөр төлөлт амжилттай хийгдсэний дараа 5
                            минутын дотор худалдан авалт хийгдэнэ.
                          </div>
                        </div>
                      </div>
                    </div>
                  </Panel>
                </Collapse>
              );
            })}

            <div className="flex justify-center mt-[30px]">
              <Button
                onClick={checkPayment}
                type="primary"
                className=" w-[200px] h-[48px]   rounded-[43px] bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD] border-none text-[14px] font-bold"
              >
                Шалгах
              </Button>
            </div>
          </TabPane>
        </Tabs>
      </Modal>
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
