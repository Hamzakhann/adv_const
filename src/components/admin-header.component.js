import React , {useState} from 'react'
import { Link } from 'react-router-dom';

import '../admin-header.css'
import './admin-nav.css'
function AdminHeaderComponent() {
  const [active , setActive] = useState("")
    return (
      <nav id="admin-dashboard" class="navbar navbar-expand-lg navbar-dark bg-dark">
         <Link onClick={() => setActive("home")} style={{color: active == 'home' ? 'darkRed' :"white"}} class="admin-nav-item"  to="/admin/dashboard">Home</Link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item active">
          <Link onClick={() => setActive("projects")} style={{color: active == 'projects' ? 'darkRed' :"white"}} class="admin-nav-item"  to="/admin/projects">Projects</Link>
          </li>
          <li class="nav-item">
            <Link onClick={() => setActive("teams")} style={{color: active == 'teams' ? 'darkRed' :"white"}} class="admin-nav-item"  to="/admin/teams">Teams</Link>
          </li>
          <li class="nav-item">
            <Link onClick={() => setActive("cities")} style={{color: active == 'cities' ? 'darkRed' :"white"}} class="admin-nav-item"  to="/admin/cities">Cities</Link>
          </li>
          <li class="nav-item">
            <Link onClick={() => setActive("cv")} style={{color: active == 'cv' ? 'darkRed' :"white"}} class="admin-nav-item"  to="/admin/cv">CV List</Link>
          </li>
          <li class="nav-item">
            <Link onClick={() => setActive("contact")}  style={{color: active == 'contact' ? 'darkRed' :"white"}} class="admin-nav-item"  to="/admin/contact-us">Contact Us</Link>
          </li>
          <li class="nav-item">
            <Link onClick={() => setActive("quality")} style={{color: active == 'quality' ? 'darkRed' :"white"}} class="admin-nav-item"  to="/admin/quality">Quality</Link>
          </li>
          <li class="nav-item">
            <Link onClick={() => setActive("workwithus")} style={{color: active == 'workwithus' ? 'darkRed' :"white"}} class="admin-nav-item"  to="/admin/work-with-us">Work With Us</Link>
          </li>
          <li class="nav-item">
            <Link onClick={() => setActive("whoweare")} style={{color: active == 'whoweare' ? 'darkRed' :"white"}} class="admin-nav-item"  to="/admin/who-we-are">Who We Are</Link>
          </li>
          <li class="nav-item">
            <Link onClick={() => setActive("jobs")} style={{color: active == 'jobs' ? 'darkRed' :"white"}} class="admin-nav-item" to="/admin/jobs">Jobs</Link>
          </li>
          {/* <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Dropdown link
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <a class="dropdown-item" href="#">Action</a>
              <a class="dropdown-item" href="#">Another action</a>
              <a class="dropdown-item" href="#">Something else here</a>
            </div>
          </li> */}
        </ul>
      </div>
    </nav>
    )
}

export default AdminHeaderComponent
