import axios from 'axios';

import baseAxios from './baseAxios';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASEURL;

/* #region Datatable, Form main funtions */







const callGet = async (command) => {
  const result = await baseAxios.get(command);
  if (result.status === 200) return result.data;
  
  else return result.data;
};


const callPost = async (command, data) => {
  const result = await baseAxios.post(command,data);
  
  if (result.status === 200) return result;
  
  else return result;
};



export {callGet, callPost};
