import React, { useState, useEffect } from 'react';
import ApiService from '../../service/ApiService';

const RoomSearch = ({ handleSearchResult }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [roomType, setRoomType] = useState('');
  const [roomTypes, setRoomTypes] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRoomTypes = async () => {
      try {
        const types = await ApiService.getRoomTypes();
        setRoomTypes(types);
      } catch (error) {
        console.error('Error fetching room types:', error.message);
      }
    };
    fetchRoomTypes();
  }, []);

  /**This methods is going to be used to show errors */
  const showError = (message, timeout = 5000) => {
    setError(message);
    setTimeout(() => {
      setError('');
    }, timeout);
  };

  /**THis is going to be used to fetch avaailabe rooms from database base on seach data that'll be passed in */
  const handleInternalSearch = async () => {
    if (!startDate || !endDate ) {
      showError('Please select all fields');
      return false;
    }
    if( startDate >= endDate ){ 
      showError('Start Date must come before End Date');
      return false ;
    } 
    if( new Date(startDate).toLocaleDateString() <= new Date().toLocaleDateString() ){
      showError('This date is not available');
      return false ;
    }
    try {
      // Convert startDate to the desired format
      //const formattedStartDate = startDate ? startDate.toISOString().split('T')[0] : null;
      //const formattedEndDate = endDate ? endDate.toISOString().split('T')[0] : null;

      //console.log("f start date = " , formattedStartDate )
      //console.log("f end date = " , formattedEndDate )
      // Call the API to fetch available rooms
      const response = await ApiService.getAvailableRoomsByDateAndType(startDate, endDate, roomType);

      // Check if the response is successful
      if (response.statusCode === 200) {
        if (response.roomList.length === 0) {
          showError('Room not currently available for this date range on the selected rom type.');
          return
        }
        let availableRooms = response.roomList ;
        availableRooms.forEach(element => {
          element.processedImg = 'data:image/jpeg;base64,' + element.byteImg ;
        });
        handleSearchResult(response.roomList);
        setError('');
      }
    } catch (error) {
      showError("Unown error occured: " + error.message);
    }
  };

  return (
    <section>
      <div className="search-container">
        <div className="search-field">
          <label>Check-in Date</label>
          <input type = "date"
            value={startDate}
            onChange={(date) => setStartDate(date.target.value)}
            dateformat="dd/MM/yyyy"
            placeholder="Select Check-in Date"
          />
        </div>
        <div className="search-field">
          <label>Check-out Date</label>
          <input type = "date"
            value={endDate}
            onChange={(date) => setEndDate(date.target.value)}
            dateformat="dd/MM/yyyy"
            placeholder="Select Check-out Date"
          />
        </div>

        <div className="search-field">
          <label>Room Type</label>
          <select value={roomType} onChange={(e) => setRoomType(e.target.value)}>
            <option value="">All</option>
            {roomTypes.map((roomType) => (
              <option key={roomType} value={roomType}>
                {roomType}
              </option>
            ))}
          </select>
        </div>
        <button className="home-search-button" onClick={handleInternalSearch}>
          Search Rooms
        </button>
      </div>
      {error && <p className="error-message">{error}</p>}
    </section>
  );
};

export default RoomSearch;
