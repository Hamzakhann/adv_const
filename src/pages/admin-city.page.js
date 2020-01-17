
import React , {useEffect , useState} from 'react';
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
import {useHistory} from 'react-router-dom'
import Skeleton from '@material-ui/lab/Skeleton';
import {Modal} from 'react-bootstrap';
import CitiesService from '../services/cities.service';
import AdminFooter from '../components/admin-footer';
import AdminHeaderComponent from '../components/admin-header.component';
import './dashboard.css'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});



export default function AdminTeamPage() {
    const history = useHistory()
  const classes = useStyles();
  const citiesService = new CitiesService();
  const [flag , setFlag] = useState(false)
  const [cities, setCities] = useState("");
  const [isLoading , setLoading] = useState(true)
  const [deleteModal , setDeleteModal] = useState(false)
  const [selectedCity , setSelectedCity] = useState(false)
  const [updateModal , setUpdateModal] = useState(false)
  const [addModal , setAddModal] = useState(false)
  const [name , setName] = useState("")

    useEffect(() => {
        if(!localStorage.getItem("jwtToken")){
            history.push("/admin")
        }
        citiesService.getAll().then(res=>{
            console.log(res)
            setCities(res)
            setLoading(false)
            setFlag(false)
            setName("")
        })

    }, [flag]);
    // SET THE CITY ID FOR DELETE
    const setCityForDelete = (cityId)=>{
        console.log(cityId)
        setSelectedCity(cityId)
        setDeleteModal(true)
    }

    // DELETE THE CITY 
    const confirmDelete = () =>{
        setLoading(true)
        setDeleteModal(false)
        citiesService.delete(selectedCity).then(res=>{
            setFlag(true)
            setLoading(false)
        }).catch(err=>alert(err))
    }
    const setCityForUpdate = (city)=>{
        console.log(city)
        setName(city.name);
        setSelectedCity(city.id)
        setUpdateModal(true)
    }
    const confirmCityUpdate = ()=>{
        setLoading(true)
        setUpdateModal(false)
        const data = {
            city_id: selectedCity,
            name,
        }
        citiesService.updateCity(data).then(res => {
            console.log("chellllll" , res)
            if (res.status === 200) {
                setLoading(false)
                setFlag(true)
            }
        }).catch(e=>alert(e))
    }

    const addCity = () => {
        setLoading(true)
        setAddModal(false)
        citiesService.create({ name: name }).then(res => {
            if(res){
                setLoading(false)
                setFlag(true)
            }
        }).catch((e) =>{
            setLoading(false)
            alert(e)
        })
    }
    return (
        <div className='container-fluid p-0' >
                <AdminHeaderComponent pageName="Cities" />
                <br/>
                <br/>
            <div className='container' >
                <div style={{float:"right"}} >
                <Button
                onClick={() =>setAddModal(true)}
                    style={{background:"darkRed" , color:"white"}}
                    variant="contained"
                    className={classes.button}
                    startIcon={<i class="fas fa-plus"></i>}>
                    Create A City
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
                            <TableCell className='font-weight-bold' >Id</TableCell>
                            <TableCell className='font-weight-bold' >Name</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody  >
                            {cities && cities.map(city=>{
                                return(
                                    <TableRow key={city.id} >
                                    <TableCell >
                                    <IconButton size="medium" onClick={() => setCityForUpdate(city)} ><i class="fas fa-pencil-alt"></i></IconButton>
                                    </TableCell>
                                    <TableCell >
                                        <IconButton onClick={() => setCityForDelete(city.id)} size="medium" ><i class="fas fa-trash-alt"></i></IconButton>
                                    </TableCell>
                                    <TableCell >{city.id}</TableCell>
                                    <TableCell >{city.name}</TableCell>
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
                    {/* MODAL FOR DELETE CITY START*/}
        <Modal
        onHide={()=>setDeleteModal(false)}
        show={deleteModal} 
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
            <Modal.Header>
            <Modal.Title style={{color:"darkRed" , fontWeight:"bold"}} >Delete City !</Modal.Title>
            </Modal.Header>
            <Modal.Body className='font-weight-bold' >Are you sure you want to delete this city.</Modal.Body>
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
    {/* MODAL FOR DELETE CITY END */}

    {/* MODAL FOR UPDATE CITY START*/}
    <Modal
        onHide={()=>setUpdateModal(false)}
        show={updateModal}
        size="lg"
        >
            <Modal.Header>
            <Modal.Title style={{color:"darkRed" , fontWeight:"bold"}} >Update City !</Modal.Title>
            </Modal.Header>
            <Modal.Body >
                <div className='container' >
                    {/* second input */}
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
            </Modal.Body>
            <Modal.Footer>
                <Button 
                variant="contained" 
                size="small"
                onClick={()=>setUpdateModal(false)}
                >Cancel</Button>
                <Button
                onClick={()=>confirmCityUpdate()}
                size="small"
                style={{background:"darkRed" , color:"white"}} 
                variant="contained" 
                >Update</Button>
            </Modal.Footer>
         </Modal>
    {/* MODAL FOR UPDATE CITY END */}


        {/* MODAL FOR UPDATE CITY START*/}
        <Modal
        onHide={()=>setAddModal(false)}
        show={addModal}
        size="lg"
        >
            <Modal.Header>
            <Modal.Title style={{color:"darkRed" , fontWeight:"bold"}} >Add City !</Modal.Title>
            </Modal.Header>
            <Modal.Body >
                <div className='container' >
                    {/* second input */}
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
            </Modal.Body>
            <Modal.Footer>
                <Button 
                variant="contained" 
                size="small"
                onClick={()=>setAddModal(false)}
                >Cancel</Button>
                <Button
                onClick={()=>addCity()}
                size="small"
                style={{background:"darkRed" , color:"white"}} 
                variant="contained" 
                >Add</Button>
            </Modal.Footer>
         </Modal>
    {/* MODAL FOR UPDATE CITY END */}
        </div>
          );
    
}