import React, { useEffect, useState } from "react";
import NavbarTrans from "../../components/NavbarTrans";
import Footer from "../../components/Footer";
import { Image, Table, Divider, message, Button, Modal, Tabs } from "antd";
import axios from "axios";
import Auth from "../../utils/auth";
import { CopyToClipboard } from "react-copy-to-clipboard";

const Cart = () => {
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
        db: baseDB,
        uid: Auth.getUserId(),
        product_id: id,
        type: type,
      },
    };
    console.log(data, "dataaa");
    const res = await axios.post(baseUrl + "delete/cart_list", data, {
      headers: {
        "Set-Cookie": "session_id=" + Auth.getToken(),
        "Content-Type": "application/json",
      },
    });
    console.log(res, "delete ress");
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
      setIsLogin(false);
      message.success("Амжилттай систэмээс гарлаа");
      Auth.destroyToken();
      // window.location.reload(false);
      Router.push("/");
    }

    // console.log(res, "logout res");
  };

  const onPurchase = async () => {
    var productIds = [];
    var serverID = 0;

    product.map((item) => {
      productIds.push(item.product_id);
    });
    server.map((item) => {
      serverID = item.server_id;
    });

    console.log(productIds, serverID, "odoooldoo");

    var data = {
      jsonrpc: 2.0,
      params: {
        db: baseDB,
        uid: Auth.getUserId(),
        server_id: serverID,

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
    console.log(res, "purchase res");
  };

  useEffect(async () => {
    const res = await axios.post(
      baseUrl + "get/cart_list",
      {
        jsonrpc: 2.0,
        params: {
          db: baseDB,
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
    console.log(res, "cartiin api");
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
            <Image src={"data:image/png;base64," + item.product_icon} />

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
    setData(arr);
    setPrice(a);
    setDiscount(sale);
    setTotalPrice(price - sale);
    console.log(product, "product");
  }, [server || product]);

  useEffect(() => {
    console.log(data, "dataa22");
  }, [data]);
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
      <div className=" flex  justify-center  md:mb-[10px] ">
                <div className=" relative ">
                  <div className="  shadow-lg w-[270px] h-[462px] md:mr-[30px] ml-10 rounded-[4px]">
                    <div className=" flex items-center ml-[34px] mt-[34px]">
                      <div className=" mr-[20px]">
                        <Image src="/img/profile.svg" />
                      </div>
                      <div className="text-[#2F3747] text-[18px]  font-bold">
                        {Auth.getName()}
                      </div>
                    </div>
                    <div className=" flex justify-center text-[#9CA6C0] text-[11px] font-semibold mt-[12px]">
                      kenzi.lawson@example.com
                    </div>
                    <Divider />
                    <div className=" flex justify-center   ">
                      <div className=" ">
                        <div className=" flex justify-start">
                          <div className=" mr-[19px]">
                            <Image
                              preview={false}
                              height={30}
                              width={30}
                              src="/img/i1.svg"
                            />
                          </div>
                          <div className="text-[#2E28D4] opacity-50 text-[18px] font-bold">
                            <a href="/order" className="text-[#2E28D4]">
                              {" "}
                              Миний захиалга
                            </a>
                          </div>
                        </div>
                        <div className=" flex justify-start my-[20px]">
                          <div className=" mr-[19px]">
                            <Image
                              preview={false}
                              height={30}
                              width={30}
                              src="/img/i2.svg"
                            />
                          </div>
                          <div className="text-[#2E28D4] opacity-50 text-[18px] font-bold">
                            <a href="/cart" className="text-[#2E28D4]">
                              {" "}
                              Миний сагс
                            </a>
                          </div>
                        </div>
                        <div className=" flex justify-start">
                          <div className=" mr-[19px]">
                            <Image
                              preview={false}
                              height={30}
                              width={30}
                              src="/img/i3.svg"
                            />
                          </div>
                          <div className="text-[#2E28D4] opacity-50 text-[18px] font-bold">
                            <a href="/info" className="text-[#2E28D4]">
                              {" "}
                              Миний мэдээлэл{" "}
                            </a>
                          </div>
                        </div>
                        <div className=" flex justify-start mt-[20px]">
                          <div className=" mr-[19px]">
                            <Image
                              preview={false}
                              height={30}
                              width={30}
                              src="/img/i4.svg"
                            />
                          </div>
                          <div className="text-[#2E28D4] opacity-50 text-[18px] font-bold ">
                            Тохиргоо
                          </div>
                        </div>
                        <div className=" flex justify-start mt-[40px]">
                          <div className=" mr-[19px]">
                            <Image
                              preview={false}
                              height={30}
                              width={30}
                              src="/img/i5.svg"
                            />
                          </div>
                          <div onClick={onLogout} className="text-[#F01A63] cursor-pointer opacity-50 text-[18px] font-bold">
                            Гарах
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
        <div className=" mr-[30px] px-4 md:px-4">
         
          <Table
            className="tcell"
            className=" w-[770px]"
            columns={columns}
            dataSource={data}
          />
        </div>
        <div className=" w-[370px] h-[315px] shadow-xl rounded-[4px] mb-[100px] px-4 md:px-0">
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
