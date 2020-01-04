
import { baseUrl } from './url';
import axios from 'axios';
import querystring from 'querystring';

class ProjectService {
  constructor() {
    this.url = `${baseUrl}project`;
  }
  getAll() {
    return axios.get(this.url).then(res => res.data);
  }

  create(data, config) {
      return axios.post(`${baseUrl}create_project`,  querystring.stringify(data), config)
  }

  update(data) {
    return axios.post(`${baseUrl}update_project_page`,  querystring.stringify(data), {
      headers: { 
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
  }

  delete(id) {
    return axios.post(`${baseUrl}delete_project_page`,  querystring.stringify({ id }), {
      headers: { 
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
  }


  uploadImage(data, config) {
    return axios.post(`${baseUrl}upload`, data, config).then(res => res.data)
  }
}

export default ProjectService;