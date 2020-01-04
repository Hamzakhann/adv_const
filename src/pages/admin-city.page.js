
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
  const classes = useStyles();
  const citiesService = new CitiesService();
  const [flag , setFlag] = useState(false)
  const [cities, setCities] = useState("");
  const [isLoading , setLoading] = useState(true)
  const [deleteModal , setDeleteModal] = useState(false)
  const [selectedCity , setSelectedCity] = useState("")
    useEffect(() => {
        citiesService.getAll().then(res=>{
            console.log(res)
            setCities(res)
            setLoading(false)
            setFlag(false)
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

        return (
        <div className='container-fluid p-0' >
                <AdminHeaderComponent pageName="Cities" />
                <br/>
                <br/>
            <div className='container' >
                <div style={{float:"right"}} >
                <Button
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
                                    <IconButton size="medium" ><i class="fas fa-pencil-alt"></i></IconButton>
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
        </div>
          );
    
}