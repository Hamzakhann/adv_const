import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component';

import { Spinner, Modal, Button, Form, Col, Row } from 'react-bootstrap';
import AdminHeaderComponent from '../components/admin-header.component';
import JobsService from '../services/jobs.service';


function AdminJobPage() {
    const jobsService = new JobsService();
    const columns = [
        {
            name: 'Title',
            selector: 'title',
            sortable: true,
        },
        {
            name: 'Description',
            selector: 'description',
            sortable: true,
            right: true,
        },
        {
            name: 'Delete',
            right: true,
            cell: row => <button class="btn btn-danger" onClick={() => onSelectJOb(row.id)}><i class="fas fa-trash-alt"></i></button>
        },
        {
            name: 'Update',
            right: true,
            cell: row => <button class="btn btn-info" onClick={() => onSelectEditJob(row)}><i class="fas fa-pencil-alt"></i></button>
        }
    ];
    const [jobs, setJobs] = useState();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [name, setName] = useState('');
    const [showEditJob, setShowEditJob] = useState(false);
    const [selectedJob, setSelectedJob] = useState();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleEditClose = () => setShowEditJob(false);
    const handleEditShow = () => setShowEditJob(true);


    useEffect(() => {
        jobsService.getAll().then(res => setJobs(res));
    }, [])

    const addJob = () => {
        jobsService.create({ title, description }).then(res => console.log('create ', res))
    }
    const onSelectJOb = (id) => {
        setSelectedJob(id);
        handleShow();
    }

    const onSelectEditJob = (row) => {
        console.log('row ', row);
        setName(row.name);
        setSelectedJob(row.id)
        handleEditShow();
    }
    const confirmDelete = () => {
        console.log('idddd' ,  selectedJob) 
        jobsService.delete(selectedJob);
        handleClose();
    }
    const confirmEditJob = async () => {
        const data = {
            job_id: selectedJob,
            title:name,
            description:description
        }
        console.log(data)
        jobsService.updateJob(data).then(res => {
            if (res.status === 200) {
                setShowEditJob(false);
            }
        });
        handleEditClose();
    }

    return (
        <div>
        <AdminHeaderComponent />
         <div className="container mt-md-4">
           <div className="row justify-content-md-center">
             <div className="col-8 col-offset-2">
                 <button  type="button" className="btn btn-primary btn-lg float-right" data-toggle="modal" data-target="#myModal">Add Job</button>
             { jobs ?  <DataTable
                 title="Jobs List"
                 columns={columns}
                 data={jobs}
                 />: null }
             </div>
           </div>
           <div className="row">
                 <div className="col-md-6 offset-md-6 mt-md-5 py-5">
                     {isLoading ? (<Spinner animation="border" />): null}
                 </div>
           </div>
           <div className="modal fade" id="myModal" role="dialog">
                 <div className="modal-dialog">
                 
                 <div className="modal-content">
                     <div className="modal-header">
                     <button type="button" className="close" data-dismiss="modal">&times;</button>
                     {/* <h4 className="modal-title float-left">Add City</h4> */}
                     </div>
                     <div className="modal-body">
                         <div className="form-group">
                             <label htmlFor="exampleInputEmail1" className="mt-md-2">Title</label>
                             <input
                                 className="form-control w-75 float-right" 
                                 id="exampleInputEmail1" 
                                 aria-describedby="emailHelp" 
                                 placeholder="Enter Title"
                                 value={title}
                                 onChange={(e) => setTitle(e.target.value)} />
                         </div>
                         <div className="form-group">
                             <label htmlFor="exampleInputDescription" className="mt-md-2">Description</label>
                             <textarea 
                                className="form-control" 
                                rows="5" 
                                id="exampleInputDescription" 
                                value={description} onChange={(e) => setDescription(e.target.value)} />
                         </div>
                     </div>
                     <div className="modal-footer">
                        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={() => addJob()} >Save</button>
                     </div>
                 </div>
                 
                 </div>
             </div>
         </div>
         <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Delete JOb</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete Job</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={confirmDelete}>
                    Confirm
                </Button>
                </Modal.Footer>
            </Modal>
            <Modal size="lg" show={showEditJob} onHide={handleEditClose}>
                <Modal.Header closeButton>
                <Modal.Title>Update Job</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridName">
                        <Form.Label>Title</Form.Label>
                        <Form.Control value={name} onChange={e => setName(e.target.value)} />
                        </Form.Group>
                    </Form.Row>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Description</Form.Label>
                        <Form.Control value={description} onChange={e => setDescription(e.target.value)} as="textarea" rows="3" />
                    </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleEditClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={confirmEditJob}>
                    Update
                </Button>
                </Modal.Footer>
            </Modal>
    </div>
    )
}

export default AdminJobPage
