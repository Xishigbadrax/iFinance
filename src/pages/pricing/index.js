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
} from "antd";

import Auth from "../../utils/auth";
// import { useRouter } from "next/router";
import axios from "axios";
import Context from "../../context/Context";
import Footer from "../../components/Footer";
import { set } from "js-cookie";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Head from "next/head";

const Pricing = ({}) => {
  // const router = useRouter();
  // const { id } = router.query;
  // console.log(id, 'this is id')
  const { setIsLoading } = useContext(Context);
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
  const [arrayNames, setArrayNames] = useState([]);
  const [arrayIds, setArrayIds] = useState([]);
  const [test, setTest] = useState(false);

  const [domain, setDomain] = useState();
  const [domainState, setDomainState] = useState(null);
  const [lock, setLock] = useState(false);

  // const [isChecked, setIsChecked] = useState([]);

  const handleChange = (value) => {
    // console.log(value, "serveree");
    value && setServerId(value[1]);
    value && setpServerPrice(Number(value[2]));
    setServerState1((prev) => !prev);
  };
  const handleCancel = (value) => {
    setIsModalVisible(false);
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
            category_id: "",
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
        if (response.data.result.main_products) {
          var mainProduct = response.data.result.main_products;

          var names = [];
          var id = [];

          mainProduct.map((item) => {
            if (!names.includes(item.product_category)) {
              names.push(item.product_category);
              id.push(item.product_category_id);
            }
          });

          var lastArray = [];

          names.map((item, index) => {
            lastArray.push({ name: item, id: id[index] });
          });

          setArrayNames(lastArray);
        }

        console.log(response, "all module");
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
      },
    };
    // console.log(data, "dataaa");
    const res = await axios.post(baseUrl + "create/invoice", data, {
      headers: {
        "Set-Cookie": "session_id=" + sid,
        "Content-Type": "application/json",
      },
    });
    if (res.data.result && res.data.result) {
      // message.success("Хүсэлт амжилттай биеллээ.");
      setBank(res.data.result.bank);
      setInvoice(res.data.result.invoice);
      setIsModalVisible(true);
    } else {
      message.warning("Хүсэлт амжилтгүй");
    }
    // console.log(res, "purchase res");
  };
  // console.log(arrayNames, "idss")
  const onCheck = async () => {
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
        console.log(response, "dom shalgah");
        setDomainState(response.data.result);
        response?.data?.result == true ? setLock(true) : setLock(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const isChecked = (item, isRequired) => {
    if (!isRequired) {
      if (!state.includes(item)) {
        return item;
      }
    }
  };

  const isModuleCheck = async (item, isRequired) => {
    if (!isRequired) {
      if (state.includes(item)) {
        // var filtered = state.filter(function (el) {
        //   return el == item;
        // });
        var p = null;
        mainData?.map((baraa) => {
          if (baraa.product_dependency?.includes(item.product_id)) {
            p = true;
          }
        });

        if (p) {
          mainData?.map((element) => {
            if (element.product_dependency?.includes(item.product_id)) {
              console.log("1");
              let filtered2 = state.filter(function (el) {
                return el != element;
              });

              console.log(filtered2, "filtered 2");

              var lastFilter = filtered2.filter(function (el) {
                return el != item;
              });
              setState(lastFilter);
              p = false;
            }

            // else {
            //   console.log("2");
            //   var filtered = state.filter(function (el) {
            //     return el != item;
            //   });
            //   setState(filtered);
            // }
          });
        } else {
          var filtered = state.filter(function (el) {
            return el != item;
          });
          setState(filtered);
        }

        // setState(filtered);
      } else {
        if (item.product_dependency == false) {
          setState([...state, item]);
        } else {
          // mainData?.map((el) => {
          //   item.product_dependency?.map((hamt) => {
          //     if (el.product_id == hamt) {
          //       if (state.includes(el)) {
          //         setState([...state, item]);
          //       }
          //       else {

          //         console.log( hamt,"bnuu")
          //         setState([...state, el, item]);
          //       }
          //     }
          //   })

          // })

          var response2 = await Promise.all(
            mainData?.map((baraa) => {
              for (let i = 0; i < item.product_dependency.length; i++) {
                if (baraa.product_id == item.product_dependency[i]) {
                  return isChecked(baraa, baraa.is_required);
                }
              }
            })
          );
          var test = [];
          for (let i = 0; i < response2.length; i++) {
            if (response2[i] instanceof Object) {
              test.push(response2[i]);
            }
          }

          // item.product_dependency?.map((el) => {
          //   mainData?.map((hamt) => {
          //     if (el == hamt.product_id) {
          //       if (state.includes(hamt)) {
          //         setState([...state, item]);
          //       }
          //       else {
          //         var ar = [];
          //         ar.push(...ar ,hamt);
          //         // console.log( ar,"bnuu")
          //       }
          //       // setState([...state, ...hamt, item]);
          //     }
          //   })

          // })
          setState((prev) => [...prev, ...test, item]);
        }
      }
    }
  };

  const tursh = async (catId, isTrue) => {
    // console.log(isTrue, "sdfsdfsfsf");

    if (isTrue) {
      var lastArraay = await Promise.all(
        mainData.filter(function (el) {
          if (el.is_required == false) {
            if (!state.includes(el)) {
              
              return el.product_category_id == catId;
            }
          }
        })
      );
      setState((prev) => [...prev, ...lastArraay]);
      
      // var response = await Promise.all(mainData?.map((item) => {
      //   if (item.product_category_id == catId) {
      //     return isChecked(item, item.is_required)
      //   }
      // }))

      // var lalar = []

      // for (let i = 0; i < response.length; i++) {
      //   if (response[i] instanceof Object) {
      //     lalar.push(response[i])
      //   }
      // }

      // setState([...state, ...lalar]);
    } else {
      var lastArraay = await Promise.all(
        state.filter(function (el) {
          return el.is_required == true || el.product_category_id != catId;
        })
      );

      setState(lastArraay);
    }
  };

  // const deleteCheckedAdd = async (item) => {

  //   if (state.includes(item)) {
  //     if (!item.is_required) {
  //       var response = await Promise.all(additionalData?.map((item) => {
  //           return isChecked(item, item.is_required)
  //       }))
  //       var lalar = []

  //       for (let i = 0; i < response.length; i++) {
  //         if (response[i] instanceof Object) {
  //           lalar.push(response[i])
  //         }
  //       }

  //       lalar.map((element) => {
  //         state.filter(function(el) {
  //           setState(el != element);
  //         })
  //       })
  //     }

  //   }
  // }

  const CheckAllAdditional = async (isTrue) => {
    if (isTrue) {
      var addArray = await Promise.all(
        additionalData.filter(function (el) {
          return el;
        })
      );

      setState((prev) => [...prev, ...addArray]);

      // var response = await Promise.all(additionalData?.map((item) => {

      //     return isChecked(item, item.is_required)

      // }))

      // var lalar = []

      // for (let i = 0; i < response.length; i++) {
      //   if (response[i] instanceof Object) {
      //     lalar.push(response[i])
      //   }
      // }

      // setState([...state, ...lalar]);
    } else {
      var deleteArray = await Promise.all(
        state.filter(function (el) {
          return el.is_required == true;
        })
      );

      setState(deleteArray);
      //       additionalData?.map( (item) => {
      //         deleteCheckedAdd(item)
      //     }
      // )
    }
  };

  useEffect(() => {
    console.log(state, "gg state");
  }, [state]);

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

  return (
    <div>
      <Head>
        <title>iFinance | Үнийн санал</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {/* <div className="relative h-[100px] md:h-auto overflow-hidden md:overflow-visible">
        <div className="absolute z-20 flex flex-col w-full h-full">
          <div className="w-full flex justify-center h-[100px]  bg-black fixed  ">
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
        Үнийн санал
      </div> */}

      <div className=" xl:fixed z-30 h-[100px] flex  overflow-hidden">
        <div className="absolute z-30  flex flex-col w-full h-full">
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
          <div className=" mt-[20px] ml-[375px] lg:flex justify-between w-[300px] hidden">
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
            <div className="text-white text-[14px] font-semibold">
              Үнийн санал
            </div>
          </div>
          <div className=" text-center  lg:mt-20 lg:pl-[375px] text-[#2E28D4]  my-auto font-poppins-semibold uppercase xl:flex   items-center lg:text-white   text-[36px] font-semibold">
            Үнийн санал
          </div>
        </div>
        <Image
          className=" hidden xl:flex w-[100vw] mt-[100px]"
          preview={false}
          src="/img/dashboard.svg"
        />
      </div>
      <div className=" xl:mt-[80px] flex flex-col md:flex-col xl:flex-row   justify-center">
        <div className=" flex  justify-center ">
          <div className=" w-full ">
            {arrayNames?.map((item, index) => (
              <div className="  shadow-custom">
                <div className="pl-2 justify-between  flex text-[1.5rem] text-white items-center  xl:w-[49.125rem] h-[3.875rem] rounded-t-xl bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD] ">
                  <div>{index + 1 + ". " + item.name}</div>
                  <div className=" mr-[10px]">
                    <Checkbox
                      onClick={(e) => tursh(item.id, e.target.checked)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 lg:grid-cols-5 lg:gap-4   xl:pl-6 pb-[30px] xl:w-[48.125rem] px-2 ">
                  {mainData?.map((mainItem, mainIndex) => {
                    if (mainItem.product_category_id == item.id) {
                      return (
                        <div
                          key={mainIndex}
                          onClick={() =>
                            isModuleCheck(mainItem, mainItem.is_required)
                          }
                          className={`
                              ${mainItem.is_required && "cursor-not-allowed"}
                              mt-[24px] xl:w-[140px] h-auto cursor-pointer rounded-[8px] border-[1px]  ${
                                state.includes(mainItem)
                                  ? "border-[#2E28D4]"
                                  : "border-[#9CA6C0]"
                              }
                            `}
                        >
                          <div className=" p-[10px]  flex justify-between  ">
                            <div className="">
                              <div className="text-[#2F3747] w-[100px]  font-semibold text-[14px] h-[80px]">
                                {mainItem.product_name}
                              </div>
                              <Divider className="price bg-black " />
                              <div className=" ">
                                {mainItem.product_discount == 0 ? (
                                  <div className=" flex w-[100px] justify-end">
                                    <div className="text-[#2F3747] text-[16px] font-semibold mt-4 ">
                                      {mainItem.product_price}₮
                                    </div>
                                  </div>
                                ) : (
                                  <div className="flex  justify-end">
                                    <div className="flex w-[100px] items-center">
                                      <div className=" flex justify-center w-[100px] h-[24px]  bg-opacity-30 ml-[10px]  mt-5 text-[#F01A63] text-[14px] items-center font-medium">
                                        -{mainItem.product_discount}%
                                      </div>

                                      <div className="text-[#2F3747] text-[16px] ml-[5px] font-semibold mt-4  ">
                                        {Number(mainItem.product_price) -
                                          Number(mainItem.product_price) *
                                            (Number(mainItem.product_discount) /
                                              100)}
                                        ₮
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div>
                              <div>
                                {mainItem.is_required ? (
                                  <Checkbox checked />
                                ) : (
                                  <Checkbox
                                    checked={state.includes(mainItem)}
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            ))}

            <div className=" mt-[1.875rem] mb-[30px] shadow-custom">
              <div className=" justify-between pl-2 flex text-[1.5rem] text-white items-center xl:w-[49.125rem] h-[3.875rem] rounded-t-xl bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD] ">
                <div>Нэмэлт Модулиуд:</div>
                <div className=" mr-[10px]">
                  <Checkbox
                    onClick={(e) => CheckAllAdditional(e.target.checked)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 xl:grid-cols-5 lg:gap-4   xl:pl-6 pb-[30px] xl:w-[48.125rem] px-2 ">
                {additionalData?.map((item, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => isModuleCheck(item, item.is_required)}
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
                                  {item.product_price}₮
                                </div>
                              </div>
                            ) : (
                              <div className="flex  justify-end">
                                <div className="flex w-[100px] items-center">
                                  <div className=" flex justify-center w-[100px] h-[24px] bg-[#F01A634D] bg-opacity-30 ml-[10px]  mt-5 text-[#F01A63] text-[13px] items-center font-medium">
                                    -{item.product_discount}% off
                                  </div>

                                  <div className="text-[#2F3747] text-[16px] ml-[5px] font-semibold mt-4  ">
                                    {Number(item.product_price) -
                                      Number(item.product_price) *
                                        (Number(item.product_discount) / 100)}
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
        <div className=" flex flex-col ">
          <div className=" ml-[10px] w-[370px]   lg:h-[530px] shadow-custom rounded-[8px] ">
            <Tabs className="payment" defaultActiveKey="1">
              <TabPane tab="САР" key="1">
                <div className=" flex flex-col justify-center items-center">
                  <div className=" flex justify-between  w-[322px]">
                    <div className=" text-[#2F3747] text-[16px] font-medium">
                      {numberOfProgram} модуль
                    </div>
                    <div className="text-[#2F3747] text-[16px] font-semibold">
                      {programPrice.toFixed(2)}₮
                    </div>
                  </div>
                  <Divider className="bill" />

                  <div className=" flex justify-between w-[322px]">
                    <div className=" text-[#2F3747] text-[16px] font-medium">
                      Сервер
                    </div>
                    <div className="text-[#2F3747] text-[16px] font-semibold">
                      {serverPrice.toFixed(2)}₮
                    </div>
                  </div>
                  <Divider className="bill" />
                  <div className=" flex justify-between w-[322px]">
                    <div className=" text-[#2F3747] text-[16px] font-medium">
                      НӨАТ
                    </div>
                    <div className="text-[#2F3747] text-[16px] font-semibold">
                      {taxPrice.toFixed(2)}₮
                    </div>
                  </div>
                  <Divider className="bill" />
                  <div className=" flex justify-between w-[322px] ">
                    <div className=" text-[#2F3747] text-[16px] font-medium">
                      Хөнгөлөлт
                    </div>
                    <div className="text-[#30D82E] text-[16px] font-semibold">
                      {(discount != 0 ? -discount : 0).toFixed(2)}₮
                    </div>
                  </div>
                  <Divider className="bill" />

                  <div className=" flex justify-between w-[322px]">
                    <div className=" text-[#2F3747] text-[16px] font-semibold">
                      Нийт төлбөр
                    </div>
                    <div className="text-[#2F3747] text-[16px] font-semibold">
                      {totalPrice.toFixed(2)}₮
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
                      {programPriceSeason.toFixed(2)}₮
                    </div>
                  </div>
                  <Divider className="bill" />

                  <div className=" flex justify-between w-[322px]">
                    <div className=" text-[#2F3747] text-[16px] font-medium">
                      Сервер
                    </div>
                    <div className="text-[#2F3747] text-[16px] font-semibold">
                      {serverPriceSeason.toFixed(2)}₮
                    </div>
                  </div>
                  <Divider className="bill" />
                  <div className=" flex justify-between w-[322px]">
                    <div className=" text-[#2F3747] text-[16px] font-medium">
                      НӨАТ
                    </div>
                    <div className="text-[#2F3747] text-[16px] font-semibold">
                      {taxPriceSeason.toFixed(2)}₮
                    </div>
                  </div>
                  <Divider className="bill" />
                  <div className=" flex justify-between w-[322px] ">
                    <div className=" text-[#2F3747] text-[16px] font-medium">
                      Хөнгөлөлт
                    </div>
                    <div className="text-[#30D82E] text-[16px] font-semibold">
                      {(discountSeason != 0 ? -discountSeason : 0).toFixed(2)}₮
                    </div>
                  </div>
                  <Divider className="bill" />

                  <div className=" flex justify-between w-[322px]">
                    <div className=" text-[#2F3747] text-[16px] font-semibold">
                      Нийт төлбөр
                    </div>
                    <div className="text-[#2F3747] text-[16px] font-semibold">
                      {totalPriceSeason.toFixed(2)}₮
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
                      {programPriceYear.toFixed(2)}₮
                    </div>
                  </div>
                  <Divider className="bill" />

                  <div className=" flex justify-between w-[322px]">
                    <div className=" text-[#2F3747] text-[16px] font-medium">
                      Сервер
                    </div>
                    <div className="text-[#2F3747] text-[16px] font-semibold">
                      {serverPriceYear.toFixed(2)}₮
                    </div>
                  </div>
                  <Divider className="bill" />
                  <div className=" flex justify-between w-[322px]">
                    <div className=" text-[#2F3747] text-[16px] font-medium">
                      НӨАТ
                    </div>
                    <div className="text-[#2F3747] text-[16px] font-semibold">
                      {taxPriceYear.toFixed(2)}₮
                    </div>
                  </div>
                  <Divider className="bill" />
                  <div className=" flex justify-between w-[322px] ">
                    <div className=" text-[#2F3747] text-[16px] font-medium">
                      Хөнгөлөлт
                    </div>
                    <div className="text-[#30D82E] text-[16px] font-semibold">
                      {(discountYear != 0 ? -discountYear : 0).toFixed(2)}₮
                    </div>
                  </div>
                  <Divider className="bill" />

                  <div className=" flex justify-between w-[322px]">
                    <div className=" text-[#2F3747] text-[16px] font-semibold">
                      Нийт төлбөр
                    </div>
                    <div className="text-[#2F3747] text-[16px] font-semibold">
                      {totalPriceYear.toFixed(2)}₮
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
          <div className=" ml-[10px] mt-[1.875rem] mb-[30px] shadow-custom  w-[375px]">
            <div className=" pl-2 flex  text-[1.5rem] text-white items-center lg:w-[375px] h-[3.875rem] rounded-t-xl bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD] ">
              Сервер байршуулах:
            </div>
            <div>
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
            </div>
            <div className=" w-full">
              <div className=" mx-[24px]  lg:w-[330px] xl:mx-[24px] border-[1px] border-[#9CA6C0] mt-[24px] rounded-[8px]">
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
          <div className=" w-[370px]  shadow-lg ml-3 mt-5 rounded-[4px] p-[20px]">
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
                  return item.invoice_amount + "₮";
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
          </TabPane>
          <TabPane tab="Банкны дансаар" key="2">
            <div>
              <div className=" flex items-center mt-[20px]">
                <div>
                  {bank?.map((item) => {
                    return (
                      <Image
                        preview={false}
                        src={"data:image/png;base64," + item.invoice_bank_logo}
                      />
                    );
                  })}
                </div>
                <div className=" ml-[16px] text-[24px] text-[#2F3747] font-bold">
                  {bank?.map((item) => {
                    return item.invoice_bank;
                  })}
                </div>
              </div>
              <div className=" w-full flex justify-between mt-[20px]">
                <div>
                  <div className="text-[14px] text-[#2F3747] opacity-60 font-thin">
                    Дансны дугаар
                  </div>
                  <div className="text-[18px] text-[#2F3747] font-bold">
                    {bank?.map((item) => {
                      return item.invoice_bank_number;
                    })}
                  </div>
                </div>
                <div className=" flex items-center">
                  <CopyToClipboard
                    text={bank?.map((item) => {
                      return item.invoice_bank_number;
                    })}
                  >
                    <div
                      onClick={() => message.success("Амжилттай хуулагдлаа")}
                      className="cursor-pointer"
                    >
                      <Image preview={false} src="/img/copy.svg" />
                    </div>
                  </CopyToClipboard>
                  <div className="ml-[16px] text-[16px] text-[#2F3747] opacity-40 font-normal">
                    Хуулах
                  </div>
                </div>
              </div>
              <div className=" w-full flex justify-between mt-[20px]">
                <div>
                  <div className="text-[14px] text-[#2F3747] opacity-60 font-thin">
                    Дансны нэр
                  </div>
                  <div className="text-[18px] text-[#2F3747] font-bold">
                    {bank?.map((item) => {
                      return item.invoice_bank_account_name;
                    })}
                  </div>
                </div>
                <div className=" flex items-center">
                  <CopyToClipboard
                    text={bank?.map((item) => {
                      return item.invoice_bank_account_name;
                    })}
                  >
                    <div
                      onClick={() => message.success("Амжилттай хуулагдлаа")}
                      className="cursor-pointer"
                    >
                      <Image preview={false} src="/img/copy.svg" />
                    </div>
                  </CopyToClipboard>
                  <div className="ml-[16px] text-[16px] text-[#2F3747] opacity-40 font-normal">
                    Хуулах
                  </div>
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
                      onClick={() => message.success("Амжилттай хуулагдлаа")}
                      className="cursor-pointer"
                    >
                      <Image preview={false} src="/img/copy.svg" />
                    </div>
                  </CopyToClipboard>
                  <div className="ml-[16px] text-[16px] text-[#2F3747] opacity-40 font-normal">
                    Хуулах
                  </div>
                </div>
              </div>
              <div className=" w-full flex justify-between mt-[20px]">
                <div>
                  <div className="text-[14px] text-[#2F3747] opacity-60 font-thin">
                    Төлөх дүн
                  </div>
                  <div className="text-[18px] text-[#2F3747] font-bold">
                    {invoice?.map((item) => {
                      return item.invoice_amount + "₮";
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
                      onClick={() => message.success("Амжилттай хуулагдлаа")}
                      className="cursor-pointer"
                    >
                      <Image preview={false} src="/img/copy.svg" />
                    </div>
                  </CopyToClipboard>
                  <div className="ml-[16px] text-[16px] text-[#2F3747] opacity-40 font-normal">
                    Хуулах
                  </div>
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
                    Таны төлбөр төлөлт амжилттай хийгдсэний дараа 5 минутын
                    дотор худалдан авалт хийгдэнэ.
                  </div>
                </div>
              </div>
            </div>
          </TabPane>
        </Tabs>
      </Modal>
    </div>
  );
};

export default Pricing;

// <div className=" mt-[1.875rem] mb-[30px] shadow-custom">
// <div className=" pl-2 flex  text-[1.5rem] text-white items-center xl:w-[49.125rem] h-[3.875rem] rounded-t-xl bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD] ">
//   Сервер байршуулах:
// </div>
// <div>
//   <div className=" mx-[24px]  p-[24px xl:w-[722px] xl:mx-[24px] border-[1px] border-[#9CA6C0] mt-[24px] rounded-[8px]">
//     <div className=" p-[20px]">
//       <div className=" flex w-full  justify-between">
//         <div className="text-[#2F3747] text-[16px] font-semibold">
//           1. Itools.mn Физик серверт байршуулах
//         </div>
//         <div className="flex flex-col xl:flex-row w-[10vw] justify-around items-center">
//           <div className=" text-[#2F3747] text-[16px] font-semibold">
//             {pServerPrice}₮
//           </div>
//           <div className=" text-[#9CA6C0] text-[10px] xl:text-[12px] font-semibold ">
//             1 сард
//           </div>
//           <div>
//             {/* className={serverState2 || serverState3 ? " cursor-not-allowed" : null} */}

//             {/* <Checkbox
//               disabled={
//                 serverState2 || serverState3 ? true : false
//               }
//               onClick={() => onChangerServerPrice1()}
//             /> */}
//           </div>
//         </div>
//       </div>
//       <div className=" mt-[16px]">
//         <Select
//           disabled={serverState2 || serverState3 ? true : false}
//           defaultValue="Сонгох"
//           // style={{ width: 300 }}
//           className=" w-[300px] xl:w-[556px]"
//           allowClear
//           onChange={handleChange}
//         >
//           {physicalServer?.map((item, index) => {
//             return (
//               <Option
//                 key={index}
//                 value={[
//                   <div
//                     key={index}
//                     className=" flex justify-between"
//                   >
//                     <div>{item.server_name}</div>
//                     <div>CPU Cores: {item.server_cpu}</div>
//                     <div>Ram: {item.server_ram}</div>
//                     <div>Hard: {item.server_hard}</div>
//                     <div>{item.server_price} ₮</div>
//                   </div>,
//                   item.server_id,
//                   item.server_price,
//                 ]}
//               >
//                 <div className=" flex justify-between">
//                   <div>{item.server_name}</div>
//                   <div>CPU Cores: {item.server_cpu}</div>
//                   <div>Ram: {item.server_ram}</div>
//                   <div>Hard: {item.server_hard}</div>
//                   <div>{item.server_price} ₮</div>
//                 </div>
//               </Option>
//             );
//           })}
//         </Select>
//       </div>
//     </div>
//   </div>
// </div>
// <div className=" w-full">
//   <div className=" mx-[24px]  xl:w-[722px] xl:mx-[24px] border-[1px] border-[#9CA6C0] mt-[24px] rounded-[8px]">
//     <div className=" p-[20px]">
//       <div className=" flex w-full  justify-between">
//         <div className="text-[#2F3747] text-[16px] font-semibold">
//           2. Cloud.mn Клауд Платформ
//         </div>
//         <div className="flex flex-col xl:flex-row w-[10vw] justify-around items-center">
//           <div className=" text-[#2F3747] text-[16px] font-semibold">
//             {cServerPrice}₮
//           </div>
//           <div className=" text-[#9CA6C0] text-[10px] xl:text-[12px] font-semibold ">
//             1 сард
//           </div>
//           <div>
//             {/* <Checkbox
//               disabled={
//                 serverState1 || serverState3 ? true : false
//               }
//               onClick={() => onChangerServerPrice2()}
//             /> */}
//           </div>
//         </div>
//       </div>
//       <div className=" mt-[16px]">
//         <Select
//           disabled={serverState1 || serverState3 ? true : false}
//           defaultValue="Сонгох"
//           // style={{ width: 300 }}
//           allowClear
//           className=" w-[300px] xl:w-[556px]"
//           onChange={handleChange2}
//         >
//           {cloudServer?.map((item, index) => {
//             return (
//               <Option
//                 key={index}
//                 value={[
//                   <div
//                     key={index}
//                     className=" flex justify-between"
//                   >
//                     <div>{item.server_name}</div>
//                     <div>CPU Cores: {item.server_cpu}</div>
//                     <div>Ram: {item.server_ram}</div>
//                     <div>Hard: {item.server_hard}</div>
//                     <div>{item.server_price} ₮</div>
//                   </div>,
//                   item.server_id,
//                   item.server_price,
//                 ]}
//               >
//                 <div className=" flex justify-between">
//                   <div>{item.server_name}</div>
//                   <div>CPU Cores: {item.server_cpu}</div>
//                   <div>Ram: {item.server_ram}</div>
//                   <div>Hard: {item.server_hard}</div>
//                   <div>{item.server_price} ₮</div>
//                 </div>
//               </Option>
//             );
//           })}
//         </Select>
//       </div>
//     </div>
//   </div>
// </div>
// <div className=" w-full pb-[17px]">
//   <div className="   xl:w-[722px] mx-[24px] border-[1px] border-[#9CA6C0] mt-[24px]  rounded-[8px]">
//     <div className=" p-[20px]">
//       <div className=" flex w-full  justify-between">
//         <div className="text-[#2F3747] text-[16px] font-semibold">
//           3. Өөрсдийн сервер дээр байршуулах
//         </div>
//         <div className="">
//           <Checkbox
//             disabled={serverState1 || serverState2 ? true : false}
//             onClick={() => onChangerServerPrice3()}
//           />
//         </div>
//       </div>
//     </div>
//   </div>
// </div>
// </div>
