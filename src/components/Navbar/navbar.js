import React from "react";
import {
  Image,
  Button,
  Modal,
  Form,
  Input,
  Checkbox,
  Alert,
  message,
  Space,
  Radio,
  Menu,
  Dropdown,
} from "antd";
import {
  UserOutlined,
  WarningOutlined,
  PhoneOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  MailOutlined,
  EditOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useState, useContext, useEffect } from "react";
import Context from "../../context/Context";
import axios from "axios";
import MaskedInput from "antd-mask-input";
import Sidebar from "../Sidebar";
import ReactCodeInput from "react-verification-code-input";
import auth_cookie from "../../utils/auth";
import Countdown, { zeroPad } from "react-countdown";
import Auth from "../../utils/auth";
import Router from "next/router";
import newhead from "../../../public/img/newhead.svg";

const Navbar = ({}) => {
  const baseUrl = process.env.NEXT_PUBLIC_URL;
  const baseDB = process.env.NEXT_PUBLIC_DB;

  const [loginModal, setLoginModal] = useState(false);

  const { sessionId } = useContext(Context);
  const { onSid } = useContext(Context);
  const [addclass, setaddclass] = useState("");
  const [messageShow, setmessageShow] = useState(false);
  const [text, settext] = useState("");
  const [status, setstatus] = useState("");
  const [title, settitle] = useState("");
  const [confirmModal, setConfirmModal] = useState(false);
  const [forgotPassModal, setForgotPassModal] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [confirmCode, setConfirmCode] = useState(null);
  const [deviceInfo, setDeviceInfo] = useState(null);
  const [userName, setUserName] = useState("");
  const [userSid, setUserSid] = useState("");

  const [email, setEmail] = useState("");
  const [forgotType, setForgotType] = useState(1);
  const [password, setPassword] = useState("");
  const [forgotPassConfirm, setForgotPassConfirm] = useState(false);
  const [forgotConfirmCode, setForgotConfirmCode] = useState("");

  // console.log(Auth.loggedIn(), "token status");
  // console.log(Auth.getToken(), "tokenii utga");

  // Auth.destroyToken();

  // const db = "master_test";

  // console.log(userSid, "sidddddd");

  // mobile bolhod ashiglagdaj bgaa state-uud
  const [sideBarActive, setSideBarActive] = useState(false);
  const [mobileLogin, setMobileLogin] = useState(false);
  const [mobileSignUp, setMobileSignUp] = useState(false);
  const [shadowModal, setShadowModal] = useState(false);
  const [mobileForgot, setMobileForgot] = useState(false);
  const [mobileForgotConfirm, setMobileForgotConfirm] = useState(false);

  const handleCancel = () => {
    setLoginModal(false);
    setConfirmModal(false);
    setMobileLogin(false);
    setMobileSignUp(false);
    setForgotPassModal(false);
    setForgotPassConfirm(false);
    setMobileForgot(false);
    setMobileForgotConfirm(false);
  };
  const renderer = ({ hours, minutes, seconds }) => (
    <span>
      {zeroPad(minutes)}:{zeroPad(seconds)}
    </span>
  );
  const Login = () => {
    setaddclass("");
    setLoginModal(true);
  };

  const onShadowBox = () => {
    setSideBarActive(false);
    setShadowModal(false);
  };

  const onSideBarActive = () => {
    setSideBarActive(true);
    setShadowModal(true);
  };

  const onForgotPass = () => {
    setaddclass("right-panel-active");
    setLoginModal(false);
    setForgotPassModal(true);
  };

  const onForgotTypeChange = (e) => {
    // console.log("radio checked", e.target.value);
    setForgotType(e.target.value);
  };
  // Auth.destroyToken();
  const onForgotModal = () => {
    setForgotPassConfirm(true);
  };

  const Signup = () => {
    setaddclass("right-panel-active");
    setLoginModal(true);
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
          "Set-Cookie": "session_id=" + userSid,
          "Content-Type": "application/json",
        },
      }
    );

    if (res.data.error && res.data.error) {
      setIsLogin(false);
      message.success("?????????????????? ?????????????????? ????????????");
      Auth.destroyToken();
      // window.location.reload(false);
      Router.push("/");
    }

    // console.log(res, "logout res");
  };

  const handleCancelMessage = () => {
    setmessageShow(false);
  };
  const onConfirmEmail = async () => {
    const res = await axios.post(
      baseUrl + "signup/confirm",
      {
        jsonrpc: 2.0,
        params: {
          code: confirmCode,
        
          login: email,
          password: password,
        },
      },
      {
        headers: {
          "Set-Cookie": "session_id=" + sessionId,
          "Content-Type": "application/json",
        },
      }
    );
    if (res.data.result && res.data.result) {
      setUserName(res.data.result.erp_info);
      setUserSid(res.data.result.sid);
      setIsLogin(true);
      auth_cookie.setToken(res.data.result.sid, res.data.result.erp_info);
      // console.log(res, "last res");
      setConfirmModal(false);
      message.success("?????????????????? ??????????????????");
    } else {
      settitle("????????????");
      settext("?????????????????????????????? ?????????? ????????????");
      setstatus("error");
      setmessageShow(true);
    }

    // console.log(res, "confirm res");
  };

  const onFinishRegister = async (values) => {
    // console.log("Received values of form: ", values);
    setEmail(values.email);
    setPassword(values.password);
    var data = {
      jsonrpc: 2.0,

      params: {
        
        name: values.name,
        login: values.email,
        password: values.password,
        confirm_password: values.confirm_password,
        phone_number: values.phone_number,
        // session_id: sessionId,
      },
    };

    const res = await axios.post(baseUrl + "signup", data, {
      headers: {
        "Set-Cookie": "session_id=" + sessionId,
        "Content-Type": "application/json",
      },
    });

    // console.log(res, "sign up res");
    if (res.data.result && res.data.result.msg) {
      setConfirmMessage(res.data.result.msg);
      setaddclass("right-panel-active");
      setConfirmModal(true);
      setMobileSignUp(false);
      setLoginModal(false);
    } else if (res.data.error && res.data.error.data.message) {
      settitle("???????????? ????????????");
      settext(res.data.error.data.message);
      setstatus("error");
      setmessageShow(true);
    } else {
      settitle("????????????");
      setConfirmMessage("?????????????????? ?????????? ????????????");
      setstatus("error");
      setmessageShow(true);
    }
  };

  const onFinishLogin = async (values) => {
   
    // console.log("Received values of form: ", values);
    const res = await axios.post(
      baseUrl + "login",
      {
        jsonrpc: 2.0,
        params: {
         
          login: values.name,
          password: values.password,
          // device: {
          //   device_name: "Computer",
          //   mac_address: [deviceInfo.IPv4, deviceInfo.country_name],
          // },
        },
      },
      {
        headers: {
          "Set-Cookie": "session_id=" + sessionId,
          "Content-Type": "application/json",
        },
      }
    );
    if (res.data.result && res.data.result) {
      // console.log(res, "login res");
      setUserName(res.data.result.erp_info);
      auth_cookie.setToken(res.data.result.sid, res.data.result.erp_info, res.data.result.uid);
      window.location.reload(false);
      message.success("?????????????????? ??????????????????");
      setUserSid(res.data.result.sid);
      // props.sido(res.data.result.sid);

      setIsLogin(true);
      setLoginModal(false);
      setMobileLogin(false);
    } else {
      settitle("????????????");
      setConfirmMessage("?????????????????? ?????????? ????????????");
      settext(res.data.error.data.message);
      setstatus("error");
      setmessageShow(true);
    }
    // console.log(res, "login res");
  };

  useEffect(() => {
    // console.log(sessionId, "id shuu");
    // fetch(
    //   "https://geolocation-db.com/json/297364b0-2bc6-11ec-a8a6-1fc54772a803"
    // )
    //   .then((response) => response.json())
    //   .then((data) => setDeviceInfo(data));
  }, [sessionId]);

  const menu = (
    <Menu className="profileDropdownPopup p-[30px]">
    <Menu.Item className="order" key="0">
      <div className="flex items-center">
        <Image preview={false} width={20} height={20} src="/img/i1.svg" />
        <a className="pl-1 text-[#2E28D4]" href="/order">
          ?????????? ????????????????
        </a>
      </div>
    </Menu.Item>

    <Menu.Item className="order2" key="1">
      <div className="flex items-center">
        <Image preview={false} width={20} height={20} src="/img/i2.svg" />
        <a className="pl-1 text-[#2E28D4]" href="/cart">
        ?????????? ????????
        </a>
      </div>
    </Menu.Item>
    <Menu.Item className="order2" key="2">
    <div className="flex items-center">
        <Image preview={false} width={20} height={20} src="/img/i3.svg" />
        <a className="pl-1 text-[#2E28D4]" href="/info">
        ?????????? ????????????????
        </a>
      </div>
    </Menu.Item>
    <Menu.Item className="order2" key="3">
    <div className="flex items-center">
        <Image preview={false} width={20} height={20} src="/img/i4.svg" />
        <a className="pl-1 text-[#2E28D4]" href="/">
        ????????????????
        </a>
      </div>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item className="order3" key="4">
    <div className="flex items-center">
        <Image preview={false} width={20} height={20} src="/img/i5.svg" />
        <a className="pl-1 text-[#F01A63]" href="/">
        ??????????
        </a>
      </div>
    </Menu.Item>
  </Menu>
  );

  return (
    <div className="w-full h-[100px] relative flex justify-center">
      <div className=" w-[100vw] absolute z-[-1]">
        <Image src="/img/back.png" className=" h-[100px] w-[100vw]" />
      </div>
      {shadowModal ? (
        <div onClick={onShadowBox} className="shadowBox"></div>
      ) : null}
      {/* mobile ???????????????????? */}

      <Modal visible={mobileSignUp} footer={[]} onCancel={handleCancel}>
        <div>
          <Image
            className="pt-[3rem] pl-[3rem] "
            preview={false}
            src="/img/logo.png"
          />

          <Form
            name="normal_login1"
            className="form"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinishRegister}
          >
            <p className=" text-[1.5rem] text-[#2E28D4] font-semibold pt-2">
              ????????????????????
            </p>
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: "???????????????????????? ?????????? ?????????????? ????!",
                },
              ]}
            >
              <Input
                className=" w-[20rem] h-[3rem] rounded-[41px]"
                id="normal_signup_name"
                placeholder="?????????????? ??????*"
              />
            </Form.Item>
            <Form.Item
              name="phone_number"
              rules={[
                {
                  required: true,
                  message: "???????????? ???????????????? ?????????????? ????!",
                },
              ]}
            >
              <Input
                className=" w-[20rem] h-[3rem] rounded-[41px]"
                type="text"
                placeholder="???????????? ????????????*"
              />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "??-???????????? ?????????????? ????!",
                },
              ]}
            >
              <Input
                className=" w-[20rem] h-[3rem] rounded-[41px]"
                type="text"
                placeholder="??-????????*"
              />
            </Form.Item>
            <Form.Item
            name="password"
            dependencies={["password"]}
              rules={[
                {
                  required: true,
                  message: "???????? ???????? ?????????????? ????!",
                },
              ]}
            >
              <Input.Password
                className=" w-[20rem] h-[3rem] rounded-[41px]"
                type="password"
                placeholder="???????? ????*"
              />
            </Form.Item>
            <Form.Item
              name="confirm_password"
              dependencies={["password"]}
              rules={[
                {
                  required: true,
                  message: "???????? ???????? ?????????????? ????!",
                },
                
              ]}
            >
              <Input.Password
                className=" w-[20rem] h-[3rem] rounded-[41px]"
                type="password"
                placeholder="???????? ???? ????????????*"
              />
            </Form.Item>

            <Form.Item>
              <div className=" flex justify-between w-full pl-[2rem] pr-[2rem] ">
                <div>
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>???????????? ???????????????? ??????????</Checkbox>
                  </Form.Item>
                </div>
                <div>
                  <a className="login-form-forgot" href="">
                    ???????????? ??????????
                  </a>
                </div>
              </div>
            </Form.Item>

            <Form.Item>
              <Button
                className=" w-[12.5rem] h-[3rem] bg-gradient-to-r from-[#2E28D4] to-[#AC27FD] rounded-[43px]"
                type="primary"
                htmlType="submit"
              >
                ????????????????????
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>

      {/* mobile Login */}

      <Modal visible={mobileLogin} footer={[]} onCancel={handleCancel}>
        <div>
          <Image
            className="pt-[3rem] pl-[3rem]"
            preview={false}
            src="/img/logo.png"
          />
          <Form
            name="normal_login2"
            className="form"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinishLogin}
          >
            <p className=" text-[1.5rem] text-[#2E28D4] font-semibold pt-20">
              ??????????????
            </p>
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: "???????????????????????? ?????????? ?????????????? ????!",
                },
              ]}
            >
              <Input
                className=" w-[20rem] h-[3rem] rounded-[41px]"
                placeholder="?????????????? ??????*"
              />
            </Form.Item>
            <Form.Item
              name="password"
              id="mobile_login"
              rules={[
                {
                  required: true,
                  message: "???????? ???????? ?????????????? ????!",
                },
              ]}
            >
              <Input.Password
                className=" w-[20rem] h-[3rem] rounded-[41px]"
                type="password"
                placeholder="???????? ????*"
              />
            </Form.Item>
            <Form.Item>
              <div className=" flex justify-between w-full pl-[2rem] pr-[2rem] ">
                <div>
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>???????????? ????????</Checkbox>
                  </Form.Item>
                </div>
                <div onClick={onForgotModal}>???????? ???????? ???????????????</div>
              </div>
            </Form.Item>

            <Form.Item>
              <Button
                className=" w-[12.5rem] h-[3rem] bg-gradient-to-r from-[#2E28D4] to-[#AC27FD] rounded-[43px]"
                type="primary"
                htmlType="submit"
              >
                ??????????????
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>

      {/* mobile forgotPass modal */}

      <Modal visible={mobileForgot} footer={[]} onCancel={handleCancel}>
        <div>
          <Image
            className="pt-[3rem] pl-[3rem] "
            preview={false}
            src="/img/logo.png"
          />

          <Form
            name="normal_login3"
            className="form"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinishRegister}
          >
            <p className=" text-[1.5rem] text-[#2E28D4] font-semibold pt-10">
              ???????? ???????? ??????????????
            </p>

            <Form.Item
              name="forgotValue"
              rules={[
                {
                  required: true,
                  message: "???????????????????????? ?????????? ?????????????? ????!",
                },
              ]}
            >
              {forgotType == 1 ? (
                <Input
                  maxLength={8}
                  suffix={
                    <PhoneOutlined className="text-[1.25rem] opacity-70" />
                  }
                  className=" w-[20rem] h-[3rem] rounded-[41px]"
                  id="normal_signup_name"
                  placeholder="???????????????????? ???????????? ????????????"
                />
              ) : (
                <Input
                  maxLength={8}
                  suffix={
                    <MailOutlined className="text-[1.25rem] opacity-70" />
                  }
                  className=" w-[20rem] h-[3rem] rounded-[41px]"
                  id="normal_signup_name"
                  placeholder="???????????????????? ??-???????? ????????"
                />
              )}
            </Form.Item>

            <Radio.Group onChange={onForgotTypeChange} value={forgotType}>
              <Radio value={1}>???????????? ??????????????????</Radio>
              <Radio value={2}>?????????? ??????????????</Radio>
            </Radio.Group>
            <div className=" flex justify-center mt-[1.875rem] ">
              <div className="flex w-[27.5rem] items-center h-[4.625rem] justify-center bg-[#F09A1A] bg-opacity-30 rounded-[4px]">
                <div>
                  <WarningOutlined className="text-[20px]" />
                </div>
                <div className=" text-[14px] pl-2 text-[#F09A1A]">
                  ???????????????????? ???????????? ???????????? ?????????? ?????????? ???????????? ?????? ?????????????? ????!
                </div>
              </div>
            </div>
            <Form.Item>
              <Button
                className=" w-[12.5rem] h-[3rem] bg-gradient-to-r from-[#2E28D4] to-[#AC27FD] rounded-[43px] mt-[2.5rem]"
                type="primary"
                htmlType="submit"
              >
                ????????????
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>

      {/* mobileForgotConfirm modal */}

      <Modal visible={mobileForgotConfirm} footer={[]} onCancel={handleCancel}>
        <div>
          <Image
            className="pt-[3rem] pl-[3rem] "
            preview={false}
            src="/img/logo.png"
          />

          <Form
            name="normal_login3"
            className="form"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinishRegister}
          >
            <p className=" text-[1.5rem] text-[#2E28D4] font-semibold pt-10">
              ????????????????????????????
            </p>

            <Form.Item
              name="forgotValue"
              rules={[
                {
                  required: true,
                  message: "???????????????????????? ?????????? ?????????????? ????!",
                },
              ]}
            >
              <Space>
                <Input type="number" className=" w-[15rem]" />
              </Space>
            </Form.Item>
            <div className=" w-full flex justify-center">
              <div className=" flex justify-center items-center w-[4.188rem] h-[2.625rem] bg-[#F01A63] bg-opacity-10 rounded-[4px]">
                <div className="text-[#F01A63]">
                  <Countdown renderer={renderer} date={Date.now() + 180000} />
                </div>
              </div>
            </div>
            <div className="text-[13px] text-[#2E28D4] mt-[1.5rem] cursor-pointer ">
              ???????????????????????????? ?????? ????????
            </div>
            <Form.Item>
              <Button
                className=" w-[12.5rem] h-[3rem] bg-gradient-to-r from-[#2E28D4] to-[#AC27FD] rounded-[43px] mt-[2.5rem]"
                type="primary"
                htmlType="submit"
              >
                ????????????
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>

      {/* Desktop login & signup modal */}

      <Modal
        centered={true}
        width={"60.25rem"}
        className="login2"
        footer={[]}
        visible={loginModal}
        onCancel={handleCancel}
      >
        <div className={`container ${addclass}`} id="container">
          <div className="form-container sign-up-container">
            <Image
              className="pt-[3rem] pl-[3rem] "
              preview={false}
              src="/img/logo.png"
            />

            <Form
              name="normal_login3"
              className="form"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinishRegister}
            >
              <p className=" text-[1.5rem] text-[#2E28D4] font-semibold pt-2">
                ????????????????????
              </p>
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: "???????????????????????? ?????????? ?????????????? ????!",
                  },
                ]}
              >
                <Input
                  maxLength={25}
                  className=" w-[27.5rem] h-[3rem] rounded-[41px]"
                  id="normal_signup_name"
                  placeholder="?????????????? ??????*"
                />
              </Form.Item>
              <Form.Item
                name="phone_number"
                rules={[
                  {
                    required: true,
                    message: "???????????? ???????????????? ?????????????? ????!",
                  },
                ]}
              >
                <MaskedInput
                  mask="11111111"
                  className=" w-[27.5rem] h-[3rem] rounded-[41px]"
                  type="text"
                  placeholder="???????????? ????????????*"
                />
              </Form.Item>
              <Form.Item
                name="email"
                rules={[
                  {
                    type: "email",
                    message: "?????????????????????????? ??-???????? ?????? ??????????!",
                  },
                  {
                    required: true,
                    message: "??-???????????? ?????????????? ????!",
                  },
                ]}
              >
                <Input
                  className=" w-[27.5rem] h-[3rem] rounded-[41px]"
                  type="text"
                  placeholder="??-????????*"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "???????? ???????? ?????????????? ????!",
                  },
                ]}
              >
                <Input.Password
                  className=" w-[27.5rem] h-[3rem] rounded-[41px]"
                  type="password"
                  placeholder="???????? ????*"
                />
              </Form.Item>
              <Form.Item
                name="confirm_password"
                dependencies={["password"]}
                // hasFeedback
                rules={[
                  {
                    required: true,
                    message: "???????? ???????? ?????????????? ????!",
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
                  className=" w-[27.5rem] h-[3rem] rounded-[41px]"
                  type="password"
                  placeholder="???????? ???? ????????????*"
                />
              </Form.Item>

              <Form.Item>
                <div className=" flex justify-between w-full pl-[2rem] pr-[2rem] ">
                  <div>
                    <Form.Item noStyle>
                      <Checkbox>???????????? ???????????????? ??????????</Checkbox>
                    </Form.Item>
                  </div>
                  <div>
                    <a className="login-form-forgot" href="">
                      ???????????? ??????????
                    </a>
                  </div>
                </div>
              </Form.Item>

              <Form.Item>
                <Button
                  className=" w-[12.5rem] h-[3rem] bg-gradient-to-r from-[#2E28D4] to-[#AC27FD] rounded-[43px]"
                  type="primary"
                  htmlType="submit"
                >
                  ????????????????????
                </Button>
              </Form.Item>
            </Form>
          </div>

          {/* Login form */}

          <div className="form-container sign-in-container">
            <Image
              className="pt-[3rem] pl-[3rem]"
              preview={false}
              src="/img/logo.png"
            />

            <Form
              name="normal_login4"
              className="form"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinishLogin}
            >
              <p className=" text-[1.5rem] text-[#2E28D4] font-semibold pt-20">
                ??????????????
              </p>
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: "???????????????????????? ?????????? ?????????????? ????!",
                  },
                ]}
              >
                <Input
                  className=" w-[27.5rem] h-[3rem] rounded-[41px]"
                  placeholder="?????????????? ??????*"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "???????? ???????? ?????????????? ????!",
                  },
                ]}
              >
                <Input.Password
                  className=" w-[27.5rem] h-[3rem] rounded-[41px]"
                  type="password"
                  placeholder="???????? ????*"
                />
              </Form.Item>
              <Form.Item>
                <div className=" flex justify-between w-full pl-[2rem] pr-[2rem] ">
                  <div>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                      <Checkbox>???????????? ????????</Checkbox>
                    </Form.Item>
                  </div>
                  <div
                    onClick={onForgotPass}
                    className=" text-[#2E28D4] cursor-pointer"
                  >
                    ???????? ???????? ???????????????
                  </div>
                </div>
              </Form.Item>

              <Form.Item>
                <Button
                  className=" w-[12.5rem] h-[3rem] bg-gradient-to-r from-[#2E28D4] to-[#AC27FD] rounded-[43px]"
                  type="primary"
                  htmlType="submit"
                >
                  ??????????????
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <p className=" text-[2rem] font-semibold">???????????? ?????????????? ????.</p>
                <p className=" text-[1.125rem]">
                  ???????????? ???????????????????? ?????? ?????????????? ???????????? ????????????????????????.
                </p>
                <Image preview={false} src="/img/login.png" />

                <Button
                  className=" w-[12.5rem] h-[3rem] bg-transparent border-[#fff] bg-opacity-50 rounded-[43px] mt-[2rem]"
                  onClick={() => setaddclass("")}
                  type="primary"
                >
                  ??????????????
                </Button>
              </div>
              <div className="overlay-panel overlay-right">
                <p className=" text-[2rem] font-semibold">???????????? ?????????????? ????.</p>
                <p className=" text-[1.125rem]">
                  ???????????? ???????????????????? ?????? ?????????????? ???????????? ????????????????????????.
                </p>
                <Image preview={false} src="/img/login.png" />

                <Button
                  className=" w-[12.5rem] h-[3rem] bg-transparent border-[#fff] bg-opacity-50 rounded-[43px] mt-[2rem]"
                  onClick={() => setaddclass("right-panel-active")}
                  type="primary"
                >
                  ????????????????????
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* forgot pass modal */}

      <Modal
        centered={true}
        width={"60.25rem"}
        className="login2"
        footer={[]}
        visible={forgotPassModal}
        onCancel={handleCancel}
      >
        <div className={`container ${addclass}`} id="container">
          <div className="form-container sign-up-container">
            <Image
              className="pt-[3rem] pl-[3rem] "
              preview={false}
              src="/img/logo.png"
            />

            <Form
              name="normal_login3"
              className="form"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinishRegister}
            >
              <p className=" text-[1.5rem] text-[#2E28D4] font-semibold pt-10">
                ???????? ???????? ??????????????
              </p>

              <Form.Item
                name="forgotValue"
                rules={[
                  {
                    required: true,
                    message: "???????????????????????? ?????????? ?????????????? ????!",
                  },
                ]}
              >
                {forgotType == 1 ? (
                  <Input
                    maxLength={8}
                    suffix={
                      <PhoneOutlined className="text-[1.25rem] opacity-70" />
                    }
                    className=" w-[27.5rem] h-[3rem] rounded-[41px]"
                    id="normal_signup_name"
                    placeholder="???????????????????? ???????????? ????????????"
                  />
                ) : (
                  <Input
                    maxLength={8}
                    suffix={
                      <MailOutlined className="text-[1.25rem] opacity-70" />
                    }
                    className=" w-[27.5rem] h-[3rem] rounded-[41px]"
                    id="normal_signup_name"
                    placeholder="???????????????????? ??-???????? ????????"
                  />
                )}
              </Form.Item>

              <Radio.Group onChange={onForgotTypeChange} value={forgotType}>
                <Radio value={1}>???????????? ??????????????????</Radio>
                <Radio value={2}>?????????? ??????????????</Radio>
              </Radio.Group>
              <div className=" flex justify-center mt-[1.875rem] ">
                <div className="flex w-[27.5rem] items-center h-[4.625rem] justify-center bg-[#F09A1A] bg-opacity-30 rounded-[4px]">
                  <div>
                    ret
                    <WarningOutlined className="text-[20px]" />
                  </div>
                  <div className=" text-[14px] pl-2 text-[#F09A1A]">
                    ???????????????????? ???????????? ???????????? ?????????? ?????????? ???????????? ?????? ?????????????? ????!
                  </div>
                </div>
              </div>
              <Form.Item>
                <Button
                  className=" w-[12.5rem] h-[3rem] bg-gradient-to-r from-[#2E28D4] to-[#AC27FD] rounded-[43px] mt-[2.5rem]"
                  type="primary"
                  htmlType="submit"
                >
                  ????????????
                </Button>
              </Form.Item>
            </Form>
          </div>

          {/* Login form */}

          <div className="form-container sign-in-container">
            <Image
              className="pt-[3rem] pl-[3rem]"
              preview={false}
              src="/img/logo.png"
            />

            <Form
              name="normal_login4"
              className="form"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinishLogin}
            >
              <p className=" text-[1.5rem] text-[#2E28D4] font-semibold pt-20">
                ??????????????
              </p>
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: "???????????????????????? ?????????? ?????????????? ????!",
                  },
                ]}
              >
                <Input
                  className=" w-[27.5rem] h-[3rem] rounded-[41px]"
                  placeholder="?????????????? ??????*"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "???????? ???????? ?????????????? ????!",
                  },
                ]}
              >
                <Input.Password
                  className=" w-[27.5rem] h-[3rem] rounded-[41px]"
                  type="password"
                  placeholder="???????? ????*"
                />
              </Form.Item>
              <Form.Item>
                <div className=" flex justify-between w-full pl-[2rem] pr-[2rem] ">
                  <div>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                      <Checkbox>???????????? ????????</Checkbox>
                    </Form.Item>
                  </div>
                  <div
                    onClick={onForgotPass}
                    className=" text-[#2E28D4] cursor-pointer"
                  >
                    ???????? ???????? ???????????????
                  </div>
                </div>
              </Form.Item>

              <Form.Item>
                <Button
                  className=" w-[12.5rem] h-[3rem] bg-gradient-to-r from-[#2E28D4] to-[#AC27FD] rounded-[43px]"
                  type="primary"
                  htmlType="submit"
                >
                  ??????????????
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <p className=" text-[2rem] font-semibold">???????????? ?????????????? ????.</p>
                <p className=" text-[1.125rem]">
                  ???????????? ???????????????????? ?????? ?????????????? ???????????? ????????????????????????.
                </p>
                <Image preview={false} src="/img/login.png" />

                <Button
                  className=" w-[12.5rem] h-[3rem] bg-transparent border-[#fff] bg-opacity-50 rounded-[43px] mt-[2rem]"
                  onClick={() => setaddclass("")}
                  type="primary"
                >
                  ??????????????
                </Button>
              </div>
              <div className="overlay-panel overlay-right">
                <p className=" text-[2rem] font-semibold">???????????? ?????????????? ????.</p>
                <p className=" text-[1.125rem]">
                  ???????????? ???????????????????? ?????? ?????????????? ???????????? ????????????????????????.
                </p>
                <Image preview={false} src="/img/login.png" />

                <Button
                  className=" w-[12.5rem] h-[3rem] bg-transparent border-[#fff] bg-opacity-50 rounded-[43px] mt-[2rem]"
                  onClick={() => setaddclass("right-panel-active")}
                  type="primary"
                >
                  ???????? ???? ??????????????
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* Sergeehed ashiglah kodoo oruulah modal */}

      <Modal
        centered={true}
        width={"60.25rem"}
        className="login2"
        footer={[]}
        visible={forgotPassConfirm}
        onCancel={handleCancel}
      >
        <div className={`container ${addclass}`} id="container">
          <div className="form-container sign-up-container">
            <Image
              className="pt-[3rem] pl-[3rem] "
              preview={false}
              src="/img/logo.png"
            />

            <Form
              name="normal_login3"
              className="form"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinishRegister}
            >
              <p className=" text-[1.5rem] text-[#2E28D4] font-semibold pt-10">
                ????????????????????????????
              </p>

              <Form.Item
                name="forgotValue"
                rules={[
                  {
                    required: true,
                    message: "???????????????????????? ?????????? ?????????????? ????!",
                  },
                ]}
              >
                <Space>
                  <ReactCodeInput
                    onChange={(e) => setForgotConfirmCode(e)}
                    className="confirmInput"
                    fields={4}
                  />
                </Space>
              </Form.Item>
              <div className=" w-full flex justify-center">
                <div className=" flex justify-center items-center w-[4.188rem] h-[2.625rem] bg-[#F01A63] bg-opacity-10 rounded-[4px]">
                  <div className="text-[#F01A63]">
                    <Countdown renderer={renderer} date={Date.now() + 180000} />
                  </div>
                </div>
              </div>
              <div className="text-[13px] text-[#2E28D4] mt-[1.5rem] cursor-pointer">
                ???????????????????????????? ?????? ????????
              </div>
              <Form.Item>
                <Button
                  className=" w-[12.5rem] h-[3rem] bg-gradient-to-r from-[#2E28D4] to-[#AC27FD] rounded-[43px] mt-[2.5rem]"
                  type="primary"
                  htmlType="submit"
                >
                  ????????????
                </Button>
              </Form.Item>
            </Form>
          </div>

          {/* Login form */}

          <div className="form-container sign-in-container">
            <Image
              className="pt-[3rem] pl-[3rem]"
              preview={false}
              src="/img/logo.png"
            />

            <Form
              name="normal_login4"
              className="form"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinishLogin}
            >
              <p className=" text-[1.5rem] text-[#2E28D4] font-semibold pt-20">
                ??????????????
              </p>
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: "???????????????????????? ?????????? ?????????????? ????!",
                  },
                ]}
              >
                <Input
                  className=" w-[27.5rem] h-[3rem] rounded-[41px]"
                  placeholder="?????????????? ??????*"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "???????? ???????? ?????????????? ????!",
                  },
                ]}
              >
                <Input.Password
                  className=" w-[27.5rem] h-[3rem] rounded-[41px]"
                  type="password"
                  placeholder="???????? ????*"
                />
              </Form.Item>
              <Form.Item>
                <div className=" flex justify-between w-full pl-[2rem] pr-[2rem] ">
                  <div>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                      <Checkbox>???????????? ????????</Checkbox>
                    </Form.Item>
                  </div>
                  <div
                    onClick={onForgotPass}
                    className=" text-[#2E28D4] cursor-pointer"
                  >
                    ???????? ???????? ???????????????
                  </div>
                </div>
              </Form.Item>

              <Form.Item>
                <Button
                  className=" w-[12.5rem] h-[3rem] bg-gradient-to-r from-[#2E28D4] to-[#AC27FD] rounded-[43px]"
                  type="primary"
                  htmlType="submit"
                >
                  ??????????????
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <p className=" text-[2rem] font-semibold">???????????? ?????????????? ????.</p>
                <p className=" text-[1.125rem]">
                  ???????????? ???????????????????? ?????? ?????????????? ???????????? ????????????????????????.
                </p>
                <Image preview={false} src="/img/login.png" />

                <Button
                  className=" w-[12.5rem] h-[3rem] bg-transparent border-[#fff] bg-opacity-50 rounded-[43px] mt-[2rem]"
                  onClick={() => setaddclass("")}
                  type="primary"
                >
                  ??????????????
                </Button>
              </div>
              <div className="overlay-panel overlay-right">
                <p className=" text-[2rem] font-semibold">???????????? ?????????????? ????.</p>
                <p className=" text-[1.125rem]">
                  ???????????? ???????????????????? ?????? ?????????????? ???????????? ????????????????????????.
                </p>
                <Image preview={false} src="/img/login.png" />

                <Button
                  className=" w-[12.5rem] h-[3rem] bg-transparent border-[#fff] bg-opacity-50 rounded-[43px] mt-[2rem]"
                  onClick={() => setaddclass("right-panel-active")}
                  type="primary"
                >
                  ????????????????????????????
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* signup comfirm email modal */}

      <Modal
        centered={true}
        width={"60.25rem"}
        className="login2"
        footer={[]}
        visible={confirmModal}
        onCancel={handleCancel}
      >
        <div className={`container ${addclass}`} id="container">
          <div className="form-container sign-up-container">
            <Image
              className="pt-[3rem] pl-[3rem] "
              preview={false}
              src="/img/logo.png"
            />

            <Form
              name="normal_login3"
              className="form"
              initialValues={{
                remember: true,
              }}
              onFinish={onConfirmEmail}
            >
              <p className=" text-[1.5rem] text-[#2E28D4] font-semibold pt-10">
                ????????????????????????????
              </p>
              <p className="text-[#2E28D4]">
                ???????? ??-???????? ?????????????? ?????????? ???????????? ?????????????? ?????????? ?????????????? ????!
              </p>

              <Form.Item
                name="confirmCode"
                rules={[
                  {
                    required: true,
                    message: "???????????????????????????? ?????????? ?????????????? ????!",
                  },
                ]}
              >
                <Space>
                  <ReactCodeInput
                    onChange={(e) => setConfirmCode(e)}
                    className="confirmInput"
                    fields={4}
                  />
                </Space>
              </Form.Item>
              <div className=" w-full flex justify-center">
                <div className=" flex justify-center items-center w-[4.188rem] h-[2.625rem] bg-[#F01A63] bg-opacity-10 rounded-[4px]">
                  <div className="text-[#F01A63]">
                    <Countdown renderer={renderer} date={Date.now() + 180000} />
                  </div>
                </div>
              </div>
              <div className="text-[13px] text-[#2E28D4] mt-[1.5rem] cursor-pointer">
                ?????????? ????????????
              </div>
              <Form.Item>
                <Button
                  className=" w-[12.5rem] h-[3rem] bg-gradient-to-r from-[#2E28D4] to-[#AC27FD] rounded-[43px] mt-[2.5rem]"
                  type="primary"
                  htmlType="submit"
                >
                  ????????????
                </Button>
              </Form.Item>
            </Form>
          </div>

          {/* Login form */}

          <div className="form-container sign-in-container">
            <Image
              className="pt-[3rem] pl-[3rem]"
              preview={false}
              src="/img/logo.png"
            />

            <Form
              name="normal_login4"
              className="form"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinishLogin}
            >
              <p className=" text-[1.5rem] text-[#2E28D4] font-semibold pt-20">
                ??????????????
              </p>
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: "???????????????????????? ?????????? ?????????????? ????!",
                  },
                ]}
              >
                <Input
                  className=" w-[27.5rem] h-[3rem] rounded-[41px]"
                  placeholder="?????????????? ??????*"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "???????? ???????? ?????????????? ????!",
                  },
                ]}
              >
                <Input.Password
                  className=" w-[27.5rem] h-[3rem] rounded-[41px]"
                  type="password"
                  placeholder="???????? ????*"
                />
              </Form.Item>
              <Form.Item>
                <div className=" flex justify-between w-full pl-[2rem] pr-[2rem] ">
                  <div>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                      <Checkbox>???????????? ????????</Checkbox>
                    </Form.Item>
                  </div>
                  <div
                    onClick={onForgotPass}
                    className=" text-[#2E28D4] cursor-pointer"
                  >
                    ???????? ???????? ???????????????
                  </div>
                </div>
              </Form.Item>

              <Form.Item>
                <Button
                  className=" w-[12.5rem] h-[3rem] bg-gradient-to-r from-[#2E28D4] to-[#AC27FD] rounded-[43px]"
                  type="primary"
                  htmlType="submit"
                >
                  ??????????????
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <p className=" text-[2rem] font-semibold">???????????? ?????????????? ????.</p>
                <p className=" text-[1.125rem]">
                  ???????????? ???????????????????? ?????? ?????????????? ???????????? ????????????????????????.
                </p>
                <Image preview={false} src="/img/login.png" />

                <Button
                  className=" w-[12.5rem] h-[3rem] bg-transparent border-[#fff] bg-opacity-50 rounded-[43px] mt-[2rem]"
                  onClick={() => setaddclass("")}
                  type="primary"
                >
                  ??????????????
                </Button>
              </div>
              <div className="overlay-panel overlay-right">
                <p className=" text-[2rem] font-semibold">???????????? ?????????????? ????.</p>
                <p className=" text-[1.125rem]">
                  ???????????? ???????????????????? ?????? ?????????????? ???????????? ????????????????????????.
                </p>
                <Image preview={false} src="/img/login.png" />

                <Button
                  className=" w-[12.5rem] h-[3rem] bg-transparent border-[#fff] bg-opacity-50 rounded-[43px] mt-[2rem]"
                  onClick={() => setaddclass("right-panel-active")}
                  type="primary"
                >
                  ????????????????????????????
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <div className="  flex justify-around  w-[75rem] items-center ">
        <div className=" z-1">
          <a href="/" >
          <Image preview={false} src="/img/Logo2.svg" />
          </a>
        </div>
        {sideBarActive ? (
          <div className=" lg:hidden">
            <Sidebar
              userName={userName}
              isLogin={isLogin}
              Signup={setMobileSignUp}
              Login={setMobileLogin}
              Logout={Logout}
            />
          </div>
        ) : (
          <div
            onClick={onSideBarActive}
            className=" flex flex-col justify-between h-5 lg:hidden"
          >
            <div className=" h-1  bg-white w-6"></div>
            <div className=" h-1  bg-white w-6"></div>
            <div className=" h-1  bg-white w-6"></div>
          </div>
        )}
        <div className="  hidden lg:flex  lg:w-[900px] lg:justify-between items-center">
          <div>
            <ul className="lg:flex lg:justify-around  lg:w-[40rem] lg:pt-3">
              <li className=" text-lg ">
                <Link href="/">
                  <a className="   text-white font-semibold">
                    ??????????
                  </a>
                </Link>
              </li>
              <li className=" text-lg">
                <Link href="/dashboard">
                  <a className="   text-white font-semibold">
                    ????????????????????????
                  </a>
                </Link>
              </li>
              <li className=" text-lg">
                <Link href="/pricing">
                  <a className=" text-white font-semibold">
                    ?????????? ??????????
                  </a>
                </Link>
              </li>

              <li className=" text-lg">
                <Link href="/service">
                  <a className="   text-white font-semibold">
                    ??????????????????
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          {Auth.getToken() == null || Auth.getToken() == undefined ? (
            <>
              <div className="  lg:w-80 lg:flex lg:justify-between lg:mt-2">
                <div className=" h-[48px]">
                  <Button
                    onClick={Signup}
                    className=" mr-5 h-[48px] w-[145px] rounded-[43px]  bg-transparent text-white text-[14px] font-bold border-white"
                    type="primary"
                    // disabled
                  >
                    ????????????????????
                  </Button>
                </div>
                <div>
                  <Button
                    // disabled
                    className=" h-[48px] w-[145px] rounded-[43px] bg-white border-none text-[#2E28D4] text-[14px] font-bold"
                    onClick={Login}
                    type="primary"
                  >
                    ??????????????
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <>
            <div className=" cursor-pointer box-border">
                <Dropdown
                  placement="bottomRight"
                  overlay={menu}
                  trigger={["click"]}
                >
                  <div>
                    <div className=" flex cursor-pointer box-border items-center w-[12.5rem] h-[3.75rem]   justify-center rounded-[60px] bg-gradient-to-r from-[#AC27FD] to-[#2E28D4]">
                      <div>
                        <UserOutlined className="text-[20px] text-white" />
                      </div>
                      <div className="text-[14px] text-white font-semibold ml-1 pt-1 font-sans">
                        {Auth.getName()}
                      </div>
                    </div>
                  </div>
                </Dropdown>
              </div>
            </>
          )}
        </div>
      </div>
      <Modal
        visible={messageShow}
        title="????????????????"
        onCancel={handleCancelMessage}
        footer={[]}
      >
        <Alert message={title} description={text} type={status} />
      </Modal>
      {/* <Modal
        visible={confirmModal}
        title="????????????????"
        onCancel={handleCancel}
        footer={[]}
      >
        <div className=" flex flex-col lg:flex-row justify-center text-[2.25rem] mb-3">
          <div
            style={{ marginRight: "5%", color: "#6366F1", fontWeight: "bold" }}
          >
            ??????????????
          </div>
          <div style={{ color: "#2D3748", fontWeight: "bold" }}>
            ????????????????????????????
          </div>
        </div>
        <p>{confirmMessage}</p>
        <MaskedInput
          mask="1111"
          onChange={(e) => setConfirmCode(e.target.value)}
          style={{ marginBottom: "1rem" }}
          placeholder="???????????????????????????? ??????"
        />
        <div style={{ textAlign: "center" }}>
          <Button
            onClick={onConfirmEmail}
            style={{
              width: "15rem",
              height: "3rem",
              backgroundColor: "#A855F7",
              fontSize: "16px",
              borderRadius: "15px",
              border: "none",
            }}
            type="primary"
          >
            ????????????????????????????
          </Button>
        </div>
      </Modal> */}
    </div>
  );
};

export default Navbar;
