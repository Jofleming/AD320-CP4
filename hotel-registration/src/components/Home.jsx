import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore'; 
import { db } from '../firebase'; 
import RoomFilter from './RoomFilter'; 
import RoomList from './RoomList'; 

const Home = () => {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]); 

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'rooms'));
        const roomData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(), 
        }));
        setRooms(roomData); 
        setFilteredRooms(roomData); 
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, []);

  return (
    <div>
      <h1>Room Listings</h1> {/* Add a heading */}
      <RoomFilter rooms={rooms} setFilteredRooms={setFilteredRooms} /> 
      <RoomList rooms={filteredRooms} /> 
    </div>
  );
};

export default Home;