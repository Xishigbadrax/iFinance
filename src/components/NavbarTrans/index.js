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
  MailOutlined,
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

const NavbarTrans = ({ cartLogin }) => {
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

  const db = "master_test";

  // console.log(userSid, "sidddddd");

  // mobile bolhod ashiglagdaj bgaa state-uud
  const [sideBarActive, setSideBarActive] = useState(false);
  const [mobileLogin, setMobileLogin] = useState(false);
  const [mobileSignUp, setMobileSignUp] = useState(false);
  const [shadowModal, setShadowModal] = useState(false);
  const [mobileForgot, setMobileForgot] = useState(false);
  const [mobileForgotConfirm, setMobileForgotConfirm] = useState(false);
  const [screen, setScreen] = useState(false);
  const [mobileConfirm, setMobileConfirm] = useState(false);
  const [mobileForgotConfirmModal, setMobileForgotConfirmModal] =
    useState(false);

  const [forgotPhoneValue, setForgotPhoneValue] = useState();
  const [forgotEmailValue, setForgotEmailValue] = useState("");
  const [forgotEmailConfirmModal, setForgotEmailConfirmModal] = useState(false);
  const [forgotPhoneConfirmModal, setForgotPhoneConfirmModal] = useState(false);
  const [newPass, setNewPass] = useState("");
  const [newPassConfirm, setNewPassConfirm] = useState("");

  const [test, setTest] = useState(false);
  const [hover, setHover] = useState(0);

  const handleCancel = () => {
    setMobileConfirm(false);
    setLoginModal(false);
    setConfirmModal(false);
    setMobileLogin(false);
    setMobileSignUp(false);
    setForgotPassModal(false);
    setForgotPassConfirm(false);
    setMobileForgot(false);
    setMobileForgotConfirm(false);
    setForgotEmailConfirmModal(false);
    setForgotPhoneConfirmModal(false);
    setMobileForgotConfirmModal(false);
    setMobileForgotConfirmModal(false);
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
  const onFunction = () => {
    setaddclass("right-panel-active");
    setForgotEmailConfirmModal(true);
    setForgotPassConfirm(false);
  };
  const onMobileFunction = () => {
    setMobileForgotConfirmModal(true);
    setMobileForgot(false);
  };

  const [width, setWidth] = useState();

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.location.href.includes("dashboard") && setHover(1);
    window.location.href.includes("pricing") && setHover(2);
    window.location.href.includes("service") && setHover(3);

    setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);
  // console.log(width, "widdd");
  const onForgotConfirmModal = async () => {
    await axios
      .post(
        baseUrl + "user/reset_password",
        {
          jsonrpc: 2.0,
          params: {
            email: forgotEmailValue,
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
        console.log(response, "forgot res");
        response?.data?.result && onFunction();
      });
  };

  const onForgotConfirmModal2 = async () => {
    await axios
      .post(
        baseUrl + "user/reset_password",
        {
          jsonrpc: 2.0,
          params: {
            phone: forgotPhoneValue,
          },
        },

        {
          headers: {
            "Set-Cookie": "session_id=" + sid,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response, "forgot res");
      });
  };

  const onMobileForgot = async () => {
    await axios
      .post(
        baseUrl + "user/reset_password",
        {
          jsonrpc: 2.0,
          params: {
            email: forgotEmailValue,
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
        console.log(response, "forgot res");
        response?.data?.result && onMobileFunction();
      });
  };

  const onMobileForgot2 = async () => {
    await axios
      .post(
        baseUrl + "user/reset_password",
        {
          jsonrpc: 2.0,
          params: {
            phone: forgotPhoneValue,
          },
        },

        {
          headers: {
            "Set-Cookie": "session_id=" + sid,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response, "forgot res");
      });
  };

  const onForgotTypeChange = (e) => {
    // console.log("radio checked", e.target.value);
    setForgotType(e.target.value);
  };
  // Auth.destroyToken();
  const onForgotModal = () => {
    setForgotPassConfirm(true);
  };
  const onMobileForgotModal = () => {
    setMobileLogin(false);
    setMobileForgot(true);
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
      message.success("Амжилттай систэмээс гарлаа");
      Auth.destroyToken();
      // window.location.reload(false);
      Router.push("/");
    }

    // console.log(res, "logout res");
  };

  const onForgotConFirm = async () => {
    await axios
      .post(
        baseUrl + "user/reset_password/confirm",
        {
          jsonrpc: 2.0,
          params: {
            email: forgotEmailValue,
            code: confirmCode,
            password: newPass,
            password_confirm: newPassConfirm,
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
        console.log(response, "last forgot res");
        response?.data?.result == true &&
          message.success("Амжилттай") & handleCancel();
        response?.data?.error?.data?.message &&
          message.error(response?.data?.error?.data?.message);
      });
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
      auth_cookie.setToken(
        res.data.result.sid,
        res.data.result.erp_info,
        res.data.result.uid
      );
      // console.log(res, "last res");
      setConfirmModal(false);
      setMobileConfirm(false);
      message.success("Амжилттай нэвтэрлээ");
    } else {
      settitle("Алдлаа");
      settext("Баталгаажуулхад алдаа гарлаа");
      setstatus("error");
      setmessageShow(true);
    }

    // console.log(res, "confirm res");
  };

  const onFinishRegister = async (values) => {
    setScreen(true);
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
      screen ? setMobileConfirm(true) : setConfirmModal(true);
      setMobileSignUp(false);
      setLoginModal(false);
    } else if (res.data.error && res.data.error.data.message) {
      settitle("Алдлаа гарлаа");
      settext(res.data.error.data.message);
      setstatus("error");
      setmessageShow(true);
    } else {
      settitle("Алдлаа");
      setConfirmMessage("Бүртгэхэд алдаа гарлаа");
      setstatus("error");
      setmessageShow(true);
    }
  };

  const onMobileRegister = async (values) => {
    setScreen(true);
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
      setMobileConfirm(true);
      setMobileSignUp(false);
    } else if (res.data.error && res.data.error.data.message) {
      settitle("Алдлаа гарлаа");
      settext(res.data.error.data.message);
      setstatus("error");
      setmessageShow(true);
    } else {
      settitle("Алдлаа");
      setConfirmMessage("Бүртгэхэд алдаа гарлаа");
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
      setUserName(res.data.result.erp_info);
      auth_cookie.setToken(
        res.data.result.sid,
        res.data.result.erp_info,
        res.data.result.uid
      );
      window.location.reload(false);
      message.success("Амжилттай нэвтэрлээ");
      setUserSid(res.data.result.sid);
      // props.sido(res.data.result.sid);

      setIsLogin(true);
      setLoginModal(false);
      setMobileLogin(false);
    } else {
      settitle("Алдлаа");
      setConfirmMessage("Нэвтрэхэд алдаа гарлаа");
      settext(res.data.error.data.message);
      setstatus("error");
      setmessageShow(true);
    }
    // console.log(res, "login res");
  };

  useEffect(() => {
    if (test) {


      Auth.getToken() ? null  : width < 768 ? setMobileLogin(true) : setLoginModal(true);
      
    } else {
      setTest(true);
    }
  }, [cartLogin]);

  const menu = (
    <Menu className="profileDropdownPopup p-[30px]">
      <Menu.Item className="order" key="0">
        <div className="flex items-center">
          <Image preview={false} width={20} height={20} src="/img/i1.svg" />
          <a
            className="pl-1 text-[#2E28D4] text-[14px] font-semibold"
            href="/order"
          >
            Миний захиалга
          </a>
        </div>
      </Menu.Item>

      <Menu.Item className="order2" key="1">
        <div className="flex items-center ">
          <Image preview={false} width={20} height={20} src="/img/i2.svg" />
          <a className="pl-1 text-[#2E28D4]" href="/cart">
            Миний сагс
          </a>
        </div>
      </Menu.Item>
      <Menu.Item className="order2" key="2">
        <div className="flex items-center">
          <Image preview={false} width={20} height={20} src="/img/i3.svg" />
          <a className="pl-1 text-[#2E28D4]" href="/info">
            Миний мэдээлэл
          </a>
        </div>
      </Menu.Item>
      <Menu.Item className="order2" key="3">
        <div className="flex items-center">
          <Image preview={false} width={20} height={20} src="/img/i4.svg" />
          <a className="pl-1 text-[#2E28D4]" href="/">
            Тохиргоо
          </a>
        </div>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item className="order3" key="4">
        <div onClick={Logout} className="flex items-center">
          <Image preview={false} width={20} height={20} src="/img/i5.svg" />
          <a className="pl-1 text-[#F01A63]" href="/">
            Гарах
          </a>
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <div
      id="head"
      className="w-full h-[100px] bg-transparent relative flex justify-center"
    >
      {/* <div className=" w-[100vw] absolute z-[-1]">
        <Image src="/img/back.png" className=" h-[100px] w-[100vw]" />
      </div> */}
      {shadowModal ? (
        <div onClick={onShadowBox} className="shadowBox"></div>
      ) : null}
      {/* mobile бүртгүүлэх */}

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
            onFinish={onMobileRegister}
          >
            <p className=" text-[1.5rem] text-[#2E28D4] font-semibold pt-2">
              Бүртгүүлэх
            </p>
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: "Хэрэглэгчийн нэрээ оруулна уу!",
                },
              ]}
            >
              <Input
                className=" w-[20rem] h-[3rem] rounded-[41px]"
                id="normal_signup_name"
                placeholder="Нэвтрэх нэр*"
              />
            </Form.Item>
            <Form.Item
              name="phone_number"
              rules={[
                {
                  required: true,
                  message: "Утасны дугаараа оруулна уу!",
                },
              ]}
            >
              <Input
                className=" w-[20rem] h-[3rem] rounded-[41px]"
                type="text"
                placeholder="Утасны дугаар*"
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
                  message: "И-мэйлээ оруулна уу!",
                },
              ]}
            >
              <Input
                className=" w-[20rem] h-[3rem] rounded-[41px]"
                type="text"
                placeholder="И-мэйл*"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Нууц үгээ оруулна уу!",
                },
              ]}
            >
              <Input.Password
                className=" w-[20rem] h-[3rem] rounded-[41px]"
                type="password"
                placeholder="Нууц үг*"
              />
            </Form.Item>
            <Form.Item
              name="confirm_password"
              dependencies={["password"]}
              rules={[
                {
                  required: true,
                  message: "Нууц үгээ оруулна уу!",
                },
              ]}
            >
              <Input.Password
                className=" w-[20rem] h-[3rem] rounded-[41px]"
                type="password"
                placeholder="Нууц үг давтах*"
              />
            </Form.Item>

            <Form.Item>
              <div className=" flex justify-between w-full pl-[2rem] pr-[2rem] ">
                <div>
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Хүлээн зөвшөөрч байна</Checkbox>
                  </Form.Item>
                </div>
                <div>
                  <a className="login-form-forgot" href="">
                    Гэрээг харах
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
                Бүртгүүлэх
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
              Нэвтрэх
            </p>
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: "Хэрэглэгчийн нэрээ оруулна уу!",
                },
              ]}
            >
              <Input
                className=" w-[20rem] h-[3rem] rounded-[41px]"
                placeholder="Нэвтрэх нэр*"
              />
            </Form.Item>
            <Form.Item
              name="password"
              id="mobile_login"
              rules={[
                {
                  required: true,
                  message: "Нууц үгээ оруулна уу!",
                },
              ]}
            >
              <Input.Password
                className=" w-[20rem] h-[3rem] rounded-[41px]"
                type="password"
                placeholder="Нууц үг*"
              />
            </Form.Item>
            <Form.Item>
              <div className=" flex justify-between w-full pl-[2rem] pr-[2rem] ">
                <div>
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Намайг сана</Checkbox>
                  </Form.Item>
                </div>
                <div onClick={onMobileForgotModal}>Нууц үгээ мартсан?</div>
              </div>
            </Form.Item>

            <Form.Item>
              <Button
                className=" w-[12.5rem] h-[3rem] bg-gradient-to-r from-[#2E28D4] to-[#AC27FD] rounded-[43px]"
                type="primary"
                htmlType="submit"
              >
                Нэвтрэх
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
          >
            <p className=" text-[1.5rem] text-[#2E28D4] font-semibold pt-10">
              Нууц үгээ мартсан
            </p>

            <Form.Item
              name="forgotValue"
              rules={[
                {
                  required: true,
                  message: "Хэрэглэгчийн нэрээ оруулна уу!",
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
                  placeholder="Бүртгэлтэй утасны дугаар"
                  onChange={(e) => setForgotPhoneValue(e.target.value)}
                />
              ) : (
                <Input
                  suffix={
                    <MailOutlined className="text-[1.25rem] opacity-70" />
                  }
                  className=" w-[20rem] h-[3rem] rounded-[41px]"
                  id="normal_signup_name"
                  placeholder="Бүртгэлтэй и-мэйл хаяг"
                  onChange={(e) => setForgotEmailValue(e.target.value)}
                />
              )}
            </Form.Item>

            <Radio.Group onChange={onForgotTypeChange} value={forgotType}>
              <Radio value={1}>Утасны дугаараар</Radio>
              <Radio value={2}>Имэйл хаягаар</Radio>
            </Radio.Group>
            <div className=" flex justify-center mt-[1.875rem] ">
              <div className="flex w-[27.5rem] items-center h-[4.625rem] justify-center bg-[#F09A1A] bg-opacity-30 rounded-[4px]">
                <div>
                  <WarningOutlined className="text-[20px]" />
                </div>
                <div className=" text-[14px] pl-2 text-[#F09A1A]">
                  Бүртгэлтэй утасны дугаар болон имэйл хаягаа зөв оруулна уу!
                </div>
              </div>
            </div>
            <Form.Item>
              {forgotType == 1 ? (
                <Button
                  className=" w-[12.5rem] h-[3rem] bg-gradient-to-r from-[#2E28D4] to-[#AC27FD] rounded-[43px] mt-[2.5rem]"
                  type="primary"
                  onClick={onMobileForgot2}
                >
                  Илгээх
                </Button>
              ) : (
                <Button
                  className=" w-[12.5rem] h-[3rem] bg-gradient-to-r from-[#2E28D4] to-[#AC27FD] rounded-[43px] mt-[2.5rem]"
                  type="primary"
                  onClick={onMobileForgot}
                >
                  Илгээх
                </Button>
              )}
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
              Баталгаажуулах
            </p>

            <Form.Item
              name="forgotValue"
              rules={[
                {
                  required: true,
                  message: "Хэрэглэгчийн нэрээ оруулна уу!",
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
              Баталгаажуулах код авах
            </div>
            <Form.Item>
              <Button
                className=" w-[12.5rem] h-[3rem] bg-gradient-to-r from-[#2E28D4] to-[#AC27FD] rounded-[43px] mt-[2.5rem]"
                type="primary"
                htmlType="submit"
              >
                Илгээх
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
      {/* mobileConfirm modal */}

      <Modal visible={mobileConfirm} footer={[]} onCancel={handleCancel}>
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
            onFinish={onConfirmEmail}
          >
            <p className=" text-[1.5rem] text-[#2E28D4] font-semibold pt-10">
              Баталгаажуулах
            </p>

            <Form.Item
              name="forgotValue"
              rules={[
                {
                  required: true,
                  message: "Хэрэглэгчийн нэрээ оруулна уу!",
                },
              ]}
            >
              <Space>
                <Input
                  onChange={(e) => setConfirmCode(e.target.value)}
                  type="number"
                  className=" w-[15rem]"
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
            <div className="text-[13px] text-[#2E28D4] mt-[1.5rem] cursor-pointer ">
              Баталгаажуулах код авах
            </div>
            <Form.Item>
              <Button
                className=" w-[12.5rem] h-[3rem] bg-gradient-to-r from-[#2E28D4] to-[#AC27FD] rounded-[43px] mt-[2.5rem]"
                type="primary"
                htmlType="submit"
              >
                Илгээх
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>

      {/* mobile forgot confirm modal */}

      <Modal
        visible={mobileForgotConfirmModal}
        footer={[]}
        onCancel={handleCancel}
      >
        <div>
          <Image
            className="pt-[3rem] pl-[3rem]"
            preview={false}
            src="/img/logo.png"
          />

          <Form
            name="normal_login3"
            className="form"
            initialValues={{
              remember: true,
            }}
          >
            <p className=" text-[1.5rem] text-[#2E28D4] font-semibold pt-10">
              Баталгаажуулах
            </p>

            <Form.Item
              name="forgotValue"
              rules={[
                {
                  required: true,
                  message: "Хэрэглэгчийн нэрээ оруулна уу!",
                },
              ]}
            >
              <Space>
                <Input
                  onChange={(e) => setConfirmCode(e.target.value)}
                  type="number"
                  className=" w-[15rem]"
                />
              </Space>
            </Form.Item>
            <Form.Item
              name="forgotValue"
              rules={[
                {
                  required: true,
                  message: "Мэдээллээ оруулна уу!",
                },
              ]}
            >
              <div className=" w-full flex justify-center mt-[20px] ">
                <div
                  className=" w-[300px]"
                  style={{ borderBottom: "1px solid black" }}
                >
                  <Input.Password
                    onChange={(e) => setNewPass(e.target.value)}
                    bordered={false}
                    placeholder="Шинэ нууц үг "
                  />
                </div>
              </div>
              <div className=" w-full flex justify-center  mt-[20px]  ">
                <div
                  className=" w-[300px]"
                  style={{ borderBottom: "1px solid black" }}
                >
                  <Input.Password
                    onChange={(e) => setNewPassConfirm(e.target.value)}
                    bordered={false}
                    placeholder="Шинэ нууц үг давтах"
                  />
                </div>
              </div>
            </Form.Item>
            <div className=" w-full flex justify-center">
              <div className=" flex justify-center items-center w-[4.188rem] h-[2.625rem] bg-[#F01A63] bg-opacity-10 rounded-[4px]">
                <div className="text-[#F01A63]">
                  <Countdown renderer={renderer} date={Date.now() + 180000} />
                </div>
              </div>
            </div>
            <div className="text-[13px] text-[#2E28D4] mt-[1.5rem] cursor-pointer ">
              Баталгаажуулах код авах
            </div>
            <Form.Item>
              <Button
                className=" w-[12.5rem] h-[3rem] bg-gradient-to-r from-[#2E28D4] to-[#AC27FD] rounded-[43px] mt-[2.5rem]"
                type="primary"
                onClick={onForgotConFirm}
              >
                Илгээх
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
          <Form
              name="normal_login3"
              className="form"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinishRegister}
            >
            <div className=" ml-[35%]">

            <Image
              className="pt-[3rem] pl-[3rem] "
              preview={false}
              src="/img/logo.png"
            />
            </div>

         
              <p className=" text-[1.5rem] text-transparent bg-clip-text bg-gradient-to-br from-[#2E28D4] to-[#AC27FD] font-semibold pt-2">
                Бүртгүүлэх
              </p>
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Хэрэглэгчийн нэрээ оруулна уу!",
                  },
                ]}
              >
                <Input
                  maxLength={25}
                  className=" w-[27.5rem] h-[3rem] rounded-[41px] pl-[24px]"
                  id="normal_signup_name"
                  placeholder="Нэвтрэх нэр*"
                />
              </Form.Item>
              <Form.Item
                name="phone_number"
                rules={[
                  {
                    required: true,
                    message: "Утасны дугаараа оруулна уу!",
                  },
                ]}
              >
                <MaskedInput
                  mask="11111111"
                  className=" w-[27.5rem] h-[3rem] rounded-[41px] pl-[24px]"
                  type="text"
                  placeholder="Утасны дугаар*"
                />
              </Form.Item>
              <Form.Item
                name="email"
                rules={[
                  {
                    type: "email",
                    message: "Зөвшөөрөгдсөн и-мэйл биш байна!",
                  },
                  {
                    required: true,
                    message: "И-мэйлээ оруулна уу!",
                  },
                ]}
              >
                <Input
                  className=" w-[27.5rem] h-[3rem] rounded-[41px] pl-[24px]"
                  type="text"
                  placeholder="И-мэйл*"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Нууц үгээ оруулна уу!",
                  },
                ]}
              >
                <Input.Password
                  className=" w-[27.5rem] h-[3rem] rounded-[41px] pl-[24px]"
                  type="password"
                  placeholder="Нууц үг*"
                />
              </Form.Item>
              <Form.Item
                name="confirm_password"
                dependencies={["password"]}
                // hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Нууц үгээ оруулна уу!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Нууц үг таарахгүй байна!")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  className=" w-[27.5rem] h-[3rem] rounded-[41px] pl-[24px]"
                  type="password"
                  placeholder="Нууц үг давтах*"
                />
              </Form.Item>

              <Form.Item>
                <div className=" flex justify-between w-full pl-[2rem] pr-[2rem] ">
                  <div>
                    <Form.Item noStyle>
                      <Checkbox className="text-[#9CA6C0]">Хүлээн зөвшөөрч байна</Checkbox>
                    </Form.Item>
                  </div>
                  <div>
                    <a className="login-form-forgot" href="">
                      Гэрээг харах
                    </a>
                  </div>
                </div>
              </Form.Item>

              <Form.Item>
                <Button
                  className=" w-[12.5rem] h-[3rem] bg-gradient-to-r from-[#2E28D4] to-[#AC27FD] rounded-[43px] font-bold"
                  type="primary"
                  htmlType="submit"
                >
                  Бүртгүүлэх
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
              <p className=" text-[1.5rem] text-transparent bg-clip-text bg-gradient-to-br from-[#2E28D4] to-[#AC27FD] font-semibold pt-20">
                Нэвтрэх
              </p>
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Хэрэглэгчийн нэрээ оруулна уу!",
                  },
                ]}
              >
                <Input
                  className=" w-[27.5rem] h-[3rem] rounded-[41px] pl-[24px]"
                  placeholder="Нэвтрэх нэр*"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Нууц үгээ оруулна уу!",
                  },
                ]}
              >
                <Input.Password
                  className=" w-[27.5rem] h-[3rem] rounded-[41px] pl-[24px]"
                  type="password"
                  placeholder="Нууц үг*"
                />
              </Form.Item>
              <Form.Item>
                <div className=" flex justify-between w-full pl-[2rem] pr-[2rem] ">
                  <div>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                      <Checkbox className=" text-[#9CA6C0]">Намайг сана</Checkbox>
                    </Form.Item>
                  </div>
                  <div
                    onClick={onForgotPass}
                    className=" text-[#2E28D4] cursor-pointer"
                  >
                    Нууц үгээ мартсан?
                  </div>
                </div>
              </Form.Item>

              <Form.Item>
                <Button
                  className=" mt-[76px]  border-none w-[12.5rem] h-[3rem] bg-gradient-to-r from-[#2E28D4] to-[#AC27FD] rounded-[43px]"
                  type="primary"
                  htmlType="submit"
                >
                  Нэвтрэх
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <p className=" text-[2rem] font-semibold">Тавтай морилно уу.</p>
                <p className=" text-[1.125rem">
                  Хэрвээ бүртгэлгүй бол бүртгэл үүсгэх шаардлагатай.
                </p>
                <Image preview={false} src="/img/login.png" />

                <Button
                  className=" w-[12.5rem] h-[3rem] bg-transparent border-[#fff] bg-opacity-50 rounded-[43px] mt-[155px]"
                  onClick={() => setaddclass("")}
                  type="primary"
                >
                  Нэвтрэх
                </Button>
              </div>
              <div className="overlay-panel overlay-right">
                <p className=" text-[2rem] font-semibold">Тавтай морилно уу.</p>
                <p className=" text-[1.125rem] opacity-70 w-[330px] text-left">
                  Хэрвээ бүртгэлгүй бол бүртгэл үүсгэх шаардлагатай.
                </p>
                <Image preview={false} src="/img/login.png" />

                <Button
                  className=" w-[12.5rem] h-[3rem] bg-transparent border-[#fff] bg-opacity-50 rounded-[43px] mt-[2rem]"
                  onClick={() => setaddclass("right-panel-active")}
                  type="primary"
                >
                  Бүртгүүлэх
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
                Нууц үгээ мартсан
              </p>

              <Form.Item
                name="forgotValue"
                rules={[
                  {
                    required: true,
                    message: "Нууц код авах мэдээллээ оруулна уу!",
                  },
                ]}
              >
                {/* aliv */}
                {forgotType == 1 ? (
                  <Input
                    maxLength={8}
                    suffix={
                      <PhoneOutlined className="text-[1.25rem] opacity-70" />
                    }
                    className=" w-[27.5rem] h-[3rem] rounded-[41px]"
                    id="normal_signup_name"
                    placeholder="Бүртгэлтэй утасны дугаар"
                    onChange={(e) => setForgotPhoneValue(e.target.value)}
                  />
                ) : (
                  <Input
                    maxLength={30}
                    suffix={
                      <MailOutlined className="text-[1.25rem] opacity-70" />
                    }
                    className=" w-[27.5rem] h-[3rem] rounded-[41px]"
                    id="normal_signup_утйшл"
                    placeholder="Бүртгэлтэй и-мэйл хаяг"
                    onChange={(e) => setForgotEmailValue(e.target.value)}
                  />
                )}
              </Form.Item>

              <Radio.Group onChange={onForgotTypeChange} value={forgotType}>
                <Radio value={1}>Утасны дугаараар</Radio>
                <Radio value={2}>Имэйл хаягаар</Radio>
              </Radio.Group>
              <div className=" flex justify-center mt-[1.875rem] ">
                <div className="flex w-[27.5rem] items-center h-[4.625rem] justify-center bg-[#F09A1A] bg-opacity-30 rounded-[4px]">
                  <div>
                    <WarningOutlined className="text-[20px]" />
                  </div>
                  <div className=" text-[14px] pl-2 text-[#F09A1A]">
                    Бүртгэлтэй утасны дугаар болон имэйл хаягаа зөв оруулна уу!
                  </div>
                </div>
              </div>
              <Form.Item>
                {forgotType == 1 ? (
                  <Button
                    className=" w-[12.5rem] h-[3rem] bg-gradient-to-r from-[#2E28D4] to-[#AC27FD] rounded-[43px] mt-[2.5rem]"
                    type="primary"
                    htmlType="submit"
                    onClick={onForgotConfirmModal2}
                  >
                    Илгээх
                  </Button>
                ) : (
                  <Button
                    className=" w-[12.5rem] h-[3rem] bg-gradient-to-r from-[#2E28D4] to-[#AC27FD] rounded-[43px] mt-[2.5rem]"
                    type="primary"
                    onClick={onForgotConfirmModal}
                  >
                    Илгээх
                  </Button>
                )}
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
                Нэвтрэх
              </p>
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Хэрэглэгчийн нэрээ оруулна уу!",
                  },
                ]}
              >
                <Input
                  className=" w-[27.5rem] h-[3rem] rounded-[41px]"
                  placeholder="Нэвтрэх нэр*"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Нууц үгээ оруулна уу!",
                  },
                ]}
              >
                <Input.Password
                  className=" w-[27.5rem] h-[3rem] rounded-[41px]"
                  type="password"
                  placeholder="Нууц үг*"
                />
              </Form.Item>
              <Form.Item>
                <div className=" flex justify-between w-full pl-[2rem] pr-[2rem] ">
                  <div>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                      <Checkbox>Намайг сана</Checkbox>
                    </Form.Item>
                  </div>
                  <div
                    onClick={onForgotPass}
                    className=" text-[#2E28D4] cursor-pointer"
                  >
                    Нууц үгээ мартсан?
                  </div>
                </div>
              </Form.Item>

              <Form.Item>
                <Button
                  className=" w-[12.5rem] h-[3rem] bg-gradient-to-r from-[#2E28D4] to-[#AC27FD] rounded-[43px]"
                  type="primary"
                  htmlType="submit"
                >
                  Нэвтрэх
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <p className=" text-[2rem] font-semibold">Тавтай морилно уу.</p>
                <p className=" text-[1.125rem]">
                  Хэрвээ бүртгэлгүй бол бүртгэл үүсгэх шаардлагатай.
                </p>
                <Image preview={false} src="/img/login.png" />

                <Button
                  className=" w-[12.5rem] h-[3rem] bg-transparent border-[#fff] bg-opacity-50 rounded-[43px] mt-[2rem]"
                  onClick={() => setaddclass("")}
                  type="primary"
                >
                  Нэвтрэх
                </Button>
              </div>
              <div className="overlay-panel overlay-right">
                <p className=" text-[2rem] font-semibold">Тавтай морилно уу.</p>
                <p className=" text-[1.125rem]">
                  Хэрвээ бүртгэлгүй бол бүртгэл үүсгэх шаардлагатай.
                </p>
                <Image preview={false} src="/img/login.png" />

                <Button
                  className=" w-[12.5rem] h-[3rem] bg-transparent border-[#fff] bg-opacity-50 rounded-[43px] mt-[2rem]"
                  onClick={() => setaddclass("right-panel-active")}
                  type="primary"
                >
                  Нууц үг сэргээх
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
                Баталгаажуулах
              </p>

              <Form.Item
                name="forgotValue"
                rules={[
                  {
                    required: true,
                    message: "Хэрэглэгчийн нэрээ оруулна уу!",
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
                Баталгаажуулах код авах
              </div>
              <Form.Item>
                <Button
                  className=" w-[12.5rem] h-[3rem] bg-gradient-to-r from-[#2E28D4] to-[#AC27FD] rounded-[43px] mt-[2.5rem]"
                  type="primary"
                  htmlType="submit"
                >
                  Илгээх
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
                Нэвтрэх
              </p>
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Хэрэглэгчийн нэрээ оруулна уу!",
                  },
                ]}
              >
                <Input
                  className=" w-[27.5rem] h-[3rem] rounded-[41px]"
                  placeholder="Нэвтрэх нэр*"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Нууц үгээ оруулна уу!",
                  },
                ]}
              >
                <Input.Password
                  className=" w-[27.5rem] h-[3rem] rounded-[41px]"
                  type="password"
                  placeholder="Нууц үг*"
                />
              </Form.Item>
              <Form.Item>
                <div className=" flex justify-between w-full pl-[2rem] pr-[2rem] ">
                  <div>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                      <Checkbox>Намайг сана</Checkbox>
                    </Form.Item>
                  </div>
                  <div
                    onClick={onForgotPass}
                    className=" text-[#2E28D4] cursor-pointer"
                  >
                    Нууц үгээ мартсан?
                  </div>
                </div>
              </Form.Item>

              <Form.Item>
                <Button
                  className=" w-[12.5rem] h-[3rem] bg-gradient-to-r from-[#2E28D4] to-[#AC27FD] rounded-[43px]"
                  type="primary"
                  htmlType="submit"
                >
                  Нэвтрэх
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <p className=" text-[2rem] font-semibold">Тавтай морилно уу.</p>
                <p className=" text-[1.125rem]">
                  Хэрвээ бүртгэлгүй бол бүртгэл үүсгэх шаардлагатай.
                </p>
                <Image preview={false} src="/img/login.png" />

                <Button
                  className=" w-[12.5rem] h-[3rem] bg-transparent border-[#fff] bg-opacity-50 rounded-[43px] mt-[2rem]"
                  onClick={() => setaddclass("")}
                  type="primary"
                >
                  Нэвтрэх
                </Button>
              </div>
              <div className="overlay-panel overlay-right">
                <p className=" text-[2rem] font-semibold">Тавтай морилно уу.</p>
                <p className=" text-[1.125rem]">
                  Хэрвээ бүртгэлгүй бол бүртгэл үүсгэх шаардлагатай.
                </p>
                <Image preview={false} src="/img/login.png" />

                <Button
                  className=" w-[12.5rem] h-[3rem] bg-transparent border-[#fff] bg-opacity-50 rounded-[43px] mt-[2rem]"
                  onClick={() => setaddclass("right-panel-active")}
                  type="primary"
                >
                  Баталгаажуулах
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* Nuuts ug martsan modal */}
      {/* email */}
      <Modal
        centered={true}
        width={"60.25rem"}
        className="login2"
        footer={[]}
        visible={forgotEmailConfirmModal}
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
              onFinish={onForgotConFirm}
            >
              <p className=" text-[1.5rem] text-[#2E28D4] font-semibold pt-10">
                Баталгаажуулах
              </p>

              <Form.Item
                name="forgotValue"
                rules={[
                  {
                    required: true,
                    message: "Баталгаажуулах 4 оронтой тоо!",
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
              <Form.Item
                name="forgotValue"
                rules={[
                  {
                    required: true,
                    message: "Мэдээллээ оруулна уу!",
                  },
                ]}
              >
                <div className=" w-full flex justify-center mt-[20px] ">
                  <div
                    className=" w-[300px]"
                    style={{ borderBottom: "1px solid black" }}
                  >
                    <Input.Password
                      onChange={(e) => setNewPass(e.target.value)}
                      bordered={false}
                      placeholder="Шинэ нууц үг "
                    />
                  </div>
                </div>
                <div className=" w-full flex justify-center  mt-[20px]  ">
                  <div
                    className=" w-[300px]"
                    style={{ borderBottom: "1px solid black" }}
                  >
                    <Input.Password
                      onChange={(e) => setNewPassConfirm(e.target.value)}
                      bordered={false}
                      placeholder="Шинэ нууц үг давтах"
                    />
                  </div>
                </div>
              </Form.Item>

              <div className=" w-full flex justify-center">
                <div className=" flex justify-center items-center w-[4.188rem] h-[2.625rem] bg-[#F01A63] bg-opacity-10 rounded-[4px]">
                  <div className="text-[#F01A63]">
                    <Countdown renderer={renderer} date={Date.now() + 180000} />
                  </div>
                </div>
              </div>
              <div className="text-[13px] text-[#acabc9] mt-[1.5rem] cursor-pointer">
                Баталгаажуулах код авах
              </div>
              <Form.Item>
                <Button
                  className=" w-[12.5rem] h-[3rem] bg-gradient-to-r from-[#2E28D4] to-[#AC27FD] rounded-[43px] mt-[2.5rem]"
                  type="primary"
                  htmlType="submit"
                >
                  Илгээх
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
                Нэвтрэх
              </p>
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Хэрэглэгчийн нэрээ оруулна уу!",
                  },
                ]}
              >
                <Input
                  className=" w-[27.5rem] h-[3rem] rounded-[41px]"
                  placeholder="Нэвтрэх нэр*"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Нууц үгээ оруулна уу!",
                  },
                ]}
              >
                <Input.Password
                  className=" w-[27.5rem] h-[3rem] rounded-[41px]"
                  type="password"
                  placeholder="Нууц үг*"
                />
              </Form.Item>
              <Form.Item>
                <div className=" flex justify-between w-full pl-[2rem] pr-[2rem] ">
                  <div>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                      <Checkbox>Намайг сана</Checkbox>
                    </Form.Item>
                  </div>
                  <div
                    onClick={onForgotPass}
                    className=" text-[#2E28D4] cursor-pointer"
                  >
                    Нууц үгээ мартсан?
                  </div>
                </div>
              </Form.Item>

              <Form.Item>
                <Button
                  className=" w-[12.5rem] h-[3rem] bg-gradient-to-r from-[#2E28D4] to-[#AC27FD] rounded-[43px]"
                  type="primary"
                  htmlType="submit"
                >
                  Нэвтрэх
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <p className=" text-[2rem] font-semibold">Тавтай морилно уу.</p>
                <p className=" text-[1.125rem]">
                  Хэрвээ бүртгэлгүй бол бүртгэл үүсгэх шаардлагатай.
                </p>
                <Image preview={false} src="/img/login.png" />

                <Button
                  className=" w-[12.5rem] h-[3rem] bg-transparent border-[#fff] bg-opacity-50 rounded-[43px] mt-[2rem]"
                  onClick={() => setaddclass("")}
                  type="primary"
                >
                  Нэвтрэх
                </Button>
              </div>
              <div className="overlay-panel overlay-right">
                <p className=" text-[2rem] font-semibold">Тавтай морилно уу.</p>
                <p className=" text-[1.125rem]">
                  Хэрвээ бүртгэлгүй бол бүртгэл үүсгэх шаардлагатай.
                </p>
                <Image preview={false} src="/img/login.png" />

                <Button
                  className=" w-[12.5rem] h-[3rem] bg-transparent border-[#fff] bg-opacity-50 rounded-[43px] mt-[2rem]"
                  onClick={() => setaddclass("right-panel-active")}
                  type="primary"
                >
                  Баталгаажуулах
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* utas */}

      <Modal
        centered={true}
        width={"60.25rem"}
        className="login2"
        footer={[]}
        visible={forgotPhoneConfirmModal}
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
                Баталгаажуулах
              </p>

              <Form.Item
                name="forgotValue"
                rules={[
                  {
                    required: true,
                    message: "Хэрэглэгчийн нэрээ оруулна уу!",
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
              <Form.Item
                name="forgotValue"
                rules={[
                  {
                    required: true,
                    message: "Мэдээллээ оруулна уу!",
                  },
                ]}
              >
                <div className=" w-full flex justify-center mt-[20px] ">
                  <div
                    className=" w-[300px]"
                    style={{ borderBottom: "1px solid black" }}
                  >
                    <Input.Password
                      onChange={(e) => setNewPass(e.target.value)}
                      bordered={false}
                      placeholder="Шинэ нууц үг "
                    />
                  </div>
                </div>
                <div className=" w-full flex justify-center  mt-[20px]  ">
                  <div
                    className=" w-[300px]"
                    style={{ borderBottom: "1px solid black" }}
                  >
                    <Input.Password
                      onChange={(e) => setNewPassConfirm(e.target.value)}
                      bordered={false}
                      placeholder="Шинэ нууц үг давтах"
                    />
                  </div>
                </div>
              </Form.Item>
              <div className=" w-full flex justify-center">
                <div className=" flex justify-center items-center w-[4.188rem] h-[2.625rem] bg-[#F01A63] bg-opacity-10 rounded-[4px]">
                  <div className="text-[#F01A63]">
                    <Countdown renderer={renderer} date={Date.now() + 180000} />
                  </div>
                </div>
              </div>
              <div className="text-[13px] text-[#2E28D4] mt-[1.5rem] cursor-pointer">
                Баталгаажуулах код авах
              </div>
              <Form.Item>
                <Button
                  className=" w-[12.5rem] h-[3rem] bg-gradient-to-r from-[#2E28D4] to-[#AC27FD] rounded-[43px] mt-[2.5rem]"
                  type="primary"
                  htmlType="submit"
                >
                  Илгээх
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
                Нэвтрэх
              </p>
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Хэрэглэгчийн нэрээ оруулна уу!",
                  },
                ]}
              >
                <Input
                  className=" w-[27.5rem] h-[3rem] rounded-[41px]"
                  placeholder="Нэвтрэх нэр*"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Нууц үгээ оруулна уу!",
                  },
                ]}
              >
                <Input.Password
                  className=" w-[27.5rem] h-[3rem] rounded-[41px]"
                  type="password"
                  placeholder="Нууц үг*"
                />
              </Form.Item>
              <Form.Item>
                <div className=" flex justify-between w-full pl-[2rem] pr-[2rem] ">
                  <div>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                      <Checkbox>Намайг сана</Checkbox>
                    </Form.Item>
                  </div>
                  <div
                    onClick={onForgotPass}
                    className=" text-[#2E28D4] cursor-pointer"
                  >
                    Нууц үгээ мартсан?
                  </div>
                </div>
              </Form.Item>

              <Form.Item>
                <Button
                  className=" w-[12.5rem] h-[3rem] bg-gradient-to-r from-[#2E28D4] to-[#AC27FD] rounded-[43px]"
                  type="primary"
                  htmlType="submit"
                >
                  Нэвтрэх
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <p className=" text-[2rem] font-semibold">Тавтай морилно уу.</p>
                <p className=" text-[1.125rem]">
                  Хэрвээ бүртгэлгүй бол бүртгэл үүсгэх шаардлагатай.
                </p>
                <Image preview={false} src="/img/login.png" />

                <Button
                  className=" w-[12.5rem] h-[3rem] bg-transparent border-[#fff] bg-opacity-50 rounded-[43px] mt-[2rem]"
                  onClick={() => setaddclass("")}
                  type="primary"
                >
                  Нэвтрэх
                </Button>
              </div>
              <div className="overlay-panel overlay-right">
                <p className=" text-[2rem] font-semibold">Тавтай морилно уу.</p>
                <p className=" text-[1.125rem]">
                  Хэрвээ бүртгэлгүй бол бүртгэл үүсгэх шаардлагатай.
                </p>
                <Image preview={false} src="/img/login.png" />

                <Button
                  className=" w-[12.5rem] h-[3rem] bg-transparent border-[#fff] bg-opacity-50 rounded-[43px] mt-[2rem]"
                  onClick={() => setaddclass("right-panel-active")}
                  type="primary"
                >
                  Баталгаажуулах
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
        <div className={`container ${addclass} `} id="container  ">
          <div className="form-container sign-up-container ">
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
                Баталгаажуулах
              </p>
              <p className="text-[#2E28D4]">
                Таны и-мэйл хаяганд ирсэн дөрвөн оронтой кодыг оруулна уу!
              </p>

              <Form.Item
                name="confirmCode"
                rules={[
                  {
                    required: true,
                    message: "Баталгаажуулах кодоо оруулна уу!",
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
                Дахин илгээх
              </div>
              <Form.Item>
                <Button
                  className=" w-[12.5rem] h-[3rem] bg-gradient-to-r from-[#2E28D4] to-[#AC27FD] rounded-[43px] mt-[2.5rem]"
                  type="primary"
                  htmlType="submit"
                >
                  Илгээх
                </Button>
              </Form.Item>
            </Form>
          </div>

          {/* Login form */}

          <div className="  form-container sign-in-container ">
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
                Нэвтрэх
              </p>
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Хэрэглэгчийн нэрээ оруулна уу!",
                  },
                ]}
              >
                <Input
                  className=" w-[27.5rem] h-[3rem] rounded-[41px]"
                  placeholder="Нэвтрэх нэр*"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Нууц үгээ оруулна уу!",
                  },
                ]}
              >
                <Input.Password
                  className=" w-[27.5rem] h-[3rem] rounded-[41px]"
                  type="password"
                  placeholder="Нууц үг*"
                />
              </Form.Item>
              <Form.Item>
                <div className=" flex justify-between w-full pl-[2rem] pr-[2rem] ">
                  <div>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                      <Checkbox>Намайг сана</Checkbox>
                    </Form.Item>
                  </div>
                  <div
                    onClick={onForgotPass}
                    className=" text-[#2E28D4] cursor-pointer"
                  >
                    Нууц үгээ мартсан?
                  </div>
                </div>
              </Form.Item>

              <Form.Item>
                <Button
                  className=" w-[12.5rem] h-[3rem] bg-gradient-to-r from-[#2E28D4] to-[#AC27FD] rounded-[43px]"
                  type="primary"
                  htmlType="submit"
                >
                  Нэвтрэх
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div className="overlay-container ">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <p className=" text-[2rem] font-semibold">Тавтай морилно уу.</p>
                <p className=" text-[1.125rem]">
                  Хэрвээ бүртгэлгүй бол бүртгэл үүсгэх шаардлагатай.
                </p>
                <Image preview={false} src="/img/login.png" />

                <Button
                  className=" w-[12.5rem] h-[3rem] bg-transparent border-[#fff] bg-opacity-50 rounded-[43px] mt-[2rem]"
                  onClick={() => setaddclass("")}
                  type="primary"
                >
                  Нэвтрэх
                </Button>
              </div>
              <div className="overlay-panel overlay-right">
                <p className=" text-[2rem] font-semibold">Тавтай морилно уу.</p>
                <p className=" text-[1.125rem]">
                  Хэрвээ бүртгэлгүй бол бүртгэл үүсгэх шаардлагатай.
                </p>
                <Image preview={false} src="/img/login.png" />

                <Button
                  className=" w-[12.5rem] h-[3rem] bg-transparent border-[#fff] bg-opacity-50 rounded-[43px] mt-[2rem]"
                  onClick={() => setaddclass("right-panel-active")}
                  type="primary"
                >
                  Баталгаажуулах
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* mobile confirm modal */}

      <div className="flex justify-around w-[75rem] h-full m-auto items-center">
        <div className="z-10">
          <a href="/">
            <Image preview={false} src="/img/Logo2.svg" alt="logo" />
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
            className="flex flex-col justify-between h-5 lg:hidden"
          >
            <div className=" h-1  bg-white w-6"></div>
            <div className=" h-1  bg-white w-6"></div>
            <div className=" h-1  bg-white w-6"></div>
          </div>
        )}
        <div className="  hidden lg:flex  lg:w-[900px]  lg:justify-between items-center">
          <div>
            <ul className="lg:flex lg:justify-around  lg:w-[550px]  lg:pt-3">
              {hover == 0 ? <li className=" text-lg ">
                <Link href="/">
                  <a className="text-white  opacity-100 font-poppins-semibold">Эхлэл</a>
                </Link>
              </li>
               : 
               <li className=" text-lg ">
                <Link href="/">
                  <a className="text-white hover:opacity-100 opacity-50 font-poppins-semibold">Эхлэл</a>
                </Link>
              </li>  
            }
              {hover == 1 ?   <li className=" text-lg">
                <Link href="/dashboard">
                  <a className=" text-white opacity-100 font-poppins-semibold">
                    Бүтээгдэхүүн
                  </a>
                </Link>
              </li>
              :  
               <li className=" text-lg" onClick={() => setHover(1)}>
              <Link href="/dashboard">
                <a className=" text-white hover:opacity-100 opacity-50 font-poppins-semibold">
                  Бүтээгдэхүүн
                </a>
              </Link>
            </li>  
            }
            {hover == 2 ? 
                  <li className=" text-lg">
                  <Link href="/pricing">
                    <a className="  text-white  opacity-100 font-poppins-semibold">
                      Үнийн санал
                    </a>
                  </Link>
                </li>
                :  
                <li className=" text-lg">
                <Link href="/pricing">
                  <a className="  text-white hover:opacity-100 opacity-50 font-poppins-semibold">
                    Үнийн санал
                  </a>
                </Link>
              </li>
          }
            {hover == 3 ? 
                <li className=" text-lg">
                <Link href="/service">
                  <a className=" text-[18px]  opacity-100 font-poppins-semibold  text-white ">
                    Үйлчилгээ
                  </a>
                </Link>
              </li>
              :
              <li className=" text-lg">
              <Link href="/service">
                <a className=" text-[18px] hover:opacity-100 opacity-50 font-poppins-semibold  text-white ">
                  Үйлчилгээ
                </a>
              </Link>
            </li>
            }

          
            </ul>
          </div>

          {Auth.getToken() == null || Auth.getToken() == undefined ? (
            <>
              <div className=" font-poppins-semibold lg:w-80 lg:flex lg:justify-between ">
                <div className=" h-[48px]">
                  <Button
                    onClick={Signup}
                    className=" font-poppins-semibold mr-5 h-[48px] w-[145px] rounded-[43px]  bg-transparent text-white text-[14px]  border-white"
                    type="primary"
                  >
                    Бүртгүүлэх
                  </Button>
                </div>
                <div>
                  <Button
                    className="  h-[48px] w-[145px] rounded-[43px] bg-white border-none text-[#2E28D4] text-[14px] font-poppins-semibold"
                    onClick={Login}
                    type="primary"
                  >
                    Нэвтрэх
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
        title="Мэдээлэл"
        onCancel={handleCancelMessage}
        footer={[]}
      >
        <Alert message={title} description={text} type={status} />
      </Modal>
    </div>
  );
};

export default NavbarTrans;
