import axios from 'axios'
import NavBar from './NavBar'
import { Outlet, useNavigate } from 'react-router'
import Footer from './Footer'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'
import { useEffect } from 'react'
const Body = () => {
  const userData = useSelector((store) =>{store.user});
  
  const dispatch = useDispatch();
  const navigate = useNavigate()
const fatchUser = async()=>{
  if(userData){
    return ;
  }
 try{
  const res =  await axios.get("http://localhost:5170/profile/view",{withCredentials:true});
dispatch(addUser(res.data));
 }
 catch(err){
  
  if(err.status == 401){
  navigate("/login")
  }
  console.error(err);
 }

}
useEffect(()=>{
 fatchUser()
},[]);
  
  return (
    <>
    <NavBar/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default Body