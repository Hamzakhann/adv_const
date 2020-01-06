import React , {useState , useEffect} from 'react'
import {Button , IconButton} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import axios from 'axios';
import FormData from 'form-data'
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
            setSelectedImage("")
            setSelectedTeamImage("")
            setFlag(false)
            setLoading(false)
        })
    },[flag])

    const updateContact = async() => {
        setLoading(true)
        if(selectedImage && selectedTeamImage){
            console.log('first condition')
            let image_1 = new FormData();
            image_1.append('image', selectedImage);
            let image_2 = new FormData();
            image_2.append('image', selectedTeamImage);
            try{
                let response_1 = await axios.post(`${url}admin/upload`, image_1, {
                    headers: {'content-type': 'multipart/form-data'}})
                console.log(response_1)
                let response_2 = await axios.post(`${url}admin/upload`, image_2, {
                        headers: {'content-type': 'multipart/form-data'}})
                console.log(response_2)
               let finalResponse = await axios.post(`${url}admin/update_work_with_us_page`, querystring.stringify({
                    team_title: title,
                    team_message: description,
                    image:response_1.data,
                    team_image: response_2.data
            
                }),{headers: { "Content-Type": "application/x-www-form-urlencoded"}})
                if(finalResponse){
                    setLoading(false)
                    setFlag(true)
                }
            }catch(e){
                alert(e)
            }

        }else if(selectedImage){
            console.log('Second condition')
            let image_ = new FormData();
            image_.append('image', selectedImage);
            try{
                let response_ = await axios.post(`${url}admin/upload`, image_, {
                    headers: {'content-type': 'multipart/form-data'}})
                console.log(response_)
                let finalResponse = await axios.post(`${url}admin/update_work_with_us_page`, querystring.stringify({
                    team_title: title,
                    team_message: description,
                    image:response_.data,
                    team_image: teamImage
            
                }),{headers: { "Content-Type": "application/x-www-form-urlencoded"}})
                if(finalResponse){
                    setLoading(false)
                    setFlag(true)
                }
            }catch(e){
                alert(e)
            }
        }else if(selectedTeamImage){
            console.log('third condition')
            let image_ = new FormData();
            image_.append('image', selectedTeamImage);
            try{
                let response_ = await axios.post(`${url}admin/upload`, image_, {
                    headers: {'content-type': 'multipart/form-data'}})
                console.log(response_)
                let finalResponse = await axios.post(`${url}admin/update_work_with_us_page`, querystring.stringify({
                    team_title: title,
                    team_message: description,
                    image:image,
                    team_image: response_.data
            
                }),{headers: { "Content-Type": "application/x-www-form-urlencoded"}})
                if(finalResponse){
                    setLoading(false)
                    setFlag(true)
                }
            }catch(e){
                alert(e)
            }
        }else{
            try{
                let finalResponse = await axios.post(`${url}admin/update_work_with_us_page`, querystring.stringify({
                    team_title: title,
                    team_message: description,
                    image:image,
                    team_image: teamImage
            
                }),{headers: { "Content-Type": "application/x-www-form-urlencoded"}})
                if(finalResponse){
                    setLoading(false)
                    setFlag(true)
                }      
            }catch(e){
                alert(e)
            }
        }

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
