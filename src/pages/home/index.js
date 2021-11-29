import React from "react";
import NavbarTrans from "../../components/NavbarTrans";
import Footer from "../../components/Footer";
import { Button, Image, Divider } from "antd";

const Home = () => {
  return (
    <div>
      <div className="relative w-[vw]">
        <div id="head" className="absolute z-20 flex flex-col w-full h-full">
          <div className="w-full flex justify-center">
            <NavbarTrans />
          </div>
          <div className=" flex w-full justify-center  items-center mt-[100px]">
            <div>
              <div className=" text-[36px] text-white font-semibold w-[571px]">
                Бид бол санхүүгийн байгууллагын өсөлтийн хурдасгуур{" "}
              </div>
              <div className=" text-white text-[16px] font-normal mb-[24px]">
                Монголын хамгийн анхны SAAS ERP бүтээгдэхүүн{" "}
              </div>
              <div className=" flex mt-[40px]">
                <div>
                  <Button className=" w-[166px] h-[48px] rounded-[43px] bg-white text-[#2E28D4] text-[14px] font-bold border-none mr-[24px]">
                    Демо
                  </Button>
                </div>
                <div>
                  <Button className=" w-[166px] h-[48px] rounded-[43px] bg-transparent  text-white font-bold border-[1px] border-white">
                    Холбоо барих
                  </Button>
                </div>
              </div>
            </div>
            <div className="">
              <Image preview={false} src="/img/homeImg.svg" />
            </div>
          </div>
        </div>
        <Image className=" w-[100vw]" preview={false} src="/img/homeBack.svg" />
      </div>
      <div className=" mt-[78px]">
        <div className=" flex items-center justify-center">
          <div className=" bg-[#2E28D4] h-[1px] w-[48px] "></div>
          <div className="text-[#2E28D4] text-[11px] font-semibold mx-[16px]">
            01 Байгууллага
          </div>
          <div className=" bg-[#2E28D4] h-[1px] w-[48px]"></div>
        </div>
        <div className=" text-[#2F3747] text-[24px] font-bold flex justify-center">
          Хамтран ажиллагч байгууллагууд
        </div>
        <div className=" w-full flex justify-center mt-[40px]">
          <div className=" flex  w-[60vw] justify-between ">
            <div>
              <Image src="/img/ict.svg" />
            </div>
            <div>
              <Image src="/img/itools.svg" />
            </div>
            <div>
              <Image src="/img/fibo.svg" />
            </div>
            <div>
              <Image src="/img/cloud.svg" />
            </div>
          </div>
        </div>
      </div>
      <div className=" mt-[100px]">
        <div className=" flex items-center justify-center">
          <div className=" bg-[#2E28D4] h-[1px] w-[48px] "></div>
          <div className="text-[#2E28D4] text-[11px] font-semibold mx-[16px]">
            02 үйлчилгээ
          </div>
          <div className=" bg-[#2E28D4] h-[1px] w-[48px]"></div>
        </div>
        <div className=" text-[#2F3747] text-[24px] font-bold flex justify-center">
          Үйлчилгээний төрөл
        </div>
        <div className="w-full flex justify-center mt-[40px]">
          <div className=" flex text-center  w-[65vw] justify-between">
            <div className=" w-[170px] h-[184px] bg-white shadow-custom flex flex-col justify-center items-center">
              <div>
                <Image preview={false} src="/img/u1.svg" />
              </div>
              <div className="  text-[#2F3747] text-[16px] font-semibold w-[110px]">
                ERP хөгжүүлэлт
              </div>
            </div>
            <div className=" w-[170px] h-[184px] bg-white shadow-custom flex flex-col justify-center items-center">
              <div>
                <Image preview={false} src="/img/u2.svg" />
              </div>
              <div className=" text-[#2F3747] text-[16px] font-semibold w-[110px] ">
                Вебсайт хөгжүүлэлт
              </div>
            </div>
            <div className=" w-[170px] h-[184px] bg-white shadow-custom flex flex-col justify-center items-center">
              <div>
                <Image preview={false} src="/img/u3.svg" />
              </div>
              <div className=" text-[#2F3747] text-[16px] font-semibold w-[110px]">
                Мобайл апп хөгжүүлэлт
              </div>
            </div>
            <div className=" w-[170px] h-[184px] bg-white shadow-custom flex flex-col justify-center items-center">
              <div>
                <Image preview={false} src="/img/u4.svg" />
              </div>
              <div className=" text-[#2F3747] text-[16px] font-semibold w-[110px]">
                Систем интеграцчилал
              </div>
            </div>
            <div className=" w-[170px] h-[184px] bg-white shadow-custom flex flex-col justify-center items-center">
              <div>
                <Image preview={false} src="/img/u5.svg" />
              </div>
              <div className=" text-[#2F3747] text-[16px] font-semibold w-[110px]">
                Тусламж, дэмжлэг
              </div>
            </div>
            <div className=" w-[170px] h-[184px] bg-white shadow-custom flex flex-col justify-center items-center">
              <div>
                <Image preview={false} src="/img/u6.svg" />
              </div>
              <div className=" text-[#2F3747] text-[16px] font-semibold w-[110px]">
                Сервер арчилгаа
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className=" w-full bg-[#9CA6C0] bg-opacity-10 mt-[100px]">
          <div className=" flex items-center justify-center pt-[80px]">
            <div className=" bg-[#2E28D4] h-[1px] w-[48px] "></div>
            <div className="text-[#2E28D4] text-[11px] font-semibold mx-[16px]">
              03 Давуу тал
            </div>
            <div className=" bg-[#2E28D4] h-[1px] w-[48px]"></div>
          </div>
          <div className=" text-[#2F3747] text-[24px] font-bold flex justify-center">
            Бүтээгдэхүүний онцлог
          </div>
          <div className=" w-full flex justify-center mt-[40px]">
            <div className=" flex w-[65vw] justify-between pb-[100px]">
              <div>
                <div>
                  <Image preview={false} src="/img/b1.svg" />
                </div>
                <div className=" text-[#2F3747] text-[18px] w-[270px] font-bold">
                  Ахисан түвшний санхүүгийн бүртгэл
                </div>
                <div className=" w-[270px] text-[#2F3747] text-[16px] font-normal text-opacity-60">
                  Монгол улсын стандартад бүрэн нийцсэн санхүү нягтлан бодох
                  бүртгэлийн бүх төрлийн үйл ажиллагаа, мөнгөн гүйлгээнүүдийг
                  нарийвчилсан шинжилгээ хийх боломжтой
                </div>
              </div>
              <div className=" pt-[50px]">
                <div>
                  <Image preview={false} src="/img/b2.svg" />
                </div>
                <div className=" text-[#2E28D4] text-[18px] w-[270px] font-bold">
                  Олон хэлбэрт харилцаа холбооны хэрэгсэл
                </div>
                <div className=" w-[270px] text-[#2F3747] text-[16px] font-normal text-opacity-60">
                  Онлайн хурал хийх, олон орны хэл дээр ажиллах, бүрэн автомат
                  мессэж болон имэйл мэдэгдэл илгээх боломжтой
                </div>
              </div>
              <div>
                <div>
                  <Image preview={false} src="/img/b3.svg" />
                </div>
                <div className=" text-[#2F3747] text-[18px] w-[270px] font-bold">
                  Байршил хамаарахгүй цаг хугацаа хэмнэсэн
                </div>
                <div className=" w-[270px] text-[#2F3747] text-[16px] font-normal text-opacity-60">
                  Интернэттэй л бол дэлхийн хаанаас ч өөрийн цагийн бүсээс
                  тухайн цагт шууд ашиглах боломжтой
                </div>
              </div>
              <div className=" pt-[50px]">
                <div>
                  <Image preview={false} src="/img/b4.svg" />
                </div>
                <div className=" text-[#2F3747] text-[18px] w-[270px] font-bold">
                  Хамгийн сүүлийн үеийн технологи
                </div>
                <div className=" w-[270px] text-[#2F3747] text-[16px] font-normal text-opacity-60">
                  iFinance бүтээгдэхүүн нь дэлхийн ERP цогц систем болох
                  Odoo.com -н 15.0 буюу сүүлийн үеийн хувилбарт суурилсан
                  технологитой холбогдож, бүхий л мэдээлэл солилцох бүрэн
                  боломжтой.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" mt-[100px]">
        <div className=" flex items-center justify-center">
          <div className=" bg-[#2E28D4] h-[1px] w-[48px] "></div>
          <div className="text-[#2E28D4] text-[11px] font-semibold mx-[16px]">
            04 Байгууллагын давуу тал
          </div>
          <div className=" bg-[#2E28D4] h-[1px] w-[48px]"></div>
        </div>
        <div className=" text-[#2F3747] text-[24px] font-bold flex justify-center">
          Бусдаас ялгарах манай давуу тал
        </div>
        <div>
          <div className=" w-full flex justify-center mt-[40px]">
            <div className=" flex w-[65%]  justify-between">
              <div>
                <div>
                  <Image preview={false} src="/img/d1.svg" />
                </div>
                <div className=" text-[#2F3747] text-[18px] w-[470px] font-bold">
                  <span className=" text-[#F01A63]">
                    Та худалдан авалт хийсэн цагаас эхлэн
                  </span>{" "}
                  бидний нэг хэсэг болж нэгдсэнээр БИД болно.{" "}
                </div>
              </div>
              <div>
                <div className="flex">
                  <div className="flex flex-col items-center w-[48px]">
                    <div className="h-[48px] w-[48px] bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD] rounded-[50px] flex justify-center items-center text-white">
                      1
                    </div>
                    <div className=" bg-[#AC27FD] w-[1px] h-[30px] my-[4px]"></div>
                  </div>
                  <div className="w-[606px] text-[16px] font-semibold text-[#2F3747]">
                    Бид шинэ санааг боловсруулж хамгийн үр ашигтай, зөв гэсэн
                    шийдлийг гаргаж чаддаг.{" "}
                  </div>
                </div>
                <div className="flex">
                  <div className="flex flex-col items-center w-[48px]">
                    <div className="h-[48px] w-[48px] bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD] rounded-[50px] flex justify-center items-center text-white">
                      2
                    </div>
                    <div className=" bg-[#AC27FD] w-[1px] h-[30px] my-[4px]"></div>
                  </div>
                  <div className="w-[606px] text-[16px] font-semibold text-[#2F3747]">
                    Бид хамгийн сүүлийн үеийн програм хангамж дээр хөгжүүлэлт
                    хийж, түүнийгээ ашиглаж чаддаг.{" "}
                  </div>
                </div>
                <div className="flex">
                  <div className="flex flex-col items-center w-[48px]">
                    <div className="h-[48px] w-[48px] bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD] rounded-[50px] flex justify-center items-center text-white">
                      3
                    </div>
                    <div className=" bg-[#AC27FD] w-[1px] h-[30px] my-[4px]"></div>
                  </div>
                  <div className="w-[606px] text-[16px] font-semibold text-[#2F3747]">
                    Бид шинэ санааг боловсруулж хамгийн үр ашигтай, зөв гэсэн
                    шийдлийг гаргаж чаддаг.{" "}
                  </div>
                </div>
                <div className="flex">
                  <div className="flex flex-col items-center w-[48px]">
                    <div className="h-[48px] w-[48px] bg-gradient-to-tr from-[#2E28D4] to-[#AC27FD] rounded-[50px] flex justify-center items-center text-white">
                      4
                    </div>
                  </div>
                  <div className="w-[606px] text-[16px] font-semibold text-[#2F3747]">
                    Бид шинэ санааг боловсруулж хамгийн үр ашигтай, зөв гэсэн
                    шийдлийг гаргаж чаддаг.{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[100px]">
        <div className=" flex items-center justify-center">
          <div className=" bg-[#2E28D4] h-[1px] w-[48px] "></div>
          <div className="text-[#2E28D4] text-[11px] font-semibold mx-[16px]">
            05 Байгууллагын давуу тал
          </div>
          <div className=" bg-[#2E28D4] h-[1px] w-[48px]"></div>
        </div>
        <div className=" text-[#2F3747] text-[24px] font-bold flex justify-center">
          Манай бүтээгдэхүүнийг сонгох шалтгаан
        </div>
        <div className=" w-full flex justify-center mt-[40px]">
          <div className="flex w-[60vw]  justify-between">
            <div>
              <p className=" text-[18px] text-[#2F3747] font-bold">
                Технологийн дэвшлийг таньд мэдрүүлнэ
              </p>
              <p className=" text-[#2F3747] text-[16px] text-opacity-60 w-[470px] text-justify ">
                Технологийн дэвшилтэт эрин зуунд танай байгууллагын дотоод
                системийг хийж гүйцэтгэхээс гадна Финтек шилжилтрүү хөтлөн авч
                орох болно. Сүүлийн үеийн тренд болсо н lend.mn, storepay.mn,
                pocket.mn гэх мэт санхүүгийн үйл ажиллагааг технологийн
                тусламжтайгаар өдөр тутмын үйл ажиллагаандаа хэрэгжүүлэх
                боломжийг таньд олгоно. Та санаагаа захиал. Бид гүйцэлдүүлэе.
              </p>
              {/* <div>
                <div>
                    enee hesegt slider n bairlana
                </div>
            </div> */}
            </div>
            <div>
              <div>
                <Image preview={false} src="/img/robot.svg" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" w-full bg-[#9CA6C0] bg-opacity-10 pb-[100px]">
        <div className=" flex items-center justify-center pt-[80px]">
          <div className=" bg-[#2E28D4] h-[1px] w-[48px] "></div>
          <div className="text-[#2E28D4] text-[11px] font-semibold mx-[16px]">
            06 Боломж
          </div>
          <div className=" bg-[#2E28D4] h-[1px] w-[48px]"></div>
        </div>
        <div className=" text-[#2F3747] text-[24px] font-bold flex justify-center">
          Бүх платформуудад ашиглагдах боломжтой
        </div>
        <div className=" w-full flex justify-center mt-[40px]">
          <div className=" flex w-[65vw] justify-between">
            <div>
              <div>
                <Image preview={false} src="/img/app.svg" />
              </div>
              <p className=" text-[#2F3747] text-[18px] font-bold mt-[24px]">
                Андройд гар утасны апп{" "}
              </p>
              <p className=" text-[#2F3747] text-[16px] font-normal text-opacity-60 w-[370px] ">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suscipit magnis massa purus donec eleifend phasellus eu
                parturient cursus. Consequat, varius aenean diam est sed ut
                fames nulla sed.
              </p>
              <div className=" mt-[40px]">
                <a
                  target="_blank"
                  href="https://play.google.com/store/apps/details?id=com.odoo.mobile&hl=en&gl=US"
                >
                  {" "}
                  <Image preview={false} src="/img/app1.svg" />{" "}
                </a>
              </div>
            </div>
            <div>
              <div>
                <Image preview={false} src="/img/ifin.svg" />
              </div>
              <p className=" text-[#2F3747] text-[18px] font-bold mt-[24px]">
                Клауд суурьтай програм хангамж{" "}
              </p>
              <p className=" text-[#2F3747] text-[16px] font-normal text-opacity-60 w-[370px] ">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suscipit magnis massa purus donec eleifend phasellus eu
                parturient cursus. Consequat, varius aenean diam est sed ut
                fames nulla sed.
              </p>
              <div className=" mt-[40px]">
                {" "}
                <a target="_blank" href="htttps://ifinance.mn">
                  <Image preview={false} src="/img/ifin1.svg" />
                </a>
              </div>
            </div>
            <div>
              <div>
                <Image preview={false} src="/img/play.svg" />
              </div>
              <p className=" text-[#2F3747] text-[18px] font-bold mt-[24px]">
                IOS гар утасны апп
              </p>
              <p className=" text-[#2F3747] text-[16px] font-normal text-opacity-60 w-[370px] ">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suscipit magnis massa purus donec eleifend phasellus eu
                parturient cursus. Consequat, varius aenean diam est sed ut
                fames nulla sed.
              </p>
              <div className=" mt-[40px]">
                <a target="_blank" href="https://apps.odoo.com/apps">
                  <Image preview={false} src="/img/play1.svg" />
                </a>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" w-full flex justify-center mt-[100px]">
        <div className=" flex w-[65vw] h-[228px] bg-[#2E28D4] bg-opacity-5 items-center justify-around">
          <div>
            <div className=" text-[48px] text-[#2E28D4] font-bold">99225+</div>
            <div className=" text-[16px] text-[#9CA6C0] w-[140px]">
              Улиралд хандсан хүний тоо
            </div>
          </div>
          <div>
            <div className=" text-[48px] text-[#F01A63] font-bold">1047+</div>
            <div className=" text-[16px] text-[#9CA6C0] w-[140px]">
              Жилд хандсан хүний тоо
            </div>
          </div>
          <div>
            <div className=" text-[48px] text-[#AC27FD] font-bold">877+</div>
            <div className=" text-[16px] text-[#9CA6C0] w-[140px]">
              Сард хандсан хүний тоо
            </div>
          </div>
          <div>
            <div className=" text-[48px] text-[#011F70] font-bold">283+</div>
            <div className=" text-[16px] text-[#9CA6C0] w-[140px]">
              Өдөрт хандсан хүний тоо
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
