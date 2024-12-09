// src/components/RoomDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../../context/AuthContext';

const RoomDetails = () => {
  const { roomId } = useParams();
  const [room, setRoom] = useState(null);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [error, setError] = useState('');
  const { currentUser } = useAuth();

  useEffect(() => {
    const getRoomData = async () => {
      try {
        const docRef = doc(db, 'rooms', roomId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setRoom(docSnap.data());
        } else {
          console.error("Room not found."); 
        }
      } catch (error) {
        console.error("Error fetching room details:", error);
      }
    };
    getRoomData();
  }, [roomId]);

  const handleBooking = async () => {
    try {
      if (!room) {
        setError("Room not found.");
        return;
      }

      if (!room.availability) {
        setError("Room is not available.");
        return;
      }

      // Update room availability in Firestore
      const roomRef = doc(db, 'rooms', roomId);
      await updateDoc(roomRef, { availability: false });

      // Add booking information to Firestore (or user's document) 
      // ... (Implement logic to store booking data)

      setError(''); // Clear any previous errors
      alert('Booking successful!'); 
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      {room ? (
        <>
          <h2>{room.name}</h2>
          <img src={room.imageUrl} alt={room.name} />
          <p>{room.description}</p>
          <p>Price: ${room.price}</p>
          <ul>
            {room.amenities && room.amenities.map((amenity) => (
              <li key={amenity}>{amenity}</li>
            ))}
          </ul>

          {currentUser && ( 
            <>
              <h3>Book Now</h3>
              <input 
                type="date" 
                value={bookingDate} 
                onChange={(e) => setBookingDate(e.target.value)} 
              />
              <input 
                type="time" 
                value={bookingTime} 
                onChange={(e) => setBookingTime(e.target.value)} 
              />
              <button onClick={handleBooking}>Book</button>
              {error && <p>{error}</p>} 
            </>
          )}

        </>
      ) : (
        <p>Loading room details...</p> 
      )}
    </div>
  );
};

export default RoomDetails;