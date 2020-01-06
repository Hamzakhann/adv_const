import React, { useEffect, useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { url } from '../services/url';
import querystring from 'querystring';

import AdminHeaderComponent from '../components/admin-header.component'

function AdminWhoWeArePage() {
    const [title, setTitle] = useState();
    const [description, setDescription] = useState("");
    const [bannerImage, setBannerImage] = useState();
    const [ceoMessage, setCeoMessage] = useState();
    const [ceoMessageImage, setCeoMesageImage] = useState();
    const [secondaryTitle, setSecondaryTitle] = useState();
    const [secondaryDescription, setSecondaryDescription] = useState();
    const [workWithUsTitle, setWorkWithUsTitle] = useState();
    const [workWithUsImage, setWorkWithUsImage] = useState();

    const [selectedBannerImage, setSelectedBannerImage] = useState();
    const [selectedCeoMessageImage, setSelectedCeoMessageImage] = useState();
    const [selectedWorkWithUsImage, setSelectedWorkWithUsImage] = useState();
    // const [quil , setQuil] = useState("")
    useEffect(() => {
        axios.get(`${url}front/whoWeArePage`).then(res => {
            console.log('res ', res);
            setTitle(res.data[0].primary_title);
            setDescription(res.data[0].primary_description);
            setBannerImage(res.data[0].banner_image)
            setCeoMessage(res.data[0].ceo_message);
            setCeoMesageImage(res.data[0].ceo_message_image);
            setSecondaryTitle(res.data[0].secondary_title);
            setSecondaryDescription(res.data[0].secondary_description);
            setWorkWithUsTitle(res.data[0].work_with_us_title);
            setWorkWithUsImage(res.data[0].work_with_us_image);
        })

    } ,[])
    const updateQuality = async () => {
        if (selectedBannerImage) {
            console.log('selecteddd' ,selectedBannerImage)
         let data = new FormData();
         data.append('image', selectedBannerImage);
 
         const response = await axios.post(`${url}admin/upload`, data, {
             headers: {
                 'content-type': 'multipart/form-data'
             }
         });
         console.log('holaaa ' , response)
         setBannerImage(response.data);
         const finalResponse = await axios.post(`${url}admin/update_who_we_are_page`, querystring.stringify({
            primary_title: title,
            banner_image :response.data,
            primary_description: description,
            ceo_message:ceoMessage,
            ceo_message_image: ceoMessageImage,
            secondary_title: secondaryTitle,
            work_with_us_title: workWithUsTitle,
            work_with_us_image: workWithUsImage,
            secondary_description: secondaryDescription

        }), {
            headers: { 
              "Content-Type": "application/x-www-form-urlencoded"
            }
          })
          console.log(finalResponse , 'final response')
        }
           if (selectedCeoMessageImage) {
            let data = new FormData();
            data.append('image', selectedCeoMessageImage);
    
            const response = await axios.post(`${url}admin/upload`, data, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            });
    
            setCeoMesageImage(response.data);
            const finalResponse = await axios.post(`${url}admin/update_who_we_are_page`, querystring.stringify({
                primary_title: title,
                banner_image :bannerImage,
                primary_description: description,
                ceo_message:ceoMessage,
                ceo_message_image: response.data,
                secondary_title: secondaryTitle,
                work_with_us_title: workWithUsTitle,
                work_with_us_image: workWithUsImage,
                secondary_description: secondaryDescription
    
            }), {
                headers: { 
                  "Content-Type": "application/x-www-form-urlencoded"
                }
              })
              console.log(finalResponse , 'final response')
           }

           if (setSelectedWorkWithUsImage) {
            let data = new FormData();
            data.append('image', selectedWorkWithUsImage);
    
            const response = await axios.post(`${url}admin/upload`, data, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            });
    
            setWorkWithUsImage(response.data);
            const finalResponse = await axios.post(`${url}admin/update_who_we_are_page`, querystring.stringify({
                primary_title: title,
                banner_image :bannerImage,
                primary_description: description,
                ceo_message:ceoMessage,
                ceo_message_image: ceoMessageImage,
                secondary_title: secondaryTitle,
                work_with_us_title: workWithUsTitle,
                work_with_us_image: response.data,
                secondary_description: secondaryDescription
    
            }), {
                headers: { 
                  "Content-Type": "application/x-www-form-urlencoded"
                }
              })
              console.log(finalResponse , 'final response')
           }
    
        }
    return (
        <div>
            <AdminHeaderComponent />
            <div className="container mt-md-5">
                <Form>
                <div>
                    <label for="avatar" >Banner Image:</label>

                        <input type="file" 
                            id="avatar" name="avatar" onChange={e => setSelectedBannerImage(e.target.files[0])} />
                </div>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Primary Title</Form.Label>
                        <Form.Control value={title} onChange={(e) => setTitle(e.target.value)}  />
                        </Form.Group>
                    </Form.Row>

                    <Form.Group controlId="formGridPassword">
                        <Form.Label>Primary Description</Form.Label>
                        <ReactQuill value={description}
                  onChange={(val)=>setDescription(val)} />
                        {/* <Form.Control value={description} onChange={(e) => setDescription(e.target.value)} as="textarea" rows="7"/> */}
                    </Form.Group>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>CEO Message</Form.Label>
                        <Form.Control value={ceoMessage} onChange={(e) => setCeoMessage(e.target.value)}/>
                        </Form.Group>

                       <Col className="mt-md-4">
                            <div clasName="mt-md-5">
                                <label for="avatar" >CEO Message Image:</label>

                                    <input type="file" 
                                        id="avatar" name="avatar" onChange={e => setSelectedCeoMessageImage(e.target.files[0])} />
                            </div>
                       </Col>
                    </Form.Row>

                    <Form.Group controlId="formGridAddress1">
                        <Form.Label>Secondary Title</Form.Label>
                        <Form.Control value={secondaryTitle} onChange={(e) => setSecondaryTitle(e.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formGridAddress1">
                        <Form.Label>Work With Us Title</Form.Label>
                        <Form.Control value={workWithUsTitle} onChange={(e) => setWorkWithUsTitle(e.target.value)}  />
                    </Form.Group>

                    <Form.Group controlId="formGridAddress1">
                        <Form.Label>Secondary Description</Form.Label>
                        <Form.Control value={secondaryDescription} onChange={(e) => setSecondaryDescription(e.target.value)} as="textarea" rows="4" />
                    </Form.Group>

                    <div clasName="mt-md-5">
                                <label for="avatar" >Work With Us Image:</label>

                                    <input type="file" 
                                        id="avatar" name="avatar" onChange={e => setSelectedWorkWithUsImage(e.target.files[0])} />
                            </div>

                    <Button variant="primary" type="button" onClick={updateQuality}>
                        Update
                    </Button>
                    </Form>

                    {/* <button onClick={()=> console.log(JSON.parse( JSON.stringify(quil)))} >Click</button>
                    <div dangerouslySetInnerHTML={{__html:quil}}>
                    </div> */}
                    </div>
        </div>
    )
}

export default AdminWhoWeArePage
