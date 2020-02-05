
import { baseUrl } from './url';
import axios from 'axios';



class IndexPageService {
  constructor() {
    this.url = `${baseUrl}indexPage`;
  
  }
  getAll() {
    return axios.get(this.url).then(res => res.data);
  }
 
}

export default new IndexPageService();