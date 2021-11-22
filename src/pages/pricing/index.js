import React, { useState, useEffect, useContext } from "react";
import Navbar from "../../components/Navbar/navbar";
import { Skeleton, Switch, Card, Avatar, Checkbox, Button, Image } from "antd";
import Router from "next/router";
import Auth from "../../utils/auth";

import axios from "axios";
import Context from "../../context/Context";

const Pricing = () => {
  const { Meta } = Card;
  const [sid, setSid] = useState();
  const [numberOfUser, setNumberOfUser] = useState(0);
  const [costOfNumber, setCostOfNumber] = useState(0);
    const [data, setData] = useState();


  useEffect(async () => {
    // console.log(Auth.getToken(), "siddd");
    setSid(Auth.getToken());
    // Auth.getToken() == null || Auth.getToken() == undefined
    //   ? Router.push("/")
    //   : null;

    const res = await axios.post(
      "http://192.168.1.15/api/get/product_list_by_category",
      {
        jsonrpc: 2.0,
        params: {
            category_id: 4
        },
      },

      {
        headers: {
          "Set-Cookie": "session_id=" + sid,
          "Content-Type": "application/json",
        },
      }
    );
    setData(res.data.result)
    console.log(res, "listtttt");
  }, []);

  return (
    <div>
      <Navbar />
      <div className=" flex  w-full justify-center">
        <div className="  w-[70%] ">
          <div>
            <p className=" border-l-2 border-[#2E28D4] text-[#2E28D4] pl-2 text-[24px] font-semibold ">
              Хэрэглэгчийн тоо
            </p>
          </div>
          <div className=" flex items-center  ">
            <div className=" flex items-center w-[9.375rem] h-[3rem] bg-[#9CA6C080] bg-opacity-50 justify-around rounded-[4px] ">
              <div
                className="cursor-pointer"
                onClick={() => setNumberOfUser(numberOfUser - 1)}
              >
                <Image preview={false} src="/img/minus.png" />
              </div>
              <div>{numberOfUser}</div>
              <div
                className="cursor-pointer"
                onClick={() => setNumberOfUser(numberOfUser + 1)}
              >
                <Image preview={false} src="/img/add.png" />
              </div>
            </div>
            <div className=" ml-2 text-[16px] font-semibold">
              ${costOfNumber} USD/user/month
            </div>
          </div>

          <div className=" mt-[1.875rem]">
            <div className=" flex text-[1.5rem] text-white items-center w-[48.125rem] h-[3.875rem] rounded-t-lg bg-gradient-to-r from-[#2E28D4] to-[#AC27FD] ">
              1. ББСБ Зээлийн модуль
            </div>
            <div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
