import {useState, createContext, useEffect} from 'react';
import axios from 'axios';
import {callPost} from '../api/api';
const Context = createContext();
export const ContextProvider = ({children}) => {
    const [sessionId, setSessionId] = useState();
    const [sid, setSid] = useState();
    const baseUrl = process.env.NEXT_PUBLIC_BASEURL;
    const onSid = (value) => {
        setSid(value);
    }

const setMenuAndPermissions = async () => { 
 

        axios.post(baseUrl + 'get/session',{
          jsonrpc: 2.0,
          params: {
            db: "master_test",
            login: "",
            password: "",
            type: "api"
          }
        }
        ).then(res => {
          console.log("KXSDEOL", res);
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
        sid
      }}
    >
      {children}
    </Context.Provider>
  );
    }

    export default Context;