
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
import CvService from '../services/cv.service';
import AdminFooter from '../components/admin-footer';
import AdminHeaderComponent from '../components/admin-header.component';
import './dashboard.css'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});



export default function AdminCVPage() {
    const history = useHistory()
  const classes = useStyles();
  const [cvs, setCvs] = useState("");
  const [isLoading , setLoading] = useState(true)

    useEffect(() => {
        if(!localStorage.getItem("jwtToken")){
            history.push("/admin")
        }
        const cvService = new CvService();
        cvService.getAll().then((res)=>{
            console.log(res)
            setCvs(res)
            setLoading(false)
        })

    }, []);


        return (
        <div className='container-fluid p-0' >
                <AdminHeaderComponent pageName="Cvs" />
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
                ):
                (
                <TableContainer className="table-container" component={Paper}>
                    <Table  className={classes.table}  stickyHeader aria-label="sticky table" aria-label="a dense table">
                        <TableHead>
                        <TableRow  >
                            <TableCell className='font-weight-bold' >Id</TableCell>
                            <TableCell className='font-weight-bold' >Name</TableCell>
                            <TableCell className='font-weight-bold' >Email</TableCell>
                            <TableCell className='font-weight-bold' >Cv</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody  >
                            {cvs && cvs.map(cv=>{
                                return(
                            <TableRow key={cv.id} >
                                <TableCell >{cv.id}</TableCell>
                                <TableCell >{cv.name}</TableCell>
                                <TableCell >{cv.email}</TableCell>
                                <TableCell >
                                    <a className='cv-icon' href={cv.cv} target="_blank" ><i style={{fontSize:"25px"}} class="fas fa-file-alt"></i></a>
                                </TableCell>
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
        </div>
          );
    
}