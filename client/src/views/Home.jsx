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
          <h1 className="title">Countries</h1>
          <Link to="/"></Link>

          <div className="cardComp">
            <div className="cardComp2">
              <div className="leftCard">
                <div className="flag">
                  {cities.map((l) => (
                    <div className="components-card">
                      <img className="flag" src={l.flagImage} alt="Flag not found" />
                      <div className="rightCardB">
                      <h2>{l.name}</h2>
                      <div className="items">
                        <p>Population:{l.population}</p>
                      <p>Continent:{l.continent}</p>

                      </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
