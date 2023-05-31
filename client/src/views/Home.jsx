import { Link } from "./Link";
import { useEffect } from "react";

export default function Home() {
  const getCountries = () => {
    const data = fetch("http://localhost:3001/countries")
      .then((response) => response.json())
      .then((citys) => citys)
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
        </div>
      </div>
    </header>
  );
}
