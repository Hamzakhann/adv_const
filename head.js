import React, { useEffect, useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import { url } from '../services/url';
import querystring from 'querystring';

import AdminHeaderComponent from '../components/admin-header.component'

const AdminContactUsPage = () => {
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [id, setId] = useState();

    useEffect(() => {
        axios.get(`${url}front/contactPage`).then(res => {
            console.log('email ', res.data[0].email);
            setEmail(res.data[0].email);
            setId(res.data[0].id);
            setAddress(res.data[0].address);
            setPhone(res.data[0].phone.join())
        })
    }, []);

    const updateContact = () => {
        const data = {
            email,
            address,
            phone: phone.split(',')
        }
        console.log('data ', data);
        axios.post(`${url}admin/update_contact_page`, querystring.stringify(data), {
            headers: { 
              "Content-Type": "application/x-www-form-urlencoded"
            }
          }).then(res => console.log('res ', res));
    }
    return (
        <div>
            <AdminHeaderComponent/>
                <div className="container mt-md-5">
                <Form>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control value={phone} onChange={(e) => setPhone(e.target.value)}/>
                        </Form.Group>
                    </Form.Row>

                    <Form.Group controlId="formGridAddress1">
                        <Form.Label>Address</Form.Label>
                        <Form.Control value={address} onChange={(e) => setAddress(e.target.value)} placeholder="1234 Main St" />
                    </Form.Group>

                    <Button variant="primary" type="button" onClick={updateContact}>
                        Update
                    </Button>
                    </Form>
                </div>
        </div>
    )
}

export default AdminContactUsPage
