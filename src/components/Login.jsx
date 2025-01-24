import  { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router';
const Login = () => {
  const [emailId,setEmailId] = useState("soham@gmail.com ")
  const [password, setPassword] = useState("Soham@1234") ;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async()=>
  {
    try{
      
      const res = await axios.post("http://localhost:5170/login",
      {emailId , password},{withCredentials:true});
      console.log( res);
      dispatch(addUser(res.data));
      navigate("/");
    }
    catch(err){
      console.error(err);
    }
  }
  
  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-xl ">
    <div className="card-body">
      <h2 className="card-title justify-center">Login</h2>
      <div>
      <label className="form-control w-full max-w-xs my-2">
  <div className="label ">
    <span className="label-text">Email ID</span>
    
  </div>
  <input 
   type="text"
   placeholder="Email" 
   value={emailId} 
   className="input input-bordered w-full max-w-xs "
   onChange={(e) => setEmailId(e.target.value)} />
 
</label>
<label className="form-control w-full max-w-xs my-2">
  <div className="label ">
    <span className="label-text">Password</span>
    
  </div>
  <input 
  type="password" 
  placeholder="Password" 
  value ={password} 
  className="input input-bordered w-full max-w-xs " 
  onChange={(e)=> setPassword(e.target.value)}/>
 
</label>
      </div>
      <div className="card-actions justify-center">
        <button className="btn btn-primary font-bold " onClick={handleLogin}>Login</button>
      </div>
    </div>
  </div></div>
  )
}

export default Login