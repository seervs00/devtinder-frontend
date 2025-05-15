import { useSelector } from "react-redux"
import EditProfile from "./EditProfile"

const Profile = () => {
  const User = useSelector((store) => store.user)
  return (User &&(
    <div><EditProfile User = {User}/></div>
  )
  )
}

export default Profile