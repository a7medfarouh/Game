import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Joi from 'joi';
import axios from 'axios';
import img from "../images/logo.png"


export default function Login() {
  const [user, setUser] = useState({
    email: '',
    password: ''
})
const [loginFlag, setLoginFlag] = useState(false);
const [err, setErr] = useState([]);
const [messag, setMessag] = useState('');
let baseURL = 'https://route-egypt-api.herokuapp.com/';
let navigate = useNavigate();


async function signUp(e){
    e.preventDefault();
    setLoginFlag(true);
    const schema = Joi.object({
        email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        password:Joi.string().pattern(/^[A-Z]+[a-z]+[0-9]+/i).required(),
    })
    let res=schema.validate(user,{abortEarly:false});
   
    if( res.error ){
        setErr(res.error.details);
        setLoginFlag(false);
    }
    else{
       let {data}= await axios.post(baseURL + 'signin',user);
       
       

       if(data.status === 401){
        setMessag(data.message);
      }
      else{
       localStorage.setItem("token",data.token);
      //  tokenDecode();
       navigate('/home');
       
      }
      setLoginFlag(false);
    }
   
}
function getError(key){
    for(let element of err)
     {
         if(element.context.key===key)
         {
             return element.message;
         }
     }
     return '';
 }
function getUser(e) {
    setErr([]);
    setUser({ ...user, [e.target.name]: e.target.value })
}
  return <>
  <div className="container mg">
    <div className='row bg-login-register'>
        <div className="col-md-6 banner ">
          
            
        </div>
        <div className="col-md-6">
        
        <div className="text-center py-3 px-2 ">
                        <img src={img} className="w-25" alt="" />
                        <h4>Log in to GameOver</h4>
                        <form className='my-4' onSubmit={signUp} >
                            
                            <div className="mb-4">
                                <input onChange={getUser} name='email' id='email' type="text" placeholder='Email Address' className='form-control' />
                                { getError("email").length===0?'':<div className='alert alert-danger '>{getError("email")}</div>}
                            </div>
                            
                            <div className="mb-4">
                                <input onChange={getUser} name='password' id='password' type="password" placeholder='Password' className='form-control' />
                                { getError("password").length===0?'':<div className='alert alert-danger '>{getError("password")}</div>}
                            </div>
                            <button className={'btn text-white p-2 w-100 btn-login-register'+ (loginFlag? " disabled":"")}>{loginFlag?<i className='fa-solid fa-spin fa-spinner'></i>:"Login"}</button>
                            {
                            messag.length===0?'':<div className='alert alert-danger'>{messag}</div>
                            }
                        </form>
                       
                        <hr />
                        <h6>Not a member yet? <Link to='register'>Create Account<i className="fas fa-chevron-right small"></i></Link></h6>
        </div>

        </div>
    </div>
  </div>
  </>
}
