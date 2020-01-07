
import React , {useEffect , useState} from 'react';
import {useHistory} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { 
    IconButton,
    Paper,
    TableRow,
    TableHead,
    TableContainer,
    TableCell,
    TableBody,
    Table,
    Button
} from '@material-ui/core';
import {Modal} from 'react-bootstrap'
import Skeleton from '@material-ui/lab/Skeleton';
import ProjectService from '../services/project.service';
import CitiesService from '../services/cities.service';
import AdminFooter from '../components/admin-footer';
import AdminHeaderComponent from '../components/admin-header.component';
import './dashboard.css'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});



export default function AdminProjectsPage() {
  const classes = useStyles();
  const history = useHistory()
  const projectService = new ProjectService();
  const citiesService = new CitiesService();
  const [flag , setFlag] = useState(false)
  const [isLoading , setLoading] = useState(true)
  const [deleteModal , setDeleteModal] = useState(false)
  const [updateModal , setUpdateModal] = useState(false)
  const [projects, setProjects] = useState("");
  const [cities , setCities] = useState("");
  const [selectedProject , setSelectedProject] = useState("")


  const [name, setName] = useState('');
  const [totalPrice, setTotalPrice] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [longDescription, setLongDescription] = useState('');
  const [type, setType] = useState('');
  const [length, setLength] = useState();
  const [completionDate, setCompletionDate] = useState();
  const [selectedCity, setSelectedCity] = useState('');
  const [priority_date , setPriority_date] = useState('')

  const [projectImage, setProjectImage] = useState();
  const [miniImage1 , setMiniImage1] = useState();
  const [miniImage2, setMiniImage2] = useState();
  const [selectedImage, setSelectedImage] = useState();
  const [selectedImageMin1 , setSelectedImageMin1] = useState();
  const [selectedImageMin2, setSelectedImageMin2] = useState();
    useEffect(() => {
        citiesService.getAll().then(cities=>{
            projectService.getAll().then(res => {
                console.log(res)
                setProjects(res)
                setCities(cities)
                setLoading(false)
                setFlag(false)
                setSelectedImage("")
                setSelectedImageMin1("")
                setSelectedImageMin2("")
            }).catch(e=>alert(e))
        }).catch(e=>alert(e))
    }, [flag]);

    // SET THE PROJECT ID FOR DELETE
    const setProjectForDelete = (projectId)=>{
        console.log(projectId)
        setSelectedProject(projectId)
        setDeleteModal(true)
    }

    // DELETE THE PROJECT 
    const confirmDelete = () =>{
        setLoading(true)
        setDeleteModal(false)
        projectService.delete(selectedProject).then(res=>{
            setFlag(true)
            setLoading(false)
        }).catch(err=>alert(err))
    }
    const setProjectForUpdate =(project)=>{
        console.log(project.priority_date)
        setSelectedProject(project.id);
        setName(project.name);
        setTotalPrice(project.total_price);
        setType(project.type);
        setShortDescription(project.short_description);
        setLongDescription(project.long_description);
        setSelectedCity(project.city);
        setLength(project.length);
        setCompletionDate(project.completion_date);
        setProjectImage(project.image);
        setMiniImage1(project.mini_image1);
        setMiniImage2(project.mini_image2);
        setPriority_date(project.priority_date)
        setUpdateModal(true)
    }

    const confirmUpdate = async()=> {
        setLoading(true)
        setUpdateModal(false)
        const data = {
            id: selectedProject,
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
                setFlag(true)
                setLoading(false)
            }
        }).catch(e=>alert(e))
    }
    return (
        <div className='container-fluid p-0' >
                <AdminHeaderComponent pageName="Projects" />
                <br/>
                <br/>
            <div className='container' >
                <div style={{float:"right"}} >
                <Button
                    onClick={() => history.push('/admin/add-project')}
                    style={{background:"darkRed" , color:"white"}}
                    variant="contained"
                    className={classes.button}
                    startIcon={<i class="fas fa-plus"></i>}>
                    Create A Project
                </Button>
                </div>
                <br/>
                <br/>
                <br/>
                {isLoading ? (
                    <div className='container' >
                        <Skeleton style={{width:"100%" , height:"100px"}} animation="wave" />
                        <Skeleton style={{width:"100%" , height:"100px"}} animation="wave" />
                        <Skeleton style={{width:"100%" , height:"100px"}} animation="wave" />
                        <Skeleton style={{width:"100%" , height:"100px"}} animation="wave" />
                        <Skeleton style={{width:"100%" , height:"100px"}} animation="wave" />
                    </div>
                ):
                (
                <TableContainer className="table-container" component={Paper}>
                    <Table  className={classes.table}  stickyHeader aria-label="sticky table" aria-label="a dense table">
                        <TableHead>
                        <TableRow  >
                            <TableCell className='font-weight-bold' >Edit</TableCell>
                            <TableCell className='font-weight-bold' >Delete</TableCell>
                            <TableCell className='font-weight-bold' >Name</TableCell>
                            <TableCell className='font-weight-bold' >City</TableCell>
                            <TableCell className='font-weight-bold' >
                                Short Description
                            </TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody  >
                            {projects && projects.map(project=>{
                                return(
                                    <TableRow key={project.id} >
                                    <TableCell >
                                    <IconButton size="medium" onClick={()=> setProjectForUpdate(project)} ><i class="fas fa-pencil-alt"></i></IconButton>
                                    </TableCell>
                                    <TableCell >
                                        <IconButton size="medium" onClick={() => setProjectForDelete(project.id)} ><i class="fas fa-trash-alt"></i></IconButton>
                                    </TableCell>
                                    <TableCell >{project.name}</TableCell>
                                    <TableCell >{project.city}</TableCell>
                                    <TableCell >{project.short_description}</TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                )
                }      
             </div>
             <br/>
             <br/>
             <AdminFooter/>
        {/* MODAL FOR DELETE PROJECT START*/}
        <Modal
        onHide={()=>setDeleteModal(false)}
        show={deleteModal} 
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
            <Modal.Header>
            <Modal.Title style={{color:"darkRed" , fontWeight:"bold"}} >Delete Project !</Modal.Title>
            </Modal.Header>
            <Modal.Body className='font-weight-bold' >Are you sure you want to delete this project.</Modal.Body>
            <Modal.Footer>
                <Button 
                variant="contained" 
                size="small"
                onClick={()=>setDeleteModal(false)}
                >Cancel</Button>
                <Button
                onClick={()=>confirmDelete()}
                size="small"
                style={{background:"darkRed" , color:"white"}} 
                variant="contained" 
                >Delete</Button>
            </Modal.Footer>
      </Modal>
    {/* MODAL FOR DELETE PROJECT END */}


    {/* MODAL FOR UPDATE PROJECT START*/}
        <Modal
        onHide={()=>setUpdateModal(false)}
        show={updateModal}
        size="lg"
        >
            <Modal.Header>
            <Modal.Title style={{color:"darkRed" , fontWeight:"bold"}} >Update Project !</Modal.Title>
            </Modal.Header>
            <Modal.Body >
                <div className='conatiner' >
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
        </div>
            </Modal.Body>
            <Modal.Footer>
                <Button 
                variant="contained" 
                size="small"
                onClick={()=>setUpdateModal(false)}
                >Cancel</Button>
                <Button
                onClick={()=>confirmUpdate()}
                size="small"
                style={{background:"darkRed" , color:"white"}} 
                variant="contained" 
                >Update</Button>
            </Modal.Footer>
      </Modal>
    {/* MODAL FOR UPDATE PROJECT END */}
        </div>
          );
    
}