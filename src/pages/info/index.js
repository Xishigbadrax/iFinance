import React, { useState, useEffect, useContext } from "react";
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
  Radio,
  DatePicker,
  Modal,
  message,
} from "antd";
import Auth from "../../utils/auth";
import axios from "axios";
import Head from "next/head";
import Router from "next/router";
import Context from "../../context/Context";
import PersonalSideBar from "../../components/PersonalSideBar";

const Info = () => {
  const { setIsLoading } = useContext(Context);
  const baseUrl = process.env.NEXT_PUBLIC_URL;
  const { TabPane } = Tabs;
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const [mainData, setMainData] = useState(null);
  const { Option } = Select;
  const [district, setDistrict] = useState();
  const [sumkhoroo, setSumkhoroo] = useState();
  const [sumkhorooId, setSumkhorooId] = useState();
  const [phone, setPhone] = useState();
  const [mail, setMail] = useState();
  const [isPhoneModal, setIsPhoneModal] = useState(false);
  const [isMailModal, setIsMailModal] = useState(false);
  const [confirmCode, setConfirmCode] = useState();
  const [mailConfirmCode, setMailConfirmCode] = useState();
  const [emailVer, setEmailVer] = useState();
  const [phoneVer, setPhoneVer] = useState();

  // console.log(mainData, "maindataaa");

  const layout = {
    wrapperCol: { span: 20 },
  };

  const handleCancel = () => {
    setIsMailModal(false);
    setIsPhoneModal(false);
  };
  const onFinish = (values) => {
    // console.log("Success:", values);
  };

  const onChangePhone = async (values) => {
    // console.log(phone, "utas");
    const res = await axios.post(
      baseUrl + "user/change",
      {
        jsonrpc: 2.0,
        params: {
          uid: Auth.getUserId(),
          phone: phone,
        },
      },
      {
        headers: {
          "Set-Cookie": "session_id=" + Auth.getToken(),
          "Content-Type": "application/json",
        },
      }
    );
    res.data.result.msg == "success" ? setIsPhoneModal(true) : null;
    // console.log(res, "chnage phone res");
  };

  const emailConfirmed = async (values) => {
    message.success("Амжилттай");
    setIsMailModal(false);
    Auth.destroyToken();
    Router.push("/");
  };

  const phoneConfirmed = async (values) => {
    message.success("Амжилттай");
    setIsPhoneModal(false);
    Auth.destroyToken();
    Router.push("/");
  };

  const onChangeConfrim = async (values) => {
    // console.log(confirmCode, "code");
    const res = await axios.post(
      baseUrl + "user/change_confirm",
      {
        jsonrpc: 2.0,
        params: {
          uid: Auth.getUserId(),
          code: confirmCode,
          phone: phone,
        },
      },
      {
        headers: {
          "Set-Cookie": "session_id=" + Auth.getToken(),
          "Content-Type": "application/json",
        },
      }
    );
    res?.data?.result == "Success"
      ? phoneConfirmed()
      : message.error("Алдаа гарлаа");
    // console.log(res, "last phone res");
  };
  const onChangeConfrimEmail = async (values) => {
    // console.log(confirmCode, "code");
    const res = await axios.post(
      baseUrl + "user/change_confirm",
      {
        jsonrpc: 2.0,
        params: {
          uid: Auth.getUserId(),
          code: mailConfirmCode,
          email: mail,
        },
      },
      {
        headers: {
          "Set-Cookie": "session_id=" + Auth.getToken(),
          "Content-Type": "application/json",
        },
      }
    );
    res?.data?.result == "Success"
      ? emailConfirmed()
      : message.error("Алдаа гарлаа");
    // console.log(res, "last phone res");
  };

  const onSave = async () => {
    // console.log(form.getFieldsValue());
    const res = await axios.post(
      baseUrl + "update/user/info",
      {
        jsonrpc: 2.0,
        params: {
          uid: Auth.getUserId(),
          info: form.getFieldsValue(),
        },
      },
      {
        headers: {
          "Set-Cookie": "session_id=" + Auth.getToken(),
          "Content-Type": "application/json",
        },
      }
    );
    // console.log(res, "update res");
  };
  const onSumChange = (value) => {
    setSumkhorooId(value);
    // console.log(value, "iddd");
  };
  const onResChangePass = (value) => {
    message.success("Амжилттай солигдлоо");
    Auth.destroyToken();
    router.push("/");
  };

  const onChangeMail = async () => {
    const res = await axios.post(
      baseUrl + "user/change",
      {
        jsonrpc: 2.0,
        params: {
          uid: Auth.getUserId(),
          email: mail,
        },
      },
      {
        headers: {
          "Set-Cookie": "session_id=" + Auth.getToken(),
          "Content-Type": "application/json",
        },
      }
    );
    res.data.result.msg == "success" ? setIsMailModal(true) : null;
    // console.log(res, "mail res");
  };

  const Logout = async () => {
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

  const onChangePass = async (value) => {
    // console.log(form2.getFieldsValue().old, "pass iin utga");
    const res = await axios.post(
      baseUrl + "user/change_password",
      {
        jsonrpc: 2.0,
        params: {
          uid: Auth.getUserId(),
          old: form2.getFieldsValue().old,
          new: form2.getFieldsValue().new,
          confirm: form2.getFieldsValue().confirm,
        },
      },
      {
        headers: {
          "Set-Cookie": "session_id=" + Auth.getToken(),
          "Content-Type": "application/json",
        },
      }
    );
    res?.data?.result == "SUCCESS"
      ? onResChangePass()
      : message.error("Амжилтгүй");
    console.log(res, "pass res");
  };

  useEffect(async () => {
    setIsLoading(true);
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
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setSumkhorooId(mainData?.district);
    form.setFieldsValue({
      apartment_name:
        mainData?.apartment_name != false ? mainData?.apartment_name : "",
      name: mainData?.name != false ? mainData?.name : "",
      birthday: mainData?.birthday != false ? mainData?.birthday : "",
      district: mainData?.district != false ? mainData?.district : "",
      company_name:
        mainData?.company_name != false ? mainData?.company_name : "",
      company_type:
        mainData?.company_type != false ? mainData?.company_type : "",
      country_name:
        mainData?.country_name != false ? mainData?.country_name : "",
      door_number: mainData?.door_number != false ? mainData?.door_number : "",
      is_taxpayer: mainData?.is_taxpayer != false ? mainData?.is_taxpayer : "",
      sumkhoroo: mainData?.sumkhoroo != false ? mainData?.sumkhoroo : "",
      register: mainData?.register != false ? mainData?.register : "",
      residence_address:
        mainData?.residence_address != false ? mainData?.residence_address : "",
      street: mainData?.street != false ? mainData?.street : "",
      surname: mainData?.surname != false ? mainData?.surname : "",
      how_find: mainData?.how_find != false ? mainData?.how_find : "",
    });
  }, [mainData]);

  return (
    <div>
      <Head>
        <title>iFinance | Миний мэдээлэл</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
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
      <div className="flex flex-col lg:flex-row md:mt-[100px] justify-center ">
        <PersonalSideBar hover={3} />
        <div className=" mt-[50px] md:mt-0  shadow-lg mb-[100px]  pl-[30px]">
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
                    <div className=" text-[16px] font-normal">
                      {Auth.getName()}
                    </div>
                  </div>
                </div>
              }
              key="1"
            >
              <div className=" px-10 md:px-0">
                <Form
                  onFinish={onFinish}
                  {...layout}
                  form={form}
                  name="control-hooks2"
                >
                  <div className=" md:w-[616px] flex flex-col md:flex-row  ">
                    <Form.Item name="company_type" label="">
                      <Radio.Group>
                        <div className="flex">
                          <div className="flex  w-[140px]">
                            <Radio value="person">
                              <p className="text-[18px] font-bold text-[#2F3747]">
                                Хувь хүн
                              </p>
                            </Radio>
                          </div>
                          <div className=" w-[140px]">
                            <Radio value="company">
                              <p className="text-[18px] font-bold text-[#2F3747]">
                                Байгууллага
                              </p>
                            </Radio>
                          </div>
                        </div>
                      </Radio.Group>
                    </Form.Item>
                  </div>
                  <div className=" mt-[31px]">
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                      <div>
                        <div className="text-[#9CA6C0] text-[12px] font-normal">
                          Овог
                        </div>
                        <Form.Item name="surname"
                        //  rules={[{ required: true }]}
                         >
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
                            placeholder="Нэр"
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
                        <Form.Item name="birthday">
                          <Input
                            type="date"
                            bordered={false}
                            style={{ borderBottom: "1px solid black" }}
                          />
                        </Form.Item>
                      </div>

                      <div>
                        <div className="text-[#9CA6C0] text-[12px] font-normal">
                          Улс
                        </div>
                        <Form.Item name="country_name">
                          <Input
                            placeholder="Улс"
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
                        <Form.Item name="district">
                          <Select
                            placeholder="Сонгох..."
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
                        <Form.Item
                          name="sumkhoroo"
                          rules={[{ required: true }]}
                        >
                          <Select
                            placeholder="Сонгох..."
                            bordered={false}
                            style={{ borderBottom: "1px solid black" }}
                            allowClear
                          >
                            {sumkhoroo?.map((item, index) => {
                              if (item.district_id == sumkhorooId) {
                                return (
                                  <Option key={item.id} value={item.id}>
                                    {item.name}
                                  </Option>
                                );
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
                          Байр /хотхон
                        </div>
                        <Form.Item
                          name="apartment_name"
                          rules={[{ required: true }]}
                        >
                          <Input
                            bordered={false}
                            suffix={
                              <Image preview={false} src="/img/edit.svg" />
                            }
                            style={{ borderBottom: "1px solid black" }}
                            placeholder="Байр /хотхон"
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
                      <div>
                        <div className="text-[#9CA6C0] text-[12px] font-normal">
                          Хаанаас мэдээлэл авсан
                        </div>
                        <Form.Item name="how_find" rules={[{ required: true }]}>
                          <Input
                            bordered={false}
                            suffix={
                              <Image preview={false} src="/img/edit.svg" />
                            }
                            style={{ borderBottom: "1px solid black" }}
                            placeholder=""
                          />
                        </Form.Item>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row md:w-[765px] justify-between mt-[24px] ">
                    <div className="flex">
                      <Form.Item name="is_taxpayer" valuePropName="checked">
                        <div>
                          <Checkbox>
                            <p className="text-[#9CA6C0] text-[13px] ml-[8px]  w-[120px]">
                              НӨАТ төлөгч эсэх
                            </p>
                          </Checkbox>
                        </div>
                      </Form.Item>
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
                </Form>
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
                  <div className="">
                    <Form
                      onFinish={onFinish}
                      {...layout}
                      form={form2}
                      name="control-hooks"
                    >
                      <div className=" ml-[30px]">
                        <div>
                          <div className="text-[#9CA6C0] text-[12px] font-normal">
                            Хуучин нууц үг
                          </div>
                          <Form.Item name="old" rules={[{ required: true }]}>
                            <Input.Password
                              bordered={false}
                              style={{ borderBottom: "1px solid black" }}
                              placeholder=""
                            />
                          </Form.Item>
                        </div>
                        <div>
                          <div className="text-[#9CA6C0] text-[12px] font-normal">
                            Шинэ нууц үг
                          </div>
                          <Form.Item name="new" rules={[{ required: true }]}>
                            <Input.Password
                              bordered={false}
                              style={{ borderBottom: "1px solid black" }}
                              placeholder=""
                            />
                          </Form.Item>
                        </div>
                        <div>
                          <div className="text-[#9CA6C0] text-[12px] font-normal">
                            Шинэ нууц үг баталгаажуулах
                          </div>
                          <Form.Item
                            name="confirm"
                            rules={[{ required: true }]}
                          >
                            <Input.Password
                              bordered={false}
                              style={{ borderBottom: "1px solid black" }}
                              placeholder=""
                            />
                          </Form.Item>
                        </div>
                      </div>
                      <Button
                        onClick={onChangePass}
                        type="primary"
                        className=" mb-4 md:mb-0 mt-[30px] ml-[30px] w-[236px] h-[48px] rounded-[43px] bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD] border-none text-[14px] font-bold"
                      >
                        Нууц үг солих
                      </Button>
                    </Form>
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
                      {mainData?.phone_number_verified_at ? (
                        <div className="flex">
                          <div className=" mr-[2px]">
                            <Image preview={false} src="/img/valid.svg" />{" "}
                          </div>
                          <div className=" text-green-600">Баталгаажсан</div>
                        </div>
                      ) : (
                        "Баталгаажаагүй"
                      )}
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
                    <div className=" w-[370px] mt-[24px]">
                      <Input
                        maxLength={8}
                        onChange={(e) => setPhone(e.target.value)}
                        bordered={false}
                        style={{ borderBottom: "1px solid black" }}
                        placeholder={
                          mainData?.phone_number_verified_at
                            ? mainData?.phone
                            : "Утасны дугаар"
                        }
                      />
                    </div>
                    <Button
                      onClick={onChangePhone}
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
                    <div className=" text-[11px] font-semibold">Цахим хаяг</div>
                    <div className=" text-[16px] font-normal">
                      {mainData?.email_verified_at ? (
                        <div className="flex">
                          <div className=" mr-[2px]">
                            <Image preview={false} src="/img/valid.svg" />{" "}
                          </div>
                          <div className=" text-green-500">Баталгаажсан</div>
                        </div>
                      ) : (
                        "Баталгаажаагүй"
                      )}
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
                        onChange={(e) => setMail(e.target.value)}
                        bordered={false}
                        style={{ borderBottom: "1px solid black" }}
                        placeholder={
                          mainData?.email_verified_at
                            ? mainData.email
                            : "И-мэйл хаяг"
                        }
                      />
                    </div>
                    <Button
                      onClick={onChangeMail}
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
      <Modal
        title="Баталгаажуулах"
        footer={[]}
        visible={isPhoneModal}
        onCancel={handleCancel}
      >
        <div className=" flex justify-center">
          <div className="  w-[310px]">
            <p>Утсанд ирсэн дөрвөн оронтой тоог оруулна уу.</p>
            <Input
              onChange={(e) => setConfirmCode(e.target.value)}
              className=" w-[300px]"
              bordered={false}
              style={{ borderBottom: "1px solid black" }}
            />
            <div className=" flex justify-center">
              <Button
                onClick={onChangeConfrim}
                type="primary"
                className="  mt-[20px] w-[236px] h-[48px] rounded-[43px] bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD] border-none text-[14px] font-bold"
              >
                Илгээх
              </Button>
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        title="Баталгаажуулах"
        footer={[]}
        visible={isMailModal}
        onCancel={handleCancel}
      >
        <div className=" flex justify-center">
          <div className="  w-[310px]">
            <p> Таны мэйлд ирсэн дөрвөн оронтой тоог оруулна уу.</p>
            <Input
              onChange={(e) => setMailConfirmCode(e.target.value)}
              className=" w-[300px]"
              bordered={false}
              style={{ borderBottom: "1px solid black" }}
            />
            <div className=" flex justify-center">
              <Button
                onClick={onChangeConfrimEmail}
                type="primary"
                className="  mt-[20px] w-[236px] h-[48px] rounded-[43px] bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD] border-none text-[14px] font-bold"
              >
                Илгээх
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Info;
