import { useEffect, useState } from "react";

export default function Home() {
  const [cities, setCities] = useState([]);
  const getCountries = () => {
    const data = fetch("http://localhost:3001/countries")
      .then((response) => response.json())
      .then((citys) => setCities(citys))
      .catch((error) => console.error(error));
    console.log("data :>> ", data);
  };
  useEffect(() => {
    getCountries();
  }, []);
return(
    <div>
        <h1>Home Countries</h1>
        <input type="text" placeholder="Search.."  />

        <div className="card-list">
            {cities.map(country=>(
                <div className="country-card" key={country.id}>
                    <img src={country.flagImage} alt="Flag" />
                    <h2>{country.name}</h2>
                    <p>Continente:{country.continent}</p>

                    
                </div>
            ))}

        </div>



    </div>
)}