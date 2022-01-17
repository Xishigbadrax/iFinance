import React from "react";
import "../../styles/globals.css";
import "../../styles/tailwind.css";
import "antd/dist/antd.css";
import Head from "next/head";
import { ContextProvider } from "../context/Context";
import Auth from "../utils/auth";
import Router from "next/router";
import MessengerCustomerChat from "react-messenger-customer-chat";
import { ThemeProvider } from "next-themes";

function MyApp({ Component, pageProps }) {
  return (
    <ContextProvider>
      <ThemeProvider enableSystem={true} attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>

      {/* <MessengerCustomerChat
        pageId="<PAGE_ID>"
        appId="<APP_ID>"
       
      /> */}
    </ContextProvider>
  );
}

export default MyApp;
