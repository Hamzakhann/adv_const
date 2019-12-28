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
    			    <h3 class="h3-responsive font-weight-bold aboutus who-we-are-heading ">Contact Us</h3>
    			    <p className='who-we-are-heading'>INQUIRIES<br />
    			     <a href="mailto:projects@advanceconstruction.com.sa" class=" founder-font contactEmail ">{contact ? contact.email: null}</a>
    			    </p>
    			    <p className='founder-font mb-0 mt-4'>PHONE NUMBERS</p>
					{contact ? contact.phone.map(cell => (<p className="mb-0 mt-0 founder-font">{cell}</p>)) : null}
    			    <p  class="founder-font mt-4">ADDRESS<br />
					{contact ? contact.address: null}
    			    </p>
    			</div>
    			
    			<div class="col-md-6 col-sm-12">
    			    <img className="mob-image" src="/contact-us.jpg" style={{marginTop:'22px' , maxWidth:'100%' , height:'400px'}} />
    			</div>
    		</div>
    	
    	</div>
		<br/>
		<br/>
		<br/>
		<br/>
		<br/>
		<br/>
    </main>
        <FooterComponent>
			<hr />
		</FooterComponent>
        </div>
    );
};

export default ContactUsPage;