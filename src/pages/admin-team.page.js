
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
import TeamService from '../services/team.service';
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
  const [teams, setTeams] = useState("");
  const [isLoading , setLoading] = useState(true)

    useEffect(() => {
        const teamService = new TeamService()
        teamService.getAll().then((res) =>{
            console.log(res)
            setTeams(res)
            setLoading(false)
        })

    }, []);


        return (
        <div className='container-fluid p-0' >
                <AdminHeaderComponent pageName="Team" />
                <br/>
                <br/>
            <div className='container' >
                <div style={{float:"right"}} >
                <Button
                    style={{background:"darkRed" , color:"white"}}
                    variant="contained"
                    className={classes.button}
                    startIcon={<i class="fas fa-plus"></i>}>
                    Create A Team
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
                            <TableCell className='font-weight-bold' >Designation</TableCell>
                            <TableCell className='font-weight-bold' >Description</TableCell>
                            <TableCell className='font-weight-bold' >Image</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody  >
                            {teams && teams.map(team=>{
                                return(
                                    <TableRow key={team.id} >
                                    <TableCell >
                                    <IconButton size="medium" ><i class="fas fa-pencil-alt"></i></IconButton>
                                    </TableCell>
                                    <TableCell >
                                        <IconButton size="medium" ><i class="fas fa-trash-alt"></i></IconButton>
                                    </TableCell>
                                <TableCell >{team.name}</TableCell>
                                    <TableCell >{team.designation}</TableCell>
                                <TableCell >{team.description}</TableCell>
                                <TableCell ><img  width="50px" height="40px" src={team.image} alt='team' /></TableCell>
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