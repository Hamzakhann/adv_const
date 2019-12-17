import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel'

import  HeaderComponent from '../components/header';
import FooterComponent from '../components/footer';
import projectService from '../services/front/project.service';
import CitiesService from '../services/cities.service';
import indexPageService from '../services/front/index.service';


function MainPage() {
  let history = useHistory();
  const [city, setCity] = useState('jeddah');
  const [cities, setCities] = useState();
  const [selectedCity, setSelectedCity] = useState();
  const [projects, setProjects] = useState();
  const [otherData, setOtherData] = useState();
  const [cityFilteredProjects, setCityFilteredProjects] = useState();
  const [selectedIndex, setIndex] = useState(0);
  const [direction, setDirection] = useState(null);

  

  useEffect(() => {
    indexPageService.getAll().then(res => { 
      console.log('index page ', res);
      setProjects(res.slider_data);
      setOtherData(res.index_page_data[0])

      setCityFilteredProjects(res.slider_data.filter(project => project.city === city));
      setSelectedCity(city);
    });

    const ciitesService = new CitiesService();
    ciitesService.getAll().then(res => setCities(res));
   
  }, [])


  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
    setDirection(e.direction);

  };

  const onChangeCity = (city) => {
    setCityFilteredProjects(projects.filter(project => project.city === city));
    setSelectedCity(city);
    // console.log('filtered city ', projects.filter(project => project.city === city));
  }

  return (
      <div >
      <HeaderComponent topclassName={"fixed-top-header"}>
        <div className="view" style={{ backgroundImage :"url('/bannerr.jpg')", backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}}>
        <div className="mask rgba-gradient align-items-center">
            <div className="container">
            <div className="row header-text">
                <div className="col-md-12 white-text text-center text-md-left mt-xl-5 mb-5 wow">
                <h6 >What we do</h6>
                <p className="main-page-h1">Facing new challenges with<br />excellence and innovation</p>
                </div>
            </div>
            </div>
        </div>
        </div>
      </HeaderComponent>

      <main >
      <div className="container"  >
        {(otherData && projects) ? <div className="row py-5">

          <div className="col-md-12 col-sm-12 text-center">


                <ul className="nav nav-pills nav-justified mb-3" id="myTab" role="tablist">
                  {cities ? cities.map(city => (<li className="nav-item" key={city.id}>
                    <a className={selectedCity === city.name ? 'nav-link p-3 active': 'nav-link p-3'} id={city.id + '-tab'} data-toggle="tab" href="#one" role="tab" aria-controls={city.id}  onClick={() => onChangeCity(city.name)}>{city.name}</a>
                  </li>)) : null}
                </ul>


              <div className="tab-content" id="myTabContent">
               <Carousel activeIndex={selectedIndex} direction={direction} onSelect={handleSelect} stopOnHover>
               { cityFilteredProjects ? cityFilteredProjects.map((project,index) => (
                <Carousel.Item key={index}>
                  <img className="d-block w-100" src={project.image} alt="First slide" />
                  <Carousel.Caption>
                    <h3>{project.name}</h3>
                  </Carousel.Caption>
                </Carousel.Item> )) : null}
              </Carousel> 
              </div>

          
          </div>

          { (cityFilteredProjects && cityFilteredProjects.length > 0) ? <div className="col-md-10 col-sm-12 top-margin box">
              <div className="inner">
                <h6>{(cityFilteredProjects && cityFilteredProjects.length > 0 && cityFilteredProjects[selectedIndex]) ? cityFilteredProjects[selectedIndex].city +' ' + cityFilteredProjects[selectedIndex].type: null }</h6>
                <h3 className="h3-responsive font-weight-bold">{ (cityFilteredProjects && cityFilteredProjects.length > 0 && cityFilteredProjects[selectedIndex]) ? cityFilteredProjects[selectedIndex].short_description: null }</h3>
                <a data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">See details</a>
              </div>  
          </div> : null }
          { (cityFilteredProjects && cityFilteredProjects.length > 0) ? <div className="col-md-2 col-sm-12 top-margin">
            <div className="inner" style={{ padding: "30px" }}>
            <h6>{(cityFilteredProjects && cityFilteredProjects.length > 0 && cityFilteredProjects[selectedIndex]) ? cityFilteredProjects[selectedIndex].city +' ' + cityFilteredProjects[selectedIndex].type: null }</h6>
                {/* <span  onClick={() => history.push('/product-details/' + cityFilteredProjects[selectedIndex].id ,  {projects:cityFilteredProjects})}>See Details</span> */}
                <a href='#'  style={{cursor:'pointer'}} onClick={() => history.push('/product-details/' + cityFilteredProjects[selectedIndex].id ,  {projects:cityFilteredProjects})} role="button" >See details</a>
            </div>    
            </div> : null }


            <div className="col-md-12 col-sm-12 top-margin box">
              <div className="collapse w-100 mt-3" id="collapseExample">
                <div className="card card-body">
                  <ul>
                  <li>Project Name : {(cityFilteredProjects && cityFilteredProjects.length > 0 && cityFilteredProjects[selectedIndex]) ? cityFilteredProjects[selectedIndex].name : null} </li>
                  <li>Short Description : {(cityFilteredProjects && cityFilteredProjects.length > 0 && cityFilteredProjects[selectedIndex]) ? cityFilteredProjects[selectedIndex].short_description : null} </li>
                  <li>Long Description : {(cityFilteredProjects && cityFilteredProjects.length > 0 && cityFilteredProjects[selectedIndex]) ? cityFilteredProjects[selectedIndex].long_description : null} </li>
                  <li>Total Price : {(cityFilteredProjects && cityFilteredProjects.length > 0 && cityFilteredProjects[selectedIndex]) ? cityFilteredProjects[selectedIndex].total_price : null} </li>
                  </ul> 
                </div>            
              </div>
            </div>


          {/* Collapse ends here */}

          <div className="col-md-6 col-sm-12 box" style={{marginTop: "100px"}}>
            <img src="/banner2.jpg" className="img-fluid" />    
          </div>
          <div className="col-md-6 col-sm-12" style={{marginTop: "100px"}}>
            <div className="inner" style={{height:"340px"}}>
              <h6>Work With Us</h6>
              <h3 className="h3-responsive font-weight-bold">Join Our Community of qualified professionals</h3>
              <Link className="nav-link" to="/work-at-acc/#top" >Apply now</Link>
            </div> 
          </div>

          <div className="col-md-4 col-sm-12 box" style={{marginTop: "100px"}}>
            <div className="inner">
              <div className="icon">
              <img src="/icon1.1.png" className="main-page-icon" />
              </div> 
              <h3 className="h3-responsive font-weight-bold" style={{fontSize:"20px"}}>{otherData.service_1_title}</h3>
              <p>{otherData.service_1_desc}</p>
            </div> 
          </div>
          <div className="col-md-4 col-sm-12 box" style={{marginTop: "100px"}}>
            <div className="inner">
              <div className="icon">
                <img src="/icon2.1.png" className="main-page-icon" />
              </div>
              <h3 className="h3-responsive font-weight-bold" style={{fontSize:"20px"}}>{otherData.service_2_title}</h3>
              <p>{otherData.service_2_desc}g</p>
            </div> 
          </div>
          <div className="col-md-4 col-sm-12 " style={{marginTop: "100px"}}>
            <div className="inner">
              <div className="icon">
                <img src="/icon3.1.png" className="main-page-icon" />
              </div>
              <h3 className="h3-responsive font-weight-bold" style={{fontSize:"20px"}}>{otherData.service_3_title}</h3>
              <p>{otherData.service_3_desc}</p>
            </div> 
          </div>

          <div className="col-md-6 col-sm-12 box" style={{marginTop: "100px"}}>
            <div className="inner" style={{height:"360px"}}> 
              <h6>Team</h6>
              <h3 className="h3-responsive font-weight-bold">{otherData.team_title}</h3>
              <Link to="/team">Meet our team</Link>
            </div> 
          </div>
          <div className="col-md-6 col-sm-12 p-0" style={{marginTop: "100px"}}>
              <img src="/banner3.jpg" className="img-fluid" />     
            {/* <img src={otherData.team_image} className="img-fluid" />  */}
          </div>

        </div>: null}
      </div>
    </main>
    <hr style={{width:'100%' , marginBottom:'0px'}} />
      <FooterComponent></FooterComponent>
      </div>
  );
}

export default MainPage;
