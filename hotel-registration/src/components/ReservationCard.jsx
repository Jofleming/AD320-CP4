import React from 'react';
import { Link } from 'react-router-dom'; 

const ReservationCard = ({ room }) => {
  return (
    <div className="room-card"> {/* Apply the 'room-card' class here */}
      {/* <img src={room.imageUrl} alt={room.name} /> */} 
      <h3>{room.name}</h3>
      <p>{room.description}</p>
      <p>Price: ${room.price}</p>
      <Link to={`/details/${room.id}`}>View Details</Link> 
    </div>
  );
};

export default ReservationCard;