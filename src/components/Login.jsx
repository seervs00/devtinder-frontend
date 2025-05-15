import  { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router';
const Login = () => {
  const [emailId,setEmailId] = useState("")
  const [password, setPassword] = useState("") ;
  const [firstName,setFirstName] = useState("");
  const [lastName,setLastName] =useState("");
  const [isLoginForm , setIsLoginForm] = useState(" ");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error,setError] = useState();
  const handleLogin = async()=>
  {
    try{
      
      const res = await axios.post("http://localhost:5170/login",
      {emailId , password},{withCredentials:true});
      dispatch(addUser(res.data));
      navigate("/");
    }
    catch(err){
      setError(err?.response?.data || "something went wrong")
    }
  }
  const handleSignup= async()=>
    {
      try{
        
        const res = await axios.post("http://localhost:5170/signup",
        {firstName,lastName,emailId , password},{withCredentials:true});
        dispatch(addUser(res.data?.data));
        navigate("/profile");
      }
      catch(err){
        setError(err?.response?.data || "something went wrong")
      }
    }
  
  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-xl ">
    <div className="card-body">
      <h2 className="card-title justify-center">{ isLoginForm ? "Login" :"SignUp"}</h2>
      <div>
        {!isLoginForm && <>
          <label className="form-control w-full max-w-xs my-2">
  <div className="label ">
    <span className="label-text">First Name</span>
    
  </div>
  <input 
   type="text"
   placeholder="First Name" 
   value={firstName} 
   className="input input-bordered w-full max-w-xs "
   onChange={(e) => setFirstName(e.target.value)} />
 
</label>
<label className="form-control w-full max-w-xs my-2">
  <div className="label ">
    <span className="label-text">Last Name</span>
    
  </div>
  <input 
  type="text" 
  placeholder="Last Name" 
  value ={lastName} 
  className="input input-bordered w-full max-w-xs " 
  onChange={(e)=> setLastName(e.target.value)}/>
 
</label>
        </>}
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
      <p>{error}</p>
      <div className="card-actions justify-center">
        <button className="btn btn-primary font-bold " onClick={ isLoginForm ? handleLogin:handleSignup}>{ isLoginForm ? "Login" :"SignUp"}</button>
      </div>
      <p className='m-auto cursor-pointer my-2' onClick={() => setIsLoginForm((value) => !value)}>{ isLoginForm ? "New User ? SignUp Here" :"Existing User ? Login User"}</p>
    </div>
  </div></div>
  )
}

export default Login