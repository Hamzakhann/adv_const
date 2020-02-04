
import { baseUrl } from './url';
import axios from 'axios';
import querystring from 'querystring';

class TeamService {
  constructor() {
    this.url = `${baseUrl}team`;
  }
  getAll() {
    return axios.get(this.url).then(res => res.data);
  }

  create(data, config) {
      return axios.post(this.url,  querystring.stringify(data), config);
  }

  updateTeamMember(data) {
    return axios.post(`${baseUrl}update_team_member`, querystring.stringify(data), {
      headers: { 
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });
  }

  delete(id) {
    return axios.post(`${baseUrl}delete_team_member`, querystring.stringify({ id }), {
      headers: { 
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then(res => console.log('res ', res))
  }

  uploadImage(data, config) {
    return axios.post(`${baseUrl}upload`,data, config).then(res=>{
      return res.data;
    })
  }
}

export default TeamService;