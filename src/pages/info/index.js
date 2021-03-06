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
import { useRouter } from "next/router";

const Info = () => {
  const { setIsLoading } = useContext(Context);
  const router = useRouter();
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
  const [subUser, setSubUser] = useState(false);

  // console.log(mainData, "maindataaa");

  const layout = {
    wrapperCol: { span: 20 },
  };

  const handleCancel = () => {
    setIsMailModal(false);
    setIsPhoneModal(false);
    setSubUser(false);
  };
  const onFinish = (values) => {
    // console.log("Success:", values);
  };

  const onChangePhone = async (values) => {
    setIsLoading(true);
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

    setIsLoading(false);

    res?.data?.result?.msg == "success" ? setIsPhoneModal(true) : null;
    // console.log(res, "chnage phone res");
  };

  const emailConfirmed = async (values) => {
    message.success("??????????????????");
    setIsMailModal(false);
    Auth.destroyToken();
    Router.push("/");
  };

  const phoneConfirmed = async (values) => {
    message.success("??????????????????");
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
      : message.error("?????????? ????????????");
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
      : message.error("?????????? ????????????");
    // console.log(res, "last email res");
  };

  const onSave = async () => {
    console.log(form.getFieldsValue());
    setIsLoading(true);
    console.log(form.getFieldsValue());
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
    setIsLoading(false);
    if (res?.data?.result == "SUCCESS") {
      Auth.destroyToken();
      router.push("/");
      message.success("?????????????????? ??????????????????");
    }
    console.log(res, "update res");
  };
  const onSumChange = (value) => {
    setSumkhorooId(value);
    // console.log(value, "iddd");
  };

  const onSubUser = async (values) => {
    console.log(values);
    const res = await axios.post(
      baseUrl + "signup/sub_user",
      {
        jsonrpc: 2.0,
        params: {
          uid: Auth.getUserId(),
          name: values.name,
          phone: values.phone,
          login: values.email,
          password: values.password,
          confirm_password: values.confirm_password,
        },
      },
      {
        headers: {
          "Set-Cookie": "session_id=" + Auth.getToken(),
          "Content-Type": "application/json",
        },
      }
    );
    if (res?.data?.result) {
      setSubUser(false);
      message.success("?????????????????? ????????????");
    } else if (
      res?.data?.error?.data?.message == "?????????????????? ???????????????????? ??????????"
    ) {
      message.warning("?????????????????? ???????????????????? ??????????");
    } else {
      message.success("?????????? ????????????");
    }
  };
  const onResChangePass = (value) => {
    message.success("?????????????????? ??????????????????");
    Auth.destroyToken();
    router.push("/");
  };

  const onChangeMail = async () => {
    setIsLoading(true);
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
    setIsLoading(false);
    res.data?.result?.msg == "success"
      ? setIsMailModal(true)
      : message.warning("?????????? ????????????");
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
      message.success("?????????????????? ?????????????????? ????????????");
      Auth.destroyToken();
      // window.location.reload(false);
      Router.push("/");
    }

    // console.log(res, "logout res");
  };

  const onChangePass = async (value) => {
    setIsLoading(true);
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
    setIsLoading(false);
    res?.data?.result == "SUCCESS"
      ? onResChangePass()
      : message.error("??????????????????");
    // console.log(res, "pass res");
  };

  useEffect(async () => {
    !Auth.getToken() &&
      router.push({
        pathname: `/`,
      });
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

    setMainData(res?.data?.result?.main[0]);

    setDistrict(res?.data?.result?.district);
    setSumkhoroo(res?.data?.result?.sumkhoroo);

    // console.log(res, "info res");
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
        <title>iFinance | ?????????? ????????????????</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="relative  w-full">
        <div id="head" className=" absolute z-20 flex flex-col w-full h-full">
          <div className="w-full flex justify-center">
            <NavbarTrans />
          </div>
          <div className=" hidden  md:flex w-full justify-center  items-center lg:mt-[30px] 2xl:mt-[100px]">
            <div>
              <div className=" text-[16px]  md:text-[36px] md:text-white font-poppins-semibold uppercase">
                ?????????? ????????????????
              </div>
            </div>
          </div>
        </div>
        <div className=" 2xl:h-[347px] overflow-hidden ">
          <Image className=" w-[100vw]" preview={false} src="/img/Slider.svg" />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row md:mt-[100px] justify-center ">
        <PersonalSideBar hover={3} />
        <div className=" mt-[50px] md:mt-0  shadow-lg mb-[100px]  ">
          <Tabs className="infoTab " defaultActiveKey="1">
            <TabPane
              tab={
                <div className="flex items-center">
                  <div>
                    <Image preview={false} src="/img/m1.svg" />
                  </div>
                  <div className=" flex flex-col items-start ml-[10px]">
                    <div className=" text-[11px] font-semibold">
                      ???????????? ????????????????
                    </div>
                    <div className=" text-[16px] font-normal">
                      {Auth.getName()}
                    </div>
                  </div>
                </div>
              }
              key="1"
            >
              <div className=" px-10 md:px-0 ml-[30px]">
                <Form
                  onFinish={onFinish}
                  {...layout}
                  form={form}
                  name="control-hooks2"
                >
                  <div className="flex ">
                    <div className=" md:w-[616px] flex flex-col md:flex-row  ">
                      <Form.Item name="company_type" label="">
                        <Radio.Group>
                          <div className="flex">
                            <div className="flex  w-[140px]">
                              <Radio value="person">
                                <p className="text-[18px] font-bold text-[#2F3747]">
                                  ???????? ??????
                                </p>
                              </Radio>
                            </div>
                            <div className=" w-[140px]">
                              <Radio value="company">
                                <p className="text-[18px] font-bold text-[#2F3747]">
                                  ??????????????????????
                                </p>
                              </Radio>
                            </div>
                          </div>
                        </Radio.Group>
                      </Form.Item>
                    </div>
                    <Form.Item name="subUser" valuePropName="checked">
                      <div className=" w-[240px]">
                        <Checkbox
                          checked={subUser}
                          onChange={() => setSubUser(!subUser)}
                        >
                          <p className="text-[18px] font-bold text-[#2F3747]">
                            ???????????? ??????????????????
                          </p>
                        </Checkbox>
                      </div>
                    </Form.Item>
                  </div>
                  <div className=" mt-[31px]">
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                      <div>
                        <div className="text-[#9CA6C0] text-[12px] font-normal">
                          ????????
                        </div>
                        <Form.Item
                          name="surname"
                          //  rules={[{ required: true }]}
                        >
                          <Input
                            bordered={false}
                            suffix={
                              <Image preview={false} src="/img/edit.svg" />
                            }
                            style={{ borderBottom: "1px solid black" }}
                            placeholder="????????"
                          />
                        </Form.Item>
                      </div>
                      <div>
                        <div className="text-[#9CA6C0] text-[12px] font-normal">
                          ??????
                        </div>
                        <Form.Item name="name">
                          <Input
                            placeholder="??????"
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
                          ???????????????????? ????????????
                        </div>
                        <Form.Item name="register" rules={[{ required: true }]}>
                          <Input
                            bordered={false}
                            suffix={
                              <Image preview={false} src="/img/edit.svg" />
                            }
                            style={{ borderBottom: "1px solid black" }}
                            placeholder=" ???????????????????? ????????????"
                          />
                        </Form.Item>
                      </div>
                      <div>
                        <div className="text-[#9CA6C0] text-[12px] font-normal">
                          ???????????? ??????????
                        </div>
                        <Form.Item name="birthday">
                          <Input
                            type="date"
                            bordered={false}
                            style={{ borderBottom: "1px solid black" }}
                          />
                        </Form.Item>
                      </div>

                      {/* <div>
                        <div className="text-[#9CA6C0] text-[12px] font-normal">
                          ??????
                        </div>
                        <Form.Item name="country_name">
                          <Input
                            placeholder="??????"
                            bordered={false}
                            suffix={
                              <Image preview={false} src="/img/edit.svg" />
                            }
                            style={{ borderBottom: "1px solid black" }}
                          />
                        </Form.Item>
                      </div> */}
                      <div>
                        <div className="text-[#9CA6C0] text-[12px] font-normal">
                          ?????????? /??????
                        </div>
                        <Form.Item name="district">
                          <Select
                            placeholder="????????????..."
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
                          ?????? /??????????
                        </div>
                        <Form.Item
                          name="sumkhoroo"
                          rules={[{ required: true }]}
                        >
                          <Select
                            placeholder="????????????..."
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
                          ????????????
                        </div>
                        <Form.Item name="street" rules={[{ required: true }]}>
                          <Input
                            bordered={false}
                            suffix={
                              <Image preview={false} src="/img/edit.svg" />
                            }
                            style={{ borderBottom: "1px solid black" }}
                            placeholder="????????????"
                          />
                        </Form.Item>
                      </div>
                      <div>
                        <div className="text-[#9CA6C0] text-[12px] font-normal">
                          ???????? /????????????
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
                            placeholder="???????? /????????????"
                          />
                        </Form.Item>
                      </div>
                      {/* <div>
                        <div className="text-[#9CA6C0] text-[12px] font-normal">
                          ???????? ???????????? /?????????????? ????????????
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
                            placeholder="???????? ???????????? /?????????????? ????????????"
                          />
                        </Form.Item>
                      </div> */}
                      <div>
                        <div className="text-[#9CA6C0] text-[12px] font-normal">
                          ?????????? ???????????? ????????
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
                            placeholder="?????????? ???????????? ????????"
                          />
                        </Form.Item>
                      </div>
                      <div>
                        <div className="text-[#9CA6C0] text-[12px] font-normal">
                          ???????????????? ??????
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
                            placeholder=" ???????????????? ??????"
                          />
                        </Form.Item>
                      </div>
                      <div>
                        <div className="text-[#9CA6C0] text-[12px] font-normal">
                          ?????????????? ???????????????? ??????????
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
                              ???????? ???????????? ????????
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
                      ???????????????? ????????????????
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
                    <div className=" text-[11px] font-semibold">???????? ????</div>
                    <div className=" text-[16px] font-normal">????????????????</div>
                  </div>
                </div>
              }
              key="2"
            >
              <div className="  w-full">
                <div className="flex flex-col md:flex-row items-center">
                  <div className=" w-[370px] h-[324px] bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD] flex justify-center items-center">
                    <Image
                      className=""
                      preview={false}
                      src="/img/passGirl.svg"
                    />
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
                            ???????????? ???????? ????
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
                            ???????? ???????? ????
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
                            ???????? ???????? ???? ????????????????????????????
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
                        ???????? ???? ??????????
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
                    <div className=" text-[11px] font-semibold">?????? ???????? </div>
                    <div className=" text-[16px] font-normal">
                      {mainData?.phone_number_verified_at ? (
                        <div className="flex">
                          <div className=" mr-[2px]">
                            <Image preview={false} src="/img/valid.svg" />{" "}
                          </div>
                          <div className=" text-green-600">????????????????????????</div>
                        </div>
                      ) : (
                        "????????????????????????????"
                      )}
                    </div>
                  </div>
                </div>
              }
              key="3"
            >
              <div className="  w-full">
                <div className="flex flex-col md:flex-row  items-center">
                  <div className=" w-[370px] h-[324px] bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD] flex justify-center items-center">
                    <Image preview={false} src="/img/passBoy.svg" />
                  </div>
                  <div className="ml-[31px] mt-[30px]">
                    <div className=" text-[18px] text-[#2F3747] font-bold">
                      ?????? ???????? ????????????????????????
                    </div>
                    <div className=" text-[#2F3747] text-[16px] font-normal w-[370px]">
                      ?????????? ???? ?????? ???????????????? ?????????????????? ?????????????? ?????? ???????????? ??????????
                      ???????? ???????? ?????????? ????
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
                            : "???????????? ????????????"
                        }
                      />
                    </div>
                    <Button
                      onClick={onChangePhone}
                      type="primary"
                      className=" mb-4 mt-[30px] ml-[30px] w-[236px] h-[48px] rounded-[43px] bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD] border-none text-[14px] font-bold"
                    >
                      ???????????????? ??????????
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
                    <div className=" text-[11px] font-semibold">?????????? ????????</div>
                    <div className=" text-[16px] font-normal">
                      {mainData?.email_verified_at ? (
                        <div className="flex">
                          <div className=" mr-[2px]">
                            <Image preview={false} src="/img/valid.svg" />{" "}
                          </div>
                          <div className=" text-green-500">????????????????????????</div>
                        </div>
                      ) : (
                        "????????????????????????????"
                      )}
                    </div>
                  </div>
                </div>
              }
              key="4"
            >
              <div className="  w-full">
                <div className="flex flex-col md:flex-row items-center">
                  <div className=" w-[370px] h-[324px] bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD] flex justify-center items-center">
                    <Image preview={false} src="/img/passHishgee.svg" />
                  </div>
                  <div className="ml-[31px] mt-[30px]">
                    <div className=" text-[18px] text-[#2F3747] font-bold">
                      ??-???????? ???????? ????????????????????????
                    </div>
                    <div className=" text-[#2F3747] text-[16px] font-normal w-[370px]">
                      ?????????? ???? ?????? ???????? ???????? ???????????????????? ?????? ??-???????? ???????? ??????????
                      ???????????? ?????????? ????.
                    </div>
                    <div className=" w-[370px] mt-[24px]">
                      <Input
                        onChange={(e) => setMail(e.target.value)}
                        bordered={false}
                        style={{ borderBottom: "1px solid black" }}
                        placeholder={
                          mainData?.email_verified_at
                            ? mainData.email
                            : "??-???????? ????????"
                        }
                      />
                    </div>
                    <Button
                      onClick={onChangeMail}
                      type="primary"
                      className=" mb-4 mt-[30px] ml-[30px] w-[236px] h-[48px] rounded-[43px] bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD] border-none text-[14px] font-bold"
                    >
                      ??-???????? ???????? ??????????
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
        title="????????????????????????????"
        footer={[]}
        visible={isPhoneModal}
        onCancel={handleCancel}
      >
        <div className=" flex justify-center">
          <div className="  w-[310px]">
            <p>???????????? ?????????? ???????????? ?????????????? ???????? ?????????????? ????.</p>
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
                ????????????
              </Button>
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        title="????????????????????????????"
        footer={[]}
        visible={isMailModal}
        onCancel={handleCancel}
      >
        <div className=" flex justify-center">
          <div className="  w-[310px]">
            <p> ???????? ?????????? ?????????? ???????????? ?????????????? ???????? ?????????????? ????.</p>
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
                ????????????
              </Button>
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        footer={[]}
        className="subUser"
        visible={subUser}
        onCancel={handleCancel}
      >
        <div>
          <Image preview={false} src="/img/logo.png" />
          <p className=" mt-[40px] text-[24px] font-semibold text-transparent bg-clip-text bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD]">
            ???????????? ?????????????????? ????????????
          </p>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onSubUser}
            autoComplete="off"
          >
            <div className=" grid grid-cols-2 gap-x-4">
              <div>
                <Form.Item
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "???????????????????????? ???????? ?????????????? ????!",
                    },
                  ]}
                >
                  <Input
                    maxLength={30}
                    className="  h-[3rem] rounded-[41px] dark:text-white"
                    id="normal_signup_name"
                    placeholder="??????*"
                  />
                </Form.Item>
              </div>
              <div>
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "???????????????????????? ??-???????? ?????????????? ????!",
                    },
                  ]}
                >
                  <Input
                    maxLength={30}
                    className="  h-[3rem] rounded-[41px] dark:text-white"
                    id="normal_signup_name"
                    placeholder="??-????????*"
                  />
                </Form.Item>
              </div>
              <div>
                <Form.Item
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message: "???????????????????????? ???????????? ???????????? ?????????????? ????!",
                    },
                  ]}
                >
                  <Input
                    maxLength={30}
                    className="  h-[3rem] rounded-[41px] dark:text-white"
                    id="normal_signup_name"
                    placeholder="???????????? ????????????*"
                  />
                </Form.Item>
              </div>
              <div>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "???????????????????????? ???????? ???? ?????????????? ????!",
                    },
                  ]}
                >
                  <Input.Password
                    maxLength={30}
                    className="  h-[3rem] rounded-[41px] dark:text-white"
                    id="normal_signup_name"
                    placeholder="????????*"
                  />
                </Form.Item>
              </div>
              <div>
                <Form.Item
                  name="confirm_password"
                  dependencies={["password"]}
                  rules={[
                    {
                      required: true,
                      message: "???????? ???????? ?????????? ?????????????? ????",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("???????? ???? ?????????????????? ??????????!")
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    maxLength={30}
                    className="  h-[3rem] rounded-[41px] dark:text-white"
                    id="normal_signup_name"
                    placeholder="????????*"
                  />
                </Form.Item>
              </div>
            </div>

            <Form.Item>
              <div className=" flex justify-center">
                <Button
                  style={{
                    backgroundImage: "linear-gradient(45deg, #2E28D4, #AC27FD)",
                  }}
                  className=" dark:text-black dark:bg-gradient-to-br from-[#3C8CE7] to-[#00EAFF]  text-[14px] font-bold w-[200px] h-[48px] text-white rounded-[43px]  border-none"
                  type="primary"
                  htmlType="submit"
                >
                  ????????????????
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default Info;
