import React, { useEffect, useState, useContext } from "react";
import NavbarTrans from "../../components/NavbarTrans";
import Footer from "../../components/Footer";
import { Image, Table, Divider, message, Button, Modal, Tabs } from "antd";
import axios from "axios";
import Auth from "../../utils/auth";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Router from "next/router";
import Context from "../../context/Context";
import { useRouter } from "next/router";
import PersonalSideBar from "../../components/PersonalSideBar";
import helper from "../../utils/helper";

const Cart = () => {
  const { setIsLoading } = useContext(Context);
  const router = useRouter();
  const { TabPane } = Tabs;
  const [product, setProduct] = useState([]);
  const [tursh, setTursh] = useState([]);
  const [server, setServer] = useState();
  const [data, setData] = useState([]);
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [bank, setBank] = useState();
  const [invoice, setInvoice] = useState();
  const [programPrice, setProgramPrice] = useState(0);
  const [serverPrice, setServerPrice] = useState(0);
  const [tax, setTax] = useState(0);
  const [programPriceSeason, setProgramPriceSeason] = useState(0);
  const [serverPriceSeason, setServerPriceSeason] = useState(0);
  const [taxPriceSeason, setTaxPriceSeason] = useState(0);
  const [totalPriceSeason, setTotalPriceSeason] = useState(0);
  const [discountSeason, setDiscountSeason] = useState(0);
  const [programPriceYear, setProgramPriceYear] = useState(0);
  const [serverPriceYear, setServerPriceYear] = useState(0);
  const [taxPriceYear, setTaxPriceYear] = useState(0);
  const [totalPriceYear, setTotalPriceYear] = useState(0);
  const [discountYear, setDiscountYear] = useState(0);
  const [catName, setCatName] = useState(null);

  const baseUrl = process.env.NEXT_PUBLIC_URL;
  const baseDB = process.env.NEXT_PUBLIC_DB;

  const columns = [
    {
      title: (
        <div className=" text-[18px] font-bold">???????????????????????????? ??????????????</div>
      ),
      dataIndex: "catNer",
      key: "carNer",
    },
  ];
  // console.log(catName);

  const handleCancel = (value) => {
    setIsModalVisible(false);
  };

  const onDelete = async (id, type) => {
    var data = {
      jsonrpc: 2.0,
      params: {
        uid: Auth.getUserId(),
        product_id: id,
        type: type,
      },
    };
    // console.log(data, "dataaa");
    const res = await axios.post(baseUrl + "delete/cart_list", data, {
      headers: {
        "Set-Cookie": "session_id=" + Auth.getToken(),
        "Content-Type": "application/json",
      },
    });
    // console.log(res, "delete ress");
    if (res.data.id == null) {
      // message.success("?????????????????? ????????????");
      window.location.reload(false);
    }
  };

  const expandedRowRender = (rowData) => {
    // console.log(rowData, "ggg");
    // console.log(rowData, "Dsad");
    const columns = [
      {
        title: <div>???????????????????????????? ??????</div>,
        dataIndex: "product_name",
        key: "name",
      },
      { title: "?????? ????????????", dataIndex: "count", key: "count" },
      { title: "??????", dataIndex: "product_price", key: "price" },
      { title: "??????????", dataIndex: "action", key: "action" },
    ];

    return (
      <Table
        rowKey="keyee"
        className="expandaa"
        columns={columns}
        dataSource={rowData?.sub}
        pagination={false}
      />
    );
  };

  const onPurchase = async (type) => {
    var productIds = [];
    var serverID = 0;

    product.map((item) => {
      productIds.push(item.product_id);
    });
    server.map((item) => {
      serverID = item.server_id;
    });

    var data = {
      jsonrpc: 2.0,
      params: {
        uid: Auth.getUserId(),
        server_id: serverID,
        type: type,
        product_ids: productIds,
      },
    };
    // console.log(data, "dataaa");
    const res = await axios.post(baseUrl + "create/invoice", data, {
      headers: {
        "Set-Cookie": "session_id=" + Auth.getToken(),
        "Content-Type": "application/json",
      },
    });
    if (res.data.result && res.data.result) {
      // message.success("???????????? ?????????????????? ??????????????.");
      setBank(res.data.result.bank);
      setInvoice(res.data.result.invoice);
      setIsModalVisible(true);
    } else if (res.data.error) {
      message.warning(res.data.error.data.message);
    } else {
      message.warning("???????????? ??????????????????");
    }
    // console.log(res, "purchase res");
  };

  useEffect(async () => {
    !Auth.getToken() &&
      router.push({
        pathname: `/`,
      });
    setIsLoading(true);
    // const res = await axios.post(
    axios
      .post(
        baseUrl + "get/cart_list",
        {
          jsonrpc: 2.0,
          params: {
            uid: Auth.getUserId(),
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
        setProduct(response?.data?.result?.products);
        setServer(response?.data?.result?.server);
        console.log(response, "get cart");
        setIsLoading(false);
      });

    // console.log(res, " context cartiin api");
    // console.log(res, "cartiin api");
  }, []);

  useEffect(() => {
    const arr = [];

    var a = 0;
    var sale = 0;

    var categories = [];

    for (let i = 0; i < product?.length; i++) {
      categories.push({
        product_category_id: product[i].product_category_id,
        catNer: product[i].product_category,
        key: product[i].product_id,
        sub: [],
      });
    }

    // console.log(categories, "cataa");
    var unique = categories.filter((value, index, self) => {
      return (
        index ===
        self.findIndex(
          (t) => t.product_category_id === value.product_category_id
        )
      );
    });

    for (let index = 0; index < unique.length; index++) {
      for (let i = 0; i < product.length; i++) {
        if (
          unique[index].product_category_id === product[i].product_category_id
        ) {
          unique[index].sub.push(
            Object.assign(product[i], {
              action: (
                <Image
                  className=" cursor-pointer"
                  onClick={() => onDelete(product[i].product_id, 1)}
                  preview={false}
                  src="/img/delete.svg"
                />
              ),

              count: "1",
              product_name: (
                <div className=" flex  items-center">
                  {/* {product[i].product_icon != false ? (
                <Image
                  preview={false}
                  src={
                    "data:image/png;base64," + product[i]?.product_icon
                  }
                />
              ) : ( */}

                  {product[i].product_icon == false ? (
                    <Image
                      preview={false}
                      width={30}
                      height={30}
                      src="/img/default.png"
                    />
                  ) : (
                    <Image
                      preview={false}
                      width={30}
                      height={30}
                      src={"data:image/png;base64," + product[i]?.product_icon}
                    />
                  )}

                  <span className=" ml-2">{product[i].product_name}</span>
                </div>
              ),
            })
          );
        }
      }
    }

    var pd = "";

    // console.log(unique, "<===");
    setCatName(unique);

    // for (let index = 0; index < product?.length; index++) {
    // console.log(product[index], "lalar");

    // categoryy.push({
    //   key: product[index].product_category_id,
    //   catNer: product[index].product_category,
    //   sub: [],
    // });

    // categoryy.push(product[index].product_category_id);

    // if (!categoryy.includes(product[index].product_category)) {
    //   categoryy.push({
    //     key: product[index].product_category_id,
    //     catNer: product[index].product_category,
    //     sub: [
    //       {
    //         name: product[index].product_name,
    //         count: "1",
    //         price: product[index].product_price,
    //       },
    //     ],
    //   });
    // }
    var proPrice = 0;
    var proSale = 0;
    var proTotal = 0;

    product?.map((item) => {
      proPrice += item.product_price;

      sale +=
        Number(item.product_price) * (Number(item.product_discount) / 100);
    });
    proTotal = proPrice - sale;

    // arr.push({
    //   key: index,
    //   name: (
    // <div className=" flex items-center">
    //   {product[index].product_icon ? (
    //     <Image
    //       preview={false}
    //       src={"data:image/png;base64," + item.product_icon}
    //     />
    //   ) : (
    //     <Image
    //       preview={false}
    //       width={30}
    //       height={30}
    //       src="/img/default.png"
    //     />
    //   )}
    //   <span className=" w-[100px] lg:w-auto ml-2 mt-[5px] font-semibold text-[16px] text-[#2F3747]">
    //     {product[index].product_name}
    //   </span>
    // </div>
    //   ),
    //   count: "1",
    //   price: product[index].product_price + "???",
    //   action: (
    //     <Image
    //       className=" cursor-pointer"
    //       onClick={() => onDelete(product[index].product_id, 1)}
    //       preview={false}
    //       src="/img/delete.svg"
    //     />
    //   ),
    // });
    // }

    // for (let index = 0; index < product.length; index++) {
    //   if (categoryy.) {
    //     categoryy.push({
    //       key: product[index].product_category_id,
    //       catNer: product[index].product_category,
    //       sub: [
    //         {
    //           name: product[index].product_name,
    //           count: "1",
    //           price: product[index].product_price,
    //         },
    //       ],
    //     });
    //   }
    // }

    // setCatName(categoryy);

    server?.map((item, index) => {
      a += item.server_price;
      sale += Number(item.server_price) * (Number(item.server_discount) / 100);
      arr.push({
        key: item.server_id,
        catNer: "????????????",
        sub: [
          {
            product_name: item.server_name,
            count: "1",
            product_price: item.server_price,
            action: (
              <Image
                className=" cursor-pointer"
                onClick={() => onDelete(item.server_id, 2)}
                preview={false}
                src="/img/delete.svg"
              />
            ),
          },
        ],
        // price: item.server_price + "???",
      });
    });
    setTotalPrice(a + proTotal);
    // setData(arr);
    setCatName((prev) => [...prev, ...arr]);
    setPrice(a);
    setDiscount(sale);

    // console.log(product, "product");
  }, [server && product]);

  // console.log(catName, "pp");
  useEffect(() => {
    setTax(totalPrice / 10);

    setTotalPriceYear(totalPrice * 12);
    setProgramPriceSeason(programPrice * 3);
    setProgramPriceYear(programPrice * 12);
    setTotalPriceSeason(totalPrice * 3);
    setDiscountSeason(discount * 3);
    setDiscountYear(discount * 12);
    setServerPriceSeason(serverPrice * 3);
    setServerPriceYear(serverPrice * 12);
  }, [totalPrice]);
  useEffect(() => {
    setTaxPriceSeason(tax * 3);
    setTaxPriceYear(tax * 12);
  }, [tax]);

  useEffect(() => {
    var a = 0;
    product?.map((item) => {
      a += item.product_price;
    });
    setProgramPrice(a);
  }, [product]);

  useEffect(() => {
    var a = 0;
    server?.map((item) => {
      a += item.server_price;
    });
    setServerPrice(a);
  }, [server]);
  return (
    <div>
      <div className="relative h-[100px] md:h-auto overflow-hidden md:overflow-visible">
        <div className="absolute z-20 flex flex-col w-full h-full">
          <div className="w-full flex justify-center h-1/3">
            <NavbarTrans />
          </div>
          <div className=" flex justify-center">
            <div className=" w-[1100px] ">
              <div className=" mt-[20px] flex justify-between w-[230px]">
                <div>
                  <Image preview={false} src="/img/home.svg" />
                </div>
                <div className="text-white text-[14px] font-semibold">
                  <a href="/" className="text-white text-[14px] font-semibold">
                    ???????? ????????????
                  </a>
                </div>
                <div>
                  <Image preview={false} src="/img/right.svg" />
                </div>
                <div className="text-white text-[14px] font-semibold">
                  <a
                    href="/cart"
                    className="text-white text-[14px] font-semibold"
                  >
                    ?????????? ????????
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden my-auto uppercase xl:flex justify-center items-center text-white h-2/3 text-[36px] font-poppins-semibold">
            ?????????? ????????
          </div>
        </div>
        <div className="   h-[348px] overflow-hidden">
          <Image
            className=" w-[100vw]  md:h-auto scale-150 md:scale-100"
            preview={false}
            src="/img/Slider.svg"
          />
        </div>
      </div>
      <div className=" flex flex-col md:flex-col xl:flex-row justify-center mt-10">
        <div>
          <PersonalSideBar hover={2} />
        </div>
        <div className="flex lg:flex-row flex-col">
          <div className=" mr-[30px] px-4 md:px-4 md:w-[550px] 2xl:w-[870px]">
            <Table
              className="tcell"
              columns={columns}
              expandable={{ expandedRowRender }}
              dataSource={catName}
            />
          </div>
          {/* <div className=" mr-[30px] px-4 md:px-4 ">
          <Table
            // className="tcell"
            className="tcell 2xl:w-[770px] "
            columns={columns}
            dataSource={data}
          />
        </div> */}
          <div className=" ml-[10px] w-[370px]  mb-5 pb-5  lg:h-[530px] shadow-custom rounded-[8px] ">
            <Tabs className="payment" defaultActiveKey="2">
              <TabPane tab="??????" key="1">
                <div className=" flex flex-col justify-center items-center">
                  <div className=" flex justify-between  w-[322px]">
                    <div className=" text-[#2F3747] text-[16px] font-medium">
                      {/* {numberOfProgram} */}
                      {product?.length} ????????????
                    </div>
                    <div className="text-[#2F3747] text-[16px] font-semibold">
                      {helper.formatValueReverse(programPriceYear)}???
                    </div>
                  </div>
                  <Divider className="bill" />

                  <div className=" flex justify-between w-[322px]">
                    <div className=" text-[#2F3747] text-[16px] font-medium">
                      ????????????
                    </div>
                    <div className="text-[#2F3747] text-[16px] font-semibold">
                      {helper.formatValueReverse(serverPriceYear)}???
                    </div>
                  </div>
                  <Divider className="bill" />
                  <div className=" flex justify-between w-[322px]">
                    <div className=" text-[#2F3747] text-[16px] font-medium">
                      ????????
                    </div>
                    <div className="text-[#2F3747] text-[16px] font-semibold">
                      {helper.formatValueReverse(taxPriceYear)}???
                    </div>
                  </div>
                  <Divider className="bill" />
                  <div className=" flex justify-between w-[322px] ">
                    <div className=" text-[#2F3747] text-[16px] font-medium">
                      ??????????????????
                    </div>
                    <div className="text-[#30D82E] text-[16px] font-semibold">
                      {helper.formatValueReverse(
                        discountYear != 0 ? -discountYear : 0
                      )}
                      ???
                    </div>
                  </div>
                  <Divider className="bill" />

                  <div className=" flex justify-between w-[322px]">
                    <div className=" text-[#2F3747] text-[16px] font-semibold">
                      ???????? ????????????
                    </div>
                    <div className="text-[#2F3747] text-[16px] font-semibold">
                      {helper.formatValueReverse(totalPriceYear)}???
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
                        ???????????? ???? ?????????? ???????????? ???????????????? ?????? ???????? ????????????
                        ???????????????????? ?????????? ???????????????? ?????????? ?????????????????? ????????????????????
                        ????????????????.
                      </p>
                    </div>
                  </div>
                  <div className=" flex justify-center mt-[30px]">
                    <Button
                      className=" text-[14px] font-bold w-[200px] h-[48px] text-white rounded-[43px] bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD] border-none"
                      type="primary"
                      onClick={() => onPurchase("year")}
                    >
                      ???????????? ??????????
                    </Button>
                    <a></a>
                  </div>
                  {/* <div className=" mx-[24px] my-[30px]">
                    <p className="text-[14px] text-[#9CA6C0] font-normal">
                      (1) New customers get a discount on the initial number of
                      users purchased. ($6.00 USD instead of $8.00 USD).
                    </p>
                  </div> */}
                </div>
              </TabPane>
              <TabPane tab="????????????" key="2">
                <div className=" flex flex-col justify-center items-center">
                  <div className=" flex justify-between  w-[322px]">
                    <div className=" text-[#2F3747] text-[16px] font-medium">
                      {/* {numberOfProgram} */}
                      {product?.length} ????????????
                    </div>
                    <div className="text-[#2F3747] text-[16px] font-semibold">
                      {helper.formatValueReverse(programPriceSeason)}???
                    </div>
                  </div>
                  <Divider className="bill" />

                  <div className=" flex justify-between w-[322px]">
                    <div className=" text-[#2F3747] text-[16px] font-medium">
                      ????????????
                    </div>
                    <div className="text-[#2F3747] text-[16px] font-semibold">
                      {helper.formatValueReverse(serverPriceSeason)}???
                    </div>
                  </div>
                  <Divider className="bill" />
                  <div className=" flex justify-between w-[322px]">
                    <div className=" text-[#2F3747] text-[16px] font-medium">
                      ????????
                    </div>
                    <div className="text-[#2F3747] text-[16px] font-semibold">
                      {helper.formatValueReverse(taxPriceSeason)}???
                    </div>
                  </div>
                  <Divider className="bill" />
                  <div className=" flex justify-between w-[322px] ">
                    <div className=" text-[#2F3747] text-[16px] font-medium">
                      ??????????????????
                    </div>
                    <div className="text-[#30D82E] text-[16px] font-semibold">
                      {helper.formatValueReverse(
                        discountSeason != 0 ? -discountSeason : 0
                      )}
                      ???
                    </div>
                  </div>
                  <Divider className="bill" />

                  <div className=" flex justify-between w-[322px]">
                    <div className=" text-[#2F3747] text-[16px] font-semibold">
                      ???????? ????????????
                    </div>
                    <div className="text-[#2F3747] text-[16px] font-semibold">
                      {helper.formatValueReverse(totalPriceSeason)}???
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
                        ???????????? ???? ?????????? ???????????? ???????????????? ?????? ???????? ????????????
                        ???????????????????? ?????????? ???????????????? ?????????? ?????????????????? ????????????????????
                        ????????????????.
                      </p>
                    </div>
                  </div>
                  <div className=" flex justify-center mt-[30px]">
                    <Button
                      className=" text-[14px] font-bold w-[200px] h-[48px] text-white rounded-[43px] bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD] border-none"
                      type="primary"
                      onClick={() => onPurchase("season")}
                    >
                      ???????????? ??????????
                    </Button>
                  </div>
                  {/* <div className=" mx-[24px] my-[30px]">
                    <p className="text-[14px] text-[#9CA6C0] font-normal">
                      (1) New customers get a discount on the initial number of
                      users purchased. ($6.00 USD instead of $8.00 USD).
                    </p>
                  </div> */}
                </div>
              </TabPane>
              <TabPane tab="??????" key="3">
                <div className=" flex flex-col justify-center items-center">
                  <div className=" flex justify-between  w-[322px]">
                    <div className=" text-[#2F3747] text-[16px] font-medium">
                      {/* {numberOfProgram} */}
                      {product?.length} ????????????
                    </div>
                    <div className="text-[#2F3747] text-[16px] font-semibold">
                      {helper.formatValueReverse(programPrice)}???
                    </div>
                  </div>
                  <Divider className="bill" />

                  <div className=" flex justify-between w-[322px]">
                    <div className=" text-[#2F3747] text-[16px] font-medium">
                      ????????????
                    </div>
                    <div className="text-[#2F3747] text-[16px] font-semibold">
                      {/* {serverPrice.toFixed(2)} */}
                      {helper.formatValueReverse(serverPrice)}???
                    </div>
                  </div>
                  <Divider className="bill" />
                  <div className=" flex justify-between w-[322px]">
                    <div className=" text-[#2F3747] text-[16px] font-medium">
                      ????????
                    </div>
                    <div className="text-[#2F3747] text-[16px] font-semibold">
                      {/* {taxPrice.toFixed(2)} */}
                      {helper.formatValueReverse(tax)}???
                    </div>
                  </div>
                  <Divider className="bill" />
                  <div className=" flex justify-between w-[322px] ">
                    <div className=" text-[#2F3747] text-[16px] font-medium">
                      ??????????????????
                    </div>
                    <div className="text-[#30D82E] text-[16px] font-semibold">
                      {helper.formatValueReverse(discount != 0 ? -discount : 0)}
                      ???
                    </div>
                  </div>
                  <Divider className="bill" />

                  <div className=" flex justify-between w-[322px]">
                    <div className=" text-[#2F3747] text-[16px] font-semibold">
                      ???????? ????????????
                    </div>
                    <div className="text-[#2F3747] text-[16px] font-semibold">
                      {helper.formatValueReverse(totalPrice)}???
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
                        ???????????? ???? ?????????? ???????????? ???????????????? ?????? ???????? ????????????
                        ???????????????????? ?????????? ???????????????? ?????????? ?????????????????? ????????????????????
                        ????????????????.
                      </p>
                    </div>
                  </div>
                  <div className=" flex justify-center mt-[30px]">
                    <Button
                      className=" text-[14px] font-bold w-[200px] h-[48px] text-white rounded-[43px] bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD] border-none"
                      type="primary"
                      onClick={() => onPurchase("month")}
                    >
                      ???????????? ??????????
                    </Button>
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
        </div>
      </div>
      <Footer />
      <Modal
        title="???????????? ??????????"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[]}
        className="buy"
      >
        <Tabs className="buyTab" defaultActiveKey="1">
          <TabPane tab="QPay ??????????????????" key="1">
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
                  ???? ?????? QRCode -?????? ?????????? ?????????????????? ?????? ???????????? ??????????????????????????
                  ?????????????? ?????????????? ???????????? ?????????? ????.
                </div>
              </div>
            </div>
            <div className="w-full flex justify-between mt-[16px]">
              <div className="  font-semibold text-[16px] text-[#2F3747]">
                ?????????? ??????
              </div>
              <div className=" font-semibold text-[16px] text-[#2F3747]">
                {invoice?.map((item) => {
                  return helper.formatValueReverse(item.invoice_amount) + "???";
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
                    ???????????? IFinance-?? ???????????????????? ?????????????? ???????????? ????????????????????????
                    ???????????????? ????.
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
                    ?????????????? ???????????????????? ???????? ???????? ???????????? ???????????????????? ?????????? ????????????
                    ???????????????? ???????????????? ????.
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
                    ?????????? ?????? ?????????????? ?????????? ?????????? ?????????????? ?????????? ?????????? ????????????????????
                    ???????????????????? ???????? ???????????????? ?????????? ?????????????????? ??????????.
                  </div>
                </div>
              </div>
            </div>
          </TabPane>
          <TabPane tab="???????????? ??????????????" key="2">
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
                    ???????????? ????????????
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
                      onClick={() => message.success("?????????????????? ????????????????????")}
                      className="cursor-pointer"
                    >
                      <Image preview={false} src="/img/copy.svg" />
                    </div>
                  </CopyToClipboard>
                  <div className="ml-[16px] text-[16px] text-[#2F3747] opacity-40 font-normal">
                    ????????????
                  </div>
                </div>
              </div>
              <div className=" w-full flex justify-between mt-[20px]">
                <div>
                  <div className="text-[14px] text-[#2F3747] opacity-60 font-thin">
                    ???????????? ??????
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
                      onClick={() => message.success("?????????????????? ????????????????????")}
                      className="cursor-pointer"
                    >
                      <Image preview={false} src="/img/copy.svg" />
                    </div>
                  </CopyToClipboard>
                  <div className="ml-[16px] text-[16px] text-[#2F3747] opacity-40 font-normal">
                    ????????????
                  </div>
                </div>
              </div>
              <div className=" w-full flex justify-between mt-[20px]">
                <div>
                  <div className="text-[14px] text-[#2F3747] opacity-60 font-thin">
                    ???????????????????? ????????
                  </div>
                  <div className="text-[18px] text-[#2F3747] font-bold">
                    {invoice?.map((item) => {
                      return item.invoice_name;
                    })}
                  </div>
                </div>
                <div
                  onClick={() => message.success("?????????????????? ????????????????????")}
                  className=" flex items-center"
                >
                  <CopyToClipboard
                    text={invoice?.map((item) => {
                      return item.invoice_name;
                    })}
                  >
                    <div className="cursor-pointer">
                      <Image preview={false} src="/img/copy.svg" />
                    </div>
                  </CopyToClipboard>
                  <div className="ml-[16px] text-[16px] text-[#2F3747] opacity-40 font-normal">
                    ????????????
                  </div>
                </div>
              </div>
              <div className=" w-full flex justify-between mt-[20px]">
                <div>
                  <div className="text-[14px] text-[#2F3747] opacity-60 font-thin">
                    ?????????? ??????
                  </div>
                  <div className="text-[18px] text-[#2F3747] font-bold">
                    {invoice?.map((item) => {
                      return item.invoice_amount + "???";
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
                      onClick={() => message.success("?????????????????? ????????????????????")}
                      className="cursor-pointer"
                    >
                      <Image preview={false} src="/img/copy.svg" />
                    </div>
                  </CopyToClipboard>
                  <div className="ml-[16px] text-[16px] text-[#2F3747] opacity-40 font-normal">
                    ????????????
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
                    ???????? ???????????? ???????????? ?????????????????? ???????????????????? ?????????? 5 ??????????????
                    ?????????? ???????????????? ?????????? ????????????????.
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

export default Cart;
