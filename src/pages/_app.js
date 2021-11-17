import React from "react";
import "../../styles/globals.css";
import "tailwindcss/tailwind.css";
import "antd/dist/antd.css";
import Head from "next/head";
import { ContextProvider } from "../context/Context";
import Auth from "../utils/auth";
import Router from "next/router";

function MyApp({ Component, pageProps }) {
 
  return (

    <ContextProvider>
       <Component {...pageProps} /> 
    </ContextProvider>
  );
}

export default MyApp;
