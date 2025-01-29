import axios from "axios";
import { useState } from "react";
import UserCard from "./UserCard";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ User }) => {
  const [firstName, setFirstName] = useState(User.firstName);
  const [lastName, setLastName] = useState(User.lastName);
  const [age, setAge] = useState(User.age);
  const [gender, setGender] = useState(User.gender);
  const [photoUrl, setPhotoUrl] = useState(User.photoUrl);
  const [skills, setSkills] = useState(User.skills);
  const [about, setAbout] = useState(User.about);
  const [err, setErr] = useState("");
  const [isSaving,setIsSaving] = useState(false);
  const dispatch = useDispatch();
  
 
  const handleSaveProfile = async () => {
    setErr(""); // Clear previous errors
    
    try {
      const res = await axios.post(
        "http://localhost:5170/profile/edit",
        { firstName, lastName, gender, age, about, photoUrl, skills },
        { withCredentials: true }
      );
      
      console.log("the result", res)
      
      dispatch(addUser(res?.data?.data)); // Assuming this updates the user in Redux store
      setIsSaving(true); // Start the saving process
      // Stop saving process
      // setShowMessage(true)
      setTimeout(() =>{
        setIsSaving(false);
      },2000)
   
    } catch (err) {
     
      setErr("Failed to save profile. Please try again later." );
      console.log(err)
    }
  };

  return (
   <>
   <div className="flex justify-center my-5">
      <div className="flex justify-center mx-5">
        <div className="card bg-base-300 w-80 shadow-xl">
          <div className="card-body">
            <h2 className="card-title justify-center">Profile</h2>
            <div>
              <label className="form-control w-full max-w-xs my-1">
                <div className="label">
                  <span className="label-text">First Name</span>
                </div>
                <input
                  type="text"
                  value={firstName}
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>

              <label className="form-control w-full max-w-xs my-1">
                <div className="label">
                  <span className="label-text">Last Name</span>
                </div>
                <input
                  type="text"
                  value={lastName}
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>

              <label className="form-control w-full max-w-xs my-1">
                <div className="label">
                  <span className="label-text">Age</span>
                </div>
                <input
                  type="number"
                  value={age}
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setAge(e.target.value)}
                />
              </label>

              <label className="form-control w-full max-w-xs my-1">
                <div className="label">
                  <span className="label-text">Gender</span>
                </div>
                <input
                  type="text"
                  value={gender}
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setGender(e.target.value)}
                />
              </label>

              <label className="form-control w-full max-w-xs my-1">
                <div className="label">
                  <span className="label-text">Photo URL</span>
                </div>
                <input
                  type="text"
                  value={photoUrl}
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
              </label>

              <label className="form-control w-full max-w-xs my-1">
                <div className="label">
                  <span className="label-text">Skills</span>
                </div>
                <input
                  type="text"
                  value={skills}
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setSkills(e.target.value)}
                />
              </label>

              <label className="form-control w-full max-w-xs my-1">
                <div className="label">
                  <span className="label-text">About</span>
                </div>
                <input
                  type="text"
                  value={about}
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setAbout(e.target.value)}
                />
              </label>
            </div>

            {err && <p className="text-red-500 text-sm mt-2">{err}</p>}

            <div className="card-actions justify-center">
              <button
                className={`btn btn-primary font-bold`}
                onClick={handleSaveProfile}
                
              >Save Profile
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <UserCard user={{firstName , lastName ,photoUrl, about , age , gender }} />
      </div>
    </div>
    {isSaving && <div className="toast toast-top toast-center">
  <div className="alert alert-success">
    <span>Profile Save successfully.</span>
  </div>
</div>
}
   </>
    
  );
};

export default EditProfile;







