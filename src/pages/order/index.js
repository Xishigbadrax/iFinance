import React, { useEffect, useState, useContext } from "react";
import NavbarTrans from "../../components/NavbarTrans";
import Footer from "../../components/Footer";
import { Image, Tabs, Divider, message, Button } from "antd";
import Auth from "../../utils/auth";
import { Table, Badge, Menu, Dropdown, Space } from "antd";
import axios from "axios";
import Context from "../../context/Context";
import PersonalSideBar from "../../components/PersonalSideBar";
import { useRouter } from "next/router";

const Order = () => {
  const menu = (
    <Menu>
      <Menu.Item>Action 1</Menu.Item>
      <Menu.Item>Action 2</Menu.Item>
    </Menu>
  );
  const { setIsLoading, userData } = useContext(Context);
  const { TabPane } = Tabs;
  const baseUrl = process.env.NEXT_PUBLIC_URL;
  const router = useRouter();

  const [invoices, setInvoices] = useState();
  const [state, setState] = useState();
  const [toggle, setToggle] = useState(1);

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
        className="expandTable"
        columns={columns}
        dataSource={rowData?.sub}
        pagination={false}
      />
    );
  };

  useEffect(() => {
    console.log(toggle);
  }, [toggle]);
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
      sorter: {
        compare: (a, b) => a.dun - b.dun,

        // multiple: 2,
      },
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
  ];

  const data = [];
  const draft = [];

  invoices?.map((item, index) => {
    data.push({
      key: item.invoice_id,
      dugaar: item.invoice_id,
      // dun: item.invoice_amount.toFixed(2) + "₮",
      dun: item.invoice_amount,
      system: item.invoice_type,
      sognoo: item.invoice_start_date,
      dognoo: item.invoice_end_date,
      tuluv:
        item.invoice_state == "Ноорог" ? (
          <div>
            {item.invoice_state}
            <Button
              onClick={() => checkPayment(item.invoice_id)}
              type="primary"
              className=" ml-2 w-[80px] h-[38px]   rounded-[43px] bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD] border-none text-[14px] font-bold"
            >
              Шалгах
            </Button>
          </div>
        ) : (
          item.invoice_state
        ),

      sub: item.invoice_lines,
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
    await axios
      .post(
        baseUrl + "check/invoice",
        {
          jsonrpc: 2.0,
          params: {
            uid: Auth.getUserId,
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
        // console.log(response, "check");
        if (response?.data?.result == true) {
          message.success("Төлбөр амжилттай төлөгдсөн");
        } else if (response?.data?.result == false) {
          message.warning("Төлбөр төлөгдөөгүй");
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
          dun: invoices[i].invoice_amount.toFixed(2) + "₮",
          system: invoices[i].invoice_type,
          sognoo: invoices[i].invoice_start_date,
          dognoo: invoices[i].invoice_end_date,
          tuluv: invoices[i].invoice_state,
          sub: invoices[i].invoice_lines,
        });
      }
    }

    return gg;
  };

  // useEffect(() => {
  //   console.log(toggle, "togggleee");
  // }, [toggle]);
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
        setInvoices(response.data.result.invoices);
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
          <div className=" mt-[20px] ml-[375px] flex justify-between w-[270px]">
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
                Миний захиалгууд
              </a>
            </div>
          </div>
          <div className="hidden my-auto uppercase xl:flex justify-center items-center text-white h-2/3 text-[36px] font-poppins-semibold">
            Миний захиалгууд
          </div>
        </div>

        <Image
          className=" w-[100vw] h-[100px] md:h-auto scale-150 md:scale-100"
          preview={false}
          src="/img/Slider.svg"
        />
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
    </div>
  );
};

export default Order;
