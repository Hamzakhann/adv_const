
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
import CitiesService from '../services/cities.service';
import ProjectService from '../services/project.service';
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
  const [projects, setProjects] = useState("");
  const [isLoading , setLoading] = useState(true)

    useEffect(() => {
        const projectService = new ProjectService();
        projectService.getAll().then(res => {
            console.log(res)
            setProjects(res)
            setLoading(false)
        });

    }, []);


        return (
        <div className='container-fluid p-0' >
                <AdminHeaderComponent pageName="Projects" />
                <br/>
                <br/>
            <div className='container' >
                <div style={{float:"right"}} >
                <Button
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
                                    <IconButton size="medium" ><i class="fas fa-pencil-alt"></i></IconButton>
                                    </TableCell>
                                    <TableCell >
                                        <IconButton size="medium" ><i class="fas fa-trash-alt"></i></IconButton>
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
        </div>
          );
    
}