import React from "react";

import "../../styles/tailwind.css";
import "antd/dist/antd.css";
import "../../styles/globals.css";
import Head from "next/head";
import { ContextProvider } from "../context/Context";
import Auth from "../utils/auth";
import Router from "next/router";
import MessengerCustomerChat from "react-messenger-customer-chat";
import { ThemeProvider } from "next-themes";
import "../../styles/fonts/stylesheet.css";





function MyApp({ Component, pageProps }) {
    
  return (
    <ContextProvider>
      <ThemeProvider enableSystem={true} attribute="class">
        <Component {...pageProps} />
      <MessengerCustomerChat
        pageId="251653536754659"
        appId="516247196361202"
       
      />
      </ThemeProvider>

    </ContextProvider>
  );
}

export default MyApp;
