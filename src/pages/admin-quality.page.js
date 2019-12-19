import React, { useEffect, useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { url } from '../services/url';
import querystring from 'querystring';

import AdminHeaderComponent from '../components/admin-header.component'

function AdminQualityPage() {
    const [title, setTitle] = useState();
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState();
    const [riyal, setRiyal] = useState();
    const [completedProject, setCompletedProject] = useState();
    const [currentProject, setCurrentProject] = useState();
    const [bannerImage, setBannerImage] = useState();
    const [selectedImage, setSelectedImage] = useState();

    useEffect(() => {
        axios.get(`${url}front/qualityPage`).then(res => {
            console.log('res ', res);
            setTitle(res.data[0].title);
            setDescription(res.data[0].description);
            setRiyal(res.data[0].saudi_riyals)
            setMessage(res.data[0].message);
            setCurrentProject(res.data[0].current_projects);
            setCompletedProject(res.data[0].projects_completed);
            setBannerImage(res.data[0].banner_image);
        })
    } ,[])

    const updateQuality = async () => {
        let image;
        if (selectedImage) {
        let data = new FormData();
        data.append('image', selectedImage);

        const response = await axios.post(`${url}admin/upload`, data, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        image = response;
        }

        axios.post(`${url}admin/update_quality_page`, querystring.stringify({
            title,
            description,
            saudi_riyals: riyal,
            projects_completed: completedProject,
            current_projects: currentProject,
            message,
            banner_image: image ? image : bannerImage
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
                    <label for="avatar" >Choose a profile picture:</label>

                        <input type="file" 
                            id="avatar" name="avatar" onChange={e => setSelectedImage(e.target.files[0])} />
                </div>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Title</Form.Label>
                        <Form.Control value={title} onChange={(e) => setTitle(e.target.value)}  />
                        </Form.Group>
                    </Form.Row>

                    <Form.Group controlId="formGridPassword">
                        <Form.Label>Description</Form.Label>
                        <ReactQuill value={description}
                                            onChange={(val)=>setDescription(val)} />
                        {/* <Form.Control value={description} onChange={(e) => setDescription(e.target.value)} as="textarea" rows="7"/> */}
                    </Form.Group>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Saudi Riyals</Form.Label>
                        <Form.Control value={riyal} onChange={(e) => setRiyal(e.target.value)}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Projects Completed</Form.Label>
                        <Form.Control value={completedProject} onChange={(e) => setCompletedProject(e.target.value)} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Current Projects</Form.Label>
                        <Form.Control value={currentProject} onChange={(e) => setCurrentProject(e.target.value)} />
                        </Form.Group>
                    </Form.Row>

                    <Form.Group controlId="formGridAddress1">
                        <Form.Label>Message</Form.Label>
                        <Form.Control value={message} onChange={(e) => setMessage(e.target.value)} as="textarea" rows="4" />
                    </Form.Group>

                    <Button variant="primary" type="button" onClick={updateQuality}>
                        Update
                    </Button>
                    </Form>
                </div>
        </div>
    )
}

export default AdminQualityPage
