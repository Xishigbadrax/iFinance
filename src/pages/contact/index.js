import React, { useState } from "react";
import NavbarTrans from "../../components/NavbarTrans";
import Footer from "../../components/Footer";
import { Image, Input, Button, message, Form } from "antd";
import GoogleMapReact from "google-map-react";
import Auth from "../../utils/auth";
import axios from "axios";
import { formatCountdown } from "antd/lib/statistic/utils";
import { useForm } from "antd/lib/form/Form";

const AnyReactComponent = ({ icon, text }) => (
  <div>
    {/* {icon} */}
    {text}
  </div>
);

const Contact = () => {
  const [username, setUserName] = useState();
  const [email, setEmail] = useState();
  const [title, setTitle] = useState();
  const [suggestion, setSuggestion] = useState();
  const [form] = Form.useForm();

  const baseUrl = process.env.NEXT_PUBLIC_URL;
  const { TextArea } = Input;
  var center = {
    lat: 47.91311332612327,
    lng: 106.92691611492839,
  };
  var zoom = 17;

  const onSend = async () => {
    const res = await axios.post(
      baseUrl + "send/contactus",
      {
        jsonrpc: 2.0,
        params: {
          username: username,
          email: email,
          title: title,
          suggestion: suggestion,
        },
      },
      {
        headers: {
          "Set-Cookie": "session_id=" + Auth.getToken(),
          "Content-Type": "application/json",
        },
      }
    );
    if (res?.data?.id == null) {
      message.success("Баярлалаа. Бид тантай эргээд холбогдох болно");
      form.resetFields();
    } else {
      message.warning("Алдаа гарлаа");
    }
    // console.log(res, "cont");
  };
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
                    Реженси Ресидэнс, 16 Олимпын гудамж, 14220, Улаанбаатар хот,
                    Монгол Улс
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
                    +976 72707007
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between  w-full mt-[48px]">
            <div style={{ height: "476px", width: "667px" }}>
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: "AIzaSyBR_zGWPmH-jvGd9kgI_gh8c4iND_kmcW4",
                }}
                defaultCenter={center}
                defaultZoom={zoom}
              >
                <AnyReactComponent
                  lat={47.91311332612327}
                  lng={106.92691611492839}
                  // icon={
                  //   <Image
                  //     preview={false}
                  //     className=" w-[50px] h-[50px]"
                  //     src="/img/dot.svg"
                  //   />
                  // }
                  text="my markkk"
                />
              </GoogleMapReact>
            </div>
            <div className=" md:w-[470px]">
              <div className=" text-[#2F3747] text-[24px] font-bold">
                Санал хүсэлт
              </div>
              <Form
                form={form}
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: false }}
                autoComplete="off"
              >
                <div className=" flex ">
                  <div className="mr-[16px]">
                    <Form.Item name="username">
                      <Input
                        onChange={(e) => setUserName(e.target.value)}
                        className="  md:w-[227px] h-[48px] rounded-[8px]"
                        placeholder="Хэрэглэгчийн нэр"
                      />
                    </Form.Item>
                  </div>
                  <div>
                    <Form.Item name="email">
                      <Input
                        onChange={(e) => setEmail(e.target.value)}
                        className="  md:w-[227px] h-[48px] rounded-[8px]"
                        placeholder="И-мэйл хаяг"
                      />
                    </Form.Item>
                  </div>
                </div>
                <Form.Item name="title">
                  <Input
                    onChange={(e) => setTitle(e.target.value)}
                    className=" w-full h-[48px] rounded-[8px] mt-[16px]"
                    placeholder="Хүсэлтийн гарчиг"
                  />
                </Form.Item>
                <Form.Item name="suggestion">
                  <TextArea
                    onChange={(e) => setSuggestion(e.target.value)}
                    className="w-full h-[200px] rounded-[8px] mt-[16px]"
                    placeholder="Санал хүсэлтээ энд бичнэ үү"
                  />
                </Form.Item>
                <Button
                  onClick={onSend}
                  type="primary"
                  className=" mt-[40px] w-[236px] h-[48px] rounded-[43px] bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD] border-none text-[14px] font-bold"
                >
                  Илгээх
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

// export default GoogleApiWrapper({
//   apiKey: "AIzaSyBR_zGWPmH-jvGd9kgI_gh8c4iND_kmcW4",
// })(Contact);
export default Contact;
