import {useState, createContext, useReducer, useEffect} from 'react';
import Cookies from 'js-cookie';
import Auth from '../utils/auth';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
const Context = createContext();
export const ContextProvider = ({children, sessionId}) => {
  
  const [test, setTest] = useState("test");
const setMenuAndPermissions = async () => { 
 
    //  axios.post('http://192.168.1.15/web/session/authenticate',{
    //     jsonrpc: 2.0,
    //     params: {
    //       db: "test_api",
    //       login: "admin",
    //       password: "a"
    //     }
    //   }).then(response => {
      
      // const requestOptions = {
      //   method: 'POST',
      //   body: JSON.stringify({ title: 'React POST Request Example' })
      // };
      // fetch('https://reqres.in/api/posts', requestOptions)
      //     .then(response => response.json())
      //     .then(data => this.setState({ postId: data.id }));
          

        axios.post('http://192.168.1.15/api/get/session',{
          jsonrpc: 2.0,
          params: {
            db: "test",
            login: "admin",
            password: "a",
            type: "api"
          }
        }
        ).then(res => {
          console.log("KXSDEOL", res)
          sessionId(res.data.result)
        })
      // }
      // );

  };
  useEffect(() => {
    setMenuAndPermissions();
  }, []);
  return (
    <Context.Provider
      value={{
        setMenuAndPermissions,
        sessionId,
        test,
      }}
    >
      {children}
    </Context.Provider>
  );
    }

    export default Context;