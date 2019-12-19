import React, { useEffect, useState } from 'react';
import HeaderComponent from '../components/header';
import FooterComponent from '../components/footer';
import whoWeAreService from '../services/front/who-we-are.service';
import { Link } from 'react-router-dom';

function WhoWeArePage() {
	const [whoWeAre, setWhoWeAre] = useState();
	useEffect(() => {
		whoWeAreService.getAll().then(res => {
			console.log(res[0])
			setWhoWeAre(res[0])
		});
	}, [])
	return (
		<div style={{ background: "#fff" }}>
			<HeaderComponent topclassNameName={"relative-top"} />
			<main style={{ background: "#fff", marginBottom: '40px' }}>
				{whoWeAre ?
					<div className="container">
						<div className="row contactUs-text-container">
							<div className="col-sm-12">
								<div>
									<img src={whoWeAre.banner_image} className="who-we-are-img-1" />
								</div>
								<br />
								<div className='row' >
									<div className='col-sm col-md-10' >
									<div className='who-we-are-content-edit'  dangerouslySetInnerHTML={{__html:whoWeAre.primary_description}}>
								</div>
									</div>
									<div className='col-sm col-md-2' ></div>
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-md-5 col-sm-12  tex-box" style={{ marginTop: "50px" }}>
								<div className="inner" >
									<h3 className='who-we-are-heading font-weight-bold' style={{ paddingRight: '40px', fontSize: '34px' }} >{whoWeAre.ceo_message}</h3>
									<a href="#">CEO</a>
								</div>
							</div>
							<div className="col-md-7 col-sm-12 p-0" style={{ marginTop: "50px" }}>
								<img src={whoWeAre.ceo_message_image} className="img-fluid" />
							</div>
						</div>

						<div className="row contactUs-text-container">
							<div className="col-md-12 col-sm-12">
								<h3 className="who-h1">{whoWeAre.secondary_title}</h3>
								<p className='font-weight-bold who-we-are-heading' style={{ lineHeight: '2em', paddingRight: '100px' }} >
									{whoWeAre.secondary_description}
								</p>

							</div>
						</div>

						<div className="row mb-5">
							<div className="col-md-6 col-sm-12 box" style={{ marginTop: "100px" }}>
								<img src={whoWeAre.work_with_us_image} className="img-fluid" />
							</div>

							<div className="col-md-6 col-sm-12 p-0" style={{ marginTop: "100px" }}>
								<div className="inner">
									<h6 className='pl-5' >Work With Us</h6>
									<h3 className="h3-responsive font-weight-bold pl-5 pr-5">{whoWeAre.work_with_us_title}</h3>
									<Link to="/work-at-acc" className='pl-5 mt-3' >Apply now</Link>
								</div>
							</div>
						</div>

					</div> : null}
				<br />
				<br />
			</main>
			<hr style={{ width: '95%', marginBottom: '0px' }} />
			<FooterComponent />
		</div>
	)
}

export default WhoWeArePage
