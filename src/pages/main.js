import React, { useState, useEffect } from 'react';
import {useHistory } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';
import Carousel from 'react-bootstrap/Carousel'

import  HeaderComponent from '../components/header';
import FooterComponent from '../components/footer';
import projectService from '../services/front/project.service';
import CitiesService from '../services/cities.service';
import indexPageService from '../services/front/index.service';
import './carosal.css';

function MainPage() {
  let history = useHistory();
  const [city, setCity] = useState('UMLUJ');
  const [cities, setCities] = useState();
  const [selectedCity, setSelectedCity] = useState();
  const [projects, setProjects] = useState();
  const [otherData, setOtherData] = useState();
  const [cityFilteredProjects, setCityFilteredProjects] = useState();
  const [selectedIndex, setIndex] = useState(0);
  const [direction, setDirection] = useState(null);
  const [others , setOthers] = useState('')
  const [index, setCIndex] = useState(0);

  useEffect(() => {
    indexPageService.getAll().then(res => { 
      console.log('index page ', res);
      setProjects(res.slider_data);
      setOtherData(res.index_page_data[0])

      setCityFilteredProjects(res.slider_data.filter(project => project.city === city));
      setSelectedCity(city);
      let newData = res.slider_data.filter(project => project.city === city)
      setOthers([...newData.slice(1,newData.length) , newData[0]])
    });

    const ciitesService = new CitiesService();
    ciitesService.getAll().then(res => setCities(res));

   
  }, [])


  const handleSelect = (selectedIndex, e) => {
    console.log(cityFilteredProjects , 'hhhh')
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
    let newData = projects.filter(project => project.city === city)
    if(newData.length < 4){
    }else{
      setOthers([...newData.slice(1,newData.length) , newData[0]])
    }
    setCIndex(0)
    // console.log('filtered city ', projects.filter(project => project.city === city));
  }

  const setcarosal = () =>{
      
    if(index < cityFilteredProjects.length-1){
        setCIndex(index+1)

    }else{
        setCIndex(0)
    }

   
    let newArry = others.splice(0,1)
    

    setOthers([...others , ...newArry])
    


}
const setcarosalPrev = () =>{
      
  if(index>0){
      setCIndex(index-1)

  }



}

console.log("others check" , others)
  return (
      <div >
      <HeaderComponent topclassName={"fixed-top-header"}>
        <div className="view " style={{ backgroundImage :"url('/bannerr.jpg')", backgroundRepeat: 'round' }}>
        <div className="mask rgba-gradient align-items-center" >
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
        {(otherData && projects) ? <div className="row desk-pading ">

          <div className="col-md-12 col-sm-12 text-center">


                <ul className="nav nav-pills mob-tab nav-justified mb-3" id="myTab" role="tablist">
                  {cities ? cities.map(city => (<li className="nav-item" key={city.id}>
                    <a className={selectedCity === city.name ? 'nav-link p-3 active': 'nav-link p-3'} id={city.id + '-tab'} data-toggle="tab" href="#one" role="tab" aria-controls={city.id}  onClick={() => onChangeCity(city.name)}>{city.name}</a>
                  </li>)) : null}
                </ul>


                <div className='slider-container ' >
              <Carousel indicators={false} activeIndex={index} direction={direction} controls={false}>
              {cityFilteredProjects && cityFilteredProjects.map((project)=>{
              return(
                <Carousel.Item className="mob-view-sliders w-100 ">
                <img
                  className="d-block w-100 img-fluid "
                  src={project.image}
                  alt="First slide"
                  className='id-block w-100'
                />
                </Carousel.Item>
              )
          })}
      </Carousel>
      <div className='side-crop mob-view-slider' onClick={()=> setcarosal()}>
      <img
            className="d-block w-100 sm-carosal "
            src={others && others[0].image}
            alt="Third slide"
          />
      </div>
      <div className='side-crop mob-view-slider desktop-view'onClick={()=> setcarosal()} >
      <img
            className="d-block w-100 sm-carosal"
            src={others && others[1].image}
            alt="Third slide"

          />
      </div>
      <div className='side-crop mob-view-slider desktop-view' onClick={()=> setcarosal()} >
      <img
            className="d-block w-100 sm-carosal"
            src={others && others[2].image}
            alt="Third slide"

          />
      </div>
              </div>

          
          </div>
          

          { (cityFilteredProjects && cityFilteredProjects.length > 0) ? 
          
          <div className="col-md-10 col-sm-9 col-9 mob-padding-main top-margin box">
              <div className="inner  mob-size">
                <h6>{(cityFilteredProjects && cityFilteredProjects.length > 0 && cityFilteredProjects[index]) ? cityFilteredProjects[index].city +' ' + cityFilteredProjects[index].type: null }</h6>
                <h3 className="h3-responsive font-weight-bold">{ (cityFilteredProjects && cityFilteredProjects.length > 0 && cityFilteredProjects[index]) ? cityFilteredProjects[index].short_description: null }</h3>
                <a style={{fontSize:"16px"}} data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample"><i class="fas fa-arrow-down"></i></a>
              </div>  
          </div> : null }
          { (cityFilteredProjects && cityFilteredProjects.length > 0) ? 
          
          <div className="col-md-2 col-sm-3 col-3  mob-padd-main " style={{marginTop:"20px"}}>
            
            <div className="inner mob-size mob-main-margin" style={{ padding: "30px" }}>
             <div style={{display:"flex"}} >
             <div>
              <h6  style={{lineHeight:"0.7em", fontSize:"12px"}} >{cityFilteredProjects && (cityFilteredProjects[index+1] === undefined ? cityFilteredProjects[0].type :cityFilteredProjects[index +1].type)}</h6>
               <h4 style={{fontWeight:"bold", lineHeight:"0.6em", height:"23px",width:"73px",whiteSpace:"nowrap" , overflow:"hidden" , textOverflow:"clip"}} >{cityFilteredProjects && (cityFilteredProjects[index+1] === undefined ? cityFilteredProjects[0].short_description :cityFilteredProjects[index +1].short_description)}</h4>
                  <a   style={{cursor:'pointer'}} onClick={() => history.push('/product-details/' + cityFilteredProjects[(index + 1) == undefined ? 0 :(index+1)].id ,  {projects:cityFilteredProjects})}  role="button" >See details</a>
              </div>
              <div style={{position:"absolute" , float:"right" , right:"-14%" , top:"34%"}} className="desktop-view" >
              <i onClick={()=> setcarosal()} class="fas fa-arrow-right" style={{fontSize:"37px" , cursor:"pointer"}} ></i>
              </div>
             
             </div>
             
            </div>  
  
            <div style={{position:"absolute"   , fontSize:"35px"}} className="Mobile-view">
             <i onClick={()=> setcarosalPrev()} style={{cursor:'pointer', background:"white",marginLeft:"-265px" }}  class=" fas fa-arrow-left "></i>
 
             <i onClick={()=> setcarosal()} style={{cursor:'pointer', background:"white",marginLeft:"282px" }}  class="fas fa-arrow-right "></i>
             </div>
           </div> 
           
          
           : null }
           
             
              
           
         
           
                      
            <div className="col-md-12 col-sm-12 mt-2 box">
              <div className="collapse w-100 " id="collapseExample">
                <div className="card card-body">
                  <ul>
                  <li>Project Name : {(cityFilteredProjects && cityFilteredProjects.length > 0 && cityFilteredProjects[index]) ? cityFilteredProjects[index].name : null} </li>
                  <li>Short Description : {(cityFilteredProjects && cityFilteredProjects.length > 0 && cityFilteredProjects[index]) ? cityFilteredProjects[index].short_description : null} </li>
                  <li>Long Description : {(cityFilteredProjects && cityFilteredProjects.length > 0 && cityFilteredProjects[index]) ? cityFilteredProjects[index].long_description : null} </li>
                  <li>Total Price : {(cityFilteredProjects && cityFilteredProjects.length > 0 && cityFilteredProjects[index]) ? cityFilteredProjects[index].total_price : null} </li>
                  </ul> 
                  <div>
              <a href='#'  style={{cursor:'pointer' , float:"right" , color:"#C92027" , fontWeight:"bold"}} onClick={() => history.push('/product-details/' + cityFilteredProjects[index].id ,  {projects:cityFilteredProjects})}  role="button" >See details</a>
              </div>   
                </div>            
              </div>
            </div>


          {/* Collapse ends here */}

          <div className="col-md-6 col-sm-12 box desktop-work-img" style={{marginTop: "100px"}}>
            <img src="/banner2.jpg" className="img-fluid" />    
          </div>
          <div className="col-md-6 col-sm-12 col-12 mob-view-margin work" style={{marginTop: "100px"}}>
            <div className="inner2 inner inner4" style={{height:"100%"}}>
              <h6>Work With Us</h6>
              <h3 className="h3-responsive font-weight-bold">Join Our community of qualified professionals</h3>
              <Link style={{marginLeft:"-15px"}} className="nav-link" to="/work-at-acc/" >Apply now</Link>
            </div> 
          </div>
          <div className="col-md-6 col-sm-12 box mobile-work-img" >
            <img src="/banner2.jpg" className="img-fluid" />    
          </div>
          <div className="col-md-4 col-sm-12 box mob-margin" style={{marginTop: "100px"}}>
            <div className="inner">
              <div className="icon">
              <img src="/2.svg" className="main-page-icon icon-margin" />
              </div> 
              <h3 className="h3-responsive who-we-are-content-edit font-weight-bold" style={{fontSize:"30px" , color:"black" , fontWeight:"bold"}}>{otherData.service_1_title}</h3>
              <p className='font-weight-bold who-we-are-content-edit' style={{color:'black' , fontWeight:"bold"}} >{otherData.service_1_desc}</p>
            </div> 
          </div>
          <div className="col-md-4 col-sm-12 mob-margin box" style={{marginTop: "100px"}}>
            <div className="inner">
              <div className="icon">
                <img src="/1.svg" className="main-page-icon icon-margin" />
              </div>
              <h3 className="h3-responsive who-we-are-content-edit font-weight-bold" style={{fontSize:"30px"}}>{otherData.service_2_title}</h3>
              <p className='font-weight-bold who-we-are-content-edit' style={{color:'black' , fontWeight:"bold"}} >{otherData.service_2_desc}</p>
            </div> 
          </div>
          <div className="col-md-4 col-sm-12 mob-margin" style={{marginTop: "100px"}}>
            <div className="inner">
              <div className="icon">
                <img src="/3.svg" className="main-page-icon icon-margin" />
              </div>
              <h3 className="h3-responsive who-we-are-content-edit font-weight-bold" style={{fontSize:"30px"}}>{otherData.service_3_title}</h3>
              <p className='font-weight-bold who-we-are-content-edit' style={{color:'black' , fontWeight:"bold"}} >{otherData.service_3_desc}</p>
            </div> 
          </div>

          <div className="col-md-6 col-sm-12  box mob-view-margin" style={{marginTop: "100px"}}>
            <div className="inner inner3 " style={{height:"100%"}}> 
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
