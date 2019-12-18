import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import HeaderComponent from '../components/header';
import FooterComponent from '../components/footer';
import JobsService from '../services/jobs.service';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";

function WorkAtAccPage(props) {
  const jobsService = new JobsService();
  const [jobs, setJobs] = useState();
  const [selectedJob, setSelectedJob] = useState();
  useEffect(() => {
    jobsService.getAll().then(res => {
      setJobs(res);
      setSelectedJob(res[0]);
    });
  }, []);
  
  return (
    <div id='top' style={{ background: '#fff' }}>
      <HeaderComponent />
      <main style={{ background: '#fff' }} className="mb-md-4 mt-md-4">
        <div className="container">
          <div className="row contactUs-text-container">
            <div className="col-md-4 mr-md-auto col-sm-12">
              <div className="contactUs-text">
                <h4 className="h3-responsive who-we-are-heading font-weight-bold" style={{fontSize:'30px'}}>
                  We are always looking for
                  <br />new talents</h4>
         
                <p className="color-red" data-toggle="modal" data-target="#myModal"
                  style={{ cursor: 'pointer' , fontWeight:'bold'}}>Jobs and pre-requistes </p>
                <form method="post" action="#" enctype="multipart/form-data">
                  <div className="form-group">
                    <label for="fullname">Full Name</label>
                    <input
                      className="form-control  form-control-lg"
                      id="fullname"
                      name="fullname"
                      placeholder="Full Name"
                    />
                  </div>
                  <div className="form-group">
                    <label for="email">Email</label>
                    <input type="email" className="form-control  form-control-lg"
                      id="email" name="email" placeholder="Email" />
                  </div>
                  <div className="form-group">
                    <label for="curriculumvita">curriculum (CV)</label>
                    <div className="file-upload-wrapper">
                      <div className="card card-body file-upload">
                        <div className="card-text file-upload-message">
                          <p>
                            Drop Your Curriculum Here
                            <br />
                            or
                          </p>
                          <p>
                            <span>Choose A File</span>
                          </p>
                        </div>
                        <input type="file" id="input-file-now" className="file_upload" />
                      </div>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-lg btn-danger">
                    Send
                  </button>
                </form>
              </div>
            </div>

            <div className="col-md-6 col-sm-12">
              <img src="/contact-us-banner.png" className="img-fluid" />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 col-sm-12 box" style={{ marginTop: '100px' }}>
              <div className="inner" style={{ height: '374px', background: '#FFFDFD' }}>
                <h6>Team</h6>
                <h3 className="h3-responsive who-we-are-heading font-weight-bold">Get to know us a little</h3>
                <p>
                  Get the know the team of professionals behind
                  <br />
                  those great works
                </p>
                <Link to="/team">Meet our team</Link>
              </div>
            </div>
            <div className="col-md-6 col-sm-12 p-0" style={{ marginTop: '100px' }}>
              <img src="/banner3.jpg" className="img-fluid" />
            </div>
          </div>

          <div id="myModal" class="modal fade">
          <div class="modal-dialog modal-dialog-centered modal-lg">
              <div class="modal-content p-4">
              <div className='d-flex justify-content-between align-items-center' >
               <img src="/small-logo.png" className="" height='50px' />
                <button   type="button" class="close mt-n4" data-dismiss="modal" aria-hidden="true">
                    <i class="fas fa-times"></i>
                </button>   
              </div>
              <div>
                <div>
                <p className="who-we-are-heading" style={{ fontSize: '32px' , fontWeight:'700' , lineHeight:'1.2em' }}><span class="TextColor">We would love to have you on board,</span> We just need
                          to make sure that you have</p> 
                </div>
                <div className='container' >
                <Tabs>

    <TabList>
      <Tab > ANALYST</Tab>
      <Tab>JUNIOR ENGINEER</Tab>
      <Tab>SENIOR ENGINEER</Tab>
    </TabList>
    <br/>
    <TabPanel>
      <ol className='job-tabs-list' >
        <li>A minimum of two years experience (preferably in the contraction sector)</li>
        <li>Profiency in spoken and written English</li>
        <li>Dealing with applications, computer program and the internet</li>
        <li>Skills of follow-up and communication with other</li>
        <li>Place of workin any of the company's projects in the citifies of the kingdom</li>
        <li>The soul</li>
      </ol>
    </TabPanel>
    <TabPanel>
    <ol className='job-tabs-list' >
    <li>A minimum of two years experience (preferably in the contraction sector)</li>
    <li>Skills of follow-up and communication with other</li>
        <li>Place of workin any of the company's projects in the citifies of the kingdom</li>
        <li>Profiency in spoken and written English</li>
        <li>Dealing with applications, computer program and the internet</li>
        <li>The soul</li>
      </ol>
    </TabPanel>
    <TabPanel>
    <ol className='job-tabs-list' >
    <li>A minimum of two years experience (preferably in the contraction sector)</li>
        <li>Profiency in spoken and written English</li>
        <li>Dealing with applications, computer program and the internet</li>
        <li>Skills of follow-up and communication with other</li>
        <li>Place of workin any of the company's</li>
        <li>The soul third </li>
      </ol>
    </TabPanel>
  </Tabs>
                </div>
                </div>       
              </div>
            </div>
          </div>
        </div>
        <br/>
        <br/>
      </main>
      <hr style={{width:'95%' , marginBottom:'0px'}} />
      <FooterComponent />
    </div>
  );
}

export default WorkAtAccPage;

{/* <div class="modal-header">
<img src="/small-logo.png" class="" />
<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
  &times;
</button>
</div>
<div class="modal-body">
    <p className="font-weight-bold" style={{ fontSize: '28px' }}><span class="TextColor">We would love to have you on board,</span> We just need
    to make sure that you have</p>
    <ul class="nav nav-pills topnav" id="myTab" role="tablist">
      {jobs ? jobs.map(job => (
            <li class="nav-item">
              <a class="nav-link" id={job.id} data-toggle="tab" 
              href={'#' + job.id} role="tab" aria-controls="One"
                aria-selected="true" onClick={() => setSelectedJob(job)}>
                {job.title}
              </a>
            </li>
          ))
        : null}
    </ul>
 
    <div class="tab-content" id="myTabContent">
      {selectedJob ? (
        <div className="tab-pane fade show active p-3" id={selectedJob.id}
          role="tabpanel" aria-labelledby={selectedJob.id}>
          <p>{selectedJob.description}</p>
        </div>
      ) : null}
    </div>

</div> */}
