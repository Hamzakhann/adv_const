import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import AdminHeaderComponent from '../components/admin-header.component';
import CitiesService from '../services/cities.service';
import ProjectService from '../services/project.service';

function AdminAddProjectPage() {
    let history = useHistory();
    const [cities, setCities] = useState();
    const [name, setName] = useState('');
    const [arabicName, setArabicName] = useState('');
    const [shortDescription, setShortDescription] = useState('');
    const [shortArabicDescription, setShortArabicDescription] = useState('');
    const [longDescription, setLongDescription] = useState('');
    // const [longArabicDescription, setLongArabicDescription] = useState('');
    const [totalPrice, setTotalPrice] = useState('');
    const [type, setType] = useState('');
    const [priority_date, setPriority_date] = useState('');
    const [selectedMiniImage, setSelectedMiniImage] = useState();
    const [selectedMiniImage2, setSelectedMiniImage2] = useState();
    const [selectedCity, setSelectedCity] = useState('jeddah');
    const [selectedImage, setSelectedImage] = useState();

    const projectService = new ProjectService();

    useEffect(() => {
        const citiesService = new CitiesService();
        citiesService.getAll().then(res => setCities(res));
    }, []);

    const onSubmit = async (e) => {
    console.log(priority_date)
        e.preventDefault();

        let mainImage = new FormData();
        mainImage.append('image', selectedImage);
        const responseMainImage = await projectService.uploadImage(mainImage, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });

        let miniImage1 = new FormData();
        miniImage1.append('image', selectedMiniImage);
        const responseMiniImage = await projectService.uploadImage(miniImage1, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })

        let miniImage2 = new FormData();
        miniImage2.append('image', selectedMiniImage2);
        const responseMiniImage2 = await projectService.uploadImage(miniImage2, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });

        let data = {
            'image': selectedImage,
            'name': name,
            'short_description': shortDescription,
            'long_description': longDescription,
            'completion_date': shortArabicDescription,
            'total_price': totalPrice,
            'type': type,
            'city': selectedCity,
            'image': responseMainImage,
            'mini_image1': responseMiniImage,
            'mini_image2': responseMiniImage2,
            'length': arabicName,
            'priority_date':priority_date
        }

        const config = {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        };

        projectService.create(data, config).then(res => {
            if (res.status === 200) {
                history.push('/admin/dashboard');
            }
        })

    }
    console.log(type)
    return (
        <div className="bg-light">
            <AdminHeaderComponent />
            <div className="container mt-md-3 pb-md-3 pb-3 bg-light">
                <form className="ml-md-5 mt-md-3" onSubmit={(e) => onSubmit(e)}>
                    <div class="form-group ">
                        <label for="exampleFormControlFile1">Upload Project Image</label>
                        <input type="file" class="form-control-file" id="exampleFormControlFile1" onChange={e => setSelectedImage(e.target.files[0])} />
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label for="exampleInputEmail1">Name</label>
                                <input
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    placeholder="Enter Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)} />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group ">
                                <label for="exampleInputPassword1">Length</label>
                                <input
                                    className="form-control"
                                    id="exampleInputPassword1"
                                    placeholder="Enter Length"
                                    value={arabicName}
                                    onChange={e => setArabicName(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label for="short_description">Short Description</label>
                                <input
                                    className="form-control"
                                    id="short_description"
                                    value={shortDescription}
                                    onChange={e => setShortDescription(e.target.value)} />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label for="short_description_arabic">Completion Date</label>
                                <input
                                    className="form-control"
                                    id="short_description_arabic"
                                    value={shortArabicDescription}
                                    onChange={e => setShortArabicDescription(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label for="short_description">Total Price</label>
                                <input
                                    className="form-control"
                                    id="short_description"
                                    value={totalPrice}
                                    onChange={e => setTotalPrice(e.target.value)} />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label for="short_description_arabic">Type</label>

                                <select className="form-control" id="sel1" value={type} onChange={e => setType(e.target.value)}>
                                    <option value='bridge' >bridge</option>
                                    <option value='marine' >marine</option>
                                    <option value='building' >building</option>
                                    <option value='road' >road</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label for="comment">Long Description:</label>
                                <textarea
                                    className="form-control"
                                    rows="5"
                                    id="comment"
                                    value={longDescription}
                                    onChange={e => setLongDescription(e.target.value)}></textarea>
                            </div>
                        </div>
                        {/* <div className="col-md-6">
                <div className="form-group ml-md-5">
                    <label for="description_arabic">Long Description Arabic:</label>
                    <textarea 
                        className="form-control" 
                        rows="5" 
                        id="description_arabic"
                        value={longArabicDescription}
                        onChange={(e) => setLongArabicDescription(e.target.value)}></textarea>
                </div>
            </div> */}
                    </div>
                    <div className="form-group w-75">
                        <label for="sel1">Select City:</label>
                        <select className="form-control" id="sel1" value={selectedCity} onChange={e => setSelectedCity(e.target.value)}>
                            {cities ? cities.map(city => (<option key={city.id} value={city.name} >{city.name}</option>)) : null}
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Priority Date</label>
                        <input type="date" class="form-control" 
                        id="exampleInputEmail1" 
                        value={priority_date}
                        onChange={(e)=> setPriority_date(e.target.value)}
                        />

                    </div>

                        <div className="row">
                            <div className="col-md-6">
                                <div class="form-group ">
                                    <label for="exampleFormControlFile1">Mini Image 1</label>
                                    <input type="file" class="form-control-file" id="exampleFormControlFile1" onChange={e => setSelectedMiniImage(e.target.files[0])} />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div class="form-group ">
                                    <label for="exampleFormControlFile1">Mini Image 2</label>
                                    <input type="file" class="form-control-file" id="exampleFormControlFile1" onChange={e => setSelectedMiniImage2(e.target.files[0])} />
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary" >Submit</button>
                </form>
            </div>
            </div>
            )
        }
        
        export default AdminAddProjectPage
