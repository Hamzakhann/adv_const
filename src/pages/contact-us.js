import React, { useState, useEffect } from 'react';

import HeaderComponent from '../components/header';
import FooterComponent from '../components/footer';
import contactService from '../services/front/contact.service';

const ContactUsPage = () => {
	const [contact, setContact] = useState();

	useEffect(() => {
		contactService.getAll().then(res => setContact(res[0]));
	}, []);	
    return (
        <div style={{ background: '#fff' }}>
            <HeaderComponent style={{ background: "#fff" }} topclassName={" mob-header"}></HeaderComponent>
        	<main style={{background: "#fff"}} className="mt-5 mb-4">
    	<div class="container ">
    		<div class="row contactUs-text-container">
			

    			<div class="col-md-6 col-sm-12 contactInfo">
    			    <h3 class="h3-responsive font-weight-bold aboutus who-we-are-heading " style={{fontSize:"30px"}}>Contact Us</h3>
					<br className="desktop-view"/>
			
				    <p className='founder-font' >INQUIRIES<br />
    			     <a href="mailto:projects@advanceconstruction.com.sa" class=" founder-font contactEmail ">{contact ? contact.email: null}</a>
    			    </p>
    			    <p className='founder-font mb-0 mt-4 '>PHONE NUMBERS</p>
					{contact ? contact.phone.map(cell => (<p className="mb-0 mt-0 founder-font">{cell}</p>)) : null}
    			    <p  class="founder-font mt-4 ">ADDRESS<br />
					<p>{contact ? contact.address: null}</p>
    			    </p>
    			</div>
    			
    			<div class="col-md-6 col-sm-12">
    			    <img className="mob-image" src="/contact-us.jpg" style={{marginTop:'22px' , maxWidth:'100%' , height:'400px'}} />
    			</div>
    		</div>
    	
    	</div>
		<br className="desktop-view"/>
		<br  className="desktop-view"/>
		<br  className="desktop-view"/>
		<br  className="desktop-view"/>
		<br  className="desktop-view"/>
		<br  className="desktop-view"/>
    </main>
        <FooterComponent>
			<hr />
		</FooterComponent>
        </div>
    );
};

export default ContactUsPage;