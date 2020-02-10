import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import HeaderComponent from "../components/header";
import FooterComponent from "../components/footer";
import projectService from "../services/front/project.service";
import CitiesService from "../services/cities.service";
import NoItemFound from "../components/noItemFound";
import ProjectComponent from "../components/ProjectComponent";
import {Modal} from 'react-bootstrap';
import { Carousel } from "react-responsive-carousel";
export default function ProjectsPage() {
  let history = useHistory();
  const [cities, setCitites] = useState();
  const [projectList, setProjectList] = useState();
  const [selectedCity, setSelectedCity] = useState();
  const [cityFilteredProjects, setCityFilteredProjects] = useState();
  const ciitesService = new CitiesService();
  const [projectType, setProjectType] = useState();
  const [currentProject , setCurrentProject] = useState(null)
  const [show, setShow] = useState(false);
  const [isLoading , setIsLoading] = useState(true)
  const [visible  , setVisible] = useState(8)
  const [safari , setSafari] = useState(false)
  useEffect(() => {
    if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) 
      { 
        setSafari(true);          
        }
    Promise.all([projectService.getAll(), ciitesService.getAll()]).then(res => {
      console.log("res check", res);
      setProjectList(res[0].sort((a,b) => parseFloat(a.id) - parseFloat(b.id)));

      setCitites(res[1]);
      setSelectedCity('all');
      setProjectType('all')
      setCityFilteredProjects(
        res[0]
      );
      setIsLoading(false)
    });

  }, []);

  const onChangeCity = city => {
    if(city === 'all'){
      setVisible(8)
      setSelectedCity(city);
      setCityFilteredProjects(projectList)      
    }else{
      setVisible(8)
      setSelectedCity(city);
      setCityFilteredProjects(
        projectList.filter(project =>
           project.city === city
           )
      );
    }
    // setProjectIds(cityFilteredProjects.map(project=>project.id))
  };

  const onChangeProjectType = type => {
    if(selectedCity === 'all'){
      setVisible(8)
      setProjectType(type);
      setCityFilteredProjects(
        projectList.filter(
          project => project.type === type
        )
      );
    }else{
      setVisible(8)
      setProjectType(type);
      setCityFilteredProjects(
        projectList.filter(
          project => project.type === type && selectedCity === project.city
          
        )
      );

    }
  };

  const onChangeResetProjectType = reset_city => {
    if(reset_city === 'all'){
      setVisible(8)
      setSelectedCity(reset_city);
      setProjectType('all')
      setCityFilteredProjects(
        projectList
      );
    }
    else{
      setVisible(8)
      setSelectedCity(reset_city);
      setProjectType('all')
      setCityFilteredProjects(
        projectList.filter(project => reset_city === project.city)
      );
    }
  };
  const setCarosal = (c_project)=>{
    setCurrentProject(c_project)
    setShow(true)
  }
  // const handleClose = () => setShow(false);
  return (
    <div style={{ background: '#fff' }}>
      <HeaderComponent topclassName={"fixed-top-header-top mob-header"}></HeaderComponent>
      <main style={{ background: "#fff" }}>
        <div className='' style={{maxWidth:safari && safari ? "1131px":"1080px",paddingRight:"15px", paddingLeft:"15px" , marginLeft:"auto" , marginRight:"auto"}}  >
      {/* <div style={{maxWidth:safari && safari ? "1131px":"1080px"}}> */}
        {/* {safari && safari ? <div style={{maxWidth:"1131px"}}> : <div className="container">} */}
          <div className="row">
            <div className="col-md-12 col-sm-12">
              <div className="two-heding">
                <h3 className="h3-responsive font-weight-bold" style={{ marginTop: "30px",paddingLeft:"15px" }}>
                  We have pride in our <br className="Mobile-view"/> portfolio
                </h3>
              </div>
            </div>
          </div>

                <div className='city-inline '>
                <div  className=' Mobile-view ' >
                    <ul  className="nav nav-pills " id="myTab2" role="tablist">
                      <li  className="nav-item  ml-4  icon-li" 
                                  style={{borderBottom:projectType === 'bridge'?'4px solid #C92027':'none'}}
                                   onClick={() => onChangeProjectType("bridge")}>
                      {projectType === 'bridge' ?<img  src="/red-bridge.svg" className='bridge-img'  /> :<img  src="/black-bridge.svg" className='bridge-img'  />}
                      </li>
                      <li className="nav-item  ml-4  icon-li"
                              style={{borderBottom:projectType === 'marine'?'4px solid #C92027':'none'}}
                                  onClick={() => onChangeProjectType("marine")}>
                       {projectType === 'marine' ?<img src="/red-cruise.svg " className='marine-img' /> :<img src="/black-cruise.svg " className='marine-img' />}
                        </li>
                      <li className="nav-item  ml-4  icon-li" 
                      style={{borderBottom:projectType === 'building'?'4px solid #C92027':'none'}}
                      onClick={() => onChangeProjectType("building")}>
                        {projectType === 'building' ?<img  src="/red-building.svg" className='building-img' />: <img  src="/black-building.svg" className='building-img' />}
                      </li>
                      <li className="nav-item  ml-4  icon-li"
                      style={{borderBottom:projectType === 'road'?'4px solid #C92027':'none'}}
                      onClick={() => onChangeProjectType("road")}>
                      {projectType === 'road' ? <img src="/red-road.svg" className='road-img' />:<img src="/black-road.svg" className='road-img' />}
                      </li>
                      <li className="nav-item  ml-4  icon-li" 
                      style={{borderBottom:projectType === 'all'?'4px solid #C92027':'none'}}
                      onClick={() => onChangeResetProjectType(selectedCity)}>
                       {projectType === 'all' ?<img  src="/red-reset.svg" className='all-img' />: <img  src="/black-reset.svg" className='all-img' />}
                      </li>
                    </ul>
                  </div>


                  <div className= ' project-page-tab ' style={{paddingLeft:"15px"}}>
                    <ul className="nav nav-pills mob-tab nav-justified mb-3 project-page-border " role="tablist">

                    <li className="nav-item name-mac" >
                              <a className={ selectedCity === 'all' ? "nav-link p-2 active"
                                  : "nav-link p-2" } id="one-tab" data-toggle="tab" href="#one" 
                                  role="tab" aria-controls='ALL' aria-selected="true"
                                  onClick={() => onChangeCity('all')}
                                  >
                                {isLoading ? '':'ALL'}
                              </a>
                            </li>
                      {cities ? cities.map(city => (
                            <li className="nav-item name-mac" key={city.id}>
                              <a className={ selectedCity === city.name ? "nav-link p-2 active"
                                  : "nav-link p-2" } id="one-tab" data-toggle="tab" href="#one" 
                                  role="tab" aria-controls={city.id} aria-selected="true" 
                                  onClick={() => onChangeCity(city.name)}>
                                {city.name}
                              </a>
                            </li>
                          ))
                        : null}
                    </ul>
                  </div>

                  <div  className='icons desktop-view2  ' >
                    <ul  className="nav nav-pills " id="myTab2" role="tablist">
                      <li  className="nav-item    icon-li" 
                                  style={{borderBottom:projectType === 'bridge'?'4px solid #C92027':'none'}}
                                   onClick={() => onChangeProjectType("bridge")}>
                      {projectType === 'bridge' ?<img  src="/red-bridge.svg" className='bridge-img'  /> :<img  src="/black-bridge.svg" className='bridge-img'  />}
                      </li>
                      <li className="nav-item    icon-li"
                              style={{borderBottom:projectType === 'marine'?'4px solid #C92027':'none'}}
                                  onClick={() => onChangeProjectType("marine")}>
                       {projectType === 'marine' ?<img src="/red-cruise.svg" className='marine-img' /> :<img src="/black-cruise.svg" className='marine-img' />}
                        </li>
                      <li className="nav-item    icon-li" 
                      style={{borderBottom:projectType === 'building'?'4px solid #C92027':'none'}}
                      onClick={() => onChangeProjectType("building")}>
                        {projectType === 'building' ?<img  src="/red-building.svg" className='building-img' />: <img  src="/black-building.svg" className='building-img' />}
                      </li>
                      <li className="nav-item    icon-li"
                      style={{borderBottom:projectType === 'road'?'4px solid #C92027':'none'}}
                      onClick={() => onChangeProjectType("road")}>
                      {projectType === 'road' ? <img src="/red-road.svg" className='road-img' />:<img src="/black-road.svg" className='road-img' />}
                      </li>
                      <li className="nav-item    icon-li" 
                      style={{borderBottom:projectType === 'all'?'4px solid #C92027':'none'}}
                      onClick={() => onChangeResetProjectType(selectedCity)}>
                       {projectType === 'all' ?<img  src="/red-reset.svg" className='all-img' />: <img  src="/black-reset.svg" className='all-img' />}
                      </li>
                    </ul>
                  </div>

                </div>

                <div className="mt-4">
                  <div  >
                    <div className="container">
                      <div className="row">
                        
                        {isLoading ? 'Loading........' : cityFilteredProjects && cityFilteredProjects.length ? (
                         cityFilteredProjects.slice(0,visible).map(project => (
                            <ProjectComponent
                            
                            setCarosal={setCarosal}
                            project={project} 
                            onClick={()=>{history.push("/product-details/" + project.id, {projects:cityFilteredProjects})}}
                            key={project.id} 
                            />
                          ))
                        ) : (
                          <NoItemFound />
                        )}
                        <button onClick={() => setVisible(visible + 8)} className='btn btn-light btn-block btn-load-more' >Load more</button>
                      </div> 
                    </div>
                  </div>
                </div>
 
             


          </div>
 
        <hr style={{width:'100%' , marginBottom:'0px'}} />
      </main>
      <FooterComponent></FooterComponent>
      {/* <Modal
          className='p-0'
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={show} onHide={handleClose}>
          {
          currentProject === null ? '' 
          : 
          (
            <Carousel  autoPlay={true} showThumbs={false}
            showStatus={false} infiniteLoop stopOnHover
             >
            <div>
              <img style={{ height: "320px" }} src={currentProject.image} 
              className="img-fluid" />
            </div>
            <div>
              <img style={{ height: "320px" }} className="img-fluid"
                src={currentProject.mini_image1} />
            </div>
            <div>
              <img style={{ height: "320px" , width:'100%' }} className="img-fluid"
                src={currentProject.mini_image2} />
            </div>
          </Carousel>
          )
          }

      </Modal> */}
    </div>
  );
}

// setProjectIds(res[1][1].map(project=>project.id))