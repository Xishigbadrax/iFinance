import React,{ Component } from 'react'
import { useEffect, useState, useContext } from 'react'
import axios from 'axios';
import Seo from '@solid-ui-components/Seo';
import { Button, Image, Modal, Alert, Space } from 'antd';
import logo from "../../pages/assets/logos.png";
import { Form, Input, message } from 'antd';
import "../../pages/style.css";
import { UserOutlined, LockOutlined,PhoneOutlined,MailOutlined  } from '@ant-design/icons';
import MaskedInput from 'antd-mask-input';
import { navigate  } from "gatsby"


const Header = (props) =>{

    const [registerModal, setRegisterModal] = useState(false);
    const [loginModal, setLoginModal] = useState(false);
    const [sessionId, setSessionId] = useState(null);
    const [messageShow, setmessageShow] = useState(false);
    const [text, settext] = useState('');
    const [status, setstatus] = useState('');
    const [title, settitle] = useState('');
    const [deviceInfo, setDeviceInfo] = useState(null);
    const [confirmModal, setConfirmModal] = useState(false);
    const [confirmMessage, setConfirmMessage] = useState('');
    const [confirmCode, setConfirmCode] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(false);
    const [userName, setUserName] = useState('');
    const [userSid, setUserSid] = useState('');


    useEffect(() => {
        fetch("https://geolocation-db.com/json/297364b0-2bc6-11ec-a8a6-1fc54772a803")
        .then( response => response.json())
        .then( data => setDeviceInfo(data));
        setSessionId(props.sessionId);
      },[]);
      
      
      
      
        console.log(sessionId, "ideee")
          const onFinishRegister = async (values) => {
            console.log('Received values of form: ', values);
            setEmail(values.email);
            setPassword(values.password);
            var data = {
              jsonrpc: 2.0,
              
              
              params: {
                db: "test",
                name: values.name,
                login: values.email,
                password: values.password,
                confirm_password: values.confirm_password,
                phone_number: values.phone_number,
                session_id: sessionId
              }
            }
      
            const res = await axios.post('http://192.168.1.15/api/signup', data, {
              headers: {
                "Set-Cookie":"session_id="+sessionId,
                "Content-Type": "application/json",
              }
            }
            
            )
            // ,{headers:{"Set-Cookie":"session_id="+sessionId }});
            
            console.log(res,"sign up res");
            if(res.data.result && res.data.result.msg){
              setConfirmMessage(res.data.result.msg);
              setConfirmModal(true);
              setRegisterModal(false);
            }
            else if(res.data.error && res.data.error.data.message){
                  settitle("Алдлаа гарлаа");
                  settext(res.data.error.data.message);
                  setstatus("error");
                  setmessageShow(true);
            }
            else{
              settitle("Алдлаа");
              setConfirmMessage("Бүртгэхэд алдаа гарлаа");
              setstatus("error");
              setmessageShow(true);
            }
          };
          const onFinishLogin = async (values) => {
            console.log('Received values of form: ', values);
            const res = await axios.post('http://192.168.1.15/api/login',{
              jsonrpc: 2.0,
              params: {
                db: "test",
                login: values.name,
                password: values.password,
                device: {
                  device_name: "Computer",
                  mac_address: [
                    deviceInfo.IPv4,
                    deviceInfo.country_name
                  ]
              }
              }
            },{
              headers: {
                "Set-Cookie":"session_id="+sessionId,
                "Content-Type": "application/json",
              }
            });
            if(res.data.result && res.data.result){
              setUserName(res.data.result.name);
              message.success('Амжилттай нэвтэрлээ');
              setUserSid(res.data.result.sid);
              setIsLogin(true);
              setLoginModal(false);
            } else{
              settitle("Алдлаа");
              setConfirmMessage("Нэвтрэхэд алдаа гарлаа");
              setstatus("error");
              setmessageShow(true);
            }
            console.log(res,"login res");
      
          };
          const handleCancel = () => {
            setRegisterModal(false);
            setLoginModal(false);
            setmessageShow(false);
            setConfirmModal(false);
          }
          const handleCancelMessage = () => {
         
            setmessageShow(false);
      
          }
          
          const handleOk = () => {
            setRegisterModal(false);
          }
          const onRegister = () => {
            setRegisterModal(true);
          }
          const onConfirmEmail = async () => {
            const res = await axios.post('http://192.168.1.15/api/signup/confirm',{
              jsonrpc: 2.0,
              params: {
                code: confirmCode,
                db: "test",
                login: email,
                password: password,
                device: {
                  device_name: "Computer",
                  mac_address: [
                    deviceInfo.IPv4,
                    deviceInfo.country_name
                  ]
              }
              }
            },{
              headers: {
                "Set-Cookie":"session_id="+sessionId,
                "Content-Type": "application/json",
              }
            });
            if(res.data.result && res.data.result){
              setUserName(res.data.result.name);
              setUserSid(res.data.result.sid);
              setIsLogin(true);
      
              setConfirmModal(false);
              message.success('Амжилттай нэвтэрлээ');
      
            } else{
              settitle("Алдлаа");
              settext("Баталгаажуулхад алдаа гарлаа");
              setstatus("error");
              setmessageShow(true);
            }
      
            console.log(res,"confirm res");
          }
         
          const onLogin = async () => {
            setLoginModal(true);
           
          }
          const onLogout = async () => {
            const res = await axios.post('http://192.168.1.15/api/logout',{
              jsonrpc: 2.0,
              params: {
                
              }
            },{
              headers: {
                "Set-Cookie":"session_id="+userSid,
                "Content-Type": "application/json",
              }
            });
            if(res.data.error && res.data.error){
              setIsLogin(false);
              message.success('Амжилттай систэмээс гарлаа');
            }
      
            console.log(res,"logout res");
          }

 return(
     <div>
    <Modal
    visible={messageShow}
    title="Мэдээлэл"
    onOk={handleOk}
    onCancel={handleCancelMessage}
    footer={[]}
  >
    <Alert message={title} description={text} type={status} />
  </Modal>
  <Modal
    visible={confirmModal}
    title="Мэдээлэл"
    onOk={handleOk}
    onCancel={handleCancel}
    footer={[]}
  >
     <div style={{display:"flex", justifyContent: "center", fontSize: "2.25rem", marginBottom: "10px"}}>
       <div style={{marginRight: "5%", color: "#6366F1", fontWeight:"bold"}}>Бүртгэл</div>
       <div style={{color:"#2D3748", fontWeight: "bold"}}>Баталгаажуулах</div>
       </div>
        <p>{confirmMessage}</p>   
        <MaskedInput mask="1111" onChange={(e) =>setConfirmCode(e.target.value) } style={{marginBottom: "1rem"}} placeholder="Баталгаажуулах тоо" />
        <div style={{textAlign: "center"}}> 
        <Button onClick={onConfirmEmail} style={{width: "15rem", height: "3rem", backgroundColor:"#A855F7", fontSize: "16px", borderRadius: "15px", border: "none"}} type="primary">Баталгаажуулах</Button>
        </div>
  </Modal>
  {/* Register modal */}

   <Modal title="" visible={registerModal} onOk={handleOk} footer={[]} onCancel={handleCancel}>
     <div style={{display:"flex", justifyContent: "center", fontSize: "2.25rem", marginBottom: "10px"}}>
       <div style={{marginRight: "5%", color: "#6366F1", fontWeight:"bold"}}>Бүртгэл</div>
       <div style={{color:"#2D3748", fontWeight: "bold"}}>Үүсгэх</div>
     </div>
   <Form
  name="normal_login"
  className="login-form"
  initialValues={{ remember: true }}
  onFinish={onFinishRegister}
>
  <Form.Item
    name="name"
    rules={[{ required: true, message: 'Хэрэглэгийн нэрээ оруулна уу!' }]}
  >
    <Input  style={{color: "#6366F1" , height: "4rem", fontSize: "50px", borderRadius: "0.5rem"}} prefix={<UserOutlined style={{fontSize: "24px"}} className="site-form-item-icon" />} placeholder="Хэрэглэгчийн нэр" />
  </Form.Item>
  <Form.Item
 name="phone_number"
 rules={[{ required: true, message: 'Утасны дугаараа оруулна уу!' }]}
>
 <Input maxLength={8}  style={{color: "#6366F1", height: "4rem", fontSize: "18px", borderRadius: "0.5rem"}} prefix={<PhoneOutlined style={{fontSize: "24px"}} className="site-form-item-icon" />} placeholder="Утасны дугаар" />
</Form.Item>
  <Form.Item
    name="email"
    rules={[{ required: true, message: 'И-Майл хаягаа оруулна уу!' }]}
  >
    <Input
    style={{color: "#6366F1", height: "4rem", fontSize: "18px", borderRadius: "0.5rem"}}
      prefix={<MailOutlined style={{fontSize: "24px"}} className="site-form-item-icon" />}
      type="email"
      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
      placeholder="И-Майл хаяг"
    />
  </Form.Item>
  <Form.Item
    name="password"
    rules={[{ required: true, message: 'Нууц үгээ оруулна уу!' }]}
  >
    <Input
    style={{color: "#6366F1", height: "4rem", fontSize: "18px", borderRadius: "0.5rem"}}
      prefix={<LockOutlined style={{fontSize: "24px"}} className="site-form-item-icon" />}
      type="password"
      placeholder="Нууц үг"
    />
  </Form.Item>
  <Form.Item
    name="confirm_password"
    rules={[{ required: true, message: 'Нууц үгээ оруулна уу!' }]}
  >
    <Input
    style={{color: "#6366F1", height: "4rem", fontSize: "18px", borderRadius: "0.5rem"}}
      prefix={<LockOutlined style={{fontSize: "24px"}} className="site-form-item-icon" />}
      type="password"
      placeholder="Нууц үг давтах"
    />
  </Form.Item>


  <Form.Item >
    <div>
      <div style={{ textAlign: "center"}}>
    <Button style={{width: "15rem", height: "3rem", backgroundColor:"#A855F7", fontSize: "16px", borderRadius: "15px", border: "none"}} type="primary"  htmlType="submit" className="login-form-button">
      Бүртгүүлэх
    </Button>
  </div>
   
     </div>
  </Form.Item>
</Form>

{/* Login modal */}

  </Modal>
  <Modal title="" visible={loginModal} footer={[]} onCancel={handleCancel}>
     <div style={{display:"flex", justifyContent: "center", fontSize: "2.25rem", marginBottom: "10px"}}>
       <div style={{marginRight: "5%", color: "#6366F1", fontWeight:"bold"}}>Нэвтрэх</div>
       
     </div>
   <Form
  name="normal_login"
  className="login-form"
  initialValues={{ remember: true }}
  onFinish={onFinishLogin}
>
  <Form.Item
    name="name"
    rules={[{ required: true, message: 'Хэрэглэгийн нэрээ оруулна уу!' }]}
  >
    <Input  style={{color: "#718096" , height: "60px", fontSize: "50px", borderRadius: "0.5rem"}} prefix={<UserOutlined style={{fontSize: "24px"}} className="site-form-item-icon" />} placeholder="Хэрэглэгчийн нэр" />
  </Form.Item>
  
  
  <Form.Item
    name="password"
    rules={[{ required: true, message: 'Нууц үгээ оруулна уу!' }]}
  >
    <Input
    style={{color: "#6366F1", height: "60px", fontSize: "18px", borderRadius: "0.5rem"}}
      prefix={<LockOutlined style={{fontSize: "24px"}} className="site-form-item-icon" />}
      type="password"
      placeholder="Нууц үг"
    />
  </Form.Item>
  


  <Form.Item >
    <div>
      <div style={{ textAlign: "center"}}>
    <Button style={{width: "15rem", height: "3rem", backgroundColor:"#A855F7", fontSize: "16px", borderRadius: "15px", border: "none"}} type="primary"  htmlType="submit" className="login-form-button">
      Нэвтрэх
    </Button>
  </div>
   <div style={{marginTop: "0.5rem"}}>
     <a href="">Нууц үг мартсан</a>
     </div>
     </div>
  </Form.Item>
</Form>
  </Modal>
  
  <Seo title='Home' />
  {/* Modals */}
  
  {/* Blocks */}
  <div style={{ width: "100%",background: "white", display: "flex", justifyContent: "space-around", alignItems: "center", position: "fixed", zIndex:"100"}}>
  {/* <Header content={content['header-light']} menuJustify='space-between' /> */}
    <div style={{ display:"flex", alignItems: "center", justifyContent: "space-around", width: "50%"}} >
      <div>
        <Image style={{marginTop: "5px"}} alt="logo" preview={false}  src={logo} />
        
      </div>
      <div ><a style={{textDecoration: "none", color: "black", fontSize: "1rem", fontFamily: "sans-serif"}} href="/">Эхлэх</a></div>
      <div ><a style={{textDecoration: "none", color: "black", fontSize: "1rem", fontFamily: "sans-serif"}} href="#pricing">Үнийн санал</a></div>
      <div ><a style={{textDecoration: "none", color: "black", fontSize: "1rem", fontFamily: "sans-serif"}} href="#tab-feature-one">Үйлчилгээ</a></div>
      <div ><a style={{textDecoration: "none", color: "black", fontSize: "1rem", fontFamily: "sans-serif"}} href="/dashboard">Dashboard</a></div>
      
     
    </div>
    <div style={{display: "flex", width: "12rem", justifyContent: "space-between", alignItems: "center"}}>
      { isLogin == false ?
      <>
      <Space size={15}>
      <Button className="log" onClick={onLogin} style={{cursor: "pointer", background: "#A855F7", border: "none", color: "white", fontSize: "14px", width:"6rem", height: "2.5rem", borderRadius: "16px"}} type="primary" >Нэвтрэх</Button>
      <Button className="log" onClick={() => onRegister()} style={{cursor: "pointer", background: "#A855F7", border: "none", color: "white", fontSize: "14px", width:"6rem", height: "2.5rem", borderRadius: "16px"}} type="primary" >Бүртгүүлэх</Button>
      </Space>
      </> : 
      <>
        <div style={{fontSize: "16px", fontWeight: "bold"}}> <UserOutlined /> {userName}</div>
        <div><Button onClick={() => onLogout()} style={{cursor: "pointer", background: "#A855F7", border: "none", color: "white", fontSize: "14px", width:"6rem", height: "2.5rem", borderRadius: "16px"}} type="primary" >Гарах</Button></div>
        </>
      }</div>
  </div>
  </div>
 )

}
export default Header;