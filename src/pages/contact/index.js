import React from "react";
import NavbarTrans from "../../components/NavbarTrans";
import Footer from "../../components/Footer";
import { Image, Input, Button } from "antd";

const Contact = () => {
  const { TextArea } = Input;
  return (
    <div>
      <div className="relative h-[100px] md:h-auto overflow-hidden md:overflow-visible">
        <div className="absolute z-20 flex flex-col w-full h-full">
          <div className="w-full flex justify-center h-1/3">
            <NavbarTrans />
          </div>
          <div className="hidden my-auto uppercase xl:flex justify-center items-center text-white h-2/3 text-[36px] font-poppins-semibold">
            Холбоо барих
          </div>
        </div>

        <Image
          className=" w-[100vw] h-[100px] md:h-auto scale-150 md:scale-100"
          preview={false}
          src="/img/Slider.svg"
        />
      </div>
      <div className=" flex justify-center md:mt-[100px] mb-[100px]">
        <div className=" lg:w-[1170px] ">
          <div className=" flex flex-col md:flex-row justify-between">
            <div className="  w-[370px] h-[184px]  shadow-md ">
              <div className="flex items-center pt-[30px] pl-[30px]">
                <div>
                  <Image preview={false} src="/img/address.svg" />
                </div>
                <div className="ml-[16px]">
                  <div className=" text-[#9CA6C0] font-thin text-[16px]">
                    Хаяг:
                  </div>
                  <div className=" w-[240px] text-[#2F3747] text-[16px] font-semibold">
                    Реженси Ресидэнс, 16 Олимпын гудамж, 14220, Уб хот, МУ
                  </div>
                </div>
              </div>
            </div>
            <div className=" w-[370px] h-[184px] shadow-md my-10 md:my-0">
              <div className="flex items-center pt-[58px] pl-[30px]">
                <div>
                  <Image preview={false} src="/img/mail.svg" />
                </div>
                <div className="ml-[16px]">
                  <div className=" text-[#9CA6C0] font-thin text-[16px]">
                  Имэйл хаяг:
                  </div>
                  <div className=" w-[240px] text-[#2F3747] text-[16px] font-semibold">
                  info@ifinance.mn
                  </div>
                </div>
              </div>
            </div>
            <div className=" w-[370px] h-[184px]  shadow-md">
              <div className="flex items-center pt-[58px] pl-[30px]">
                <div>
                  <Image preview={false} src="/img/call.svg" />
                </div>
                <div className="ml-[16px]">
                  <div className=" text-[#9CA6C0] font-thin text-[16px]">
                  Утас:
                  </div>
                  <div className=" w-[240px] text-[#2F3747] text-[16px] font-semibold">
                  976 89977771
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between mt-[48px]">
            <div>
              <Image className=" scale-100 md:scale-100" preview={false} src="/img/Map.png" />
            </div>
            <div className=" md:w-[470px]">
              <div className=" text-[#2F3747] text-[24px] font-bold">
                Санал хүсэлт
              </div>
              <div className=" flex ">
                <div className="mr-[16px]">
                  <Input
                    className="  md:w-[227px] h-[48px] rounded-[8px]"
                    placeholder="Хэрэглэгчийн нэр"
                  />
                </div>
                <div>
                  <Input
                    className="  md:w-[227px] h-[48px] rounded-[8px]"
                    placeholder="И-мэйл хаяг"
                  />
                </div>
              </div>
              <Input
                className=" w-full h-[48px] rounded-[8px] mt-[16px]"
                placeholder="Хүсэлтийн гарчиг"
              />
              <TextArea
                className="w-full h-[200px] rounded-[8px] mt-[16px]"
                placeholder="Санал хүсэлтээ энд бичнэ үү"
              />
              <Button
                type="primary"
                className=" mt-[40px] w-[236px] h-[48px] rounded-[43px] bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD] border-none text-[14px] font-bold"
              >
                Илгээх
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
