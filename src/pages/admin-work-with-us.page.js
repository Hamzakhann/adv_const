import React , {useState , useEffect} from 'react'
import {Button , IconButton} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import axios from 'axios';
import querystring from 'querystring';
import { url } from '../services/url';
import AdminHeaderComponent from '../components/admin-header.component';
import './dashboard.css'

export default function AdminWorkWithUsPage() {
    const [flag , setFlag] = useState(false)
    const [isLoading , setLoading] = useState(true)
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [selectedImage, setSelectedImage] = useState();
    const [selectedTeamImage, setSelectedTeamImage] = useState();
    const [image, setImage] = useState();
    const [teamImage, setTeamImage] = useState();

    useEffect(() =>{
        axios.get(`${url}front/workWithUsPage`).then(res => {
            setTitle(res.data[0].team_title);
            setDescription(res.data[0].team_message);
            setImage(res.data[0].image);
            setTeamImage(res.data[0].team_image)
            setFlag(false)
            setLoading(false)
        })
    },[flag])

    const updateContact = () => {
        
        // setLoading(true)
        // const data = {
        //     email,
        //     address,
        //     phone: phone.split(',')
        // }
        // axios.post(`${url}admin/update_contact_page`, querystring.stringify(data), {
        //     headers: { 
        //       "Content-Type": "application/x-www-form-urlencoded"
        //     }
        //   }).then(res => {
        //       setLoading(false)
        //       setFlag(true)
        //   }).catch(e=>alert(e))
    }
    return (
        <div className='container-fluid p-0' >
            <AdminHeaderComponent pageName="Work With Us" />
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
                            <label className='admin-label' for="team">Team Title</label>
                            <input 
                            type="text" 
                            class="form-control admin-input" 
                            id="team" 
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        {/* second input */}
                        <div class="form-group">
                            <label className='admin-label' for="message">Team Message</label>
                            <textarea 
                            class="form-control admin-textArea" 
                            id="message" 
                            rows="5"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            >
                            </textarea>
                        </div>
                        {/* third INPUT */}
                        <div class="form-group">
                        <label className='admin-label mr-4' for="image">Image</label>
                        <input 
                        onChange={(e) => setSelectedImage(e.target.files[0])} 
                        accept="image/*" 
                        style={{display:"none"}} 
                        id="icon-button-file-1"
                        type="file" />
                         <label htmlFor="icon-button-file-1">
                               <IconButton className='btn-block' style={{color:"darkRed" , border:"1px solid darkRed"}} aria-label="upload picture" component="div">
                                 <i class="fas fa-camera"></i>
                                </IconButton>
                         </label>
                         <small className='ml-3 font-weight-bold' >{selectedImage ? selectedImage.name :""}</small>
                        </div>
                    {/* fourth INPUT */}
                    <div class="form-group">
                        <label className='admin-label mr-4' for="desc">Team Image</label>
                        <input 
                        onChange={(e) => setSelectedTeamImage(e.target.files[0])} 
                        accept="image/*" 
                        style={{display:"none"}} 
                        id="icon-button-file-2"
                        type="file" />
                         <label htmlFor="icon-button-file-2">
                               <IconButton className='btn-block' style={{color:"darkRed" , border:"1px solid darkRed"}} aria-label="upload picture" component="div">
                                 <i class="fas fa-camera"></i>
                                </IconButton>
                         </label>
                         <small className='ml-3 font-weight-bold' >{selectedTeamImage ? selectedTeamImage.name :""}</small>
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
