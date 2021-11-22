import React from 'react'
import styles from '../../styles/Home.module.css'
import Navbar from '../components/Navbar/navbar'
import Auth from '../utils/auth'
import Footer from '../components/Footer'
import { Image } from 'antd'

export default function Home() {
  
  return (
    <div >
        <Navbar />
        <div className=" w-full flex justify-center mt-[100px]  items-center h-[35vh]">
        <Image preview={false} src="/img/soon.svg" />
        </div>
        <Footer />
    </div>
  )
}
