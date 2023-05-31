import { Link } from "./Link";
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
  return (
    <header>
      <div className="home">
        <div className="home-container">
          <h1 className="title">Home</h1>
          <Link to="/"></Link>
          {
            cities.map(l=>(
                <div>
                    <img src={l.flagImage}/>
                    <p>Nombre:{l.name}</p>
                    <p>Continent:{l.continent}</p>

                   
                </div>
            ))
          }
        </div>
      </div>
    </header>
  );
}
