import React , {useState , useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {Button , IconButton} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import ReactQuill from 'react-quill';
import axios from 'axios';
import querystring from 'querystring';
import FormData from 'form-data'
import { url } from '../services/url';
import AdminHeaderComponent from '../components/admin-header.component';
import './dashboard.css';

export default function AdminQualityPage() {
    const history =useHistory()
    const [flag , setFlag] = useState(false)
    const [isLoading , setLoading] = useState(true)
    const [title, setTitle] = useState();
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState();
    const [riyal, setRiyal] = useState();
    const [completedProject, setCompletedProject] = useState();
    const [currentProject, setCurrentProject] = useState();
    const [bannerImage, setBannerImage] = useState("");
    const [selectedImage, setSelectedImage] = useState("");
    

    useEffect(() =>{
        
        if(!localStorage.getItem("jwtToken")){
            history.push("/admin")
        }
        axios.get(`${url}front/qualityPage`).then(res => {
            console.log('res ', res.data[0]);
            setTitle(res.data[0].title);
            setDescription(res.data[0].description);
            setRiyal(res.data[0].saudi_riyals)
            setMessage(res.data[0].message);
            setCurrentProject(res.data[0].current_projects);
            setCompletedProject(res.data[0].projects_completed);
            setBannerImage(res.data[0].banner_image);
            setSelectedImage("")
            setLoading(false)
            setFlag(false)
        })
    },[flag])

    const updateQuality = () => {
        setLoading(true)
        if(selectedImage){
            let data = new FormData();
            data.append('image', selectedImage);
            axios.post(`${url}admin/upload`, data, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }).then(res=>{
                axios.post(`${url}admin/update_quality_page`, querystring.stringify({
                    title,
                    description,
                    saudi_riyals: riyal,
                    projects_completed: completedProject,
                    current_projects: currentProject,
                    message,
                    banner_image: res ? res.data : bannerImage
                }), {
                    headers: { 
                      "Content-Type": "application/x-www-form-urlencoded"
                    }
                  }).then(res =>{
                        setLoading(false)
                        setFlag(true)
                  }).catch(e=>alert(e))
            }).catch(e=>alert(e))

        }else{
            axios.post(`${url}admin/update_quality_page`, querystring.stringify({
                title,
                description,
                saudi_riyals: riyal,
                projects_completed: completedProject,
                current_projects: currentProject,
                message,
                banner_image : bannerImage
            }), {
                headers: { 
                  "Content-Type": "application/x-www-form-urlencoded"
                }
              }).then(res => {
                setLoading(false)
                setFlag(true)
              }).catch(e=>alert(e))    
        }
    }

    return (
        <div className='container-fluid p-0' >
            <AdminHeaderComponent pageName="Quality" />
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
                            <label className='admin-label' for="title">Title</label>
                            <input 
                            type="text" 
                            class="form-control admin-input" 
                            id="title" 
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        {/* second input */}
                        <div className='row' >
                        {/* FIRST COLUMN */}
                            <div className='col-sm col-md-4' >
                              <div class="form-group">
                                <label className='admin-label' for="riyal">Saudi Riyals</label>
                                <input 
                                    type="text" 
                                    class="form-control admin-input" 
                                    id="riyal" 
                                    value={riyal}
                                    onChange={(e) => setRiyal(e.target.value)}
                                    />
                                </div>
                            </div>
                            {/* SECOND COLUMN */}
                            <div className='col-sm col-md-4' >
                              <div class="form-group">
                                <label className='admin-label' for="project">Projects Completed</label>
                                <input 
                                    type="text" 
                                    class="form-control admin-input" 
                                    id="project" 
                                    value={completedProject}
                                    onChange={(e) => setCompletedProject(e.target.value)}
                                    />
                                </div>
                            </div>
                            {/* THIRD COLUMN */}
                            <div className='col-sm col-md-4' >
                              <div class="form-group">
                                <label className='admin-label' for="current">Current Projects</label>
                                <input 
                                    type="text" 
                                    class="form-control admin-input" 
                                    id="current" 
                                    value={currentProject}
                                    onChange={(e) => setCurrentProject(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        {/* third input */}
                        <div class="form-group">
                            <label className='admin-label' for="message">Message</label>
                            <textarea 
                            class="form-control admin-textArea" 
                            id="message" 
                            rows="3"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            >
                            </textarea>
                        </div>
                        {/* FOURTH INPUT */}
                        <div class="form-group">
                            <label className='admin-label' for="desc">Description</label>
                            <ReactQuill
                            className="  admin-textArea"
                            value={description} 
                            onChange={(val)=>setDescription(val)}
                            />
                        </div>
                        {/* FIFTH INPUT */}
                        <div class="form-group">
                        <label className='admin-label mr-4' for="desc">Choose Profile Picture\</label>
                        <input onChange={(e) => setSelectedImage(e.target.files[0])} accept="image/*" style={{display:"none"}} id="icon-button-file" type="file" />
                         <label htmlFor="icon-button-file">
                               <IconButton className='btn-block' style={{color:"darkRed" , border:"1px solid darkRed"}} aria-label="upload picture" component="div">
                                 <i class="fas fa-camera"></i>
                                </IconButton>
                         </label>
                         <small className='ml-3 font-weight-bold' >{selectedImage ? selectedImage.name :""}</small>
                        </div>
                        {/* Button */}
                        <Button  onClick={()=>updateQuality()}  size="large"  variant="contained" className='btn-block admin-block-btn' >Update</Button>
                    </div>
                    )}
                </div>
            </div>
        </div>
    )
}
