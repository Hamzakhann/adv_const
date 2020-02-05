import React, { useEffect, useState } from 'react';
import {Button , IconButton} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import axios from 'axios';
import { url } from '../services/url';
import querystring from 'querystring';
import {useHistory} from 'react-router-dom'
import AdminHeaderComponent from '../components/admin-header.component';
import IndexpageService from '../services/IndexPage.service';



function AdminHomePage() {
    const history = useHistory()
    const [isLoading , setLoading] = useState(true)
    const [workWithUsTitle, setWorkWithUsTitle] = useState();
    const [workWithUsImage, setWorkWithUsImage] = useState();
    const [teamTitle, setTeamTitle] = useState();
    const [teamImage, setTeamImage] = useState();
    const [serviceTitle1, setServiceTitle1] = useState();
    const [serviceTitle2, setServiceTitle2] = useState();
    const [serviceTitle3, setServiceTitle3] = useState();
    const [serviceDescription1, setServiceDescription1] = useState();
    const [serviceDescription2, setServiceDescription2] = useState();
    const [serviceDescription3, setServiceDescription3] = useState();
    const [serviceIcon1, setServiceIcon1] = useState();
    const [serviceIcon2, setServiceIcon2] = useState();
    const [serviceIcon3, setServiceIcon3] = useState();
    const [bannerImage, setBannerImage] = useState();
    const [bannerText, setBannerText] = useState();
    const [selectedBannerImage, setSelectedBannerImage] = useState();
    const [selectedWorkWithUsImage, setSelectedWorkWithUsImage] = useState();
    const [selectedService1Icon, setSelectedService1Icon] = useState();
    const [selectedService2Icon, setSelectedService2Icon] = useState();
    const [selectedService3Icon, setSelectedService3Icon] = useState();
    const [selectedTeamImage, setSelectedTeamImage] = useState();
    useEffect(() => {
        if(!localStorage.getItem("jwtToken")){
            history.push("/admin")
        }
        axios.get(`${url}front/indexPage`).then(res => {
            console.log('res ', res.data);
            setWorkWithUsTitle(res.data.index_page_data[0].work_with_us_title);
            setWorkWithUsImage(res.data.index_page_data[0].work_with_us_image);
            setTeamTitle(res.data.index_page_data[0].team_title);
            setTeamImage(res.data.index_page_data[0].team_image);
            setServiceTitle1(res.data.index_page_data[0].service_1_title);
            setServiceTitle2(res.data.index_page_data[0].service_2_title);
            setServiceTitle3(res.data.index_page_data[0].service_3_title);
            setServiceDescription1(res.data.index_page_data[0].service_1_desc);
            setServiceDescription2(res.data.index_page_data[0].service_2_desc);
            setServiceDescription3(res.data.index_page_data[0].service_3_desc);
            setServiceIcon1(res.data.index_page_data[0].service_1_icon);
            setServiceIcon2(res.data.index_page_data[0].service_2_icon);
            setServiceIcon3(res.data.index_page_data[0].service_3_icon);
            setBannerImage(res.data.index_page_data[0].banner_image);
            setBannerText(res.data.index_page_data[0].banner_text);
            setLoading(false);
        })
        console.log(`haha`,bannerImage)
    } ,[])

    const updateQuality = async () => {

      let indexService= new  IndexpageService();
        if (selectedBannerImage) {
            let data = new FormData();
            data.append('image', selectedBannerImage);
    
            const response = await indexService.uploadImage(data);
            console.log(`ye mera bhai`,response.data)
    
            setBannerImage(response.data);

    
           }
           if (selectedWorkWithUsImage) {
            let data = new FormData();
            data.append('image', selectedWorkWithUsImage);
    
            const response = await indexService.uploadImage(data);
           
            setWorkWithUsImage(response.data);
           }

           if (selectedTeamImage) {
            let data = new FormData();
            data.append('image', selectedTeamImage);
    
            const response = await indexService.uploadImage(data);
          
    
            setTeamImage(response.data);
           }

           if (selectedTeamImage) {
            let data = new FormData();
            data.append('image', selectedTeamImage);
    
            const response = await indexService.uploadImage(data);
           
    
            setTeamImage(response.data);
           }
           console.log('data ', { work_with_us_title: workWithUsTitle,
            work_with_us_image: workWithUsImage,
            team_title: teamTitle,
            team_image: teamImage,
            service_1_title: serviceTitle1,
            service_2_title: serviceTitle2,
            service_3_title: serviceTitle3,
            service_1_desc:  serviceDescription1,
            service_2_desc:  serviceDescription2,
            service_3_desc:  serviceDescription3,
            service_1_icon:  serviceIcon1,
            service_2_icon:  serviceIcon2,
            service_3_icon:  serviceIcon3,
            banner_image:    bannerImage,
            banner_text:     bannerText });

           axios.post(`${url}admin/update_index_page`, querystring.stringify({
            work_with_us_title: workWithUsTitle,
            work_with_us_image: workWithUsImage,
            team_title: teamTitle,
            team_image: teamImage,
            service_1_title: serviceTitle1,
            service_2_title: serviceTitle2,
            service_3_title: serviceTitle3,
            service_1_desc:  serviceDescription1,
            service_2_desc:  serviceDescription2,
            service_3_desc:  serviceDescription3,
            service_1_icon:  serviceIcon1,
            service_2_icon:  serviceIcon2,
            service_3_icon:  serviceIcon3,
            banner_image:    bannerImage,
            banner_text:     bannerText
    
        }), {
            headers: { 
              "Content-Type": "application/x-www-form-urlencoded"
            }
          }).then(res => console.log('res ', res))
          setLoading(false);

    }
    return (
        <div>
            <AdminHeaderComponent  pageName="Home"/>
            <div className="container mt-md-5">
            <div className='main-form-container'>
          {isLoading ?
           ( <div className='container' >
                             <Skeleton style={{width:"100%" , height:"100px"}} animation="wave" />
                             <Skeleton style={{width:"100%" , height:"100px"}} animation="wave" />
                             <Skeleton style={{width:"100%" , height:"100px"}} animation="wave" />
                             <Skeleton style={{width:"100%" , height:"100px"}} animation="wave" />
                         </div>):
              ( <div className="admin-form">
                
                        <div class="form-group">
                            <label className='admin-label' for="title">Work With Us Title</label>
                            <input 
                            type="text" 
                            class="form-control admin-input" 
                            
                            value={workWithUsTitle} 
                            onChange={(e) => setWorkWithUsTitle(e.target.value)}                             />
                        </div>
                        <div class="form-group">
                        <label className='admin-label mr-4' for="desc">Work With Us Image:</label>
                        <input onChange={e => setSelectedWorkWithUsImage(e.target.files[0])} accept="image/*" style={{display:"none"}} id="icon-button-file" type="file" />
                         <label htmlFor="icon-button-file">
                               <IconButton className='btn-block' style={{color:"darkRed" , border:"1px solid darkRed"}} aria-label="upload picture" component="div">
                                 <i class="fas fa-camera"></i>
                                </IconButton>
                         </label>
                         <small className='ml-3 font-weight-bold' >{selectedWorkWithUsImage ? selectedWorkWithUsImage.name :""}</small>
                        </div>
                        <div class="form-group">
                            <label className='admin-label' for="title">Team Title</label>
                            <input 
                            type="text" 
                            class="form-control admin-input" 
                            
                            value={teamTitle} onChange={(e) => setTeamTitle(e.target.value)}                         />
                        </div>

                        <div class="form-group">
                        <label className='admin-label mr-4' for="desc">Team Image:</label>
                        <input onChange={e => setSelectedTeamImage(e.target.files[0])} accept="image/*" style={{display:"none"}} id="icon-button-file" type="file" />
                         <label htmlFor="icon-button-file">
                               <IconButton className='btn-block' style={{color:"darkRed" , border:"1px solid darkRed"}} aria-label="upload picture" component="div">
                                 <i class="fas fa-camera"></i>
                                </IconButton>
                         </label>
                         <small className='ml-3 font-weight-bold' >{selectedTeamImage ? selectedTeamImage.name :""}</small>
                        </div>
             
                    {/* ======================= */}
                    <div class="form-group">
                            <label className='admin-label' for="title">Banner Text</label>
                            <input 
                            type="text" 
                            class="form-control admin-input" 
                            
                            value={bannerText} onChange={(e) => setBannerText(e.target.value)}                        />
                        </div>

                        <div class="form-group">
                        <label className='admin-label mr-4' for="desc">Banner Image:</label>
                        <input onChange={e => setSelectedBannerImage(e.target.files[0])} accept="image/*" style={{display:"none"}} id="icon-button-file" type="file" />
                         <label htmlFor="icon-button-file">
                               <IconButton className='btn-block' style={{color:"darkRed" , border:"1px solid darkRed"}} aria-label="upload picture" component="div">
                                 <i class="fas fa-camera"></i>
                                </IconButton>
                         </label>
                         <small className='ml-3 font-weight-bold' >{selectedBannerImage ? selectedBannerImage.name :""}</small>
                        </div>

                  
                  <div class="form-group">
                            <label className='admin-label' for="title">First Service Title</label>
                            <input 
                            type="text" 
                            class="form-control admin-input" 
                            
                            value={serviceTitle1} onChange={(e) => setServiceTitle1(e.target.value)}                        />
                        </div>
                        <div class="form-group">
                            <label className='admin-label' for="title">First Service Description</label>
                            <input 
                            type="text" 
                            class="form-control admin-input" 
                            
                            value={serviceDescription1} onChange={(e) => setServiceDescription1(e.target.value)}                    />
                        </div>
                        <div class="form-group">
                        <label className='admin-label mr-4' for="desc">First Service Image:</label>
                        <input onChange={e => setSelectedService1Icon(e.target.files[0])} accept="image/*" style={{display:"none"}} id="icon-button-file" type="file" />
                         <label htmlFor="icon-button-file">
                               <IconButton className='btn-block' style={{color:"darkRed" , border:"1px solid darkRed"}} aria-label="upload picture" component="div">
                                 <i class="fas fa-camera"></i>
                                </IconButton>
                         </label>
                         <small className='ml-3 font-weight-bold' >{selectedService1Icon ? selectedService1Icon.name :""}</small>
                        </div>
                  
                        <div class="form-group">
                            <label className='admin-label' for="title">Second Service Title</label>
                            <input 
                            type="text" 
                            class="form-control admin-input" 
                            
                            value={serviceTitle2} onChange={(e) => setServiceTitle2(e.target.value)}                   />
                        </div>
                        <div class="form-group">
                            <label className='admin-label' for="title">Second Service Description</label>
                            <input 
                            type="text" 
                            class="form-control admin-input" 
                            
                            value={serviceDescription2} onChange={(e) => setServiceDescription2(e.target.value)}                 />
                        </div>
                        <div class="form-group">
                        <label className='admin-label mr-4' for="desc">Second Service Image:</label>
                        <input onChange={e => setSelectedService2Icon(e.target.files[0])} accept="image/*" style={{display:"none"}} id="icon-button-file" type="file" />
                         <label htmlFor="icon-button-file">
                               <IconButton className='btn-block' style={{color:"darkRed" , border:"1px solid darkRed"}} aria-label="upload picture" component="div">
                                 <i class="fas fa-camera"></i>
                                </IconButton>
                         </label>
                         <small className='ml-3 font-weight-bold' >{selectedService2Icon ? selectedService2Icon.name :""}</small>
                        </div>
                  
                        <div class="form-group">
                            <label className='admin-label' for="title">Third Service Title</label>
                            <input 
                            type="text" 
                            class="form-control admin-input" 
                            
                            value={serviceTitle3} onChange={(e) => setServiceTitle3(e.target.value)}               />
                        </div>
                        <div class="form-group">
                            <label className='admin-label' for="title">ThirdService Description</label>
                            <input 
                            type="text" 
                            class="form-control admin-input" 
                            
                            value={serviceDescription3} onChange={(e) => setServiceDescription3(e.target.value)}            />
                        </div>
                        <div class="form-group">
                        <label className='admin-label mr-4' for="desc">Third Service Image:</label>
                        <input onChange={e => setSelectedService3Icon(e.target.files[0])} accept="image/*" style={{display:"none"}} id="icon-button-file" type="file" />
                         <label htmlFor="icon-button-file">
                               <IconButton className='btn-block' style={{color:"darkRed" , border:"1px solid darkRed"}} aria-label="upload picture" component="div">
                                 <i class="fas fa-camera"></i>
                                </IconButton>
                         </label>
                         <small className='ml-3 font-weight-bold' >{selectedService3Icon ? selectedService3Icon.name :""}</small>
                        </div>
                        <Button  onClick={()=>updateQuality()}  size="large"  variant="contained" className='btn-block admin-block-btn' >Update</Button>
                    </div>)
}
                    </div>
                </div>
        </div>
    )
}

export default AdminHomePage
