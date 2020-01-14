import React , {useState} from 'react'
import {useHistory} from 'react-router-dom';
import '../admin-login.css';
function AdminLoginPage() {
    const [email , setEmail] = useState("")
    const [pass , setPass] = useState("")
    const history = useHistory()


    const onLogin =(e)=>{
        if(email ==='admin' && pass == '12345'){
            history.push('/admin/dashboard')
        }else{
            alert("Invalid Login")
        }
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
        <button size="large" onClick={() =>onLogin()}  variant="contained" className='btn btn-lg btn-block admin-block-btn' >Login</button>  
        </div>
      </div>
        <div id="formFooter">
        <a className="underlineHover" href="#">Forgot Password?</a>
        </div>

        </div>
    </div>
    )
}

export default AdminLoginPage
