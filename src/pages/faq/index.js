import React, {useState, useEffect} from "react";
import NavbarTrans from "../../components/NavbarTrans";
import Footer from "../../components/Footer";
import { Image, Collapse, Button } from "antd";
import Auth from "../../utils/auth";
import axios from "axios";
import Head from "next/head";

const Faq = () => {
    const { Panel } = Collapse;
    const [open, setOpen] = useState([]);
    const [data, setData] = useState(null);
    const baseUrl = process.env.NEXT_PUBLIC_URL;

    const onChange = (itemIndex) => {
      if (open.includes(itemIndex)) {
        for (let i = 0; i < open.length; i++) {
          if (open[i] === itemIndex) {
            open.splice(i, 1)
          }
        }

        setOpen(open)
      } else {
        setOpen((prev) => [...prev, itemIndex])
      }
    }

    useEffect(async () => {
      
      const res = await axios.post(
        baseUrl + "get/faq",
        {
          jsonrpc: 2.0,
          params: {
          
          },
        },
  
        {
          headers: {
            "Set-Cookie": "session_id=" + Auth.getToken(),
            "Content-Type": "application/json",
          },
        }
      );

      console.log(res, "faq res");
        setData(res?.data?.result);

        res?.data?.result.map((item, index) => {
          setOpen((prev) => [...prev, index])
        })
    }, []);
  
    return <div>
       <Head>
        <title>iFinance | FAQ</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
        <div className="relative  w-full">
        <div id="head" className=" absolute z-20 flex flex-col w-full h-full">
          <div className="w-full flex justify-center">
            <NavbarTrans  />
          </div>
          <div className=" hidden  md:flex w-full justify-center  items-center lg:mt-[30px] 2xl:mt-[100px]">
            <div>
              <div className=" text-[16px]  md:text-[36px] md:text-white font-poppins-semibold uppercase">
              Түгээмэл асуулт хариулт
              </div>
            </div>
          </div>
        </div>
        <div className=" 2xl:h-[347px] overflow-hidden ">

        <Image className=" w-[100vw]" preview={false} src="/img/Slider.svg" />
        </div>
      </div>
      <div className=" flex justify-center flex-col items-center my-[100px] ">
        {data?.map((item,index) => {
          

          

         return  <Collapse
            onChange={() => onChange(index)}
            expandIcon={() => (open.includes(index) ? <div><Image preview={false} className=" " src="/img/plus.svg" /></div> : <div> <Image preview={false} src="/img/plus2.svg" /></div>)}
            expandIconPosition="right"
            className="custom-collapse lg:w-[73.125rem] w-[300px] md:w-[600px] bg-white border-none  mb-2"
          >
            <Panel header={item.question} key="1" className=" shadow-md">
              <p className=" font-semibold text-[16px]">{item.question}</p>
              <div dangerouslySetInnerHTML={{__html: item.answer}} className=" text-[14px] text-[#9CA6C0]">
               
              </div>
              {/* <div className=" flex justify-center">
                <Button
                  className=" w-[14.75rem] h-[3rem] rounded-[43px] bg-gradient-to-r from-[#2E28D4] to-[#AC27FD] font-bold text-[14px]"
                  type="primary "
                >
                  Үйлчилгээтэй танилцах
                </Button>
              </div> */}
            </Panel>
          </Collapse>
        })}
        </div>
        <div>
            <Footer />


        </div>
    </div>  
}

export default Faq;