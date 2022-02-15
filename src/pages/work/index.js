import React, { useEffect, useState } from "react";
import NavbarTrans from "../../components/NavbarTrans";
import Footer from "../../components/Footer";
import { Image, Tabs, Button, Modal, Input, message } from "antd";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Head from "next/head";
import Auth from "../../utils/auth";
import axios from "axios";

const Work = () => {
  const [darkMode, setDarkMode] = useState(null);
  const [modal, setModal] = useState(false);
  const baseUrl = process.env.NEXT_PUBLIC_URL;
  const { TabPane } = Tabs;
  const [data, setData] = useState();
  const [workId, setWorkId] = useState();
  const [selectedFile, setSelectedFile] = useState(null);
  const [userName, setUserName] = useState("");
  var file = null;
  var base64URL = "";
  const settings = {
    arrows: true,
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1900,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const onFileChange = (event) => {
    // Update the state
    setSelectedFile(event.target.files[0]);
  };
  const onFileUpload = () => {
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append(
      "myFile",
      this.state.selectedFile,
      this.state.selectedFile.name
    );
  };
  const onShow = () => {
    setModal(true);
  };
  const getBase64 = (file) => {
    return new Promise((resolve) => {
      let fileInfo;
      let baseURL = "";
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        console.log("Called", reader);
        baseURL = reader.result;
        console.log(baseURL);
        resolve(baseURL);
      };
      console.log(fileInfo);
    });
  };

  const handleFileInputChange = (e) => {
    console.log(e.target.files[0]);

    file = e.target.files[0];

    getBase64(file)
      .then((result) => {
        file["base64"] = result;
        console.log("File Is", file);

        (base64URL = result), file;
      })
      .catch((err) => {
        console.log(err);
      });

    file = e.target.files[0];
  };

  const onSend = async () => {
    // console.log(file?.base64, "aliw");
    // console.log(userName, "nerr");
    const res = await axios.post(
      baseUrl + "send/employment_info",
      {
        jsonrpc: 2.0,
        params: {
          name: userName,
          anket: file?.base64,
          employment_id: workId,
        },
      },

      // .post(`/mails/users/sendVerificationMail`, null, { params: {
      //   mail,
      //   firstname
      // }})

      {
        headers: {
          "Set-Cookie": "session_id=" + Auth.getToken(),
          "Content-Type": "application/json",
        },
      }
    );
    res?.data?.result == true
      ? message.success("Амжилттай явлаа")
      : message.warning("Амжилтгүй");
    console.log(res, "ajil ");
  };
  const handleCancel = () => {
    setModal(false);
  };
  const fileData = () => {
    if (selectedFile) {
      return (
        <div>
          <h2>File Details:</h2>
          <p>File Name: {selectedFile.name}</p>
          <p>File Type: {selectedFile.type}</p>
          <p>Last Modified: {selectedFile.lastModifiedDate.toDateString()}</p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  };
  useEffect(async () => {
    const res = await axios.post(
      baseUrl + "get/employment_info",
      {
        jsonrpc: 2.0,
        params: {},
      },

      // .post(`/mails/users/sendVerificationMail`, null, { params: {
      //   mail,
      //   firstname
      // }})

      {
        headers: {
          "Set-Cookie": "session_id=" + Auth.getToken(),
          "Content-Type": "application/json",
        },
      }
    );
    setData(res?.data?.result);
    setWorkId(res?.data?.result[0]?.id);
    console.log(res, "ajil ");
  }, []);
  useEffect(async () => {
    console.log(selectedFile, "filee ");
  }, [selectedFile]);
  return (
    <div>
      <Head>
        <title>iFinance | Нээлттэй ажлын байр</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="relative  w-full dark:bg-[#172757] ">
        <div id="head" className=" absolute z-20 flex flex-col w-full h-full">
          <div className="w-full flex justify-center">
            <NavbarTrans darkaa={setDarkMode} />
          </div>
          <div className=" hidden  md:flex w-full justify-center  items-center lg:mt-[30px] 2xl:mt-[100px]">
            <div>
              <div className=" text-[16px]  md:text-[36px] md:text-white font-poppins-semibold uppercase">
                Нээлттэй ажлын байр
              </div>
            </div>
          </div>
        </div>
        <div className=" 2xl:h-[347px] overflow-hidden ">
          {darkMode == "dark" ? (
            <Image
              className="w-[100vw]"
              preview={false}
              src="/img/darkPro.svg"
            />
          ) : (
            <Image
              className="w-[100vw]"
              preview={false}
              src="/img/Slider.svg"
            />
          )}
          {/* <Image className=" w-[100vw]" preview={false} src="/img/Slider.svg" /> */}
        </div>
      </div>
      <div className="bg-[#9CA6C0] bg-opacity-10 relative pt-[60px] pb-[100px] dark:bg-[#172757] ">
        <div className=" dark:text-white text-[24px] flex justify-center test font-bold text-center">
          Сонгон шалгаруулалтын дараалал
        </div>
        <div className=" flex justify-center">
          <div className=" flex lg:flex-row flex-col mt-[110px] 2xl:w-[1170px] lg:w-[1150px] justify-between">
            <div className=" relative w-[270px] h-[200px] bg-white dark:bg-opacity-20 flex justify-center rounded-[4px]">
              <div className=" w-[100px] h-[100px] dark:bg-[#172757] bg-[#F5F6F9]  rounded-[50px] absolute top-[-20%] ayguu flex justify-center items-center ">
                <div className=" dark:bg-gradient-to-tr from-[#3C8CE7] to-[#00EAFF] text-white text-[24px] font-bold w-[80px] h-[80px] work  rounded-[50px] ayguu flex justify-center items-center ">
                  01
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className=" text-[#000000] text-[18px] font-bold dark:text-white">
                  Анкет хүлээн авах
                </div>
                <div className=" absolute bottom-0  w-[160px] h-[5px] bg-[#2E28D4] dark:bg-[#3C8CE7]"></div>
              </div>
            </div>
            <div className=" my-[40px] lg:my-0 relative w-[270px] h-[200px] bg-white dark:bg-opacity-20 flex justify-center rounded-[4px]">
              <div className=" w-[100px] h-[100px] dark:bg-[#172757] bg-[#F5F6F9]  rounded-[50px] absolute top-[-20%] ayguu flex justify-center items-center ">
                <div className=" dark:bg-gradient-to-tr from-[#3C8CE7] to-[#00EAFF] text-white text-[24px] font-bold w-[80px] h-[80px] work  rounded-[50px] ayguu flex justify-center items-center ">
                  02
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className=" text-[#000000] text-center w-[200px]  text-[18px] font-bold dark:text-white">
                  Ажлын ярилцлага уулзалт
                </div>
                <div className=" absolute bottom-0  w-[160px] h-[5px] bg-[#2E28D4] dark:bg-[#3C8CE7]"></div>
              </div>
            </div>
            <div className=" relative w-[270px] h-[200px] bg-white dark:bg-opacity-20 flex justify-center rounded-[4px]">
              <div className=" w-[100px] h-[100px] dark:bg-[#172757] bg-[#F5F6F9]  rounded-[50px] absolute top-[-20%] ayguu flex justify-center items-center ">
                <div className=" dark:bg-gradient-to-tr from-[#3C8CE7] to-[#00EAFF] text-white text-[24px] font-bold w-[80px] h-[80px] work  rounded-[50px] ayguu flex justify-center items-center ">
                  03
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className=" text-[#000000] text-[18px] text-center w-[200px]   font-bold dark:text-white">
                  Ажилд авах эсэх шийдвэр
                </div>
                <div className=" absolute bottom-0  w-[160px] h-[5px] bg-[#2E28D4] dark:bg-[#3C8CE7]"></div>
              </div>
            </div>
            <div className=" my-[40px] lg:my-0 relative w-[270px] h-[200px] bg-white dark:bg-opacity-20 flex justify-center rounded-[4px]">
              <div className=" w-[100px] h-[100px] dark:bg-[#172757] bg-[#F5F6F9]  rounded-[50px] absolute top-[-20%] ayguu flex justify-center items-center ">
                <div className=" dark:bg-gradient-to-tr from-[#3C8CE7] to-[#00EAFF] text-white text-[24px] font-bold w-[80px] h-[80px] work  rounded-[50px] ayguu flex justify-center items-center ">
                  04
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className=" text-[#000000] text-[18px] font-bold dark:text-white">
                  Эргээд холбогдох
                </div>
                <div className=" absolute bottom-0  w-[160px] h-[5px] bg-[#2E28D4] dark:bg-[#3C8CE7]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" w-full flex justify-center dark:bg-[#08194B]">
        <div>
          <div className=" dark:text-white text-[24px] text-[#000000] font-bold flex justify-center pt-[80px]">
            Нээлттэй ажлын байр
          </div>
          <div className=" w-full mt-[40px]">
            <div className=" flex justify-center ">
              <div className=" w-[250px]  lg:w-[85vw] max-w-[1326px]">
                <Slider className=" " {...settings}>
                  {data?.map((item, index) => {
                    if (item.id == workId) {
                      return (
                        <div key={index}>
                          <div className=" dark:bg-gradient-to-tr from-[#3C8CE7] to-[#00EAFF] px-2 text-center text-[18px] font-bold cursor-pointer  work text-white bg-[#9CA6C0] bg-opacity-20 mx-[30px] h-[60px] flex justify-center items-center rounded-[4px]">
                            {item.name}
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <div onClick={() => setWorkId(item.id)} key={index}>
                          <div className=" dark:hover:bg-gradient-to-tr from-[#3C8CE7] to-[#00EAFF] dark:text-white text-center px-2 text-[#2F3747] hover:opacity-100 opacity-60 text-[18px] font-bold cursor-pointer hover:bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD] hover:text-white bg-[#9CA6C0] bg-opacity-20 mx-[30px] h-[60px] flex justify-center items-center rounded-[4px]">
                            {item.name}
                          </div>
                        </div>
                      );
                    }
                  })}
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" flex justify-center pb-[100px] px-[8px] lg:px-0 dark:bg-[#08194B] ">
        <div className=" w-[970px] max-h-[941px] shadow-md mt-[40px] dark:bg-[#172757]">
          {data?.map((item, index) => {
            if (workId == item.id) {
              return (
                <div className=" m-[30px] relative">
                  <div className=" flex justify-between ">
                    <div className=" dark:text-[#00EAFF] w-1/3 text-[#2E28D4] text-[20px] font-bold">
                      {item.name}
                    </div>
                    <div className=" flex  justify-end  w-full">
                      <div className=" flex mr-[25px]">
                        <div>
                          {" "}
                          <Image
                            className=" opacity-40"
                            preview={false}
                            src="/img/clock.svg"
                          />
                        </div>
                        <div className=" ml-[10px] opacity-40 ">
                          {/* 04:00 */}
                          {item?.posted_date.slice(11, 16)}
                        </div>
                      </div>
                      <div className=" flex">
                        <div>
                          {" "}
                          <Image
                            className=" opacity-40"
                            preview={false}
                            src="/img/calendar.svg"
                          />
                        </div>
                        <div className=" ml-[10px] opacity-40">
                          {/* 04:00 */}
                          {item?.posted_date.slice(0, 10)}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className=" mt-[30px] dark:text-white"
                    dangerouslySetInnerHTML={{ __html: item.job_description }}
                  ></div>
                  <div className=" absolute top-[0%] left-[15%] opacity-40">
                    <Image preview={false} src="/img/work.svg" />
                  </div>
                  <div className="">
                    <Contact />
                  </div>
                  <div className=" flex justify-center mt-[50px]">
                    <Button
                      onClick={() => onShow()}
                      type="primary"
                      className=" w-[236px] h-[48px] rounded-[43px] bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD] border-none text-[14px] font-bold"
                    >
                      Анкет илгээх
                    </Button>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>

      <div>
        <Footer />
      </div>
      <Modal
        title=""
        footer={[]}
        className="workModal"
        visible={modal}
        onCancel={handleCancel}
      >
        <div>
          <div>
            <Image src="/img/logo.png" />
          </div>
          <div>
            <Input onChange={(e) => setUserName(e.target.value)} />
          </div>
          {/* <div>
            <h1>GeeksforGeeks</h1>
            <h3>File Upload using React!</h3>
            <div>
              <input type="file" onChange={onFileChange} />
              <button onClick={onFileUpload}>Upload!</button>
            </div>
            {fileData()}
          </div> */}
          <div>
            <input type="file" name="file" onChange={handleFileInputChange} />
          </div>
          <div className=" flex justify-center mt-[50px]">
            <Button
              onClick={() => onSend()}
              type="primary"
              className=" w-[236px] h-[48px] rounded-[43px] bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD] border-none text-[14px] font-bold"
            >
              илгээх
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Work;

const Contact = () => {
  return (
    <div>
      <div className=" text-[#2F3747] text-[18px] font-bold dark:text-white">
        Холбоо барих
      </div>
      <div className="  justify-center    flex   items-center lg:h-[89px]">
        <div className="  flex flex-col pt-4 pb-4 xl:justify-around xl:w-[60vw] md:w-[80vw] md:justify-between  md:flex-row xl:flex-row xl:pt-0 xl:pb-0 max-w-[1920px]">
          <div className=" flex items-center">
            <div className="flex items-center mr-2">
              <Image preview={false} src="/img/call.svg" />
            </div>
            <div
              className=" text-black text-[16px] dark:text-white"
              style={{
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "19px",
                opacity: 0.7,
              }}
            >
              <strong>Утас:</strong>
              <br /> +976 72707007
            </div>
          </div>
          <div className=" flex items-center my-3 xl:mx-[95px] ">
            <div className="flex items-center mr-2">
              <Image preview={false} src="/img/mail.svg" />
            </div>
            <div
              className=" text-black text-[16px]  w-[110px] dark:text-white"
              style={{
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "19px",
                opacity: 0.7,
              }}
            >
              <strong>Имэйл хаяг:</strong> info@ifinance.mn
            </div>
          </div>
          <div className=" flex items-center ">
            <div className="flex items-center mr-2">
              <Image preview={false} src="/img/address.svg" />
            </div>
            <div
              className=" text-black text-[16px] w-[200px] xl:w-[274px] md:w-[300px] dark:text-white"
              style={{
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "19px",
                opacity: 0.7,
              }}
            >
              <strong>Хаяг:</strong> Реженси Ресидэнс, 16 Олимпын гудамж, 14220,
              Улаанбаатар хот, Монгол улс
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
