
import { useSelector } from 'react-redux'
import Logout from './Logout';

const NavBar = () => {
  const user = useSelector((store) =>store.user);

  return (
    <>
     <div className="navbar bg-base-300">
  <div className="flex-1">
    <a className="btn btn-ghost text-3xl">DevTinder</a>
  </div>
  <div className="flex-none gap-2 mx-4">
      {user && (
          <div className="dropdown dropdown-end flex ">
            <p className='m-2'>welcome , {user.firstName}</p>
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src={user.photoUrl} />
        </div>
      </div>
   
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a onClick={Logout}>Logout</a></li>
      </ul>
    </div>
  )}
  </div>
</div>
</>
  )
}

export default NavBar