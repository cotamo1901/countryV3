import React, { useEffect, useState } from "react";

export default function Home() {
  const [cities, setCities] = useState([]);
  const [searchCity, setSearchCity] = useState("");
  const [originalCities, setOriginalCities] = useState([]);

  const getCountries = () => {
    fetch("http://localhost:3001/countries")
      .then((response) => response.json())
      .then((cities) => {
        setCities(cities);
        setOriginalCities(cities);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getCountries();
  }, []);

  function handleSearch(event) {
    const searchTerm = event.target.value;
    setSearchCity(searchTerm);

    const filteredCities = originalCities.filter((city) =>
      city.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCities(filteredCities);
  }

  function handleClearSearch() {
    setSearchCity("");
    setCities(originalCities);
  }

  console.log("cities :>> ", cities);

  return (
    <div>
      <h1>Home Countries</h1>
      <input onChange={handleSearch} type="text" value={searchCity} placeholder="Search.." />
      <button onClick={handleClearSearch}>Clear</button>
      <div className="card-list">
        {cities.map((city) => (
          <div className="country-card" key={city.id}>
            <img src={city.flagImage} alt="Flag" />
            <h2>{city.name}</h2>
            <p>Continente: {city.continent}</p>
          </div>
        ))}
      </div>
    </div>
  );
}