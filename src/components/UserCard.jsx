import React from 'react'

const UserCard = ({user}) => {
   const {firstName , lastName ,photoUrl, about , age , gender } = user;
  return (
    <div><div className="card bg-base-300 w-80">
    <figure>
      <img
        src={photoUrl}
        alt="car!" />
    </figure>
    <div className="card-body">
      <h2 className="card-title">{firstName + " " + lastName}</h2>
      { age && gender && <p>{age + ", " + gender}</p>}
      <p>{about}</p>
      <div className="card-actions justify-around m-2">
        <button className="btn btn-primary">ignored</button>
        <button className="btn btn-secondary">interested</button>
      </div>
    </div>
  </div></div>
  
  )
}

export default UserCard