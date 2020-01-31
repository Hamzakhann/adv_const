import React , {useState , useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {Button , IconButton} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import axios from 'axios';
import querystring from 'querystring';
import FormData from 'form-data'
import { url } from '../services/url';
import TeamService from '../services/team.service';
import AdminHeaderComponent from '../components/admin-header.component';
import './dashboard.css'
export default function AdminAddTeamPage() {
    const history = useHistory();
    const [flag , setFlag] = useState(false)
    const [isLoading , setLoading] = useState(false)
    const [name , setName] = useState("");
    const [designation , setDesignation] = useState("");
    const [description , setDescription] = useState("");
    const [teamImage , setImage] = useState("");
    useEffect(()=>{
        if(!localStorage.getItem("jwtToken")){
            history.push("/admin")
        }
    })
    const createTeam =() =>{
        if(!teamImage){
            alert("please select team image")
        }
        setLoading(true)
        let data = new FormData();
        data.append('image', teamImage);
        data.append('name', name);
        data.append('designation', designation);
        data.append('description', description);

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

        const teamService = new TeamService();
        teamService.create(data, config).then(res => {
            if (res.status === 200) {

                setLoading(false)
                history.push('/admin/teams');
            }
        }).catch(e=>{
            setLoading(false)
            alert(e)
        }) 
    }
    return (
        <div className='container-fluid p-0' >
            <AdminHeaderComponent pageName="Add Team" />
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
                            <label className='admin-label' for="name">Name</label>
                            <input 
                            type="email" 
                            class="form-control admin-input" 
                            id="name" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        {/* second input */}
                        <div class="form-group">
                            <label className='admin-label' for="designation">Designation</label>
                            
                            <input 
                            type="text" 
                            class="form-control admin-input" 
                            id="designation" 
                            value={designation}
                            onChange={(e) => setDesignation(e.target.value)}
                            />
                        </div>
                        {/* third input */}
                        <div class="form-group">
                            <label className='admin-label' for="description">Description</label>
                            <textarea 
                            class="form-control admin-textArea" 
                            id="description" 
                            rows="5"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            >
                            </textarea>
                        </div>
                        {/* FIFTH INPUT */}
                 <div class="form-group">
                        <label className='admin-label mr-4' for="desc">Choose Picture</label>
                        <input onChange={(e) => setImage(e.target.files[0])} accept="image/*" style={{display:"none"}} id="icon-button-file" type="file" />
                         <label htmlFor="icon-button-file">
                               <IconButton className='btn-block' style={{color:"darkRed" , border:"1px solid darkRed"}} aria-label="upload picture" component="div">
                                 <i class="fas fa-camera"></i>
                                </IconButton>
                         </label>
                         <small className='ml-3 font-weight-bold' >{teamImage ? teamImage.name :""}</small>
                        </div>
                        {/* Button */}
                        <Button  onClick={()=>createTeam()}  size="large"  variant="contained" className='btn-block admin-block-btn' >Add Team</Button>
                    </div>
                    )}
                </div>
            </div>
        </div>
    )
}
