
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
import JobsService from '../services/jobs.service';
import AdminFooter from '../components/admin-footer';
import AdminHeaderComponent from '../components/admin-header.component';
import './dashboard.css'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});



export default function AdminJobPage() {
  const classes = useStyles();
  const jobsService = new JobsService();
  const [flag , setFlag] = useState(false);
  const [jobs, setJobs] = useState("");
  const [isLoading , setLoading] = useState(true)
  const [deleteModal , setDeleteModal] = useState(false)
  const [selectedJob , setSelectedJob] = useState("")
    useEffect(() => {
        jobsService.getAll().then(res => {
            console.log(res)
            setJobs(res)
            setLoading(false)
            setFlag(false)
        });
    }, [flag]);

    // SET THE JOB ID FOR DELETE
    const setJobForDelete = (jobId)=>{
        console.log(jobId)
        setSelectedJob(jobId)
        setDeleteModal(true)
    }

    // DELETE THE JOB 
    const confirmDelete = () =>{
        setLoading(true)
        setDeleteModal(false)
        jobsService.delete(selectedJob).then(res=>{
            setFlag(true)
            setLoading(false)
        }).catch(err=>alert(err))
    }
        return (
        <div className='container-fluid p-0' >
                <AdminHeaderComponent pageName="Jobs" />
                <br/>
                <br/>
            <div className='container' >
                <div style={{float:"right"}} >
                <Button
                    style={{background:"darkRed" , color:"white"}}
                    variant="contained"
                    className={classes.button}
                    startIcon={<i class="fas fa-plus"></i>}>
                    Create A Job
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
                            <TableCell className='font-weight-bold' >Title</TableCell>
                            <TableCell className='font-weight-bold' >Description</TableCell>
                            <TableCell className='font-weight-bold' >Edit</TableCell>
                            <TableCell className='font-weight-bold' >Delete</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody  >
                            {jobs && jobs.map(job=>{
                                return(
                                    <TableRow key={job.id} >
                                <TableCell >{job.title}</TableCell>
                                <TableCell >{job.description}</TableCell>
                                <TableCell >
                                    <IconButton size="medium" ><i class="fas fa-pencil-alt"></i></IconButton>
                                    </TableCell>
                                    <TableCell >
                                        <IconButton onClick={()=>setJobForDelete(job.id)} size="medium" ><i class="fas fa-trash-alt"></i></IconButton>
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
        {/* MODAL FOR DELETE JOB START*/}
        <Modal
        onHide={()=>setDeleteModal(false)}
        show={deleteModal} 
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
            <Modal.Header>
            <Modal.Title style={{color:"darkRed" , fontWeight:"bold"}} >Delete Job !</Modal.Title>
            </Modal.Header>
            <Modal.Body className='font-weight-bold' >Are you sure you want to delete this job.</Modal.Body>
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
    {/* MODAL FOR DELETE JOB END */}
        </div>
          );
    
}