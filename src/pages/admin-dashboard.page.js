import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useHistory } from 'react-router-dom';
import { Spinner, Modal, Button, Form, Col, Row } from 'react-bootstrap';

import AdminHeaderComponent from '../components/admin-header.component';
import CitiesService from '../services/cities.service';
import ProjectService from '../services/project.service';

function AdminDashboardPage() {
    const columns = [
    {
        name: 'Name',
        selector: 'name',
        sortable: true,
    },
    {
        name: 'Short Description',
        selector: 'short_description',
        sortable: true,
        right: true,
    },
    {
        name: 'City',
        selector: 'city',
        sortable: true,
        right: true,
    },
    {
        name: 'Update',
        right: true,
        cell: row => <button class="btn btn-info" onClick={() => onSelectEditProject(row)}><i class="fas fa-pencil-alt"></i></button>
    },
    {
        name: 'Delete',
        right: true,
        cell: row => <button class="btn btn-danger" onClick={() => onSelectProject(row.id)}><i class="fas fa-trash-alt"></i></button>
                    
    }
    ];

    const [cities, setCities] = useState();
    const [projects, setProjects] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [selectedPoject, setSelectedProject] = useState();
    const [show, setShow] = useState(false);
    const [showEditProject, setShowEditProject] = useState(false);
    const [name, setName] = useState('');
    const [totalPrice, setTotalPrice] = useState('');
    const [shortDescription, setShortDescription] = useState('');
    const [longDescription, setLongDescription] = useState('');
    const [type, setType] = useState('');
    const [length, setLength] = useState();
    const [completionDate, setCompletionDate] = useState();

    const [projectImage, setProjectImage] = useState();
    const [miniImage1 , setMiniImage1] = useState();
    const [miniImage2, setMiniImage2] = useState();

    const [selectedCity, setSelectedCity] = useState('');
    const [priority_date , setPriority_date] = useState('')
    const [selectedImage, setSelectedImage] = useState();
    const [selectedImageMin1 , setSelectedImageMin1] = useState();
    const [selectedImageMin2, setSelectedImageMin2] = useState();
    
    let history = useHistory();
    
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleEditClose = () => setShowEditProject(false);
    const handleEditShow = () => setShowEditProject(true);
    const projectService = new ProjectService();

    useEffect(() => {
        const citiesService = new CitiesService();
        citiesService.getAll().then(res => setCities(res) );

        
        projectService.getAll().then(res => 
            {
                setProjects(res);
                setIsLoading(false);
            }
        );
    }, []);

    const confirmDelete = () => {
        projectService.delete(selectedPoject);
        handleClose();
    }

    const onSelectProject = (id) => {
        setSelectedProject(id);
        handleShow();
    }

    const onSelectEditProject = (row) => {
        console.log('row ', row);
        setSelectedProject(row.id);
        setName(row.name);
        setTotalPrice(row.total_price);
        setType(row.type);
        setShortDescription(row.short_description);
        setLongDescription(row.long_description);
        setSelectedCity(row.city);
        setLength(row.length);
        setCompletionDate(row.completion_date);
        setProjectImage(row.image);
        setMiniImage1(row.mini_image1);
        setMiniImage2(row.mini_image2);
        setPriority_date(row.priority_date)
        handleEditShow();
    }

    const confirmEdit = async () => {
        const data = {
            id: selectedPoject,
            name,
            total_price: totalPrice,
            short_description: shortDescription,
            long_description: longDescription,
            city: selectedCity,
            image: projectImage,
            length,
            type,
            completion_date: completionDate,
            mini_image1: miniImage1,
            mini_image2: miniImage2,
            priority_date:priority_date
        }

        if (selectedImage) {
            let dataImage = new FormData();
            dataImage.append('image', selectedImage);
            const image = await projectService.uploadImage(dataImage, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            });
            data.image = image;
        }
        
        if (selectedImageMin1) {
            const data = new FormData();
            data.append('image', selectedImageMin1);
            const image = await projectService.uploadImage(data, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            });
            data.mini_image1 = image;
        }
        if(!priority_date){
            alert('please add priority date')
        }
        if (selectedImageMin2) {
            const data = new FormData();
            data.append('image', selectedImageMin2);
            const image = await projectService.uploadImage(data, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            });
            data.mini_image2 = image;
        }

        projectService.update(data).then(res => {
            if (res.status === 200) {
                setShowEditProject(false);
            }
        });
        handleEditClose();
    }

    return (
        <div>
            <AdminHeaderComponent />
            <div className="container mt-md-4">
                <button className="btn btn-primary float-right" onClick={() => history.push('/admin/add-project')}>Add Project</button>
               { projects ?  <DataTable
                title="Project List"
                columns={columns}
                data={projects}
                />: null }
                 <div className="row">
                    <div className="col-md-6 offset-md-6 mt-md-5 py-5">
                        {isLoading ? (<Spinner animation="border" />): null}
                    </div>
              </div>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Delete Team</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete team</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={confirmDelete}>
                    Confirm
                </Button>
                </Modal.Footer>
            </Modal>
            <Modal size="lg" show={showEditProject} onHide={handleEditClose}>
                <Modal.Header closeButton>
                <Modal.Title>Update Project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control value={name} onChange={e => setName(e.target.value)}  />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPrice">
                        <Form.Label>Total Price</Form.Label>
                        <Form.Control value={totalPrice} onChange={e => setTotalPrice(e.target.value)} />
                        </Form.Group>
                    </Form.Row>

                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Short Description</Form.Label>
                        <Form.Control value={shortDescription} onChange={e => setShortDescription(e.target.value)} as="textarea" rows="3" />
                    </Form.Group>

                    <Form.Group controlId="exampleForm.ControlTextarea2">
                        <Form.Label>Long Description</Form.Label>
                        <Form.Control value={longDescription} onChange={e => setLongDescription(e.target.value)} as="textarea" rows="3" />
                    </Form.Group>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridZip">
                        <Form.Label>Type</Form.Label>
                        <select className="form-control" id="sel1" value={type} onChange={e => setType(e.target.value)}>
                                        <option value='bridge' >bridge</option>
                                        <option value='marine' >marine</option>
                                        <option value='building' >building</option>
                                        <option value='road' >road</option>
          `                   </select>
                        </Form.Group>
                    </Form.Row>
                       
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridZip">
                        <Form.Label>Length</Form.Label>
                        <Form.Control value={length} onChange={e => setLength(e.target.value)} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridZip">
                        <Form.Label>Completion Date</Form.Label>
                        <Form.Control value={completionDate} onChange={e => setCompletionDate(e.target.value)} />
                        </Form.Group>
                    </Form.Row>
                   
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>City</Form.Label>
                        <Form.Control value={selectedCity} onChange={e => setSelectedCity(e.target.value)} as="select">
                            {cities ? cities.map(city => <option value={city.name}>{city.name}</option>): null}
                        </Form.Control>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Priority Date</Form.Label>
                        <input type="date" class="form-control" 
                        id="exampleInputEmail1" 
                        value={priority_date}
                        onChange={(e)=> setPriority_date(e.target.value)}
                        />
                        </Form.Group>
                    </Form.Row>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="inputGroupFileAddon01">
                                    Mini Image 1
                                    </span>
                                </div>
                                <div className="custom-file">
                                    <input
                                    type="file"
                                    className="custom-file-input"
                                    id="inputGroupFile01"
                                    aria-describedby="inputGroupFileAddon01"
                                    onChange={e => setSelectedImageMin1(e.target.files[0])}
                                    />
                                    <label className="custom-file-label" htmlFor="inputGroupFile01">
                                    Choose file
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="inputGroupFileAddon01">
                                        Mini Image 2
                                        </span>
                                    </div>
                                    <div className="custom-file">
                                        <input
                                        type="file"
                                        className="custom-file-input"
                                        id="inputGroupFile01"
                                        aria-describedby="inputGroupFileAddon01"
                                        onChange={e => setSelectedImageMin2(e.target.files[0])}
                                        />
                                        <label className="custom-file-label" htmlFor="inputGroupFile01">
                                        Choose file
                                        </label>
                                    </div>
                                </div>
                        </div>
                    </div>

                    <div className="input-group mt-md-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="inputGroupFileAddon01">
                                Upload
                                </span>
                            </div>
                            <div className="custom-file">
                                <input
                                type="file"
                                className="custom-file-input"
                                id="inputGroupFile01"
                                aria-describedby="inputGroupFileAddon01"
                                onChange={e => setSelectedImage(e.target.files[0])}
                                />
                                <label className="custom-file-label" htmlFor="inputGroupFile01">
                                Choose file
                                </label>
                            </div>
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleEditClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={confirmEdit}>
                    Update
                </Button>
                </Modal.Footer>
            </Modal>
            </div>
        </div>
    )
}

export default AdminDashboardPage
