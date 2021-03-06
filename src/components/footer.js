import React from 'react';
import { Link } from 'react-router-dom';

function FooterComponent(props) {
  return (
       <footer className='container-fluid p-0' >

         {props.children}
         <div className="container-fluid Mobile-view">
        <div className='container' >
        <div className="row">
          <div className="col-md-8 p-3 row col-12 col-sm-12 row ">
          <ul className="nav pt-3 col-4 col-sm-4">
              <li className="nav-item">
               <Link style={{color:'black'}}  className="nav-link p-0 pb-2 founder-font" to="/">Home</Link></li>
              <li className="nav-item">
                <Link style={{color:'black'}} className="nav-link p-0 pb-2 founder-font" to="/who-we-are">Who We Are</Link>
              </li>
              <li className="nav-item">
                 <Link style={{color:'black'}} className="nav-link p-0 pb-2 founder-font" to="/quality">Quality</Link>
              </li>
              </ul>
              <ul className="nav pt-3 col-4 col-sm-4">

              <li className="nav-item">
                <Link style={{color:'black'}} className="nav-link p-0 pb-2 founder-font" to="/team">Team</Link>
              </li>
              <li className="nav-item">
                <Link style={{color:'black'}} className="nav-link p-0 pb-2 founder-font" to="/projects">Projects</Link>
              </li>
              <li className="nav-item">
                <Link style={{color:'black'}} className="nav-link p-0 pb-2 founder-font" to="/work-at-acc">Work At Acc</Link>
              </li>
            
              </ul>
          <ul className="nav pt-3 col-4 col-sm-4">
              
              <li className="nav-item">
                <Link style={{color:'black'}} className="nav-link p-0 pb-2 founder-font" to="/contact-us">Contact Us</Link>
              </li>
              </ul>

          </div>

<div className=" row border-top">

              <ul className="nav mr-0 w-50 col-5 col-sm-5 p-0">
                <li className="nav-item "><a target="_blank" href="https://www.facebook.com/advancedconstructionsa/" className="nav-link icoFacebook social-icon mt-4" title="Facebook"><img src="/fb.png" /></a></li>
                <li className="nav-item"><a target="_blank" href="https://www.linkedin.com/mwlite/company/advanced-construction-company-for-contracting-maintenance" className="nav-link icoLinkedin social-icon mt-4" title="Linkedin"><img src="/linked.png" /></a></li>
                <li className="nav-item"><a target="_blank"  href="https://www.google.com/url?sa=t&source=web&rct=j&url=https://www.instagram.com/advancedconstruction_co/%3Figshid%3D8pkwlxt6am2h&ved=2ahUKEwjHmu_8zaXmAhWLmBQKHa6eB18QFjAAegQIAxAB&usg=AOvVaw3N4xeaT-JBfOTZnoSYy4hL" className="nav-link icoLinkedin social-icon mt-4" title="Instagram"><img src="/instagram.png" /></a></li>
             
              </ul>
            
          
            <Link className="float-right mt-md-2 col-6 col-sm-6 mt-2  pl-0 pr-2" to="/">
              <img src="/final-logo.png" className="img-fluid" />
            </Link>
            
          </div>
        </div>
        </div>
        <div className="row border-top mt-3">
          <div className="col-9 ml-auto">
            <p style={{color:'#696865', fontSize:'10px'}} className="copyRight">&copy; 1996-2020 Advance Construction Co. <span>All right Reserved</span></p>
          </div>
        </div>

      </div>
        {/* Desktop view */}
      <div className="container-fluid desktop-view p-0">
        <div className='container' >
        <div className="row">
          <div className="col-md-8 p-3 row ">
              <ul className="nav mr-auto pb-3 w-50  border-bottom">
                <li className="nav-item"><a target="_blank" href="https://www.facebook.com/advancedconstructionsa/" className="nav-link icoFacebook social-icon" title="Facebook"><img src="/fb.png" /></a></li>
                <li className="nav-item"><a target="_blank" href="https://www.linkedin.com/mwlite/company/advanced-construction-company-for-contracting-maintenance" className="nav-link icoLinkedin social-icon" title="Linkedin"><img src="/linked.png" /></a></li>
                <li className="nav-item"><a target="_blank"  href="https://www.google.com/url?sa=t&source=web&rct=j&url=https://www.instagram.com/advancedconstruction_co/%3Figshid%3D8pkwlxt6am2h&ved=2ahUKEwjHmu_8zaXmAhWLmBQKHa6eB18QFjAAegQIAxAB&usg=AOvVaw3N4xeaT-JBfOTZnoSYy4hL" className="nav-link icoLinkedin social-icon" title="Instagram"><img src="/instagram.png" /></a></li>
              </ul>
              <ul className="nav pt-3  ">
              <li className="nav-item">
               <Link style={{color:'black'}}  className="nav-link founder-font" to="/">Home</Link></li>
              <li className="nav-item">
                <Link style={{color:'black'}} className="nav-link founder-font" to="/who-we-are">Who We Are</Link>
              </li>
              <li className="nav-item">
                 <Link style={{color:'black'}} className="nav-link founder-font" to="/quality">Quality</Link>
              </li>
              <li className="nav-item">
                <Link style={{color:'black'}} className="nav-link founder-font" to="/team">Team</Link>
              </li>
              <li className="nav-item">
                <Link style={{color:'black'}} className="nav-link founder-font" to="/work-at-acc">Work At Acc</Link>
              </li>
              <li className="nav-item">
                <Link style={{color:'black'}} className="nav-link founder-font" to="/projects">Projects</Link>
              </li>
              <li className="nav-item">
                <Link style={{color:'black'}} className="nav-link founder-font" to="/contact-us">Contact Us</Link>
              </li>
            </ul>

          </div>
          <div className="col-md-4 " style={{marginLeft:"30px"}}>
            <Link className="float-right mt-md-2" to="/">
              <img src="/logo-final.svg" width="330px" height = "118px" className="img" />
            </Link>
            
          </div>
        </div>
        </div>
        <hr />
        <div className='container' >
        <div className="row  ">
          <div className="col-md-12 ">
            <p  className="copyRight float founder-font">&copy; 1996-2020 Advance Construction Co. <span>All right Reserved</span></p>
          </div>
        </div>
        </div>
        </div>

    </footer>
  );
}

export default FooterComponent;
