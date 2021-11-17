import {useState, createContext, useEffect} from 'react';
import axios from 'axios';
const Context = createContext();
export const ContextProvider = ({children}) => {
    const [sessionId, setSessionId] = useState();
  

const setMenuAndPermissions = async () => { 
 

        axios.post('http://192.168.1.15/api/get/session',{
          jsonrpc: 2.0,
          params: {
            db: "test_fibo",
            login: "",
            password: "",
            type: "api"
          }
        }
        ).then(res => {
          console.log("KXSDEOL", res);
          setSessionId(res.data.result);
        
        })
      

  };
  useEffect(() => {
    setMenuAndPermissions();
  }, []);
  return (
    <Context.Provider
      value={{
        setMenuAndPermissions,
        sessionId,
     
      }}
    >
      {children}
    </Context.Provider>
  );
    }

    export default Context;