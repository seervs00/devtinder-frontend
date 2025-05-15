import axios from "axios";
import { addRequest, removeRequest } from "../utils/request";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Request = () => {
  const dispatch = useDispatch();
  const request = useSelector((store) => store.request);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRequest = async () => {
    try {
      const res = await axios.get("http://localhost:5170/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequest(res?.data?.connectionRequest));
    } catch (err) {
      console.error(err);
      setError("Failed to fetch Request");
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (id) => {
   
    if (!id) {
      setError("Invalid request ID");
      return;
    }
    try {
      await axios.post(`http://localhost:5170/request/review/accepted/${id}`, {}, {
        withCredentials: true,
      });
      dispatch(removeRequest());
      fetchRequest();
    } catch (err) {
      console.error(err);
      setError("Failed to accept request");
    }
  };
  
  const handleReject = async (id) => {

    if (!id) {
      setError("Invalid request ID");
      return;
    }
    try {
      await axios.post(`http://localhost:5170/request/review/rejected/${id}`, {}, {
        withCredentials: true,
      });
      dispatch(removeRequest());
      fetchRequest();
    } catch (err) {
      console.error(err);
      setError("Failed to reject request");
    }
  };

  useEffect(() => {
    fetchRequest();
  }, [dispatch]);

  if (loading) {
    return <div className="text-center font-bold"><h3>Loading...</h3></div>;
  }

  if (error) {
    return <div className="text-center font-bold text-red-500"><h3>{error}</h3></div>;
  }

  if (!request || request.length === 0) {
    return <div className="text-center font-bold my-5 text-2xl"><h3>No Request</h3></div>;
  }

  return (
    <div className="text-center my-10 justify-between">
      <h1 className="text-bold text-white text-3xl">Request</h1>
      {request.map((request, index) => {
        const { firstName, lastName, about, photoUrl, age, gender} = request.fromUserId;
        return (
          <div key={request._id || index} className="flex justify-center rounded-lg m-4 p-4 bg-base-300 mx-auto w-1/2">
            <div>
              <img 
                src={photoUrl || "https://via.placeholder.com/150"} 
                alt="photo" 
                className="w-20 h-20 rounded-full" 
              />
            </div>
            <div className="text-left mx-10">
              <h2 className="text-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p>{age + " " + gender}</p>}
              {about && <p>{about}</p>}
            </div>
            <div className="flex items-center">
              <button 
                onClick={() => handleReject(request._id)} 
                className="btn btn-outline btn-error btn-sm hover:bg-red-500 hover:text-white transition-colors duration-300 mx-2"
              >
                Reject
              </button>
              <button 
                onClick={() => handleAccept(request._id)} 
                className="btn btn-outline btn-success btn-sm hover:bg-green-500 hover:text-white transition-colors duration-300 mx-2"
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Request;