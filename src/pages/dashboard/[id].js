import React from "react";
import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import Auth from "../../utils/auth";
import axios from "axios";
import Context from "../../context/Context";
import Navbar from "../../components/Navbar/navbar";
import Footer from "../../components/Footer";
import { Tabs } from "antd";

const CategoryId = () => {
  const router = useRouter();
  const { id } = router.query;
  const { sessionId } = useContext(Context);
  const { TabPane } = Tabs;

  const [mainProduct, setMainProduct] = useState();

  const fetchData = async () => {
    const res = await axios.post(
      "http://192.168.1.15/api/get/product_list_by_category",
      {
        jsonrpc: 2.0,
        params: {
          category_id: id,
        },
      },

      {
        headers: {
          "Set-Cookie": "session_id=" + sessionId,
          "Content-Type": "application/json",
        },
      }
    );
    // res.data && setMainProduct(res.data.result.main_products);
    console.log(res, sessionId, "medeenuud");
  };
  // fetchData();

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <div>
      <Navbar />
      <div className=" pl-[375px]">
        <Tabs defaultActiveKey="1">
          <TabPane tab="Үндсэн модуль" key="1">
            <div className=" ">
              <div className="bg-gradient-to-r from-[#2E28D4] to-[#AC27FD] w-[370px] h-[48px] flex items-center  rounded-t-lg">
                <p className=" pl-[24px] text-[18px] pt-[12px] text-white ">Ангилал</p>
              </div>
              <Tabs className="module" tabPosition="left">
                {mainProduct &&
                  mainProduct.map((item, index) => {
                    return (
                      <TabPane
                        // className="test"
                        tab={item.product_name}
                        key={index}
                      >
                        <div className="">{item.product_description}</div>
                      </TabPane>
                    );
                  })}
              </Tabs>
            </div>
          </TabPane>
          <TabPane tab="Нэмэлт модуль" key="2">
            Нэмэлт модуль
          </TabPane>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default CategoryId;
