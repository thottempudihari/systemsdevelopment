import React, { useState, useEffect } from "react";

const App = () => {
  const [interests, setInterests] = useState("");
  const [displayedInterests, setDisplayedInterests] = useState([]);
  const [address, setAddress] = useState("");
  const [benchmarks, setBenchmarks] = useState([]);
  const [selectedBenchmark, setSelectedBenchmark] = useState("");
  const [locationData, setLocationData] = useState(null);
  
  // Fetch available benchmarks on mount
  useEffect(() => {
    fetch("https://geocoding.geo.census.gov/geocoder/benchmarks")
      .then(response => response.json())
      .then(data => setBenchmarks(data.result))
      .catch(error => console.error("Error fetching benchmarks:", error));
  }, []);

  // Validate and update interests
  const handleInterestsSubmit = () => {
    if (!interests.includes(",")) {
      alert("Please enter interests as a comma-separated list!");
      return;
    }
    setDisplayedInterests(interests.split(",").map(i => i.trim()));
    setInterests("");
  };

  // Handle geolocation request
  const handleGeolocation = () => {
    if (!address || !selectedBenchmark) {
      alert("Please enter an address and select a benchmark.");
      return;
    }
    
    const geocodeUrl = `https://geocoding.geo.census.gov/geocoder/locations/onelineaddress?address=${encodeURIComponent(address)}&benchmark=${selectedBenchmark}&format=json`;
    
    fetch(geocodeUrl)
      .then(response => response.json())
      .then(data => {
        if (data.result.addressMatches.length > 0) {
          const match = data.result.addressMatches[0];
          setLocationData({
            lat: match.coordinates.y,
            lng: match.coordinates.x,
            matchedAddress: match.matchedAddress
          });
        } else {
          alert("No matching address found.");
        }
      })
      .catch(error => console.error("Error fetching geolocation:", error));
  };

  return (
    <div>
      <h2>Exercise 1: Input Validations</h2>
      <input 
        type="text" 
        value={interests} 
        onChange={(e) => setInterests(e.target.value)} 
        placeholder="Enter interests, comma-separated" 
      />
      <button onClick={handleInterestsSubmit}>Submit</button>
      <ul>
        {displayedInterests.map((interest, index) => (
          <li key={index}>{interest}</li>
        ))}
      </ul>
      
      <h2>Exercise 2: Geolocating</h2>
      <input 
        type="text" 
        value={address} 
        onChange={(e) => setAddress(e.target.value)} 
        placeholder="Enter full address" 
      />
      <select value={selectedBenchmark} onChange={(e) => setSelectedBenchmark(e.target.value)}>
        <option value="">Select Benchmark</option>
        {benchmarks.map((b) => (
          <option key={b.id} value={b.id}>{b.name}</option>
        ))}
      </select>
      <button onClick={handleGeolocation}>Submit</button>
      
      {locationData && (
        <div>
          <h3>Matched Address:</h3>
          <p>{locationData.matchedAddress}</p>
          <h3>Coordinates:</h3>
          <p>Latitude: {locationData.lat}, Longitude: {locationData.lng}</p>
          <iframe
            width="600"
            height="450"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAyvWMWA82-To-mOGv_oacqD0osXq-Rqfo&q=${encodeURIComponent(locationData.matchedAddress)}`}
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default App;
