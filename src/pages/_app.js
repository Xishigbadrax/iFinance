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
import "react-perfect-scrollbar/dist/css/styles.css";

function MyApp({ Component, pageProps }) {
  return (
    <ContextProvider>
      <ThemeProvider enableSystem={true} attribute="class">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />
        </Head>
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
