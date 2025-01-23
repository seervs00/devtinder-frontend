
  import axios from 'axios';
  const Logout = async()=>{
     const res =  await axios.post("http://localhost:5170/logout",{withCredentials:true})
      
    
      }
  
  
  export default Logout