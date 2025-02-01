
import { useDispatch, useSelector } from 'react-redux'

import { Link, useNavigate } from 'react-router';
import axios from 'axios';
import { removeUser } from '../utils/userSlice';

const NavBar = () => {
  const user = useSelector((store) =>store.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async()=>{
    try{
      await axios.post("http://localhost:5170/logout",{},{withCredentials:true})
      dispatch(removeUser());
      navigate("/login")
    }
    catch(err){
      console.error(err.message)
    }
  }

  return (
    <>
     <div className="navbar bg-base-300 ">
  <div className="flex-1">
    <Link to="/" className="btn btn-ghost text-3xl">DevTinder</Link>
  </div>
  <div className="flex-none gap-2 mx-4">
      {user && (
          <div className="dropdown dropdown-end flex ">
            <p className='m-2'>welcome , {user.firstName}</p>
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src={user.photoUrl}/>
        </div>
      </div>
   
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li>
          <Link to = "/profile" className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li><Link to="/connections">Connection</Link></li>
        <li><Link to="/request">Request</Link></li>
        <li><a onClick={handleLogout}>Logout</a></li>
      </ul>
    </div>
  )}
  </div>
</div>
</>
  )
}

export default NavBar