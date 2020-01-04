import React, { useEffect, useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import { url } from '../services/url';
import querystring from 'querystring';

import AdminHeaderComponent from '../components/admin-header.component'

function AdminWorkWithUsPage() {
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [selectedImage, setSelectedImage] = useState();
    const [selectedTeamImage, setSelectedTeamImage] = useState();
    const [image, setImage] = useState();
    const [teamImage, setTeamImage] = useState();

    useEffect(() => {
        axios.get(`${url}front/workWithUsPage`).then(res => {
            setTitle(res.data[0].team_title);
            setDescription(res.data[0].team_message);
            setImage(res.data[0].image);
            setTeamImage(res.data[0].team_image)
        })
    }, [])

    const updateWorkWithUS = async () => {
       if (selectedImage) {
        let data = new FormData();
        data.append('image', selectedImage);

        const response = await axios.post(`${url}admin/upload`, data, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });

        setImage(response.data);

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

       axios.post(`${url}admin/update_work_with_us_page`, querystring.stringify({
        team_title: title,
        team_message: description,
        image,
        team_image: teamImage

    }), {
        headers: { 
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => console.log('res ', res))
    }

    return (
        <div>
            <AdminHeaderComponent/>
            <div className="container mt-md-5">
                <Form>
                <div>
                    <label for="avatar" >Image:</label>

                    <input type="file" 
                        id="avatar" name="avatar" onChange={e => setSelectedImage(e.target.files[0])} />
                </div>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Team Title</Form.Label>
                        <Form.Control value={title} onChange={(e) => setTitle(e.target.value)}  />
                        </Form.Group>
                    </Form.Row>

                    <Form.Group controlId="formGridPassword">
                        <Form.Label>Team Message</Form.Label>
                        <Form.Control value={description} onChange={(e) => setDescription(e.target.value)} as="textarea" rows="7"/>
                    </Form.Group>

                    <div>
                    <label for="avatar" >Team Image:</label>

                    <input type="file" 
                        id="avatar" name="avatar" onChange={e => setSelectedTeamImage(e.target.files[0])} />
                    </div>


                    <Button variant="primary" type="button" onClick={updateWorkWithUS}>
                        Update
                    </Button>
                    </Form>
                </div>
        </div>
    )
}

export default AdminWorkWithUsPage
