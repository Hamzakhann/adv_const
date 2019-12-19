import React, { useState, useEffect } from 'react';

import HeaderComponent from '../components/header.js';
import FooterComponent from '../components/footer.js';
import qualityService from '../services/front/quality.service';
// import quality_banner from '../../public/quality_banner.jpg'
export default function QualityPage() {

	const [quality, setQuality] = useState();
	useEffect(() => {
		qualityService.getAll().then(res => setQuality(res[0]));
	}, []);
	console.log('check quality ', quality)
	return (
		<div className='bg-white' >
			<HeaderComponent />
			<main style={{ background: "#fff", marginBottom: '40px' }}>
				{quality ? <div className="container">
					<div className="row contactUs-text-container">
						<div className="col-md-12 col-sm-12">
							<h3 className="h3-responsive aboutus font-weight-bold">{quality.title}</h3>
							<img src={quality.banner_image ? quality.banner_image : '/quality_banner.jpg'} className="img-quality" style={{ marginTop: "10px", marginBottom: "40px" }} />
							{/* <p className="para font-weight-bold who-we-are-heading">
							
							</p> */}
							<div dangerouslySetInnerHTML={{__html:quality.description}}>
								
							</div>
						</div>
					</div>

					<div className="row" style={{ marginTop: "30px" }}>
						<div className="col-md-4 col-sm-12">
							<div className="content content1">
								<h6>{quality.saudi_riyals}</h6>
								<p>
									<strong>Saudi Riyals</strong>
								</p>
							</div>
						</div>
						<div className="col-md-4 col-sm-12">
							<div className="content content1">
								<h6>{quality.projects_completed}</h6>
								<p>
									<strong>Projects Completed</strong>
								</p>
							</div>
							<hr style={{ marginTop: "30px", width: "60%" }} />
						</div>
						<div className="col-md-4 col-sm-12">
							<div className="content content2">
								<h6>{quality.current_projects}</h6>
								<p>
									<strong>Current Projects</strong>
								</p>
							</div>
						</div>
					</div>

					<div className="row" style={{ marginTop: "30px" }}>
						<div className="col-md-7">
							<h4 className="our-pro font-weight-bold  who-we-are-heading" style={{ lineHeight: '1.2em', fontSize: '30px', wordSpacing: '1px' }} >{quality.message.replace('hight-quality construction', () => `<span>Hamza</span>`)}</h4>
						</div>
						<div className="col-md-5">

						</div>


					</div>
				</div> : null}

			</main>
			<hr style={{ width: '95%', marginBottom: '0px' }} />
			<FooterComponent />
		</div>
	)
}
