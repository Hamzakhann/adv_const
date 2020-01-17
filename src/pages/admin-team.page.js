
import React , {useEffect , useState} from 'react';
import { useHistory } from "react-router-dom";
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
    const history = useHistory()
  const classes = useStyles();
  const teamService = new TeamService()
  const [flag , setFlag] = useState(false)
  const [teams, setTeams] = useState("");
  const [isLoading , setLoading] = useState(true)
  const [deleteModal , setDeleteModal] = useState(false)
  const [updateModal , setUpdateModal] = useState(false)
  const [selectedTeam , setSelectedTeam] = useState("")

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [designation, setDesignation] = useState('');
  const [teamImage, setTeamImage] = useState();
  const [selectedImage, setSelectedImage] = useState();

    useEffect(() => {
        if(!localStorage.getItem("jwtToken")){
            history.push("/admin")
        }
        teamService.getAll().then((res) =>{
            console.log(res)
            setTeams(res)
            setLoading(false)
            setFlag(false)
            setSelectedImage("")
        })

    }, [flag]);

    // SET THE TEAM ID FOR DELETE
    const setTeamForDelete = (teamId)=>{
        console.log(teamId)
        setSelectedTeam(teamId)
        setDeleteModal(true)
    }

    // DELETE THE TEAM 
    const confirmDelete = () =>{
        setLoading(true)
        setDeleteModal(false)
        teamService.delete(selectedTeam).then(res=>{
            setFlag(true)
            setLoading(false)
        }).catch(err=>alert(err))
    }
    const setTeamForUpdate = (team) =>{
        console.log(team)
        setName(team.name);
        setDescription(team.description);
        setDesignation(team.designation);
        setTeamImage(team.image)
        setSelectedTeam(team.id);
        setUpdateModal(true)
    }

    const confirmTeamUpdate = async() =>{
        setLoading(true)
        setUpdateModal(false)
        let dataImage = new FormData();
        dataImage.append('image', selectedImage);

        const data = {
            id: selectedTeam,
            name,
            designation,
            description,
            image: teamImage
        }
        if (selectedImage) {
            const image = await teamService.uploadImage(dataImage, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            });
            data.image = image;
        }

        console.log('team service update ', data);
        teamService.updateTeamMember(data).then(res => {
            if (res.status === 200) {
                setLoading(false)
                setFlag(true)
            }
        }).catch(e=>alert(e))
    }
    return (
        <div className='container-fluid p-0' >
                <AdminHeaderComponent pageName="Team" />
                <br/>
                <br/>
            <div className='container' >
                <div style={{float:"right"}} >
                <Button
                    onClick={() => history.push("/admin/add-team")}
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
                                    <IconButton size="medium" onClick={()=>setTeamForUpdate(team)} ><i class="fas fa-pencil-alt"></i></IconButton>
                                    </TableCell>
                                    <TableCell >
                                        <IconButton onClick={()=>setTeamForDelete(team.id)} size="medium" ><i class="fas fa-trash-alt"></i></IconButton>
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
        {/* MODAL FOR DELETE TEAM START*/}
        <Modal
        onHide={()=>setDeleteModal(false)}
        show={deleteModal} 
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
            <Modal.Header>
            <Modal.Title style={{color:"darkRed" , fontWeight:"bold"}} >Delete Team !</Modal.Title>
            </Modal.Header>
            <Modal.Body className='font-weight-bold' >Are you sure you want to delete this team member.</Modal.Body>
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
    {/* MODAL FOR DELETE TEAM END */}
    {/* MODAL FOR DELETE TEAM START*/}
    <Modal
        onHide={()=>setUpdateModal(false)}
        show={updateModal}
        size="lg"
        >
            <Modal.Header>
            <Modal.Title style={{color:"darkRed" , fontWeight:"bold"}} >Update Team !</Modal.Title>
            </Modal.Header>
            <Modal.Body >
                <div className='container' >
                    {/* first input */}
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
                    {/* second input */}
                    <div class="form-group">
                        <label className='admin-label' for="designation">Designation</label>    
                        <input 
                            type="text" 
                            class="form-control admin-input" 
                            id="designation" 
                            value={designation}
                            onChange={(e) => setDesignation(e.target.value)}
                        />
                    </div>
                    {/* third input */}
                        <div class="form-group">
                            <label className='admin-label' for="description">Description</label>
                            <textarea 
                            class="form-control admin-textArea" 
                            id="description" 
                            rows="5"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            >
                            </textarea>
                        </div>
                        {/* FILE  INPUT  */}
                    <div class="form-group">
                        <label className='admin-label mr-4' for="image">Team Image</label>
                        <input 
                        onChange={(e) => setSelectedImage(e.target.files[0])}
                        accept="image/*" 
                        style={{display:"none"}} 
                        id="icon-button-file-2"
                        type="file" />
                         <label htmlFor="icon-button-file-2">
                               <IconButton className='btn-block' style={{color:"darkRed" , border:"1px solid darkRed"}} aria-label="upload picture" component="div">
                                 <i class="fas fa-camera"></i>
                                </IconButton>
                         </label>
                         <small className='ml-3 font-weight-bold' >{selectedImage ? selectedImage.name :""}</small>
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
                onClick={()=>confirmTeamUpdate()}
                size="small"
                style={{background:"darkRed" , color:"white"}} 
                variant="contained" 
                >Update</Button>
            </Modal.Footer>
         </Modal>
    {/* MODAL FOR DELETE TEAM END */}
        </div>
          );
    
}