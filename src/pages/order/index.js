import React, { useEffect, useState, useContext } from "react";
import NavbarTrans from "../../components/NavbarTrans";
import Footer from "../../components/Footer";
import { Image, Tabs, Divider, message, Button, Collapse } from "antd";
import Auth from "../../utils/auth";
import { Table, Badge, Menu, Dropdown, Space, Modal } from "antd";
import axios from "axios";
import Context from "../../context/Context";
import PersonalSideBar from "../../components/PersonalSideBar";
import { useRouter } from "next/router";
import helper from "../../utils/helper";
import { CopyToClipboard } from "react-copy-to-clipboard";

const Order = () => {
  // const menu = (
  //   <Menu>
  //     <Menu.Item>Action 1</Menu.Item>
  //     <Menu.Item>Action 2</Menu.Item>
  //   </Menu>
  // );
  const { Panel } = Collapse;
  const [open, setOpen] = useState([]);
  const { setIsLoading, userData } = useContext(Context);
  const { TabPane } = Tabs;
  const baseUrl = process.env.NEXT_PUBLIC_URL;
  const router = useRouter();

  const [invoices, setInvoices] = useState();
  const [state, setState] = useState();
  const [toggle, setToggle] = useState(1);
  const [pay, setPay] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [invoice, setInvoice] = useState();
  const [bank, setBank] = useState();
  const [invoiceId, setInvoiceId] = useState(null);

  const data2 = [];

  // const Logout = async () => {
  //   const res = await axios.post(
  //     baseUrl + "logout",
  //     {
  //       jsonrpc: 2.0,
  //       params: {},
  //     },
  //     {
  //       headers: {
  //         "Set-Cookie": "session_id=" + Auth.getToken(),
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );

  //   if (res.data.error && res.data.error) {

  //     message.success("Амжилттай систэмээс гарлаа");
  //     Auth.destroyToken();
  //     // window.location.reload(false);
  //     Router.push("/");
  //   }

  //   // console.log(res, "logout res");
  // };
  const expandedRowRender = (rowData) => {
    // console.log(rowData, "ggg");

    const columns = [
      { title: "Бараа", dataIndex: "product_name", key: "product" },
      { title: "Гүйлгээний утга", dataIndex: "invoice_name", key: "value" },
      { title: "Тоо хэмжээ", dataIndex: "quantity", key: "count" },
      { title: "Нэгж үнэ", dataIndex: "unit_price", key: "unitPrice" },
      { title: "Хөнгөлөлт", dataIndex: "discount", key: "discount" },
      { title: "Татвар", dataIndex: "tax", key: "tax" },
      { title: "Дүн", dataIndex: "amount", key: "amount" },
    ];

    return (
      <Table
        className="expandTable "
        columns={columns}
        dataSource={rowData?.sub}
        pagination={false}
      />
    );
  };
  const handleCancel = (value) => {
    setIsModalVisible(false);
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

  const payPayment = async (id) => {
    setIsLoading(true);
    await axios
      .post(
        baseUrl + "payment/invoice",
        {
          jsonrpc: 2.0,
          params: {
            uid: Auth.getUserId(),
            invoice_id: id,
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
        setIsLoading(false);
        if (response?.data?.result) {
          setIsModalVisible(true);
          setInvoiceId(id);
          setInvoice(response?.data?.result?.invoice);
          setBank(response?.data?.result?.bank);
        } else {
          message.warning("Алдаа гарлаа");
        }
        // console.log(response, "payment");
      });
  };

  // useEffect(() => {
  //   console.log(toggle);
  // }, [toggle]);
  const columns = [
    // {
    //   title: "Нэхэмжлэх дугаар",
    //   dataIndex: "dugaar",
    //   key: "dugaar",
    // onHeaderCell: (column) => {
    //   return {
    //     onClick: () => setAgeSort()
    //   };
    // },
    // },
    {
      title:
        toggle == 1 ? (
          <div
            className=" bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD] rounded-[4px] py-[9px] px-[16px]
    text-white text-[14px] font-bold flex justify-center"
          >
            <div className=" w-[100px] text-center">Нэхэмжлэх дугаар</div>
          </div>
        ) : (
          <div
            className="  py-[9px] px-[16px]
     text-[14px] font-bold flex justify-center"
          >
            <div className=" w-[100px] text-center">Нэхэмжлэх дугаар</div>
          </div>
        ),
      dataIndex: "dugaar",
      key: "dugaar",
      sorter: {
        compare: (a, b) => a.dugaar - b.dugaar,
        // multiple: 2,
      },
      onHeaderCell: () => {
        return {
          onClick: () => setToggle(1),
        };
      },
    },
    {
      title:
        toggle == 2 ? (
          <div
            className=" bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD] rounded-[4px] py-[9px] px-[16px]
  text-white text-[14px] font-bold flex justify-center"
          >
            <div className=" w-[100px] text-center">Нэхэмжилсэн дүн</div>
          </div>
        ) : (
          <div
            className="  py-[9px] px-[16px]
   text-[14px] font-bold flex justify-center"
          >
            <div className=" w-[100px] text-center">Нэхэмжилсэн дүн</div>
          </div>
        ),

      dataIndex: "dun",
      key: "dun",
      sorter: (a, b) => a.system.localeCompare(b.first_name),
      onHeaderCell: () => {
        return {
          onClick: () => setToggle(2),
        };
      },
    },
    {
      title:
        toggle == 3 ? (
          <div
            className=" bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD] rounded-[4px] py-[9px] px-[16px]
  text-white text-[14px] font-bold flex justify-center"
          >
            <div className=" w-[100px] text-center">Төлбөрийн систем</div>
          </div>
        ) : (
          <div
            className="  py-[9px] px-[16px]
   text-[14px] font-bold flex justify-center"
          >
            <div className=" w-[100px] text-center">Төлбөрийн систем</div>
          </div>
        ),

      dataIndex: "system",
      key: "system",
      sorter: (a, b) => a.system.localeCompare(b.first_name),
      onHeaderCell: () => {
        return {
          onClick: () => setToggle(3),
        };
      },
    },
    {
      title:
        toggle == 4 ? (
          <div
            className=" bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD] rounded-[4px] py-[9px] px-[16px]
text-white text-[14px] font-bold flex justify-center"
          >
            <div className=" w-[100px] text-center">Захиалгын огноо</div>
          </div>
        ) : (
          <div
            className="  py-[9px] px-[16px]
 text-[14px] font-bold flex justify-center"
          >
            <div className=" w-[100px] text-center">Захиалгын огноо</div>
          </div>
        ),

      dataIndex: "sognoo",
      key: "ognoo",
      sorter: (a, b) => a.sognoo.localeCompare(b.first_name),
      onHeaderCell: () => {
        return {
          onClick: () => setToggle(4),
        };
      },
    },
    {
      title:
        toggle == 5 ? (
          <div
            className=" bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD] rounded-[4px] py-[9px] px-[16px]
text-white text-[14px] font-bold flex justify-center"
          >
            <div className=" w-[80px] text-center">Дуусах огноо</div>
          </div>
        ) : (
          <div
            className="  py-[9px] px-[16px]
text-[14px] font-bold flex justify-center"
          >
            <div className=" w-[80px] text-center">Дуусах огноо</div>
          </div>
        ),

      dataIndex: "dognoo",
      key: "dognoo",
      sorter: {
        compare: (a, b) => a.dognoo - b.dognoo,
        // multiple: 2,
      },
      onHeaderCell: () => {
        return {
          onClick: () => setToggle(5),
        };
      },
    },
    {
      title:
        toggle == 6 ? (
          <div
            className=" bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD] rounded-[4px] py-[9px] px-[16px]
text-white text-[14px] font-bold flex justify-center "
          >
            <div className=" w-[80px]  h-[44px] flex items-center justify-center text-center">
              Төлөв
            </div>
          </div>
        ) : (
          <div
            className="  py-[9px] px-[16px]
text-[14px] font-bold flex justify-center"
          >
            <div className=" w-[80px] text-center">Төлөв</div>
          </div>
        ),
      dataIndex: "tuluv",
      key: "tuluv",
      sorter: {
        compare: (a, b) => a.tuluv - b.tuluv,
        // multiple: 2,
      },
      // sorter: (a, b) => a.tuluv?.localeCompare(b.first_name),
      onHeaderCell: () => {
        return {
          onClick: () => setToggle(6),
        };
      },
    },
    {
      title: (
        <div
          className="  py-[9px] px-[16px]
text-[14px] font-bold flex justify-center"
        >
          <div className=" w-[80px] text-center"></div>
        </div>
      ),

      dataIndex: "check",
      key: "check",

      // sorter: (a, b) => a.tuluv?.localeCompare(b.first_name),
    },
  ];

  const data = [];
  const draft = [];

  invoices?.map((item, index) => {
    data.push({
      key: item.invoice_id,
      dugaar: item.invoice_id,
      // dun: item.invoice_amount.toFixed(2) + "₮",
      dun: helper.formatValueReverse(item.invoice_amount) + "₮",
      system: item.invoice_type,
      sognoo: item.invoice_start_date,
      dognoo: item.invoice_end_date,
      tuluv:
        item.invoice_state == "Ноорог" ? (
          <div>{item.invoice_state}</div>
        ) : (
          item.invoice_state
        ),

      sub: item.invoice_lines,
      check:
        pay == item.invoice_id ? (
          <Button
            onClick={() => payPayment(item.invoice_id)}
            type="primary"
            className=" ml-2 w-[80px] h-[38px]   rounded-[43px] bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD] border-none text-[14px] font-bold"
          >
            Төлөх
          </Button>
        ) : (
          <Button
            onClick={() => checkPayment(item.invoice_id)}
            type="primary"
            className=" ml-2 w-[80px] h-[38px]   rounded-[43px] bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD] border-none text-[14px] font-bold"
          >
            Шалгах
          </Button>
        ),
    });

    state?.map((el) => {
      if (item.invoice_state == el) {
        draft.push({
          key: item.invoice_id,
          dugaar: item.invoice_id,
          dun: item.invoice_amount.toFixed(2) + "₮",
          system: item.invoice_type,
          sognoo: item.invoice_start_date,
          dognoo: item.invoice_end_date,
          tuluv: item.invoice_state,
          sub: item.invoice_lines,
        });
      }
    });
  });

  const checkPayment = async (id) => {
    setIsLoading(true);
    // console.log(id, "itemm");
    await axios
      .post(
        baseUrl + "check/invoice",
        {
          jsonrpc: 2.0,
          params: {
            uid: Auth.getUserId(),
            invoice_id: id,
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
        setIsLoading(false);
        console.log(response, "check");

        if (response?.data?.result == true) {
          message.success("Төлбөр амжилттай төлөгдсөн");
        } else if (response?.data?.result == false) {
          message.warning("Төлбөр төлөгдөөгүй");
          setPay(id);
        } else {
          message.warning("Нэхэмжлэл олдсонгүй");
        }
      });
  };
  const checkPay = async () => {
    setIsLoading(true);

    await axios
      .post(
        baseUrl + "check/invoice",
        {
          jsonrpc: 2.0,
          params: {
            uid: Auth.getUserId(),
            invoice_id: invoiceId,
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
        setIsLoading(false);
        console.log(response, "check");

        if (response?.data?.result == true) {
          message.success("Төлбөр амжилттай төлөгдсөн");
        } else if (response?.data?.result == false) {
          message.warning("Төлбөр төлөгдөөгүй");
          // setPay(id);
        } else {
          message.warning("Нэхэмжлэл олдсонгүй");
        }
      });
  };
  const dateSource = (item) => {
    var gg = [];

    for (let i = 0; i < invoices.length; i++) {
      if (item === invoices[i].invoice_state) {
        // console.log(invoices[i], 'ggg');

        gg.push({
          key: invoices[i].invoice_id,
          dugaar: invoices[i].invoice_id,
          dun: helper.formatValueReverse(invoices[i].invoice_amount) + "₮",
          system: invoices[i].invoice_type,
          sognoo: invoices[i].invoice_start_date,
          dognoo: invoices[i].invoice_end_date,
          tuluv: invoices[i].invoice_state,
          sub: invoices[i].invoice_lines,

          check:
            pay == invoices[i].invoice_id ? (
              <Button
                onClick={() => payPayment(invoices[i].invoice_id)}
                type="primary"
                className=" ml-2 w-[80px] h-[38px]   rounded-[43px] bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD] border-none text-[14px] font-bold"
              >
                Төлөх
              </Button>
            ) : (
              <Button
                onClick={() => checkPayment(invoices[i].invoice_id)}
                type="primary"
                className=" ml-2 w-[80px] h-[38px]   rounded-[43px] bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD] border-none text-[14px] font-bold"
              >
                Шалгах
              </Button>
            ),
        });
      }
    }

    return gg;
  };

  useEffect(() => {
    console.log(pay, "togggleee");
  }, [pay]);
  useEffect(async () => {
    !Auth.getToken() &&
      router.push({
        pathname: `/`,
      });
    setIsLoading(true);
    await axios
      .post(
        baseUrl + "get/invoices",
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
        // console.log(response, "zahialga");
        setInvoices(response.data?.result?.invoices);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(async () => {
    let arrayy = [];
    invoices?.map((item) => {
      if (!arrayy.includes(item.invoice_state)) {
        arrayy.push(item?.invoice_state);
      }
    });
    setState(arrayy);
  }, [invoices]);
  // console.log(state);
  return (
    <div>
      <div className="relative h-[100px] md:h-auto overflow-hidden md:overflow-visible">
        <div className="absolute z-20 flex flex-col w-full h-full">
          <div className="w-full flex justify-center h-1/3">
            <NavbarTrans />
          </div>
          <div className=" lg:flex justify-center hidden">
            <div className=" w-[1100px] ">
              <div className=" mt-[20px] flex justify-between w-[250px]">
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
                  <a
                    href="/order"
                    className="text-white text-[14px] font-semibold"
                  >
                    Миний захиалга
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden my-auto uppercase xl:flex justify-center items-center text-white h-2/3 text-[36px] font-poppins-semibold">
            Миний захиалга
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

      <Tabs className="myOrder mb-10" defaultActiveKey="1">
        <TabPane tab="Бүгд" key="1">
          <div className=" ">
            <div className=" md:mt-[70px] flex flex-col md:flex-row justify-center overflow-x-scroll md:overflow-x-hidden">
              <PersonalSideBar hover={1} />
              <div className=" mt-[30px] md:mt-[5px] md:w-[870px]">
                <Table
                  className="components-table-demo-nested"
                  columns={columns}
                  expandable={{ expandedRowRender }}
                  dataSource={data}
                />
              </div>
            </div>
          </div>
        </TabPane>
        {state?.map((item, index) => {
          return (
            <TabPane tab={item} key={index + 2}>
              <div className=" ">
                <div className=" md:mt-[70px] flex flex-col md:flex-row justify-center overflow-x-scroll md:overflow-x-hidden">
                  <PersonalSideBar hover={1} />
                  <div className=" mt-[30px] md:mt-[5px] md:w-[870px]">
                    <Table
                      className="components-table-demo-nested"
                      columns={columns}
                      expandable={{ expandedRowRender }}
                      dataSource={dateSource(item)}
                    />
                  </div>
                </div>
              </div>
            </TabPane>
          );
        })}
      </Tabs>

      <Footer />
      <Modal
        title="Төлбөр төлөх"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[]}
        className="buy"
      >
        <Tabs className="buyTab" defaultActiveKey="1">
          <TabPane tab="QPAY ҮЙЛЧИЛГЭЭ" key="1">
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
            <div className="flex justify-center mt-[30px]">
              <Button
                onClick={checkPay}
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

export default Order;
