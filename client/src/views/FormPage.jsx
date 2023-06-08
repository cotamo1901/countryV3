import React, { useEffect, useState } from "react";

import { Link } from "./Link";
import axios from "axios";

const FormPage = () => {
  const [form, setForm] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
  });

  const formCountry = () => {
    // axios
    //   .post("http://localhost:3001/activities")
    //   .then((response) => {
    //     setForm(response.data);
    //     setOriginalForm(response.data);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  };

  useEffect(() => {
    formCountry();
  }, []);

  function CambioEstado(e) {
    e.preventDefault()
    setForm(
        {
            ...form,
            [e.target.name ]: e.target.value
        }
    )
    
    console.log(e.target.value)
  }


  return (
    <header>
      <div className="FormPage">
        <div className="Form-container">
          <h1 className="title">Form</h1>
          <form action="">
            <div>
              <label htmlFor="">
                name:
                <input type="text" name="name" onChange={CambioEstado} />
              </label>
            </div>
            <div>
              <label htmlFor="">
                difficulty:
                <input type="text" name="difficulty" onChange={CambioEstado} />
              </label>
            </div>
            <div>
              <label htmlFor="">
                duration:
                <input type="text" name="duration" onChange={CambioEstado}/>
              </label>
            </div>
            <div>
              <label htmlFor="">
                season:
                <input type="text" name=" season"onChange={CambioEstado} />
              </label>
            </div>
          </form>
        </div>
      </div>
    </header>
  );
};

export default FormPage;
