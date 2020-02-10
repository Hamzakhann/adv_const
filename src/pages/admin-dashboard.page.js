import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';

import { useHistory } from 'react-router-dom';
import AdminHeaderComponent from '../components/admin-header.component';
import AdminFooter from '../components/admin-footer';
import './dashboard.css'
import axios from 'axios'
function AdminDashboardPage() {
    const history = useHistory()
    const [team , setTeam] = useState("")
    const [projects , setProjects] = useState("")
    const [ongoing , setOngoing] = useState("")
    const [completed , setCompleted] = useState("")
    const [cvs , setCvs] = useState("")
    const [jobs , setJobs] = useState("")

    useEffect(() =>{
        if(!localStorage.getItem("jwtToken")){
            history.push("/admin")
        }
        axios.get("https://adv-construction.herokuapp.com/admin/dashboard").then((res)=>{
            
            setTeam(res.data[0].total_team)
            setProjects(res.data[0].total_projects)
            setOngoing(res.data[0].total_ongoing_projects)
            setCompleted(res.data[0].total_completed_projects)
            setCvs(res.data[0].total_cvs)
            setJobs(res.data[0].total_jobs)
            console.log(`respobse`,res.data[0])
        }).catch(e=>alert(e))
    })
    return (
        <div className='contaiiner' >
             <AdminHeaderComponent  />
             
             <div className='container' >
                <div className='stats-container' >
                <div className='row' >
                     <div className='col-sm col-md-4' >

                              <div class="card mb-3 stats-card" >
                        
                        <div class="card-body ">
                            <h1 class="card-title text-center"><i class="fas fa-city"></i></h1>
                             <div className='stats-content' >
                    

                            <h3 class="card-text">TEAM</h3>
                            
                                <h3 class="card-text">{team ? team : "NA"}</h3>
                            </div>
                        </div>
                        </div>
                        
                 </div>
                
                     <div className='col-sm col-md-4' >
                     <div class="card  mb-3 stats-card" >
                        
                        <div class="card-body">
                            <h1 class="card-title text-center"><i class="fas fa-user-friends"></i></h1>
                            <div className='stats-content' >
                            <h3 class="card-text">PROJECTS</h3>
                            <h3 class="card-text">{projects ? projects : "NA"}</h3>
                            </div>
                        </div>
                        </div>
                    </div>
                     <div className='col-sm col-md-4' >
                          <div class="card  mb-3 stats-card" >
                    
                              <div class="card-body">
                            <h1 class="card-title text-center"><i class="fas fa-project-diagram"></i></h1>
                            <div className='stats-content' >
                                <h3 class="card-text">ONGOING PROJECTS</h3>
                                <h3 class="card-text">{ongoing ? ongoing : "NA"}</h3>
                                </div>
                    </div>
                    </div>
                     </div>
                 </div>

                 <div className='row' >
                 <div className='col-sm col-md-4' >
                     <div class="card  mb-3 stats-card" >
                        
                        <div class="card-body">
                            <h1 class="card-title text-center"><i class="fas fa-user-friends"></i></h1>
                            <div className='stats-content' >
                            <h3 class="card-text">COMPLETED PROJECTS</h3>
                            <h3 class="card-text">{completed ? completed : "NA"}</h3>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className='col-sm col-md-4' >
                     <div class="card  mb-3 stats-card" >
                        
                        <div class="card-body">
                            <h1 class="card-title text-center"><i class="fas fa-user-friends"></i></h1>
                            <div className='stats-content' >
                            <h3 class="card-text">CVs</h3>
                            <h3 class="card-text">{cvs ? cvs : "NA"}</h3>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className='col-sm col-md-4' >
                     <div class="card  mb-3 stats-card" >
                        
                        <div class="card-body">
                            <h1 class="card-title text-center"><i class="fas fa-user-friends"></i></h1>
                            <div className='stats-content' >
                            <h3 class="card-text">JOBS</h3>
                            <h3 class="card-text">{jobs ? jobs : "NA"}</h3>
                            </div>
                        </div>
                        </div>
                    </div>
                 </div>

                </div>
             </div>
             <AdminFooter/>
        </div>
    )
}

export default AdminDashboardPage
