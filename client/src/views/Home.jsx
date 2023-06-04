import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import axios from 'axios'

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [searchCountry, setSearchCountry] = useState("");
  const [originalCountries, setOriginalCountries] = useState([]);
  const [filterContinent, setFilterContinent] = useState("");
  const [filterActivity, setFilterActivity] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const countriesPerPage = 10;

  const getCountries = () => {
    axios
      .get("http://localhost:3001/countries")
      .then((response) => {
        setCountries(response.data);
        setOriginalCountries(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getCountries();
  }, []);

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchCountry(searchTerm);

    const filteredCountries = originalCountries.filter((country) =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCountries(filteredCountries);
    setCurrentPage(1);
  };

  const handleClearSearch = () => {
    setSearchCountry("");
    setCountries(originalCountries);
    setCurrentPage(1);
  };

  const handleFilterContinent = (event) => {
    const selectedContinent = event.target.value;
    setFilterContinent(selectedContinent);
    setCurrentPage(1);
  };

  const handleFilterActivity = (event) => {
    const selectedActivity = event.target.value;
    setFilterActivity(selectedActivity);
    setCurrentPage(1);
  };

  const handleSort = (option) => {
    setSortOption(option);
    setCurrentPage(1);
  };

  // Filtrar por continente
  const filteredByContinent = filterContinent
    ? countries.filter((country) => country.continent === filterContinent)
    : countries;

  // Filtrar por actividad turística
  const filteredByActivity = filterActivity
    ? filteredByContinent.filter((country) => country.activity === filterActivity)
    : filteredByContinent;

  // Ordenar países
  const sortedCountries = (() => {
    if (sortOption === "nameAsc") {
      return filteredByActivity.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === "nameDesc") {
      return filteredByActivity.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortOption === "populationAsc") {
      return filteredByActivity.sort((a, b) => a.population - b.population);
    } else if (sortOption === "populationDesc") {
      return filteredByActivity.sort((a, b) => b.population - a.population);
    } else {
      return filteredByActivity;
    }
  })();

  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = sortedCountries.slice(indexOfFirstCountry, indexOfLastCountry);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <h1>Home Countries</h1>
      <input onChange={handleSearch} type="text" value={searchCountry} placeholder="Search.." />
      <button onClick={handleClearSearch}>Clear</button>
      <div>
        <label htmlFor="filterContinent">Filter by continent:</label>
        <select id="filterContinent" value={filterContinent} onChange={handleFilterContinent}>
          <option value="">All</option>
          <option value="Africa">Africa</option>
          <option value="Antarctic">Antarctic</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Americas">Americas</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>
      <div>
        <label htmlFor="filterActivity">Filter by tourist activity:</label>
        <select id="filterActivity" value={filterActivity} onChange={handleFilterActivity}>
          <option value="">All</option>
          <option value="Beaches">Beaches</option>
          <option value="Mountains">Mountains</option>
          {/* Other activity options */}
        </select>
      </div>
      <div>
        <label htmlFor="sortOption">Sort by:</label>
        <select id="sortOption" value={sortOption} onChange={(e) => handleSort(e.target.value)}>
          <option value="">None</option>
          <option value="nameAsc">Name (A-Z)</option>
          <option value="nameDesc">Name (Z-A)</option>
          <option value="populationAsc">Population (Ascending)</option>
          <option value="populationDesc">Population (Descending)</option>
        </select>
      </div>
      <div className="card-list">
        {currentCountries.map((country) => (
          <div className="country-card" key={country.id}>
            <img src={country.flagImage} alt="Flag" />
            <h2>{country.name}</h2>
            <p>Continent: {country.continent}</p>
            <Link to={`/detail/${country.id}`}>Details</Link>
          </div>
        ))}
      </div>
      {sortedCountries.length > countriesPerPage && (
        <div>
          {Array.from({ length: Math.ceil(sortedCountries.length / countriesPerPage) }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              style={{ fontWeight: currentPage === index + 1 ? "bold" : "normal" }}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
