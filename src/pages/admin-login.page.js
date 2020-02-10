import React , {useState , useEffect} from 'react'
import {useHistory} from 'react-router-dom';
import setAuthToken from './setAuthToken';
import axios from 'axios'
import '../admin-login.css';
function AdminLoginPage() {
    const [email , setEmail] = useState("")
    const [pass , setPass] = useState("")
    const [loading , setLoading] = useState(false)
    const history = useHistory()

    useEffect(() =>{
        if(localStorage.getItem("jwtToken")){
            history.push("/admin/dashboard")
        }
    })

    const onLogin =(e)=>{
        setLoading(true)
        axios.post("https://adv-construction.herokuapp.com/admin/login",{
            username:email,
            password:pass
        }).then(res=>{
            setAuthToken(res.data.user_data.jwt_access_key)
            localStorage.setItem('jwtToken' , res.data.user_data.jwt_access_key);
            setLoading(false)
            history.push("/admin/dashboard")
        }).catch(e=>alert(e))
    }

    return (
        <div className="wrapper fadeInDown">
             <div id="formContent">
                <br/>
                <br/>
                <div className="fadeIn first text-center">
                    <img src='https://advancedconstructionco.net/logo-final.svg' className='img img-fluid' />
                </div>
        <br/>
        <br/>
        <div  className='login-form' >
        <div class="form-group p-3">
        <label className='admin-label' style={{textAlign:"left"}} for="name">Email</label>
            <input 
                type="email" 
                class="form-control admin-input" 
                id="name" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
            />
        </div>
        <div class="form-group p-3">
        <label className='admin-label' style={{textAlign:"left"}} for="pass">Password</label>
            <input 
                type="password" 
                class="form-control admin-input" 
                id="pass" 
                value={pass}
                onChange={(e) => setPass(e.target.value)}
            />
        </div>
        <div className='p-3' >
        <button size="large" onClick={() =>onLogin()}  variant="contained" className='btn btn-lg btn-block admin-block-btn' >{loading ? "Loading...":"Login"}</button>  
        </div>
      </div>
        

        </div>
    </div>
    )
}

export default AdminLoginPage
