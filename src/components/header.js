import React, { useState } from 'react';
import { Link } from 'react-router-dom';


function HeaderComponent(props) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedd , setSelected] = useState("hello");
  const [Dropdown, setDropdown] = useState(true);

  const toggleDropdown = () => {
    console.log('toggle dropdown ');
    setSelected("about")
    const invertDropDown = !showDropdown;
    setShowDropdown(invertDropDown);
  }
  
  const openNav=()=> {
    document.getElementById("mySidenav").style.width="289px";
    document.getElementById("Overly").style.display="block";
  
  }
  const closeNav=()=> {
    document.getElementById("mySidenav").style.width="0";
    document.getElementById("Overly").style.display="none";


  }
  console.log('ya allah ',selectedd)
  return (
    <header>
    <nav className={ "navbar navbar-expand-md navbar-light " + props.topclassName }>
        <div className= {window.location.pathname === '/' ?'container  nav-container mob':'container mob'}>
          <Link className="navbar-brand" to="/">
            <img src="/logo-final.svg" className="img-logo-desktop " />
            <img src="/small-logo.png"  className="img-logo-mobile " />
          </Link>
          <button className="navbar-toggler border-0 pb-1 pl-0" type="button"   onClick={openNav}>
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent-7">
              <ul className="navbar-nav ml-auto headerNav">
                <li className="nav-item dropdown" style={{cursor: "pointer"}}>
                <a  style={{color:selectedd == 'about' ? "#C92027" :"black"}} className="nav-link px-4 dropdown-toggle" onClick={toggleDropdown} role="button">
                  About Us
                </a>
                { showDropdown ? <div className="dropdown-menu d-flex py-4">
                  <Link  id="about-us-dropdown" className="dropdown-item p-0 px-4 " to="/who-we-are">WHO WE ARE</Link>
                  <Link  id="about-us-dropdown" className="dropdown-item p-0 px-4" to="/quality">QUALITY</Link>
                  <Link  id="about-us-dropdown" className="dropdown-item p-0 px-4 border-0" to="/team">TEAM</Link>
                </div> : null}
                </li>
                <li className="nav-item">
                  <Link style={{color:selectedd == 'about' ? "#C92027" :"black"}} className="text-dark nav-link px-4" to="/work-at-acc">WORK AT ACC</Link>
                </li>
                <li className="nav-item">
                  <Link className="text-dark nav-link px-4" to="/projects">PROJECTS</Link>
                </li>
                <li className="nav-item">
                  <Link style={{paddingRight:"9px"}} className="text-dark nav-link pl-4 border-0" to="/contact-us">CONTACT US</Link>
                </li>
              </ul>
            </div>
        </div>
        {/* sidebar from here */}
        <div id="mySidenav" class="sidenav">
          <img src="/logo-final.svg" className="sideNav-logo img-fluid" />

          <a id="color-about" className="sidenavFont" >
                  About Us
                </a>
                { Dropdown ? <div className="">
                  <Link  className=" sidenavFont" to="/who-we-are">WHO WE ARE</Link>
                  <Link className=" sidenavFont" to="/quality">QUALITY</Link>
                  <Link  className=" sidenavFont" to="/team">TEAM</Link>
                </div> : null}
                  <Link className="sidenavFont" to="/projects">PROJECTS</Link>
                  <Link className="sidenavFont" to="/work-at-acc">WORK AT ACC</Link>

                  <Link className="sidenavFont" to="/contact-us">CONTACT US</Link>
          </div>
          <div className="overly" id="Overly" onClick={closeNav}></div>

    </nav>

    {props.children}
    </header>
  );
}

export default HeaderComponent;
