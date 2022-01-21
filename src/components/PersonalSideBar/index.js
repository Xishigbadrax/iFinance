import React, { useEffect, useState, useContext } from "react";

import { Image, Tabs, Divider, message } from "antd";
import Auth from "../../utils/auth";
import axios from "axios";
import { useRouter } from "next/router";

const PersonalSideBar = ({ hover }) => {
  const baseUrl = process.env.NEXT_PUBLIC_URL;
  const router = useRouter();

  const Logout = async () => {
    const res = await axios.post(
      baseUrl + "logout",
      {
        jsonrpc: 2.0,
        params: {},
      },
      {
        headers: {
          "Set-Cookie": "session_id=" + Auth.getToken(),
          "Content-Type": "application/json",
        },
      }
    );

    if (res.data.error && res.data.error) {
      message.success("Амжилттай систэмээс гарлаа");
      Auth.destroyToken();
      // window.location.reload(false);
      router.push("/");
    }

    // console.log(res, "logout res");
  };
  return (
    <div className=" flex  justify-center  md:mb-[10px] ">
      <div className=" relative ">
        <div className="  shadow-lg w-[270px] h-[462px] md:mr-[30px] ml-10 rounded-[4px]">
          <div className=" flex items-center ml-[34px] mt-[34px]">
            <div className=" mr-[20px]">
              <Image preview={false} src="/img/profile.svg" />
            </div>
            <div className="text-[#2F3747] text-[18px]  font-bold">
              {Auth.getName()}
            </div>
          </div>
          <div className=" flex justify-center text-[#9CA6C0] text-[11px] font-semibold mt-[12px]">
            {/* {console.log(Auth.getUserData()?.email)} */}
            {Auth.getUserData()}
          </div>
          <Divider />
          <div className=" flex justify-center   ">
            <div className=" ">
              <div className=" flex justify-start">
                <div className=" mr-[19px]">
                  <Image
                    preview={false}
                    height={30}
                    width={30}
                    src="/img/i1.svg"
                  />
                </div>
                <div
                  className={`text-[#2E28D4]  text-[18px] font-bold  hover:opacity-100 ${
                    hover == 1 ? "opacity-100" : "opacity-50"
                  } `}
                >
                  <a href="/order" className="text-[#2E28D4]">
                    Миний захиалга
                  </a>
                </div>
              </div>
              <div className=" flex justify-start my-[20px]">
                <div className=" mr-[19px]">
                  <Image
                    preview={false}
                    height={30}
                    width={30}
                    src="/img/i2.svg"
                  />
                </div>
                <div
                  className={`text-[#2E28D4]  text-[18px] font-bold  hover:opacity-100 ${
                    hover == 2 ? "opacity-100" : "opacity-50"
                  } `}
                >
                  <a href="/cart" className="text-[#2E28D4]">
                    {" "}
                    Миний сагс
                  </a>
                </div>
              </div>
              <div className=" flex justify-start">
                <div className=" mr-[19px]">
                  <Image
                    preview={false}
                    height={30}
                    width={30}
                    src="/img/i3.svg"
                  />
                </div>
                <div
                  className={`text-[#2E28D4]  text-[18px] font-bold  hover:opacity-100 ${
                    hover == 3 ? "opacity-100" : "opacity-50"
                  } `}
                >
                  <a href="/info" className="text-[#2E28D4]">
                    {" "}
                    Миний мэдээлэл{" "}
                  </a>
                </div>
              </div>
              <div className=" flex justify-start mt-[20px]">
                <div className=" mr-[19px]">
                  <Image
                    preview={false}
                    height={30}
                    width={30}
                    src="/img/i4.svg"
                  />
                </div>
                <div
                  className={`text-[#2E28D4]  text-[18px] font-bold  hover:opacity-100 ${
                    hover == 4 ? "opacity-100" : "opacity-50"
                  } `}
                >
                  Тохиргоо
                </div>
              </div>
              <Divider />
              <div className=" flex justify-start mt-[40px]">
                <div className=" mr-[19px]">
                  <Image
                    preview={false}
                    height={30}
                    width={30}
                    src="/img/i5.svg"
                  />
                </div>
                <div
                  onClick={Logout}
                  className="text-[#F01A63] opacity-50 text-[18px] cursor-pointer font-bold hover:opacity-100"
                >
                  Гарах
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PersonalSideBar;
