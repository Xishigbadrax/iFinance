import React, { useEffect, useState } from "react";
import NavbarTrans from "../../components/NavbarTrans";
import Footer from "../../components/Footer";
import { Image, Tabs, Divider } from "antd";
import Auth from "../../utils/auth";
import { Table, Badge, Menu, Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import axios from "axios";

const Order = () => {
  const menu = (
    <Menu>
      <Menu.Item>Action 1</Menu.Item>
      <Menu.Item>Action 2</Menu.Item>
    </Menu>
  );
  const { TabPane } = Tabs;
  const baseUrl = process.env.NEXT_PUBLIC_URL;
  const baseDB = process.env.NEXT_PUBLIC_DB;
  const [invoices, setInvoices] = useState();
  const data2 = [];

  const expandedRowRender = (rowData) => {
    console.log(rowData, 'ggg')

    const columns = [
      { title: "Бараа", dataIndex: "product_name", key: "product" },
      { title: "Гүйлгээний утга", dataIndex: "invoice_name", key: "value" },
      { title: "Тоо хэмжээ", dataIndex: "quantity", key: "count" },
      { title: "Нэгж үнэ", dataIndex: "unit_price", key: "unitPrice" },
      { title: "Хөнгөлөлт", dataIndex: "discount", key: "discount" },
      { title: "Татвар", dataIndex: "tax", key: "tax" },
      { title: "Дүн", dataIndex: "amount", key: "amount" },
     
    ];
   

    return <Table columns={columns} dataSource={rowData.sub} pagination={false} />;
  };

  const columns = [
    { title: "Нэхэмжлэх дугаар", dataIndex: "dugaar", key: "dugaar" },
    { title: "Нэхэмжилсэн дүн", dataIndex: "dun", key: "dun" },
    { title: "Төлбөрийн систем", dataIndex: "system", key: "system" },
    { title: "Захиалгын огноо", dataIndex: "sognoo", key: "ognoo" },
    { title: "Дуусах огноо", dataIndex: "dognoo", key: "dognoo" },
    { title: "Төлөв", dataIndex: "tuluv", key: "tuluv" },
  ];

  // const data = [];
  // for (let i = 0; i < 3; ++i) {
  //   data.push({
  //     key: i,
  //     dugaar: "Screem",
  //     dun: "iOS",
  //     system: "10.3.4.5654",
  //     sognoo: 500,
  //     dognoo: "Jack",
  //     tuluv: "2014-12-24 23:12:00",
  //   });
  // }
  const data = [];

  invoices?.map((item, index) => {
    data.push({
      key: item.invoice_id,
      dugaar: item.invoice_id,
      dun: item.invoice_amount.toFixed(2),
      system: item.invoice_type,
      sognoo: item.invoice_start_date,
      dognoo: item.invoice_end_date,
      tuluv: item.invoice_state,
      sub: item.invoice_lines
    });

    // item.invoice_lines.map((line, index2) => {
    //   if (line) {
        
    //     data2.push({
    //           key: line.index2,
    //           product: line.product_name,
    //           value: "This is production name",
    //           upgradeNum: "Upgraded: 56",
    //         });
    //   }
    // })
  });

  useEffect(async () => {
    await axios
      .post(
        baseUrl + "get/invoices",
        {
          jsonrpc: 2.0,
          params: {
            uid: Auth.getUserId(),
            db: baseDB,
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
        console.log(response, "zahialga");
        setInvoices(response.data.result.invoices);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
          <div className=" overflow-x-scroll md:overflow-x-hidden">
            <div className=" flex flex-col md:flex-row justify-center md:mt-[80px] mt-[40px]">
              <div className=" ">
              <div className=" shadow-xl w-[270px] h-[462px] md:mr-[30px] ml-10 rounded-[4px]">
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
                       <a  href="/order" className="text-[#2E28D4]"> Миний захиалга</a>
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
                          <a  href="/cart" className="text-[#2E28D4]"> Миний сагс</a>
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
                          <a  href="/info" className="text-[#2E28D4]">  Миний мэдээлэл </a>
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
                      <div className="text-[#F01A63] opacity-50 text-[18px] font-bold">
                        Гарах
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </div>
              <div className=" mt-10 md:mt-0 md:w-[870px]">
              
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
        <TabPane tab="Төлбөр хүлээгдэж буй" key="2">
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="Баталгаажсан" key="3">
          Content of Tab Pane 3
        </TabPane>
        <TabPane tab="Сервер үүссэн" key="4">
          Content of Tab Pane 4
        </TabPane>
        <TabPane tab="Цуцалсан" key="5">
          Content of Tab Pane 5
        </TabPane>
      </Tabs>
      <Footer />
    </div>
  );
};

export default Order;
