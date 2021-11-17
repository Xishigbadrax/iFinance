import React from 'react'
import styles from '../../styles/Home.module.css'
import Navbar from '../components/Navbar/navbar'
import Auth from '../utils/auth'

export default function Home() {
  console.log(Auth.getToken(), "token bnuuu");
  return (
    <div>
        <Navbar />
    </div>
  )
}
