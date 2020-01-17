import React , {useState , useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {Button , IconButton} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import ReactQuill from 'react-quill';
import axios from 'axios';
import FormData from 'form-data'
import querystring from 'querystring';
import { url } from '../services/url';
import AdminHeaderComponent from '../components/admin-header.component';
import './dashboard.css'

export default function AdminWhoWeArePage() {
    const history =useHistory()
    const [flag , setFlag] = useState(false)
    const [isLoading , setLoading] = useState(true)
    const [title, setTitle] = useState();
    const [description, setDescription] = useState("");
    const [bannerImage, setBannerImage] = useState();
    const [ceoMessage, setCeoMessage] = useState();
    const [ceoMessageImage, setCeoMesageImage] = useState();
    const [secondaryTitle, setSecondaryTitle] = useState();
    const [secondaryDescription, setSecondaryDescription] = useState();
    const [workWithUsTitle, setWorkWithUsTitle] = useState();
    const [workWithUsImage, setWorkWithUsImage] = useState();
    const [selectedBannerImage, setSelectedBannerImage] = useState();
    const [selectedCeoMessageImage, setSelectedCeoMessageImage] = useState();
    const [selectedWorkWithUsImage, setSelectedWorkWithUsImage] = useState();
    useEffect(() =>{
        if(!localStorage.getItem("jwtToken")){
            history.push("/admin")
        }
        axios.get(`${url}front/whoWeArePage`).then(res => {
            console.log('res ', res);
            setTitle(res.data[0].primary_title);
            setDescription(res.data[0].primary_description);
            setBannerImage(res.data[0].banner_image)
            setCeoMessage(res.data[0].ceo_message);
            setCeoMesageImage(res.data[0].ceo_message_image);
            setSecondaryTitle(res.data[0].secondary_title);
            setSecondaryDescription(res.data[0].secondary_description);
            setWorkWithUsTitle(res.data[0].work_with_us_title);
            setWorkWithUsImage(res.data[0].work_with_us_image);
            setFlag(false)
            setLoading(false)
            setSelectedBannerImage("")
            setSelectedCeoMessageImage("")
            setSelectedWorkWithUsImage("")
        })
    },[flag])

    const updateContact = async() => {
        setLoading(true)
        let data = {
            primary_title: title,
            banner_image :bannerImage,
            primary_description: description,
            ceo_message:ceoMessage,
            ceo_message_image: ceoMessageImage,
            secondary_title: secondaryTitle,
            work_with_us_title: workWithUsTitle,
            work_with_us_image: workWithUsImage,
            secondary_description: secondaryDescription
        }

        try{
            if(selectedBannerImage){
                let dataImage = new FormData();
                dataImage.append('image', selectedBannerImage);
                let response = await axios.post(`${url}admin/upload`, dataImage,  {
                headers: {'content-type': 'multipart/form-data'}})
                data.banner_image = response.data;
            }
            if(selectedCeoMessageImage){
                let dataImage = new FormData();
                dataImage.append('image', selectedCeoMessageImage);
                let response = await axios.post(`${url}admin/upload`, dataImage, {
                headers: {'content-type': 'multipart/form-data'}})
                data.ceo_message_image = response.data;
            }
            if(selectedWorkWithUsImage){
                let dataImage = new FormData();
                dataImage.append('image', selectedWorkWithUsImage);
                let response = await axios.post(`${url}admin/upload`, dataImage, {
                headers: {'content-type': 'multipart/form-data'}})
                data.work_with_us_image = response.data;
            }

            const finalResponse = await axios.post(`${url}admin/update_who_we_are_page`, querystring.stringify(data), {
                headers: { "Content-Type": "application/x-www-form-urlencoded"}})
            if(finalResponse){
                setLoading(false)
                setFlag(true)
            }

        }catch(e){
            alert(e)
        }

    }
    return (
        <div className='container-fluid p-0' >
            <AdminHeaderComponent pageName="Who We Are" />
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
                            <label className='admin-label' for="primaryTitle">Primary Title</label>
                            <input 
                            type="text" 
                            class="form-control admin-input" 
                            id="primaryTitle" 
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                            {/* second  input */}
                        <div class="form-group">
                            <label className='admin-label' for="secTitle">Secondary Title</label>
                            <input 
                            type="text" 
                            class="form-control admin-input" 
                            id="secTitle" 
                            value={secondaryTitle}
                            onChange={(e) => setSecondaryTitle(e.target.value)}
                            />
                        </div>
                        {/* third  input */}
                        <div class="form-group">
                            <label className='admin-label' for="wwuTitle">Work With Us Title</label>
                            <input 
                            type="text" 
                            class="form-control admin-input" 
                            id="wwuTitle" 
                            value={workWithUsTitle}
                            onChange={(e) => setWorkWithUsTitle(e.target.value)}
                            />
                        </div>
                            {/* fourth  input */}
                        <div class="form-group">
                            <label className='admin-label' for="ceoMessage">CEO Message</label>
                            <input 
                            type="text" 
                            class="form-control admin-input" 
                            id="ceoMessage" 
                            value={ceoMessage}
                            onChange={(e) => setCeoMessage(e.target.value)}
                            />
                        </div>
                        {/* FIFTH INPUT */}
                        <div class="form-group">
                            <label className='admin-label' for="desc">Primary Description</label>
                            <ReactQuill
                            className="  admin-textArea"
                            value={description} 
                            onChange={(val)=>setDescription(val)}
                            />
                        </div>
                        {/* sixth input */}
                        <div class="form-group">
                            <label className='admin-label' for="secDescription">Secondary Description</label>
                            <textarea 
                            class="form-control admin-textArea" 
                            id="secDescription" 
                            rows="5"
                            value={secondaryDescription}
                            onChange={(e) => setSecondaryDescription(e.target.value)}
                            >
                            </textarea>
                        </div>
                        {/* SEVENTH INPUT */}
                        <div class="form-group">
                        <label className='admin-label mr-4' for="image">Banner Image</label>
                        <input 
                        onChange={(e) => setSelectedBannerImage(e.target.files[0])}
                        accept="image/*" 
                        style={{display:"none"}} 
                        id="icon-button-file-1"
                        type="file" />
                         <label htmlFor="icon-button-file-1">
                               <IconButton className='btn-block' style={{color:"darkRed" , border:"1px solid darkRed"}} aria-label="upload picture" component="div">
                                 <i class="fas fa-camera"></i>
                                </IconButton>
                         </label>
                         <small className='ml-3 font-weight-bold' >{selectedBannerImage ? selectedBannerImage.name :""}</small>
                        </div>
                    {/* NINTH INPUT */}
                    <div class="form-group">
                        <label className='admin-label mr-4' for="desc">Work With Us Image</label>
                        <input 
                        onChange={(e) => setSelectedWorkWithUsImage(e.target.files[0])} 
                        accept="image/*" 
                        style={{display:"none"}} 
                        id="icon-button-file-2"
                        type="file" />
                         <label htmlFor="icon-button-file-2">
                               <IconButton className='btn-block' style={{color:"darkRed" , border:"1px solid darkRed"}} aria-label="upload picture" component="div">
                                 <i class="fas fa-camera"></i>
                                </IconButton>
                         </label>
                         <small className='ml-3 font-weight-bold' >{selectedWorkWithUsImage ? selectedWorkWithUsImage.name :""}</small>
                        </div>
                        {/* EIGHT INPUT */}
                    <div class="form-group">
                        <label className='admin-label mr-4' for="desc">CEO Message Image</label>
                        <input 
                        onChange={(e) => setSelectedCeoMessageImage(e.target.files[0])} 
                        accept="image/*" 
                        style={{display:"none"}} 
                        id="icon-button-file-3"
                        type="file" />
                         <label htmlFor="icon-button-file-3">
                               <IconButton className='btn-block' style={{color:"darkRed" , border:"1px solid darkRed"}} aria-label="upload picture" component="div">
                                 <i class="fas fa-camera"></i>
                                </IconButton>
                         </label>
                         <small className='ml-3 font-weight-bold' >{selectedCeoMessageImage ? selectedCeoMessageImage.name :""}</small>
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
