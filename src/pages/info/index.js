import React, { useState, useEffect } from "react";
import NavbarTrans from "../../components/NavbarTrans";
import Footer from "../../components/Footer";
import {
  Image,
  Divider,
  Tabs,
  Checkbox,
  Button,
  Input,
  Form,
  Select,
} from "antd";
import Auth from "../../utils/auth";
import TextField from "@mui/material/TextField";
import { IconButton, InputAdornment } from "@mui/material";
import axios from "axios";

const Info = () => {
  const baseUrl = process.env.NEXT_PUBLIC_URL;
  const { TabPane } = Tabs;
  const [form] = Form.useForm();
  const [mainData, setMainData] = useState(null);
  const { Option } = Select;
  const [district, setDistrict] = useState();
  const [sumkhoroo, setSumkhoroo] = useState();
  const [sumkhorooId, setSumkhorooId] = useState();

  console.log(mainData, "maindataaa");

  const layout = {
    wrapperCol: { span: 20 },
  };

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onSave = async () => {
    console.log(form.getFieldsValue());
    const res = await axios.post(
      baseUrl + "update/user/info",
      {
        jsonrpc: 2.0,
        params: {
          uid: Auth.getUserId(),
          info:form.getFieldsValue()
        },
      },
      {
        headers: {
          "Set-Cookie": "session_id=" + Auth.getToken(),
          "Content-Type": "application/json",
        },
      }
    );
      console.log(res, "update res");
  };
  const onSumChange = (value) => {
    setSumkhorooId(value)
    console.log(value, "iddd");
  };

  useEffect(async () => {
    const res = await axios.post(
      baseUrl + "get/user/info",
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
    setMainData(res.data.result.main[0]);
    setDistrict(res.data.result.district);
    setSumkhoroo(res.data.result.sumkhoroo);
    console.log(res, "info res");
  }, []);

  return (
    <div>
      <div className="relative h-[100px] md:h-auto overflow-hidden md:overflow-visible">
        <div className="absolute z-20 flex flex-col w-full h-full">
          <div className="w-full flex justify-center h-1/3">
            <NavbarTrans />
          </div>
          <div className="hidden my-auto uppercase xl:flex justify-center items-center text-white h-2/3 text-[36px] font-poppins-semibold">
            Миний мэдээлэл
          </div>
        </div>

        <Image
          className=" w-[100vw] h-[100px] md:h-auto scale-150 md:scale-100"
          preview={false}
          src="/img/Slider.svg"
        />
      </div>
      <div className="flex flex-col lg:flex-row md:mt-[100px] justify-center">
        <div>
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
            <div className=" flex justify-center ">
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
                      Миний мэдээлэл
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
                  <div className="text-[#F01A63] opacity-50 text-[18px] font-bold">
                    Гарах
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" mt-[50px] md:mt-0">
          <Tabs className="infoTab" defaultActiveKey="1">
            <TabPane
              tab={
                <div className="flex items-center">
                  <div>
                    <Image preview={false} src="/img/m1.svg" />
                  </div>
                  <div className=" flex flex-col items-start ml-[10px]">
                    <div className=" text-[11px] font-semibold">
                      Хувийн мэдээлэл
                    </div>
                    <div className=" text-[16px] font-normal">Эрдэнэбаяр</div>
                  </div>
                </div>
              }
              key="1"
            >
              <div className=" px-10 md:px-0">
                <div className=" md:w-[616px] flex flex-col md:flex-row justify-between">
                  <div className="flex  items-center">
                    <div className=" text-[18px] font-bold text-[#2F3747]">
                      Хувь хүн
                    </div>
                    <div>
                      <Checkbox className=" ml-[24px]" />
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className=" text-[18px] font-bold text-[#2F3747]">
                      Байгууллага
                    </div>
                    <div>
                      <Checkbox className="ml-[24px]" />
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className=" text-[16px]  text-[#2F3747]">
                      Давхар харилцагч үүсгэх
                    </div>
                    <div>
                      <Checkbox className=" ml-[24px]" />
                    </div>
                  </div>
                </div>
                <div className=" mt-[31px]">
                  <Form
                    onFinish={onFinish}
                    {...layout}
                    form={form}
                    name="control-hooks"
                  >
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <div className="text-[#9CA6C0] text-[12px] font-normal">
                          Овог
                        </div>
                        <Form.Item name="surname" rules={[{ required: true }]}>
                          <Input
                            bordered={false}
                            suffix={
                              <Image preview={false} src="/img/edit.svg" />
                            }
                            style={{ borderBottom: "1px solid black" }}
                            placeholder="Овог"
                          />
                        </Form.Item>
                      </div>
                      <div>
                        <div className="text-[#9CA6C0] text-[12px] font-normal">
                          Нэр
                        </div>
                        <Form.Item name="name">
                          <Input
                            placeholder={mainData?.name}
                            bordered={false}
                            suffix={
                              <Image preview={false} src="/img/edit.svg" />
                            }
                            style={{ borderBottom: "1px solid black" }}
                          />
                        </Form.Item>
                      </div>
                      <div>
                        <div className="text-[#9CA6C0] text-[12px] font-normal">
                          Регистрийн дугаар
                        </div>
                        <Form.Item name="register" rules={[{ required: true }]}>
                          <Input
                            bordered={false}
                            suffix={
                              <Image preview={false} src="/img/edit.svg" />
                            }
                            style={{ borderBottom: "1px solid black" }}
                            placeholder=" Регистрийн дугаар"
                          />
                        </Form.Item>
                      </div>
                      <div>
                        <div className="text-[#9CA6C0] text-[12px] font-normal">
                          Төрсөн огноо
                        </div>
                        <Form.Item name="birthday" rules={[{ required: true }]}>
                          <Input
                            bordered={false}
                            suffix={
                              <Image preview={false} src="/img/edit.svg" />
                            }
                            style={{ borderBottom: "1px solid black" }}
                            placeholder="Төрсөн огноо"
                          />
                        </Form.Item>
                      </div>
                      {/* <div>
                        <div className="text-[#9CA6C0] text-[12px] font-normal">
                          Хүйс
                        </div>
                        <Form.Item name="note" rules={[{ required: true }]}>
                          <Input
                            bordered={false}
                            suffix={
                              <Image preview={false} src="/img/edit.svg" />
                            }
                            style={{ borderBottom: "1px solid black" }}
                            placeholder="Хүйс"
                          />
                        </Form.Item>
                      </div> */}
                      <div>
                        <div className="text-[#9CA6C0] text-[12px] font-normal">
                          И-мэйл хаяг
                        </div>
                        <Form.Item name="email" rules={[{ required: true }]}>
                          <Input
                            bordered={false}
                            suffix={
                              <Image preview={false} src="/img/edit.svg" />
                            }
                            style={{ borderBottom: "1px solid black" }}
                            placeholder={
                              mainData?.email != false
                                ? mainData?.email
                                : "И-мэйл хаяг"
                            }
                          />
                        </Form.Item>
                      </div>
                      <div>
                        <div className="text-[#9CA6C0] text-[12px] font-normal">
                          Улс
                        </div>
                        <Form.Item
                          name="country_name"
                          rules={[{ required: true }]}
                        >
                          <Input
                            placeholder={mainData?.country_name}
                            bordered={false}
                            suffix={
                              <Image preview={false} src="/img/edit.svg" />
                            }
                            style={{ borderBottom: "1px solid black" }}
                          />
                        </Form.Item>
                      </div>
                      <div>
                        <div className="text-[#9CA6C0] text-[12px] font-normal">
                          Аймаг /хот
                        </div>
                        <Form.Item
                          name="city_name"
                          rules={[{ required: true }]}
                        >
                          <Select
                            placeholder="Select a option and change input text above"
                            onChange={(value) => onSumChange(value)}
                            bordered={false}
                            style={{ borderBottom: "1px solid black" }}
                          >
                            {district?.map((item, index) => {
                              return (
                                <Option key={index} value={item.id}>
                                  {item.name}
                                </Option>
                              );
                            })}
                          </Select>
                        </Form.Item>
                      </div>
                      <div>
                        <div className="text-[#9CA6C0] text-[12px] font-normal">
                          Сум /хороо
                        </div>
                        <Form.Item name="note" rules={[{ required: true }]}>
                          <Select
                            placeholder="Select a option and change input text above"
                            // onChange={onGenderChange}
                            bordered={false}
                            style={{ borderBottom: "1px solid black" }}
                            allowClear
                          >
                            {sumkhoroo?.map((item, index) => {
                              if (item.district_id == sumkhorooId) {
                               return  <Option key={item.id} value={item.id}>
                                  {item.name}
                                </Option>;
                              }
                            })}
                          </Select>
                        </Form.Item>
                      </div>
                      <div>
                        <div className="text-[#9CA6C0] text-[12px] font-normal">
                          Гудамж
                        </div>
                        <Form.Item name="street" rules={[{ required: true }]}>
                          <Input
                            bordered={false}
                            suffix={
                              <Image preview={false} src="/img/edit.svg" />
                            }
                            style={{ borderBottom: "1px solid black" }}
                            placeholder="Гудамж"
                          />
                        </Form.Item>
                      </div>
                      <div>
                        <div className="text-[#9CA6C0] text-[12px] font-normal">
                          Тоот дугаар /хашааны дугаар
                        </div>
                        <Form.Item
                          name="door_number"
                          rules={[{ required: true }]}
                        >
                          <Input
                            bordered={false}
                            suffix={
                              <Image preview={false} src="/img/edit.svg" />
                            }
                            style={{ borderBottom: "1px solid black" }}
                            placeholder="Тоот дугаар /хашааны дугаар"
                          />
                        </Form.Item>
                      </div>
                      <div>
                        <div className="text-[#9CA6C0] text-[12px] font-normal">
                          Оршин суугаа хаяг
                        </div>
                        <Form.Item
                          name="residence_address"
                          rules={[{ required: true }]}
                        >
                          <Input
                            bordered={false}
                            suffix={
                              <Image preview={false} src="/img/edit.svg" />
                            }
                            style={{ borderBottom: "1px solid black" }}
                            placeholder="Оршин суугаа хаяг"
                          />
                        </Form.Item>
                      </div>
                      <div>
                        <div className="text-[#9CA6C0] text-[12px] font-normal">
                          Компаний нэр
                        </div>
                        <Form.Item
                          name="company_name"
                          rules={[{ required: true }]}
                        >
                          <Input
                            bordered={false}
                            suffix={
                              <Image preview={false} src="/img/edit.svg" />
                            }
                            style={{ borderBottom: "1px solid black" }}
                            placeholder=" Компаний нэр"
                          />
                        </Form.Item>
                      </div>
                      {/* <div>
                        <div className="text-[#9CA6C0] text-[12px] font-normal">
                          Боловсролын зэрэг
                        </div>
                        <Form.Item name="note" rules={[{ required: true }]}>
                          <Input
                            bordered={false}
                            suffix={
                              <Image preview={false} src="/img/edit.svg" />
                            }
                            style={{ borderBottom: "1px solid black" }}
                            placeholder="Боловсролын зэрэг"
                          />
                        </Form.Item>
                      </div> */}
                      {/* <div>
                        <div className="text-[#9CA6C0] text-[12px] font-normal">
                          Боловсрол
                        </div>
                        <Form.Item name="note" rules={[{ required: true }]}>
                          <Input
                            bordered={false}
                            suffix={
                              <Image preview={false} src="/img/edit.svg" />
                            }
                            style={{ borderBottom: "1px solid black" }}
                            placeholder=" Боловсрол"
                          />
                        </Form.Item>
                      </div> */}
                    </div>
                  </Form>
                </div>
                <div className="flex flex-col md:flex-row md:w-[765px] justify-between mt-[24px]">
                  <div className="flex">
                    <div>
                      <Checkbox />
                    </div>
                    <div className=" text-[#9CA6C0] text-[13px] ml-[8px]">
                      НӨАТ төлөгч эсэх
                    </div>
                  </div>
                </div>
                <div className="flex justify-center mt-[43px] pb-[30px]">
                  <Button
                    onClick={onSave}
                    type="primary"
                    htmlType="submit"
                    className=" w-[236px] h-[48px] rounded-[43px] bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD] border-none text-[14px] font-bold"
                  >
                    Мэдээлэл хадгалах
                  </Button>
                </div>
              </div>
            </TabPane>
            <TabPane
              tab={
                <div className="flex items-center">
                  <div>
                    <Image preview={false} src="/img/m2.svg" />
                  </div>
                  <div className=" flex flex-col items-start ml-[10px]">
                    <div className=" text-[11px] font-semibold">Нууц үг</div>
                    <div className=" text-[16px] font-normal">Шинэчлэх</div>
                  </div>
                </div>
              }
              key="2"
            >
              <div className="  w-full">
                <div className="flex flex-col md:flex-row">
                  <div className=" w-[370px] h-[284px] bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD] flex justify-center items-center">
                    <Image preview={false} src="/img/passGirl.svg" />
                  </div>
                  <div>
                    <div className=" mt-[30px] ml-[30px]">
                      <TextField
                        id="standard-basic"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment>
                              <IconButton>
                                <Image preview={false} src="/img/edit.svg" />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        label="Хуучин нууц үг"
                        defaultValue="Бат-Эрдэнэ"
                        variant="standard"
                      />
                    </div>
                    <div className=" mt-[24px] ml-[30px]">
                      {" "}
                      <TextField
                        id="standard-basic"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment>
                              <IconButton>
                                <Image preview={false} src="/img/edit.svg" />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        label="Шинэ нууц үг"
                        defaultValue="Бат-Эрдэнэ"
                        variant="standard"
                      />
                    </div>
                    <div className=" mt-[24px] ml-[30px]">
                      <TextField
                        id="standard-basic"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment>
                              <IconButton>
                                <Image preview={false} src="/img/edit.svg" />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        label="Шинэ нууц үг баталгаажуулах"
                        defaultValue="Бат-Эрдэнэ"
                        variant="standard"
                      />
                    </div>
                    <Button
                      onClick={() => onDetails(id)}
                      type="primary"
                      className=" mb-4 md:mb-0 mt-[30px] ml-[30px] w-[236px] h-[48px] rounded-[43px] bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD] border-none text-[14px] font-bold"
                    >
                      Нууц үг солих
                    </Button>
                  </div>
                </div>
              </div>
            </TabPane>
            <TabPane
              tab={
                <div className="flex items-center">
                  <div>
                    <Image preview={false} src="/img/m3.svg" />
                  </div>
                  <div className=" flex flex-col items-start ml-[10px]">
                    <div className=" text-[11px] font-semibold">Гар утас </div>
                    <div className=" text-[16px] font-normal">
                      Баталгаажаагүй
                    </div>
                  </div>
                </div>
              }
              key="3"
            >
              <div className="  w-full">
                <div className="flex flex-col md:flex-row">
                  <div className=" w-[370px] h-[284px] bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD] flex justify-center items-center">
                    <Image preview={false} src="/img/passBoy.svg" />
                  </div>
                  <div className="ml-[31px] mt-[30px]">
                    <div className=" text-[18px] text-[#2F3747] font-bold">
                      Гар утас баталгаажсан
                    </div>
                    <div className=" text-[#2F3747] text-[16px] font-normal w-[370px]">
                      Хэрэв та энэ дугаарыг ашиглахаа больсон бол дугаар солих
                      товч дээр дарна уу
                    </div>

                    <Button
                      onClick={() => onDetails(id)}
                      type="primary"
                      className=" mb-4 mt-[30px] ml-[30px] w-[236px] h-[48px] rounded-[43px] bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD] border-none text-[14px] font-bold"
                    >
                      Дугаараа солих
                    </Button>
                  </div>
                </div>
              </div>
            </TabPane>
            <TabPane
              tab={
                <div className="flex items-center">
                  <div>
                    <Image preview={false} src="/img/m4.svg" />
                  </div>
                  <div className=" flex flex-col items-start ml-[10px]">
                    <div className=" text-[11px] font-semibold">
                      Цахим хаяг{" "}
                    </div>
                    <div className=" text-[16px] font-normal">
                      Баталгаажаагүй
                    </div>
                  </div>
                </div>
              }
              key="4"
            >
              <div className="  w-full">
                <div className="flex flex-col md:flex-row">
                  <div className=" w-[370px] h-[284px] bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD] flex justify-center items-center">
                    <Image preview={false} src="/img/passHishgee.svg" />
                  </div>
                  <div className="ml-[31px] mt-[30px]">
                    <div className=" text-[18px] text-[#2F3747] font-bold">
                      И-мэйл хаяг баталгаажсан
                    </div>
                    <div className=" text-[#2F3747] text-[16px] font-normal w-[370px]">
                      Хэрэв та өөр мэйл хаяг бүртгүүлэх бол И-мэйл хаяг солих
                      товчыг дарна уу.
                    </div>
                    <div className=" w-[370px] mt-[24px]">
                      <Input
                        bordered={false}
                        style={{ borderBottom: "1px solid black" }}
                      />
                    </div>
                    <Button
                      onClick={() => onDetails(id)}
                      type="primary"
                      className=" mb-4 mt-[30px] ml-[30px] w-[236px] h-[48px] rounded-[43px] bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD] border-none text-[14px] font-bold"
                    >
                      И-мэйл хаяг солих
                    </Button>
                  </div>
                </div>
              </div>
            </TabPane>
          </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Info;
