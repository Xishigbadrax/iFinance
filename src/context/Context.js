import {useState, createContext, useEffect} from 'react';
import axios from 'axios';
import {callPost} from '../api/api';
import { Spin } from 'antd';
import Auth from '../utils/auth';
const Context = createContext();
export const ContextProvider = ({children}) => {
    const [sessionId, setSessionId] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [sid, setSid] = useState();
    const [userData, setUserData] = useState();
    const baseUrl = process.env.NEXT_PUBLIC_URL;
    const baseDB = process.env.NEXT_PUBLIC_DB;
    const onSid = (value) => {
        setSid(value);
    }
    // console.log(baseUrl, baseDB, "odoooo")
// Auth.destroyToken();
const setMenuAndPermissions = async () => { 
 

        axios.post(baseUrl + 'get/session',{
          jsonrpc: 2.0,
          params: {
            db: baseDB,
            login: "",
            password: "",
            type: "api"
          }
        }
        ).then(res => {
          // console.log("KXSDEOL", res);
          setSessionId(res.data.result);
        
        })

      //   var data = {
      //     jsonrpc: 2.0,
      //     params: {
      //       db: "test_open_api_v10",
      //       login: "",
      //       password: "",
      //       type: "api"
      //     }
      //   }
      // const res = callPost("get/session", data );
          
      //   console.log(res, "last n")

  };
  useEffect(() => {
    setMenuAndPermissions();
  }, []);
  return (
    <Context.Provider
      value={{
        setMenuAndPermissions,
        sessionId,
        onSid,
        sid,
        setIsLoading,
        setUserData,
        userData
      }}
    >
        <Spin spinning={isLoading} className="spinner" tip="Уншиж байна">
      {children}
      </Spin>
  
    </Context.Provider>
  );
    }

    export default Context;