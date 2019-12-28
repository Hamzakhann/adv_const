import React from "react";
import { Carousel } from "react-responsive-carousel";


function ProjectComponent(props) {
  return (
    <div style={{cursor:'pointer'}} onClick={() => props.onClick()} className="project-comp-mob col-md-6 col-sm-6 col-6 mb-md-5 " key={props.project.id}>
      <Carousel  autoPlay={false} 
        showArrows	= {false}
        showThumbs={false}
        showIndicators={false}
        showStatus={false} infiniteLoop stopOnHover
        onClickItem={ ()=> null } >
        <div>
          <img style={{ height: "320px" }} src={props.project.image} 
          className="img-fluid" />
        </div>
        <div>
          <img style={{ height: "320px" }} className="img-fluid"
            src={props.project.mini_image1} />
        </div>
        <div>
          <img style={{ height: "320px" }} className="img-fluid"
            src={props.project.mini_image2} />
        </div>
      </Carousel>
      <a href='#' style={{cursor:'pointer' , color:'black' , fontSize:'17px'}} className="my-3 d-block font-weight-bold" onClick={() => props.onClick()} >{props.project.name}</a>


    </div>
  );
}
// onClick={()=> props.setCarosal(props.project)}
export default ProjectComponent;
