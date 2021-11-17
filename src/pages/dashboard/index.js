import React, {useState} from "react";
import Navbar from "../../components/Navbar/navbar";
import { Skeleton, Switch, Card, Avatar, Checkbox, Button } from "antd";


const Dashboard = () => {
  const { Meta } = Card;
  
    const [module1, setModule1] = useState(false);
    const [module2, setModule2] = useState(false);
    const [module3, setModule3] = useState(false);
    const [module4, setModule4] = useState(false);
    const [module5, setModule5] = useState(false);

    const onModule = () => {
        setTest(!test);
    }

  return (
    <div>
      <Navbar />
      <div className=" pl-[10rem]">
        <div>
          <Card onClick={() => setModule1(!module1)} style={{ width: 300, marginTop: 16, cursor: "pointer" }}>
            <div className=" flex justify-between">
              <div>
                <Meta
                  avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                  title="Модула 1"
                  //   description="This is the description"
                />
              </div>
              <div>
                <Checkbox checked={module1} />
              </div>
            </div>
          </Card>
        </div>
        <div>
          <Card onClick={() => setModule2(!module2)} style={{ width: 300, marginTop: 16, cursor: "pointer" }}>
            <div className=" flex justify-between">
              <div>
                <Meta
                  avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                  title="Модула 2"
                  //   description="This is the description"
                />
              </div>
              <div>
                <Checkbox checked={module2} />
              </div>
            </div>
          </Card>
        </div>
        <div>
          <Card onClick={() => setModule3(!module3)} style={{ width: 300, marginTop: 16, cursor: "pointer" }}>
            <div className=" flex justify-between">
              <div>
                <Meta
                  avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                  title="Модула 3"
                  //   description="This is the description"
                />
              </div>
              <div>
                <Checkbox checked={module3} />
              </div>
            </div>
          </Card>
        </div>
        <div>
          <Card onClick={() => setModule4(!module4)} style={{ width: 300, marginTop: 16, cursor: "pointer" }}>
            <div className=" flex justify-between">
              <div>
                <Meta
                  avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                  title="Модула 4"
                  //   description="This is the description"
                />
              </div>
              <div>
                <Checkbox checked={module4} />
              </div>
            </div>
          </Card>
        </div>
        <div>
          <Card onClick={() => setModule5(!module5)} style={{ width: 300, marginTop: 16, cursor: "pointer" }}>
            <div className=" flex justify-between">
              <div>
                <Meta
                  avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                  title="Модула 5"
                  //   description="This is the description"
                />
              </div>
              <div>
                <Checkbox checked={module5} />
              </div>
            </div>
          </Card>
        </div>
        <div>
            <Button type="primary" className=" mt-8" >Илгээх</Button>
      </div>
      </div>
     
    </div>
  );
};

export default Dashboard;
