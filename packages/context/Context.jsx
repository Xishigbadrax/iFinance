import {useState, createContext, useReducer, useEffect} from 'react';
import Cookies from 'js-cookie';
import Auth from '../utils/auth';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
const Context = createContext();
export const ContextProvider = ({children}) => {

const setMenuAndPermissions = async () => { 
    const res = await axios.post('https://test.ifinance.mn/web/session/authenticate',{
        jsonrpc: 2.0,
        params: {
          db: "test_api",
          login: "admin",
          password: "8v46-t5bf-4k4w"
        }
      });
      
      console.log(res,"ehnii resss");
      
      // console.log(accessToken, "tokkkeee");
      // const accessToken = Cookies.get('session_id');
      
      // const user = jwtDecode(accessToken);
      // console.log(accessToken, "aaaaa");
    // console.log("testliii")

  };
  useEffect(() => {
    setMenuAndPermissions();
  }, []);
  return (
    <Context.Provider
      value={{
        setMenuAndPermissions,
      }}
    >
      {children}
    </Context.Provider>
  );
    }

    export default Context;