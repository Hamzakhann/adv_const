import React, { useEffect, useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import { url } from '../services/url';
import querystring from 'querystring';
import {useHistory} from 'react-router-dom'
import AdminHeaderComponent from '../components/admin-header.component';



function AdminHomePage() {
    const history = useHistory()
    const [workWithUsTitle, setWorkWithUsTitle] = useState();
    const [workWithUsImage, setWorkWithUsImage] = useState();
    const [teamTitle, setTeamTitle] = useState();
    const [teamImage, setTeamImage] = useState();
    const [serviceTitle1, setServiceTitle1] = useState();
    const [serviceTitle2, setServiceTitle2] = useState();
    const [serviceTitle3, setServiceTitle3] = useState();
    const [serviceDescription1, setServiceDescription1] = useState();
    const [serviceDescription2, setServiceDescription2] = useState();
    const [serviceDescription3, setServiceDescription3] = useState();
    const [serviceIcon1, setServiceIcon1] = useState();
    const [serviceIcon2, setServiceIcon2] = useState();
    const [serviceIcon3, setServiceIcon3] = useState();
    const [bannerImage, setBannerImage] = useState();
    const [bannerText, setBannerText] = useState();

    const [selectedBannerImage, setSelectedBannerImage] = useState();
    const [selectedWorkWithUsImage, setSelectedWorkWithUsImage] = useState();
    // const [selectedBannerImage, setSelectedBannerImage] = useState();
    const [selectedService1Icon, setSelectedService1Icon] = useState();
    const [selectedService2Icon, setSelectedService2Icon] = useState();
    const [selectedService3Icon, setSelectedService3Icon] = useState();
    const [selectedTeamImage, setSelectedTeamImage] = useState();
    useEffect(() => {
        if(!localStorage.getItem("jwtToken")){
            history.push("/admin")
        }
        axios.get(`${url}front/indexPage`).then(res => {
            console.log('res ', res.data);
            setWorkWithUsTitle(res.data.index_page_data[0].work_with_us_title);
            setWorkWithUsImage(res.data.index_page_data[0].work_with_us_image);
            setTeamTitle(res.data.index_page_data[0].team_title);
            setTeamImage(res.data.index_page_data[0].team_image);
            setServiceTitle1(res.data.index_page_data[0].service_1_title);
            setServiceTitle2(res.data.index_page_data[0].service_2_title);
            setServiceTitle3(res.data.index_page_data[0].service_3_title);
            setServiceDescription1(res.data.index_page_data[0].service_1_desc);
            setServiceDescription2(res.data.index_page_data[0].service_2_desc);
            setServiceDescription3(res.data.index_page_data[0].service_3_desc);
            setServiceIcon1(res.data.index_page_data[0].service_1_icon);
            setServiceIcon2(res.data.index_page_data[0].service_2_icon);
            setServiceIcon3(res.data.index_page_data[0].service_3_icon);
            setBannerImage(res.data.index_page_data[0].banner_image);
            setBannerText(res.data.index_page_data[0].banner_text);
        })
    } ,[])

    const updateQuality = async () => {
        if (selectedBannerImage) {
            let data = new FormData();
            data.append('image', selectedBannerImage);
    
            const response = await axios.post(`${url}admin/upload`, data, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            });
    
            setBannerImage(response.data);
    
           }
           if (selectedWorkWithUsImage) {
            let data = new FormData();
            data.append('image', selectedWorkWithUsImage);
    
            const response = await axios.post(`${url}admin/upload`, data, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            });
    
            setWorkWithUsImage(response.data);
           }

           if (selectedTeamImage) {
            let data = new FormData();
            data.append('image', selectedTeamImage);
    
            const response = await axios.post(`${url}admin/upload`, data, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            });
    
            setTeamImage(response.data);
           }

           if (selectedTeamImage) {
            let data = new FormData();
            data.append('image', selectedTeamImage);
    
            const response = await axios.post(`${url}admin/upload`, data, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            });
    
            setTeamImage(response.data);
           }
           console.log('data ', { work_with_us_title: workWithUsTitle,
            work_with_us_image: workWithUsImage,
            team_title: teamTitle,
            team_image: teamImage,
            service_1_title: serviceTitle1,
            service_2_title: serviceTitle2,
            service_3_title: serviceTitle3,
            service_1_desc:  serviceDescription1,
            service_2_desc:  serviceDescription2,
            service_3_desc:  serviceDescription3,
            service_1_icon:  serviceIcon1,
            service_2_icon:  serviceIcon2,
            service_3_icon:  serviceIcon3,
            banner_image:    bannerImage,
            banner_text:     bannerText });
           axios.post(`${url}admin/update_index_page`, querystring.stringify({
            work_with_us_title: workWithUsTitle,
            work_with_us_image: workWithUsImage,
            team_title: teamTitle,
            team_image: teamImage,
            service_1_title: serviceTitle1,
            service_2_title: serviceTitle2,
            service_3_title: serviceTitle3,
            service_1_desc:  serviceDescription1,
            service_2_desc:  serviceDescription2,
            service_3_desc:  serviceDescription3,
            service_1_icon:  serviceIcon1,
            service_2_icon:  serviceIcon2,
            service_3_icon:  serviceIcon3,
            banner_image:    bannerImage,
            banner_text:     bannerText
    
        }), {
            headers: { 
              "Content-Type": "application/x-www-form-urlencoded"
            }
          }).then(res => console.log('res ', res))

    }
    return (
        <div>
            <AdminHeaderComponent />
            <div className="container mt-md-5">
                <Form>
                <div>
                    <label for="avatar" >Work With Us Image:</label>

                        <input type="file" 
                            id="avatar" name="avatar" onChange={e => setSelectedWorkWithUsImage(e.target.files[0])} />
                </div>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Work Wit Us Title</Form.Label>
                        <Form.Control value={workWithUsTitle} onChange={(e) => setWorkWithUsTitle(e.target.value)}  />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Team title</Form.Label>
                        <Form.Control value={teamTitle} onChange={(e) => setTeamTitle(e.target.value)}/>
                        </Form.Group>
                        <Col>
                            <div>
                                <label for="avatar" >Team Image:</label>

                                    <input type="file" 
                                        id="avatar" name="avatar" onChange={e => setSelectedTeamImage(e.target.files[0])} />
                            </div>
                        </Col>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Banner Text</Form.Label>
                        <Form.Control value={bannerText} onChange={(e) => setBannerText(e.target.value)}/>
                        </Form.Group>
                        <Col>
                            <div>
                                <label for="avatar" >Banner Image:</label>

                                    <input type="file" 
                                        id="avatar" name="avatar" onChange={e => setSelectedBannerImage(e.target.files[0])} />
                            </div>
                        </Col>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Service 1 Title</Form.Label>
                        <Form.Control value={serviceTitle1} onChange={(e) => setServiceTitle1(e.target.value)}  />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Service 1 Description</Form.Label>
                        <Form.Control value={serviceDescription1} onChange={(e) => setServiceDescription1(e.target.value)} as="textarea" rows="7"  />
                        </Form.Group>

                        <Col>
                            <div>
                                <label for="avatar" >Service 1 Icon:</label>

                                    <input type="file" 
                                        id="avatar" name="avatar" onChange={e => setSelectedService1Icon(e.target.files[0])} />
                            </div>
                        </Col>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Sevice 2 Title</Form.Label>
                        <Form.Control value={serviceTitle2} onChange={(e) => setServiceTitle2(e.target.value)}  />
                        </Form.Group>
            
                        <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Service 2 Description</Form.Label>
                        <Form.Control value={serviceDescription2} onChange={(e) => setServiceDescription2(e.target.value)} as="textarea" rows="7"  />
                        </Form.Group>

                        <Col>
                            <div>
                                <label for="avatar" >Service 2 Icon:</label>

                                    <input type="file" 
                                        id="avatar" name="avatar" onChange={e => setSelectedService1Icon(e.target.files[0])} />
                            </div>
                        </Col>
                    
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Service 3 Title</Form.Label>
                        <Form.Control value={serviceTitle3} onChange={(e) => setServiceTitle3(e.target.value)}  />
                        </Form.Group>
                
                        <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Service 3 Description</Form.Label>
                        <Form.Control value={serviceDescription3} onChange={(e) => setServiceDescription3(e.target.value)} as="textarea" rows="7" />
                        </Form.Group>

                        <Col>
                            <div>
                                <label for="avatar" >Service 3 Icon:</label>

                                    <input type="file" 
                                        id="avatar" name="avatar" onChange={e => setSelectedService3Icon(e.target.files[0])} />
                            </div>
                        </Col>
                    </Form.Row>


                    <Button variant="primary" type="button" onClick={updateQuality}>
                        Update
                    </Button>
                    </Form>
                </div>
        </div>
    )
}

export default AdminHomePage
