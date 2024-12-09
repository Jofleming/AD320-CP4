// src/components/RoomFilter.jsx
import React, { useState } from 'react';
import styles from './RoomFilter.module.css';

const RoomFilter = ({ rooms, setFilteredRooms }) => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);

  const handleFilter = () => {
    const filtered = rooms.filter((room) => {
      return room.price >= parseFloat(minPrice) && room.price <= parseFloat(maxPrice);
    });
    setFilteredRooms(filtered);
  };

  return (
    <div className={styles.filterContainer}>
      <h2>Filter Rooms</h2>
      <div class="filter-inputs">
        <div>
            <label htmlFor="minPrice">Min Price:</label>
            <input 
            type="number" 
            id="minPrice" 
            value={minPrice} 
            onChange={(e) => setMinPrice(e.target.value)} 
            min="0" 
            />
        </div>
        <div>
            <label htmlFor="maxPrice">Max Price:</label>
            <input 
            type="number" 
            id="maxPrice" 
            value={maxPrice} 
            onChange={(e) => setMaxPrice(e.target.value)} 
            min="0" 
            />
        </div>
      </div>

      <button onClick={handleFilter}>Filter</button> 
    </div>
  );
};

export default RoomFilter;