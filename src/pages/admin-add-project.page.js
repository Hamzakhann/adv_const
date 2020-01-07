import React , {useState , useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { 
    IconButton,
    Button
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import ProjectService from '../services/project.service';
import CitiesService from '../services/cities.service';
import AdminFooter from '../components/admin-footer';
import AdminHeaderComponent from '../components/admin-header.component';
import './dashboard.css'
export default function AdminAddProjectPage() {
    const history = useHistory();
    const projectService = new ProjectService();
    const citiesService = new CitiesService();
    const [flag , setFlag] = useState(false)
    const [isLoading , setLoading] = useState(false)

    const [cities , setCities] = useState("");
  
    const [name, setName] = useState('');
    const [totalPrice, setTotalPrice] = useState('');
    const [shortDescription, setShortDescription] = useState('');
    const [longDescription, setLongDescription] = useState('');
    const [type, setType] = useState('');
    const [length, setLength] = useState();
    const [completionDate, setCompletionDate] = useState();
    const [selectedCity, setSelectedCity] = useState('');
    const [priority_date , setPriority_date] = useState('')
    const [selectedImage, setSelectedImage] = useState();
    const [selectedImageMin1 , setSelectedImageMin1] = useState();
    const [selectedImageMin2, setSelectedImageMin2] = useState();

    useEffect(() =>{
        citiesService.getAll().then(res => setCities(res));
    },[flag])

    const addProject = async () =>{
        setLoading(true)

        try{
            let mainImage = new FormData();
            mainImage.append('image', selectedImage);
            const responseMainImage = await projectService.uploadImage(mainImage, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            });
    
            let miniImage1 = new FormData();
            miniImage1.append('image', selectedImageMin1);
            const responseMiniImage = await projectService.uploadImage(miniImage1, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
    
            let miniImage2 = new FormData();
            miniImage2.append('image', selectedImageMin2);
            const responseMiniImage2 = await projectService.uploadImage(miniImage2, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            });
    
            let data = {
                'name': name,
                'short_description': shortDescription,
                'long_description': longDescription,
                'completion_date': completionDate,
                'total_price': totalPrice,
                'type': type,
                'city': selectedCity,
                'image': responseMainImage,
                'mini_image1': responseMiniImage,
                'mini_image2': responseMiniImage2,
                'length': length,
                'priority_date':priority_date
            }
    
            const config = {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            };
    
            projectService.create(data, config).then(res => {
                if (res.status === 200) {
                    setLoading(false)
                    history.push('/admin/dashboard');
                }
            }).catch(e=>{
                setLoading(false)
                alert(e)
            })
        }catch(e){
            setLoading(false)
            alert(e)
        }
        
    }

    return (
        <div className='container-fluid p-0' >
            <AdminHeaderComponent pageName="Add Project"/>
            <br/>
            <br/>
            <div className='container' >
                {isLoading ? (
                    <div className='container' >
                    <Skeleton style={{width:"100%" , height:"100px"}} animation="wave" />
                    <Skeleton style={{width:"100%" , height:"100px"}} animation="wave" />
                    <Skeleton style={{width:"100%" , height:"100px"}} animation="wave" />
                    <Skeleton style={{width:"100%" , height:"100px"}} animation="wave" />
                    <Skeleton style={{width:"100%" , height:"100px"}} animation="wave" />
                    </div>
                ):(
                    <div className='main-form-container' >
                    {/* FIRST ROW */}
                    <div className='row' >
                        <div className='col-sm col-md-6' >
                        {/* first column */}
                        <div class="form-group">
                            <label className='admin-label' for="name">Name</label>
                            <input 
                            type="text" 
                            class="form-control admin-input" 
                            id="name" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        </div>
                        <div className='col-sm col-md-6' >
                        {/* second column */}
                        <div class="form-group">
                            <label className='admin-label' for="totalPrice">Total Price</label>
                            <input 
                            type="text" 
                            class="form-control admin-input" 
                            id="totalPrice" 
                            value={totalPrice}
                            onChange={(e) => setTotalPrice(e.target.value)}
                            />
                        </div>
                        </div>
                    </div>

                    {/* SECOND ROW */}
                    <div className='row' >
                        <div className='col-sm col-md-6' >
                        {/* first column */}
                        <div class="form-group">
                            <label className='admin-label' for="length">Length</label>
                            <input 
                            type="text" 
                            class="form-control admin-input" 
                            id="length" 
                            value={length}
                            onChange={(e) => setLength(e.target.value)}
                            />
                        </div>
                        </div>
                        <div className='col-sm col-md-6' >
                        {/* second column */}
                        <div class="form-group">
                            <label className='admin-label' for="CompletionDate">Completion Date</label>
                            <input 
                            type="text" 
                            class="form-control admin-input" 
                            id="CompletionDate" 
                            value={completionDate}
                            onChange={(e) => setCompletionDate(e.target.value)}
                            />
                        </div>
                        </div>
                    </div>
                    {/* THIRD ROW */}
                    <div className='row' >
                    {/* FIRST COLUMN */}
                    <div className='col-sm col-md-4' >
                        <div class="form-group">
                        <label className='admin-label' for="type">Type</label>
                        <select 
                        className="form-control admin-input" 
                        id="type" 
                        value={type} 
                        onChange={e => setType(e.target.value)}
                        >
                                <option value='bridge' >bridge</option>
                                <option value='marine' >marine</option>
                                <option value='building' >building</option>
                                <option value='road' >road</option>
          `              </select>    
                        </div>
                    </div>
                    {/* SECOND COLUMN */}
                    <div className='col-sm col-md-4' >
                        <div class="form-group">
                        <label className='admin-label' for="city">City</label>
                        <select 
                        className="form-control admin-input" 
                        id="city" 
                        value={selectedCity} 
                        onChange={e => setSelectedCity(e.target.value)}
                        >
                            {cities && cities.map(city=>{
                            return(<option value={city.name} >{city.name}</option>)
                            })}
          `              </select>    
                        </div>
                    </div>
                     {/* THIRD COLUMN */}
                     <div className='col-sm col-md-4' >
                        <div class="form-group">
                        <label className='admin-label' for="Prioritydate">Priority Date</label>
                        <input 
                        type="date" 
                        class="form-control admin-input" 
                        id="Prioritydate" 
                        value={priority_date}
                        onChange={(e)=> setPriority_date(e.target.value)}
                        />
                        </div>
                    </div>
                </div>
            {/* FOURTH ROW */}
            <div className='row' >
                <div className='col-sm col-md-12' >
                <div class="form-group">
                    <label className='admin-label' for="shortDes">Short Description</label>
                    <textarea 
                            class="form-control admin-textArea" 
                            id="shortDes" 
                            rows="5"
                            value={shortDescription}
                            onChange={(e) => setShortDescription(e.target.value)}
                            >
                    </textarea>
                 </div>
                </div>
            </div>
         {/* FOURTH ROW */}
         <div className='row' >
                <div className='col-sm col-md-12' >
                <div class="form-group">
                    <label className='admin-label' for="longDes">Long Description</label>
                    <textarea 
                            class="form-control admin-textArea" 
                            id="longDes" 
                            rows="5"
                            value={longDescription}
                            onChange={(e) => setLongDescription(e.target.value)}
                            >
                    </textarea>
                 </div>
                </div>
        </div>
        {/* LAST ROW */}
        <div className='row' >
            <div className='col-sm col-md-4' >
                {/* FILE  INPUT 1 */}
                    <div class="form-group">
                        <label className='admin-label mr-4' for="image">Main Image</label>
                        <input 
                        onChange={(e) => setSelectedImage(e.target.files[0])}
                        accept="image/*" 
                        style={{display:"none"}} 
                        id="icon-button-file-1"
                        type="file" />
                         <label htmlFor="icon-button-file-1">
                               <IconButton className='btn-block' style={{color:"darkRed" , border:"1px solid darkRed"}} aria-label="upload picture" component="div">
                                 <i class="fas fa-camera"></i>
                                </IconButton>
                         </label>
                         <small className='ml-3 font-weight-bold' >{selectedImage ? selectedImage.name :""}</small>
                    </div>
            </div>
            <div className='col-sm col-md-4' >
                {/* FILE  INPUT 2 */}
                    <div class="form-group">
                        <label className='admin-label mr-4' for="image">Mini Image I</label>
                        <input 
                        onChange={(e) => setSelectedImageMin1(e.target.files[0])}
                        accept="image/*" 
                        style={{display:"none"}} 
                        id="icon-button-file-2"
                        type="file" />
                         <label htmlFor="icon-button-file-2">
                               <IconButton className='btn-block' style={{color:"darkRed" , border:"1px solid darkRed"}} aria-label="upload picture" component="div">
                                 <i class="fas fa-camera"></i>
                                </IconButton>
                         </label>
                         <small className='ml-3 font-weight-bold' >{selectedImageMin1 ? selectedImageMin1.name :""}</small>
                    </div>
            </div>
            <div className='col-sm col-md-4' >
                {/* FILE  INPUT 3 */}
                    <div class="form-group">
                        <label className='admin-label mr-4' for="image">Mini Image II</label>
                        <input 
                        onChange={(e) => setSelectedImageMin2(e.target.files[0])}
                        accept="image/*" 
                        style={{display:"none"}} 
                        id="icon-button-file-3"
                        type="file" />
                         <label htmlFor="icon-button-file-3">
                               <IconButton className='btn-block' style={{color:"darkRed" , border:"1px solid darkRed"}} aria-label="upload picture" component="div">
                                 <i class="fas fa-camera"></i>
                                </IconButton>
                         </label>
                         <small className='ml-3 font-weight-bold' >{selectedImageMin2 ? selectedImageMin2.name :""}</small>
                    </div>
            </div>

             </div>
             <Button  onClick={()=>addProject()}  size="large"  variant="contained" className='btn-block admin-block-btn' >Add a Project</Button>
         </div>
                )}
            </div>
            <br/>
            <br/>
            <AdminFooter/>
        </div>
    )
}
