import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { graphql } from 'gatsby'
import { Container } from 'theme-ui'
import Layout from '@solid-ui-layout/Layout'
import Seo from '@solid-ui-components/Seo'
import Divider from '@solid-ui-components/Divider'
import ModalWithTabs from '@solid-ui-blocks/Modal/Block01'
import ModalSimple from '@solid-ui-blocks/Modal/Block02'
import Header from '@solid-ui-blocks/Header/Block01'
import Tabs from '@solid-ui-components/Tabs'
import Hero from '@solid-ui-blocks/Hero/Block01'
import FeatureOne from '@solid-ui-blocks/FeaturesWithPhoto/Block02'
import FeatureTwo from '@solid-ui-blocks/FeaturesWithPhoto/Block05'
import FeatureThree from '@solid-ui-blocks/FeaturesWithPhoto/Block01'
import Features from '@solid-ui-blocks/Features/Block02'
import Screenshot from '@solid-ui-blocks/FeaturesWithPhoto/Block03'
import Process from '@solid-ui-blocks/Features/Block03'
import Testimonials from '@solid-ui-blocks/Testimonials/Block03'
import Companies from '@solid-ui-blocks/Companies/Block01'
import Pricing from '@solid-ui-blocks/Pricing/Block02'
import Stats from '@solid-ui-blocks/Stats/Block01'
import Faq from '@solid-ui-blocks/Faq/Block01'
import Blog from '@solid-ui-blocks/Blog/Block01'
import Footer from '@solid-ui-blocks/Footer/Block01'
import {ContextProvider} from '../../../../context/Context';
import { normalizeBlockContentNodes } from '@blocks-helpers'
import theme from './_theme'
import styles from './_styles'
import Context from '../../../../context/Context';
import { Button, Image, Modal } from 'antd';
import "tailwindcss/tailwind.css"
import logo from "./assets/logos.png";
import { Form, Input, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';


const HomePage = props => {
  const { allBlockContent } = props.data
  // console.log(props.data, "propsss")
  const content = normalizeBlockContentNodes(allBlockContent?.nodes)

  const [registerModal, setRegisterModal] = useState(false);

  
    const onFinish = (values) => {
      console.log('Received values of form: ', values);
    };
    const handleCancel = () => {
      setRegisterModal(false);
    }
    const onRegister = () => {
      setRegisterModal(true);
    }

    <Modal
      visible={registerModal}
      title="Мэдээлэл"
      onCancel={handleCancel}
      footer={[]}
      >
      <div>
      <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your Username!' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <a href="">register now!</a>
      </Form.Item>
    </Form>
</div>
</Modal>
  
  return (
    
    <Layout theme={theme} {...props}>
      <ContextProvider>
      <Seo title='Home' />
      {/* Modals */}
      <ModalWithTabs content={content['authentication']} reverse />
      <ModalWithTabs content={content['contact']} />
      <ModalSimple content={content['advertisement']} />
      {/* Blocks */}
      <div style={{ width: "100%",background: "white", display: "flex", justifyContent: "space-around", alignItems: "center", position: "fixed", zIndex:"100", paddingTop: "1%"}}>
      {/* <Header content={content['header-light']} menuJustify='space-between' /> */}
        <div style={{ display:"flex", alignItems: "center", justifyContent: "space-around", width: "50%"}} >
          <div>
            <Image alt="logo" preview={false} src={logo} />
            
          </div>
          <div ><a style={{textDecoration: "none", color: "black"}} href="#hero">Эхлэл</a></div>
          <div ><a style={{textDecoration: "none", color: "black"}} href="#pricing">Үнийн санал</a></div>
          <div ><a style={{textDecoration: "none", color: "black"}} href="#tab-feature-one">Үйлчилгээ</a></div>
        </div>
        <div>
          <Button onClick={onRegister} style={{cursor: "pointer", background: "#A855F7", border: "none", color: "white", fontSize: "14px", width:"5rem", height: "2.5rem", borderRadius: "16px", marginRight: "1rem"}} type="primary" >Нэвтрэх</Button>
          <Button onClick={() => onRegister()} style={{cursor: "pointer", background: "#A855F7", border: "none", color: "white", fontSize: "14px", width:"6rem", height: "2.5rem", borderRadius: "16px"}} type="primary" >Бүртгүүлэх</Button>
        </div>
      </div>
      <Divider space='5' />
      <Container variant='full' sx={styles.heroContainer}>
        <Hero content={content['hero']} reverse />
      </Container>
      <Divider space='5' />
      <Divider space='5' />
      <Divider space='5' />
      <Container variant='wide' sx={styles.tabsContainer}>
        <Tabs space={5}>
          <FeatureOne content={content['tab-feature-one']} />
          <FeatureTwo content={content['tab-feature-two']} />
          <FeatureThree content={content['tab-feature-three']} />
        </Tabs>
      </Container>
      <Divider space='5' />
      <Divider space='5' />
      <Divider space='5' />
      <Container variant='wide' sx={styles.tabsContainer}>
        <Tabs space={3} variant='dots' position='bottom' arrows>
          <Screenshot content={content['screenshot-one']} />
          <Screenshot content={content['screenshot-two']} />
          <Screenshot content={content['screenshot-three']} />
        </Tabs>
      </Container>
      <Divider space='5' />
      <Divider space='5' />
      <Divider space='5' />
      {/* <Process content={content['process']} /> */}
      <Divider space='5' />
      <Container variant='full' sx={styles.featuresContainer}>
        <Features content={content['features']} />
      </Container>
      <Divider space='5' />
      <Container variant='full' sx={styles.socialProofContainer}>
        <Divider space='5' />
        <Divider space='5' />
        <Container variant='narrow'>
          <Stats content={content['stats']} />
          <Divider space='5' />
        </Container>
        {/* <Testimonials content={content['testimonials']} /> */}
        <Divider space='5' />
      </Container>
      <Divider space='5' />
      <Divider space='5' />
      <Pricing content={content['pricing']} />
      <Divider space='5' />
      <Companies content={content['companies']} />
      <Divider space='5' />
      <Container variant='narrow'>
        <Faq content={content['faq']} />
      </Container>
      <Divider space='5' />
      <Divider space='5' />
      {/* <Blog content={content['latest-blogs']} /> */}
      <Divider space='5' />
      <Footer content={content['footer']} />
      </ContextProvider>
    </Layout>
   
  )
}




export const query = graphql`
  query miscIndexBlockContent {
    allBlockContent(filter: { page: { in: ["homepage/saas-v2", "shared"] } }) {
      nodes {
        ...BlockContent
      }
    }
  }
  
`
export default HomePage

