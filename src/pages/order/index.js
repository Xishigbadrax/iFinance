import React from "react";
import NavbarTrans from "../../components/NavbarTrans";
import Footer from "../../components/Footer";
import { Image, Tabs, Divider } from "antd";
import Auth from "../../utils/auth";

const Order = () => {
  const { TabPane } = Tabs;
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

      <Tabs defaultActiveKey="1">
        <TabPane tab="Бүгд" key="1">
          <div>
            <div className=" flex justify-center md:mt-[80px]">
              <div className=" bg-gray-100 w-[270px] h-[462px] md:mr-[30px]">
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
                <div className=" flex justify-center  bg-red-300 ">
                  <div className=" bg-green-400 w-[160px] ">
                    <div className=" flex justify-between ">
                      <div>
                        <Image src="/img/i1.svg" />
                      </div>
                      <div>Миний захиалга</div>
                    </div>
                    <div className=" flex justify-between">
                      <div>
                        <Image src="/img/i1.svg" />
                      </div>
                      <div>Миний сагс</div>
                    </div>
                    <div className=" flex justify-between">
                      <div>
                        <Image src="/img/i1.svg" />
                      </div>
                      <div>Миний захиалга</div>
                    </div>
                    <div className=" flex justify-between">
                      <div>
                        <Image src="/img/i1.svg" />
                      </div>
                      <div>Миний захиалга</div>
                    </div>
                    <div className=" flex justify-between">
                      <div>
                        <Image src="/img/i1.svg" />
                      </div>
                      <div>Миний захиалга</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" bg-blue-100 w-[870px] h-[652px]"></div>
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
