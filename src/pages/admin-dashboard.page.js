import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AdminHeaderComponent from '../components/admin-header.component'
import './dashboard.css'
function AdminDashboardPage() {
    
    return (
        <div className='contaiiner' >
             <AdminHeaderComponent />
             <div className='container' >
                <div className='stats-container' >
                <div className='row' >
                     <div className='col-sm col-md-4' >
                     <div class="card bg-light mb-3 stats-card" >
                        
                        <div class="card-body">
                            <h1 class="card-title text-center"><i class="fas fa-city"></i></h1>
                             <div className='stats-content' >
                            <h3 class="card-text">Cities</h3>
                            <h3 class="card-text">08</h3>
                            </div>
                        </div>
                        </div>
                 </div>
                     <div className='col-sm col-md-4' >
                     <div class="card bg-light mb-3 stats-card" >
                        
                        <div class="card-body">
                            <h1 class="card-title text-center"><i class="fas fa-user-friends"></i></h1>
                            <div className='stats-content' >
                            <h3 class="card-text">Team</h3>
                            <h3 class="card-text">10</h3>
                            </div>
                        </div>
                        </div>
                    </div>
                     <div className='col-sm col-md-4' >
                     <div class="card bg-light mb-3 stats-card" >
                    
                    <div class="card-body">
                        <h1 class="card-title text-center"><i class="fas fa-project-diagram"></i></h1>
                         <div className='stats-content' >
                            <h3 class="card-text">Projects</h3>
                            <h3 class="card-text">120</h3>
                            </div>
                    </div>
                    </div>
                     </div>
                 </div>
                </div>
             </div>
        </div>
    )
}

export default AdminDashboardPage
