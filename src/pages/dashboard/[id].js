import React from "react";
import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import Auth from "../../utils/auth";
import axios from "axios";
import Context from "../../context/Context";
import Navbar from "../../components/Navbar/navbar";
import Footer from "../../components/Footer";
import { Tabs, Image } from "antd";

const CategoryId = () => {
  const router = useRouter();
  const { id } = router.query;
  const { sessionId } = useContext(Context);
  const { TabPane } = Tabs;
  const baseUrl = process.env.NEXT_PUBLIC_URL;
    const baseDB = process.env.NEXT_PUBLIC_DB;

  const [mainProduct, setMainProduct] = useState();
  const [images, setImages] = useState();

  const fetchData = async () => {
    const res = await axios.post(
      baseUrl + "get/product_list_by_category",
      {
        jsonrpc: 2.0,
        params: {
          db: baseDB,
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
    
    res.data && setMainProduct(res.data.result.main_products);
    console.log(res, sessionId, "medeenuud");
    

  };
  // fetchData();

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <div>
      <Navbar />
      <div className=" pl-[375px] z-10">
        <Tabs defaultActiveKey="1">
          <TabPane className="mainTab" tab="Үндсэн модуль" key="1">
            <div className=" mt-[80px]">
              <div className="bg-gradient-to-r from-[#2E28D4] to-[#AC27FD] w-[375px] h-[48px] flex items-center  rounded-t-lg ">
                <p className=" pl-[24px] text-[18px] pt-[12px] text-white mb-2">
                  Ангилал
                </p>
              </div>
              <Tabs className="module" tabPosition="left">
                {mainProduct &&
                  mainProduct.map((item, index) => {
                    return (
                      <TabPane
                        className="test"
                        tab={  <div className="flex items-center ">
                            {<Image className="" preview={false} src={"data:image/png;base64," + item.product_icon}/>}
                          <div className="ml-[22px]">{item.product_name}</div>
                        </div>  }
                        key={index}
                      >
                        <div className="w-[770px] shadow-custom rounded mb-[40px] mt-[10px] p-[30px] ">
                        <div><Image preview={false} src={"data:image/png;base64," + item.product_images[2]}/></div>
                          <p> {item.product_description} </p>
                          <div className="flex">
                         <div><Image  preview={false} src={"data:image/png;base64," + item.product_images[0]}/></div>
                          <div><Image preview={false} src={"data:image/png;base64," + item.product_images[1]}/></div>
                          </div>
                        </div>
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
