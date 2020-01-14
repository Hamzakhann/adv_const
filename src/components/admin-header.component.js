import React , {useState} from 'react';

import {useHistory} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import {Drawer , 
        AppBar , 
        Toolbar , 
        Typography,
        Button,
        IconButton,
      }
  from '@material-ui/core';
  import {Link} from 'react-router-dom';
import './admin-nav.css'
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));
const AdminHeaderComponent =(props)=>{
  const history = useHistory()
  const classes = useStyles();
  const [state , setState] = useState(false)
  return(
    <div className="container-fluid p-0">
    <AppBar style={{background:"darkred"}} position="static">
      <Toolbar>
        <IconButton onClick={()=>setState(true)} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
        <i class="fas fa-bars"></i>
        </IconButton>
        <Typography variant="p" className={classes.title}>
          Dashboard / {props.pageName}
        </Typography>
        <Button onClick={()=>history.push('/admin')}  color="inherit">Logout</Button>
      </Toolbar>
    </AppBar>

    <Drawer open={state} onClose={()=> setState(false)}>
      <div className='p-3' >
        <img src="/AD-logo.png" alt='logo' className='img img-fluid' />
      </div>
        <ul class="list-group list-group-flush">
            <Link  class="admin-nav-item"  to="/admin/dashboard">
            <li class="list-group-item">
            <i class="fas fa-long-arrow-alt-right mr-2"></i> Home
            </li>
            </Link>

            <Link  class="admin-nav-item"  to="/admin/projects">
            <li class="list-group-item">
            <i class="fas fa-long-arrow-alt-right mr-2"></i> Projects
            </li>
            </Link>
            <Link  class="admin-nav-item"  to="/admin/teams">
            <li class="list-group-item">
            <i class="fas fa-long-arrow-alt-right mr-2"></i>  Teams
            </li>
            </Link>
            <Link  class="admin-nav-item"  to="/admin/cities">
            <li class="list-group-item">
            <i class="fas fa-long-arrow-alt-right mr-2"></i> Cities
            </li>
            </Link>
            <Link class="admin-nav-item"  to="/admin/cv">
            <li class="list-group-item">
              <i class="fas fa-long-arrow-alt-right mr-2"></i> CV List
            </li>
            </Link>
            <Link  class="admin-nav-item"  to="/admin/contact-us">
            <li class="list-group-item">
            <i class="fas fa-long-arrow-alt-right mr-2"></i> Contact Us
            </li>
            </Link>
            <Link class="admin-nav-item"  to="/admin/quality">
            <li class="list-group-item">
            <i class="fas fa-long-arrow-alt-right mr-2"></i> Quality
            </li>
            </Link>
            <Link  class="admin-nav-item"  to="/admin/work-with-us">
            <li class="list-group-item">
            <i class="fas fa-long-arrow-alt-right mr-2"></i> Work With Us
            </li>
            </Link>
            <Link  class="admin-nav-item"  to="/admin/who-we-are">
            <li class="list-group-item">
            <i class="fas fa-long-arrow-alt-right mr-2"></i> Who We Are
            </li>
            </Link>
            <Link  class="admin-nav-item" to="/admin/jobs">
            <li class="list-group-item">
            <i class="fas fa-long-arrow-alt-right mr-2"></i> Jobs
            </li>
            </Link>
        </ul>
    </Drawer>
  </div>
  )
}

export default AdminHeaderComponent;