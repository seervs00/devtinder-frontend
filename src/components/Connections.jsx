import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { addConnection } from '../utils/connectionSlice';
import { Link } from 'react-router';
const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchConnections = async () => {
    try {
      const res = await axios.get("http://localhost:5170/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnection(res?.data?.data));
    } catch (err) {
      console.error(err);
      setError("Failed to fetch connections");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, [dispatch]);

  if (loading) {
    return <div className="text-center font-bold"><h3>Loading...</h3></div>;
  }

  if (error) {
    return <div className="text-center font-bold text-red-500"><h3>{error}</h3></div>;
  }

  if (!connections || connections.length === 0) {
    return <div className="text-center font-bold"><h3>No connections</h3></div>;
  }

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl">Connections</h1>
      {connections.map((connection, index) => {
        const { firstName, lastName, about, photoUrl, age, gender, _id } = connection;
        return (
          
          <div key={_id || index} className="flex justify-between m-4 p-4 bg-base-300 mx-auto w-1/2">
          <div className="flex rounded-lg " > 
             <div>
              <img src={photoUrl} alt="photo" className="w-20 h-20 rounded-full" />
            </div>
            <div className="text-left mx-10">
              <h2 className="text-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p>{age + " " + gender}</p>}
              {about && <p>{about}</p>}
            </div></div>
            <div> <Link to={"/Chat/"+ _id}><button className='btn btn-primary'>Chat</button></Link>
            </div>
          </div>
            
        );
      })}
    </div>
  );
};

export default Connections;