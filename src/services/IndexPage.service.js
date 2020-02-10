import { baseUrl } from './url';
import axios from 'axios';
import querystring from 'querystring';



class IndexpageService {
    constructor() {
      this.url = `${baseUrl}update_index_page`;
    }
  
    updateIndexPage(data) {
      return axios.post(baseUrl, querystring.stringify(data), {
        headers: { 
          "Content-Type": "application/x-www-form-urlencoded"
        }
      });
    }
  
  
    uploadImage(data) {
      return axios.post(`${baseUrl}upload`,data, {
        headers: { 
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res=>{
        return res.data;
      })
    }
  }
  
  export default IndexpageService;