import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import HeaderComponent from '../components/header.js';
import FooterComponent from '../components/footer.js';
import teamService from '../services/front/team.service';
import qualityService from '../services/front/quality.service';


function TeamPage() {
    const [teams, setTeam] = useState();
	const [quality, setQuality] = useState();

    useEffect(() => {
        qualityService.getAll().then(res => setQuality(res[0]));
        teamService.getAll().then(res => setTeam(res));
       
    }, []);
   console.log(`temassss`,teams);
    
    
        



    return (
        <div style={{ background: "#F7F7F7" }}>
            <HeaderComponent topclassName={" mob-header"} />


            <main className="mt-5" style={{ background: "#F7F7F7" }}>

                <div className="container mt-5 mb-5">
                    { teams ? teams.map(team => (

                    <div key={team.id} className='row mt-3' >
                        <div className='col-sm-12 col-12 col-md-6' >
                            <div className='team-member-description bg-white p-4' >
                                <h6 className='font-weight-bold who-we-are-heading' style={{fontSize:'20px'}} >{team.designation}</h6>
                                <h3 className='font-weight-bold who-we-are-heading' style={{fontSize:'35px'}} >{team.name}</h3>
                                <p>{team.description}</p>
                            </div>
                        </div>
                        <div className='col-sm-12 col-12 col-md-6 margin  ' >
                            <div className='team-member-image' >
                                <img className='img img-fluid' src={team.image} />
                            </div>
                        </div>
                    </div>
                          
                        )): null} 
                </div>
            </main>
            <section className='mb-n5 desktop-view' >
                <div className="container p-0 mb-4">
                    {quality ?
                    <div className="row">
                        <div className="col-md-6 col-sm-12 " style={{marginTop: "20px"}}>
                            <div className="inner"> 
                                <h6>Quality</h6>
                    <h3 className="h3-responsive who-we-are-heading">{quality.title}</h3>
                                <Link to="/quality" className="sidenavFont">Learn about our work</Link>
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-12 " style={{ marginTop: "20px"}}>
                        <img src={quality.banner_image} className="img-fluid" style={{paddingRight:"15px"}} />
                        </div>
                    </div>:null}
                </div>
                <br/>
                <br/>
                <br/>

            </section>
			<hr style={{width:'100%' , marginBottom:'0px'}} />

            <FooterComponent />
        </div>
    )
}

export default TeamPage
