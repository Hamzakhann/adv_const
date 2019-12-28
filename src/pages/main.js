import React, { useState, useEffect } from 'react';
import {useHistory } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';
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
    console.log("hello select" , cityFilteredProjects.length)
    if(cityFilteredProjects.length > selectedIndex + 1){
      setIndex(selectedIndex);
      setDirection(e.direction);
    }else{
      setIndex(0);
      setDirection(e.direction);  
    }
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
                <div className="col-md-12 white-text text-left text-md-left mt-xl-5 mb-5  wow">
                <h6 className='what-we' >What we do</h6>
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
               <Carousel indicators={false} activeIndex={selectedIndex} direction={direction} onSelect={handleSelect} interval={null} stopOnHover>
               { cityFilteredProjects ? cityFilteredProjects.map((project,index) => (
                <Carousel.Item key={index}>
                  <img className="d-block w-100" src={project.image} alt="First slide" />
                </Carousel.Item> )) : null}
              </Carousel> 
              </div>

          
          </div>
          

          { (cityFilteredProjects && cityFilteredProjects.length > 0) ? 
          <div className="col-md-10 col-sm-12 top-margin box">
              <div className="inner">
                <h6>{(cityFilteredProjects && cityFilteredProjects.length > 0 && cityFilteredProjects[selectedIndex]) ? cityFilteredProjects[selectedIndex].city +' ' + cityFilteredProjects[selectedIndex].type: null }</h6>
                <h3 className="h3-responsive font-weight-bold">{ (cityFilteredProjects && cityFilteredProjects.length > 0 && cityFilteredProjects[selectedIndex]) ? cityFilteredProjects[selectedIndex].short_description: null }</h3>
                <a style={{fontSize:"16px"}} data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample"><i class="fas fa-arrow-down"></i></a>
              </div>  
          </div> : null }
          { (cityFilteredProjects && cityFilteredProjects.length > 0) ? 
          <div className="col-md-2 col-sm-12 top-margin ">
            <div className="inner desktop-view" style={{ padding: "30px" }}>
         
              <h6>{(cityFilteredProjects && cityFilteredProjects.length > 0 && cityFilteredProjects[selectedIndex]) ? (cityFilteredProjects[selectedIndex + 1].city ? cityFilteredProjects[selectedIndex + 1].city : cityFilteredProjects[selectedIndex].city) +' ' + (cityFilteredProjects[selectedIndex + 1].type ? cityFilteredProjects[selectedIndex + 1].type : cityFilteredProjects[selectedIndex].type): null }</h6>      
              <div>
              <a href='#'  style={{cursor:'pointer'}} onClick={() => history.push('/product-details/' + cityFilteredProjects[selectedIndex +1].id ,  {projects:cityFilteredProjects})}  role="button" >See details</a>
              </div>

            </div>  
            <div style={{position:"absolute"  ,  fontSize:"35px"}} className="Mobile-view">
            <i style={{cursor:'pointer', background:"white" }}  class=" fas fa-arrow-left"></i>

            <i style={{cursor:'pointer', background:"white"}}  class="fas fa-arrow-right arrow-margin"></i>
</div>
           </div> 
           
           
           : null }
            <div className="col-md-12 col-sm-12 mt-2 box">
              <div className="collapse w-100 " id="collapseExample">
                <div className="card card-body">
                  <ul>
                  <li>Project Name : {(cityFilteredProjects && cityFilteredProjects.length > 0 && cityFilteredProjects[selectedIndex]) ? cityFilteredProjects[selectedIndex].name : null} </li>
                  <li>Short Description : {(cityFilteredProjects && cityFilteredProjects.length > 0 && cityFilteredProjects[selectedIndex]) ? cityFilteredProjects[selectedIndex].short_description : null} </li>
                  <li>Long Description : {(cityFilteredProjects && cityFilteredProjects.length > 0 && cityFilteredProjects[selectedIndex]) ? cityFilteredProjects[selectedIndex].long_description : null} </li>
                  <li>Total Price : {(cityFilteredProjects && cityFilteredProjects.length > 0 && cityFilteredProjects[selectedIndex]) ? cityFilteredProjects[selectedIndex].total_price : null} </li>
                  </ul> 
                  <div>
              <a href='#'  style={{cursor:'pointer' , float:"right" , color:"#C92027" , fontWeight:"bold"}} onClick={() => history.push('/product-details/' + cityFilteredProjects[selectedIndex].id ,  {projects:cityFilteredProjects})}  role="button" >See details</a>
              </div>   
                </div>            
              </div>
            </div>


          {/* Collapse ends here */}

          <div className="col-md-6 col-sm-12 box desktop-work-img" style={{marginTop: "100px"}}>
            <img src="/banner2.jpg" className="img-fluid" />    
          </div>
          <div className="col-md-6 col-sm-12 col-12 mob-view-margin work" style={{marginTop: "100px"}}>
            <div className="inner2 inner inner4" style={{height:"340px"}}>
              <h6>Work With Us</h6>
              <h3 className="h3-responsive font-weight-bold">Join Our Community of qualified professionals</h3>
              <Link style={{marginLeft:"-15px"}} className="nav-link" to="/work-at-acc/" >Apply now</Link>
            </div> 
          </div>
          <div className="col-md-6 col-sm-12 box mobile-work-img" >
            <img src="/banner2.jpg" className="img-fluid" />    
          </div>
          <div className="col-md-4 col-sm-12 box mob-margin" style={{marginTop: "100px"}}>
            <div className="inner">
              <div className="icon">
              <img src="/2.svg" className="main-page-icon mb-3" />
              </div> 
              <h3 className="h3-responsive who-we-are-content-edit font-weight-bold" style={{fontSize:"30px" , color:"black" , fontWeight:"bold"}}>{otherData.service_1_title}</h3>
              <p className='font-weight-bold who-we-are-content-edit' style={{color:'black' , fontWeight:"bold"}} >{otherData.service_1_desc}</p>
            </div> 
          </div>
          <div className="col-md-4 col-sm-12 mob-margin box" style={{marginTop: "100px"}}>
            <div className="inner">
              <div className="icon">
                <img src="/1.svg" className="main-page-icon mb-3" />
              </div>
              <h3 className="h3-responsive who-we-are-content-edit font-weight-bold" style={{fontSize:"30px"}}>{otherData.service_2_title}</h3>
              <p className='font-weight-bold who-we-are-content-edit' style={{color:'black' , fontWeight:"bold"}} >{otherData.service_2_desc}</p>
            </div> 
          </div>
          <div className="col-md-4 col-sm-12 mob-margin" style={{marginTop: "100px"}}>
            <div className="inner">
              <div className="icon">
                <img src="/3.svg" className="main-page-icon mb-3" />
              </div>
              <h3 className="h3-responsive who-we-are-content-edit font-weight-bold" style={{fontSize:"30px"}}>{otherData.service_3_title}</h3>
              <p className='font-weight-bold who-we-are-content-edit' style={{color:'black' , fontWeight:"bold"}} >{otherData.service_3_desc}</p>
            </div> 
          </div>

          <div className="col-md-6 col-sm-12 work box mob-view-margin" style={{marginTop: "100px"}}>
            <div className="inner inner3 " style={{height:"342px"}}> 
              <h6>Team</h6>
              <h3 className="who-we-are-heading">Get to know us a little</h3>
              <p>
              Get to know the team of professionals behind <br/>those great works
              </p>
              <Link className="nav-link pl-0 Mobile-view" to="/work-at-acc/" >Apply now</Link>

              <Link className="desktop-view" to="/team">Meet our team</Link>


            </div> 
          </div>
          <div className="col-md-6 col-sm-12  mob-margin " style={{marginTop: "100px"}}>
              <img src="/banner3.jpg" style={{width:"100%" , height:"auto"}} />     
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
