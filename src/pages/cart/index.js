import React, { useEffect, useState, useContext } from "react";
import NavbarTrans from "../../components/NavbarTrans";
import Footer from "../../components/Footer";
import { Image, Table, Divider, message, Button, Modal, Tabs } from "antd";
import axios from "axios";
import Auth from "../../utils/auth";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Router from "next/router";
import Context from "../../context/Context";
import PersonalSideBar from "../../components/PersonalSideBar";

const Cart = () => {
  const { setIsLoading } = useContext(Context);
  const { TabPane } = Tabs;
  const [product, setProduct] = useState();
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

  const baseUrl = process.env.NEXT_PUBLIC_URL;
  const baseDB = process.env.NEXT_PUBLIC_DB;

  const columns = [
    { title: "Бүтээгдэхүүний нэр", dataIndex: "name", key: "name" },
    { title: "Тоо ширхэг", dataIndex: "count", key: "count" },
    { title: "Үнэ", dataIndex: "price", key: "price" },
    { title: "Хасах", dataIndex: "action", key: "action" },
  ];

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
      // message.success("Амжилттай устлаа");
      window.location.reload(false);
    }
  };
  const onLogout = async () => {
    const res = await axios.post(
      baseUrl + "logout",
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

    if (res.data.error && res.data.error) {
      message.success("Амжилттай систэмээс гарлаа");
      Auth.destroyToken();
      // window.location.reload(false);
      Router.push("/");
    }

    // console.log(res, "logout res");
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
      // message.success("Хүсэлт амжилттай биеллээ.");
      setBank(res.data.result.bank);
      setInvoice(res.data.result.invoice);
      setIsModalVisible(true);
    } else if (res.data.error) {
      message.warning(res.data.error.data.message);
    } else {
      message.warning("Хүсэлт амжилтгүй");
    }
    // console.log(res, "purchase res");
  };

  useEffect(async () => {
    setIsLoading(true);
    const res = await axios.post(
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
    );
    setProduct(res.data.result.products);
    setServer(res.data.result.server);
    // console.log(res, "cartiin api");
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const arr = [];
    var a = 0;
    var sale = 0;
    product?.map((item, index) => {
      a += item.product_price;
      sale +=
        Number(item.product_price) * (Number(item.product_discount) / 100);
      arr.push({
        key: index,

        name: (
          <div className=" flex items-center">
            {item.product_icon ? (
              <Image preview={false} src={"data:image/png;base64," + item.product_icon} />
            ) : (
              <Image preview={false} width={30} height={30} src="/img/default.png" />
            )}
            <span className=" ml-2 mt-[5px] font-semibold text-[16px] text-[#2F3747]">
              {item.product_name}
            </span>
          </div>
        ),
        count: "1",
        price: item.product_price + "₮",
        action: (
          <Image
            className=" cursor-pointer"
            onClick={() => onDelete(item.product_id, 1)}
            preview={false}
            src="/img/delete.svg"
          />
        ),
      });
    });

    server?.map((item, index) => {
      a += item.server_price;
      sale += Number(item.server_price) * (Number(item.server_discount) / 100);
      arr.push({
        key: item.server_name,

        name: item.server_name,
        count: "1",
        price: item.server_price + "₮",
        action: (
          <Image
            className=" cursor-pointer"
            onClick={() => onDelete(item.server_id, 2)}
            preview={false}
            src="/img/delete.svg"
          />
        ),
      });
    });
    setTotalPrice(a - sale);
    setData(arr);
    setPrice(a);
    setDiscount(sale);

    // console.log(product, "product");
  }, [server || product]);

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
          <div className=" mt-[20px] ml-[375px] flex justify-between w-[230px]">
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
              <a href="/cart" className="text-white text-[14px] font-semibold">
                Миний сагс
              </a>
            </div>
          </div>
          <div className="hidden my-auto uppercase xl:flex justify-center items-center text-white h-2/3 text-[36px] font-poppins-semibold">
            Миний сагс
          </div>
        </div>

        <Image
          className=" w-[100vw] h-[100px] md:h-auto scale-150 md:scale-100"
          preview={false}
          src="/img/Slider.svg"
        />
      </div>
      <div className=" flex flex-col md:flex-row justify-center mt-10">
        <PersonalSideBar hover={2} />
        <div className=" mr-[30px] px-4 md:px-4">
          <Table
            // className="tcell"
            className="tcell w-[770px]"
            columns={columns}
            dataSource={data}
          />
        </div>
        {/* <div className=" w-[370px] h-[415px] shadow-xl rounded-[4px] mb-[100px] px-4 md:px-0">
          <div className=" w-full flex items-center h-[48px] bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD] text-white font-bold text-[18px] rounded-t-[4px] pl-[24px]">
            Төлөх дүн
          </div>
          <div className=" w-full flex justify-between px-4 pt-6">
            <div className="text-[16px] font-normal text-[#2F3747]">
              Үнийн дүн
            </div>
            <div className=" text-[#2F3747] text-[16px] font-semibold">
              {price}₮
            </div>
          </div>
          <Divider className="mar" />
          <div className=" w-full flex justify-between px-4">
            <div className="text-[16px] font-normal text-[#2F3747]">
              Хөнгөлөлт
            </div>
            <div className=" text-[#30D82E] text-[16px] font-semibold">
              -{discount}₮
            </div>
          </div>
          <Divider className="mar" />
          <div className=" w-full flex justify-between px-4">
            <div className="text-[16px] font-normal text-[#2F3747]">
              НӨАТ
            </div>
            <div className=" text-[#2F3747] text-[16px] font-semibold">
              0₮
            </div>
          </div>
          <Divider className="mar" />
          <div className=" w-full flex justify-between px-4">
            <div className="text-[16px] font-normal text-[#2F3747]">
              Сервер
            </div>
            <div className=" text-[#2F3747] text-[16px] font-semibold">
              0₮
            </div>
          </div>
          <Divider className="mar" />
          <div className=" w-full flex justify-between px-4">
            <div className="text-[16px] font-normal text-[#2F3747]">
              Нийт төлбөр
            </div>
            <div className=" text-[#2F3747] text-[16px] font-semibold">
              {totalPrice}₮
            </div>
          </div>
          <Divider className="mar" />
          <div className=" flex justify-center mt-[30px]">
            <Button
              onClick={() => onPurchase()}
              className=" text-[14px] font-bold w-[200px] h-[48px] text-white rounded-[43px] bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD] border-none"
              type="primary"
            >
              Төлбөр төлөх
            </Button>
          </div>
        </div> */}

        <div className=" ml-[10px] w-[370px]  mb-5 pb-5  lg:h-[530px] shadow-custom rounded-[8px] ">
          <Tabs className="payment" defaultActiveKey="1">
            <TabPane tab="САР" key="1">
              <div className=" flex flex-col justify-center items-center">
                <div className=" flex justify-between  w-[322px]">
                  <div className=" text-[#2F3747] text-[16px] font-medium">
                    {/* {numberOfProgram} */}
                    {product?.length} модуль
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
                    {/* {serverPrice.toFixed(2)} */}
                    {serverPrice.toFixed(2)}₮
                  </div>
                </div>
                <Divider className="bill" />
                <div className=" flex justify-between w-[322px]">
                  <div className=" text-[#2F3747] text-[16px] font-medium">
                    НӨАТ
                  </div>
                  <div className="text-[#2F3747] text-[16px] font-semibold">
                    {/* {taxPrice.toFixed(2)} */}
                    {tax}₮
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
                      Хэрвээ та клауд сервэр сонгосон бол таны сервэр автоматаар
                      үүсэж худалдан авсан бараанууд автоматаар суугдана.
                    </p>
                  </div>
                </div>
                <div className=" flex justify-center mt-[30px]">
                  <Button
                    className=" text-[14px] font-bold w-[200px] h-[48px] text-white rounded-[43px] bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD] border-none"
                    type="primary"
                    onClick={() => onPurchase("month")}
                  >
                    Төлбөр төлөх
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
            <TabPane tab="УЛИРАЛ" key="2">
              <div className=" flex flex-col justify-center items-center">
                <div className=" flex justify-between  w-[322px]">
                  <div className=" text-[#2F3747] text-[16px] font-medium">
                    {/* {numberOfProgram} */}
                    {product?.length} модуль
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
                      Хэрвээ та клауд сервэр сонгосон бол таны сервэр автоматаар
                      үүсэж худалдан авсан бараанууд автоматаар суугдана.
                    </p>
                  </div>
                </div>
                <div className=" flex justify-center mt-[30px]">
                  <Button
                    className=" text-[14px] font-bold w-[200px] h-[48px] text-white rounded-[43px] bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD] border-none"
                    type="primary"
                    onClick={() => onPurchase("season")}
                  >
                    Төлбөр төлөх
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
            <TabPane tab="ЖИЛ" key="3">
              <div className=" flex flex-col justify-center items-center">
                <div className=" flex justify-between  w-[322px]">
                  <div className=" text-[#2F3747] text-[16px] font-medium">
                    {/* {numberOfProgram} */}
                    {product?.length} модуль
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
                      Хэрвээ та клауд сервэр сонгосон бол таны сервэр автоматаар
                      үүсэж худалдан авсан бараанууд автоматаар суугдана.
                    </p>
                  </div>
                </div>
                <div className=" flex justify-center mt-[30px]">
                  <Button
                    className=" text-[14px] font-bold w-[200px] h-[48px] text-white rounded-[43px] bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD] border-none"
                    type="primary"
                    onClick={() => onPurchase("year")}
                  >
                    Төлбөр төлөх
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

export default Cart;
