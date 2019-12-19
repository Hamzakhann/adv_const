import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';

function FooterComponent(props) {
  const [MobileView,setMobileView]=useState(false);
  
 
  useEffect(()=>{
    const screenWidth=window.innerWidth;

if(screenWidth<992){

    setMobileView(true);
  }
  else{
    setMobileView(false);
  }
  });
  

  return (
       <footer >
         {props.children}
         <div className="container-fluid Mobile-view">
        <div className='container' >
        <div className="row">
          <div className="col-md-8 p-3 row col-12 col-sm-12 row border-bottom">
          <ul className="nav pt-3 col-4 col-sm-4">
              <li className="nav-item">
               <Link style={{color:'black'}}  className="nav-link p-0 pb-2" to="/">Home</Link></li>
              <li className="nav-item">
                <Link style={{color:'black'}} className="nav-link p-0 pb-2" to="/who-we-are">Who We Are</Link>
              </li>
              <li className="nav-item">
                 <Link style={{color:'black'}} className="nav-link p-0 pb-2" to="/quality">Quality</Link>
              </li>
              </ul>
              <ul className="nav pt-3 col-4 col-sm-4">

              <li className="nav-item">
                <Link style={{color:'black'}} className="nav-link p-0 pb-2" to="/team">Team</Link>
              </li>
              <li className="nav-item">
                <Link style={{color:'black'}} className="nav-link p-0 pb-2" to="/projects">Projects</Link>
              </li>
              <li className="nav-item">
                <Link style={{color:'black'}} className="nav-link p-0 pb-2" to="/work-at-acc">Work At Acc</Link>
              </li>
            
              </ul>
          <ul className="nav pt-3 col-4 col-sm-4">
              
              <li className="nav-item">
                <Link style={{color:'black'}} className="nav-link p-0 pb-2" to="/contact-us">Contact Us</Link>
              </li>
              </ul>
             </div>


<div className=" row">

              <ul className="nav mr-auto w-50 col-4 col-sm-4 ">
                <li className="nav-item "><a target="_blank" href="https://www.facebook.com/advancedconstructionsa/" className="nav-link icoFacebook social-icon mt-4" title="Facebook"><img src="/fb.png" /></a></li>
                <li className="nav-item"><a target="_blank" href="https://www.linkedin.com/mwlite/company/advanced-construction-company-for-contracting-maintenance" className="nav-link icoLinkedin social-icon mt-4" title="Linkedin"><img src="/linked.png" /></a></li>
              </ul>
            
          
            <Link className="float-right mt-md-2 col-8 col-sm-8" to="/">
              <img src="/logo.png" className="img-fluid" style={{width:'280px' , height:'110px'}}/>
            </Link>
            
          </div>
        </div>
        </div>
        <hr/>
        <div className="row ">
          <div className="col-9 ml-auto">
            <p style={{color:'black', fontSize:'10px'}} className="copyRight">&copy; 1996-2020 Advance Construction Co. <span>All right Reserved</span></p>
          </div>
        </div>

      </div>
      <div className="container-fluid desktop-view">
        <div className='container' >
        <div className="row">
          <div className="col-md-8 p-3 row ">
              <ul className="nav mr-auto pb-3 w-50  border-bottom">
                <li className="nav-item"><a target="_blank" href="https://www.facebook.com/advancedconstructionsa/" className="nav-link icoFacebook social-icon" title="Facebook"><img src="/fb.png" /></a></li>
                <li className="nav-item"><a target="_blank" href="https://www.linkedin.com/mwlite/company/advanced-construction-company-for-contracting-maintenance" className="nav-link icoLinkedin social-icon" title="Linkedin"><img src="/linked.png" /></a></li>
                <li className="nav-item"><a target="_blank"  href="https://www.google.com/url?sa=t&source=web&rct=j&url=https://www.instagram.com/advancedconstruction_co/%3Figshid%3D8pkwlxt6am2h&ved=2ahUKEwjHmu_8zaXmAhWLmBQKHa6eB18QFjAAegQIAxAB&usg=AOvVaw3N4xeaT-JBfOTZnoSYy4hL" className="nav-link icoLinkedin social-icon" title="Instagram"><img src="/instagram.png" /></a></li>
              </ul>
              <ul className="nav pt-3 ">
              <li className="nav-item">
               <Link style={{color:'black'}}  className="nav-link" to="/">Home</Link></li>
              <li className="nav-item">
                <Link style={{color:'black'}} className="nav-link" to="/who-we-are">Who We Are</Link>
              </li>
              <li className="nav-item">
                 <Link style={{color:'black'}} className="nav-link" to="/quality">Quality</Link>
              </li>
              <li className="nav-item">
                <Link style={{color:'black'}} className="nav-link" to="/team">Team</Link>
              </li>
              <li className="nav-item">
                <Link style={{color:'black'}} className="nav-link" to="/work-at-acc">Work At Acc</Link>
              </li>
              <li className="nav-item">
                <Link style={{color:'black'}} className="nav-link" to="/projects">Projects</Link>
              </li>
              <li className="nav-item">
                <Link style={{color:'black'}} className="nav-link" to="/contact-us">Contact Us</Link>
              </li>
            </ul>

          </div>
          <div className="col-md-4 p-3">
            <Link className="float-right mt-md-2" to="/">
              <img src="/logo.png" className="img-fluid" style={{width:'280px' , height:'110px'}}/>
            </Link>
            
          </div>
        </div>
        </div>
        <hr/>
        <div className="row ">
          <div className="col-md-5 ml-auto">
            <p style={{color:'black'}} className="copyRight">&copy; 1996-2020 Advance Construction Co. <span>All right Reserved</span></p>
          </div>
        </div>

      </div>
 
    </footer>
  );
}

export default FooterComponent;
