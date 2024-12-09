import React from 'react';
import ReservationCard from './ReservationCard';

const RoomList = ({ rooms }) => {
  return (
    <div className="room-list"> {/* Apply the 'room-list' class here */}
      {rooms.map((room) => (
        <ReservationCard key={room.id} room={room} /> 
      ))}
    </div>
  );
};

export default RoomList;