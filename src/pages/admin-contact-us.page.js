import React , {useState , useEffect} from 'react'
import {Button} from '@material-ui/core';
import {useHistory} from 'react-router-dom'
import Skeleton from '@material-ui/lab/Skeleton';
import axios from 'axios';
import querystring from 'querystring';
import { url } from '../services/url';
import AdminHeaderComponent from '../components/admin-header.component';
import './dashboard.css'
export default function AdminContactUsPage() {
    const history = useHistory()
    const [flag , setFlag] = useState(false)
    const [isLoading , setLoading] = useState(true)
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [id, setId] = useState();

    useEffect(() =>{
        if(!localStorage.getItem("jwtToken")){
            history.push("/admin")
        }
        axios.get(`${url}front/contactPage`).then(res=>{
            const data = res.data[0]
            setEmail(data.email);
            setId(data.id);
            setAddress(data.address);
            setPhone(data.phone.join())
            setFlag(false)
            setLoading(false)
        })
    },[flag])

    const updateContact = () => {
        setLoading(true)
        const data = {
            email,
            address,
            phone: phone.split(',')
        }
        axios.post(`${url}admin/update_contact_page`, querystring.stringify(data), {
            headers: { 
              "Content-Type": "application/x-www-form-urlencoded"
            }
          }).then(res => {
              setLoading(false)
              setFlag(true)
          }).catch(e=>alert(e))
    }
    return (
        <div className='container-fluid p-0' >
            <AdminHeaderComponent pageName="Contact Us" />
            <br/>
            <br/>
            <div className='container' >
                <div className='main-form-container'>
                    {isLoading ? (
                         <div className='container' >
                             <Skeleton style={{width:"100%" , height:"100px"}} animation="wave" />
                             <Skeleton style={{width:"100%" , height:"100px"}} animation="wave" />
                             <Skeleton style={{width:"100%" , height:"100px"}} animation="wave" />
                             <Skeleton style={{width:"100%" , height:"100px"}} animation="wave" />
                         </div>
                    ):(
                        <div className='admin-form' >
                        {/* first input */}
                        <div class="form-group">
                            <label className='admin-label' for="exampleInputEmail1">Email</label>
                            <input 
                            type="email" 
                            class="form-control admin-input" 
                            id="exampleInputEmail1" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        {/* second input */}
                        <div class="form-group">
                            <label className='admin-label' for="phone">Phone</label>
                            
                            <input 
                            type="text" 
                            class="form-control admin-input" 
                            id="phone" 
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                        {/* third input */}
                        <div class="form-group">
                            <label className='admin-label' for="address">Address</label>
                            <textarea 
                            class="form-control admin-textArea" 
                            id="address" 
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            rows="5">
                            </textarea>
                        </div>
                        {/* Button */}
                        <Button  onClick={()=>updateContact()}  size="large"  variant="contained" className='btn-block admin-block-btn' >Update</Button>
                    </div>
                    )}
                </div>
            </div>
        </div>
    )
}
