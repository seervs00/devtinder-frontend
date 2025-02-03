import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";


const Feed = () => {
  const feed = useSelector((store) => store.feed)
  const dispatch = useDispatch();
  const getFeed = async() =>{
   try{
    if(feed) return ;
    const res = await axios.get("http://localhost:5170/feed",{withCredentials:true});
     dispatch(addFeed(res?.data?.data));
   }
   catch(err){
    console.error(err.message);
   }
  };
  useEffect(()=>{
    getFeed()
  },[]);
  if(!feed)return;
  if(feed.length ==0){
    return (<h1 className="flex justify-center my-10">No User Found !</h1>)
  }
  return (
    feed &&(
    <div className="flex justify-center my-12">
      <UserCard user = {feed[0]}/>
    </div>)
  )
}

export default Feed;