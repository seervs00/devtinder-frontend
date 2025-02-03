
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";


const UserCard = ({ user }) => {
 const dispatch = useDispatch();
  const {_id,firstName, lastName, photoUrl, about, age, gender } = user;

  const handleRequest = async(status,userId) =>{
 try{
   await axios.post("http://localhost:5170/request/send/"+ status + "/" + userId ,{},{withCredentials:true})
  dispatch(removeFeed(userId));

 }
 catch(err){
  console.error(err);
 }
  }
  return (
    <div className="card bg-white rounded-xl shadow-xl overflow-hidden w-full max-w-sm transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
      {/* Profile Image */}
      <figure className="relative h-60">
        <img
          src={photoUrl || "https://via.placeholder.com/300"}
          alt={`${firstName} ${lastName}`}
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        {/* User Name */}
        <div className="absolute bottom-4 left-4 text-white">
          <h2 className="text-2xl font-bold">
            {firstName} {lastName}
          </h2>
          {(age || gender) && (
            <p className="text-sm text-gray-200">
              {age && `${age},`} {gender}
            </p>
          )}
        </div>
      </figure>

      {/* Card Body */}
      <div className="p-6">
        {/* About Section */}
        <div className="flex items-start space-x-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-purple-500 flex-shrink-0 mt-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-gray-600 text-sm">
            {about || "No description provided."}
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 my-4"></div>

        {/* Action Buttons */}
        <div className="flex justify-between">
          <button
            
            className="btn btn-outline btn-error btn-sm hover:bg-red-500 hover:text-white transition-colors duration-300"
            aria-label="Ignore"
            onClick={() => handleRequest("ignored", _id)}
          >
            Ignore
          </button>
          <button
           
            className="btn btn-outline btn-success btn-sm hover:bg-green-500 hover:text-white transition-colors duration-300"
            aria-label="Interested"
            onClick={() => handleRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};



export default UserCard;