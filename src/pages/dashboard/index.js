import React, { useState, useEffect, useContext } from "react";
import Navbar from "../../components/Navbar/navbar";
import Router from "next/router";
import Auth from "../../utils/auth";
import { Image, Collapse, Button } from "antd";
import axios from "axios";
import Context from "../../context/Context";
import Footer from "../../components/Footer";
import {useRouter} from 'next/router';

const Dashboard = () => {
  const { Panel } = Collapse;
  const router = useRouter();
  const [sid, setSid] = useState();
  const [list, setList] = useState([]);
  const [serverType, setServerType] = useState([]);

  useEffect(async () => {
    // console.log(Auth.getToken(), "siddd");
    setSid(Auth.getToken());
    // Auth.getToken() == null || Auth.getToken() == undefined
    //   ? Router.push("/")
    //   : null;

    const res = await axios.post(
      "http://192.168.1.15/api/get/category_list",
      {
        jsonrpc: 2.0,
        params: {},
      },

      {
        headers: {
          "Set-Cookie": "session_id=" + sid,
          "Content-Type": "application/json",
        },
      }
    );
    setList(res.data.result);

    const res2 = await axios.post(
      "http://192.168.1.15/api/get/server_types",
      {
        jsonrpc: 2.0,
        params: {},
      },

      {
        headers: {
          "Set-Cookie": "session_id=" + sid,
          "Content-Type": "application/json",
        },
      }
    );
    setServerType(res2.data.result);
    console.log(res2, "Res2222");
    // console.log(res, "listtttt");
  }, []);

  const onCategory =  (id) => {
    id &&
      router.push({
        pathname: `dashboard/${id}`,
        query: {
          id: id,
        },
      });
  };
  console.log(list, "odooo");

  return (
    <div>
      {/* <div className=" relative w-full">
        <img className=" absolute w-full h-auto z-[-1]" src="/img/Slider.svg" /> */}

        <Navbar />
      {/* </div> */}

      <div className=" w-full flex justify-center mt-10 z-[-1]">
        <div className=" grid grid-cols-4 gap-4 ">
          {list &&
            list.map((item, index) => {
              return (
                <div
                  key={index}
                  onClick={() => onCategory(item.category_id)}
                  className=" relative flex flex-col justify-center items-center w-[16.875rem] h-[16rem] border-[1px] hover:bg-gradient-to-r from-[#011F70] to-[#AC27FD]  text-[24px] hover:text-white font-semibold rounded-[4px] cursor-pointer text-[#2E28D4] border-[#2E28D4] "
                >
                  <div className=" absolute bottom-[0rem] right-[1rem] text-[#AC27FD]  text-[120px] text-opacity-5">
                    {item.category_id + "."}
                  </div>
                  <Image
                    preview={false}
                    className="z-10"
                    src={"data:image/png;base64," + item.category_image}
                  />
                  <p className="z-10"> {item.category_name} </p>
                </div>
              );
            })}
        </div>
      </div>
      <div className="flex justify-center">
        <p className=" text-[24px] font-semibold mt-[6.25rem]">
          Сервер байршуулах сонголт
        </p>
      </div>

      <div className=" w-full flex flex-col justify-center">
        {serverType &&
          serverType.map((item, index) => {
            return (
              <div className=" flex justify-center">
                <Collapse
                  accordion
                  expandIconPosition="right"
                  className=" w-[73.125rem] bg-white  border-[#2E28D4]  mb-2"
                >
                  <Panel header={item.name} key="1">
                    <p className=" font-semibold text-[16px]">{item.head}</p>
                    <p className=" text-[14px] text-[#9CA6C0]">{item.body}</p>
                    <div className=" flex justify-center">
                      <Button
                        className=" w-[14.75rem] h-[3rem] rounded-[43px] bg-gradient-to-r from-[#2E28D4] to-[#AC27FD] font-bold text-[14px]"
                        type="primary f"
                      >
                        Үйлчилгээтэй танилцах
                      </Button>
                    </div>
                  </Panel>
                </Collapse>
              </div>
            );
          })}
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
