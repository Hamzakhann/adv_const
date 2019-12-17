import React, { useState } from 'react';
import { Link } from 'react-router-dom';


function HeaderComponent(props) {
  const [showDropdown, setShowDropdown] = useState(false);
  const toggleDropdown = () => {
    console.log('toggle dropdown ');
    const invertDropDown = !showDropdown;
    setShowDropdown(invertDropDown);
  }

  return (
    <header>
    <nav className={ "navbar navbar-expand-md navbar-light " + props.topclassName }>
        <div className= {window.location.pathname === '/' ?'container nav-container':'container'}>
          <Link className="navbar-brand" to="/">
            <img src="/final-logo.png" className="img-logo" />
          </Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent-7" aria-controls="navbarSupportedContent-7" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent-7">
              <ul className="navbar-nav ml-auto headerNav">
                <li className="nav-item dropdown" style={{cursor: "pointer"}}>
                <a className="text-dark nav-link px-4 dropdown-toggle" onClick={toggleDropdown} role="button">
                  About Us
                </a>
                { showDropdown ? <div className="dropdown-menu d-flex py-4">
                  <Link id="about-us-dropdown" className="dropdown-item p-0 px-4 " to="/who-we-are">WHO WE ARE</Link>
                  <Link id="about-us-dropdown" className="dropdown-item p-0 px-4" to="/quality">QUALITY</Link>
                  <Link id="about-us-dropdown" className="dropdown-item p-0 px-4 border-0" to="/team">TEAM</Link>
                </div> : null}
                </li>
                <li className="nav-item">
                  <Link className="text-dark nav-link px-4" to="/work-at-acc">WORK AT ACC</Link>
                </li>
                <li className="nav-item">
                  <Link className="text-dark nav-link px-4" to="/projects">PROJECTS</Link>
                </li>
                <li className="nav-item">
                  <Link className="text-dark nav-link px-4 border-0" to="/contact-us">CONTACT US</Link>
                </li>
              </ul>
            </div>
        </div>
    </nav>
    {props.children}
    </header>
  );
}

export default HeaderComponent;
