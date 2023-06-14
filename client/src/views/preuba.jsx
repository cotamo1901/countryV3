import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import validation from "./validation";

import {
  filterbyContinent,
  filterSelectedCountries,
  orderCards,
  getCountries,
} from "../redux/actions.js";

export const Form = (props) => {
  const [selectedContinent, setSelectedContinent] = React.useState([]);
  const [selectedValue, setSelectValue] = React.useState(""); //prueba
  const [selectedCountries, setSelectedCountries] = React.useState([]);
  const [unSelectedCountries, setUnSelectedCountries] = React.useState([]);
  const [responseContinent,setResponseContinent] =React.useState("")
  const [continentInfo, setContinentInfo] = React.useState({});
  const [tried, setTried] = React.useState(0);
  const [activity, setActivity] = React.useState({
    name: "",
    difficulty: 0,
    duration: "",
    season: "",
    countries: [],
  });
  const [errors, setErrors] = React.useState({
    countries: ``,
    name: "",
    difficulty: "",
    duration: "",
    season: "",
  });


  
  const handleCheckboxChange = async (event) => {
    const { name, checked } = event.target;
    setSelectedContinent((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [name]: checked,
    }));

    // Fetch continent information when checkbox is checked
    if (checked) {
      const res = await axios(
        `http://localhost:3001/countries/continent?continent=${name}`
      );
      setContinentInfo((prevContinentInfo) => ({
        ...prevContinentInfo,
        [name]: res.data,
      }));
    } else {
      // Remove continent information when checkbox is unchecked
      setContinentInfo((prevContinentInfo) => {
        const updatedInfo = { ...prevContinentInfo };
        delete updatedInfo[name];
        return updatedInfo;
      });
    }
  };

  // Render continent information
  const renderContinentInfo = () => {
    return Object.entries(continentInfo).map(([continent, countries]) => (
      <div key={continent}>
        <h2>{continent}</h2>
        <ul>
          {countries.map((country) => (
            <li key={country.id}>{country.name}</li>
          ))}
        </ul>
      </div>
    ));
  };


  const [to, setTo] = React.useState([]);

  const handleRadio = (e) => {
    setSelectedContinent(e.target.value);
    props.filterbyContinent(e.target.value);
    props.orderCards("AA");
    props.filterSelectedCountries(to);
    setSelectedCountries([]);
    console.log("aqui esta :>> ", e);
  };

  const changeTo = () => {
    setTo(to.concat(selectedCountries));
    setActivity({ ...activity, countries: to.concat(selectedCountries) });
    if (tried === 1) {
      setErrors(
        validation({ ...activity, countries: to.concat(selectedCountries) })
      );
      props.filterSelectedCountries(selectedCountries);
    }
  };

  const changeBack = () => {
    const filteredTo = to.filter(
      (country) => !unSelectedCountries.includes(country)
    );
    setActivity({ ...activity, countries: to });
    props.filterbyContinent(selectedContinent);
    props.orderCards("AA");
    props.filterSelectedCountries(filteredTo);
    if (tried === 1) {
      setErrors(validation({ ...activity, countries: filteredTo }));
    }
    setTo(filteredTo);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTried(1);
    setErrors(validation(activity));

    if (
      !validation(activity).countries &&
      !validation(activity).difficulty &&
      !validation(activity).duration &&
      !validation(activity).name &&
      !validation(activity).season
    ) {
      setTried(0);

      await axios.post(`http://localhost:3001/activities/`, activity);

      setActivity({
        ...activity,
        name: "",
        season: "",
        duration: "",
        difficulty: "",
        countries: [],
      });
      setTo([]);
      props.getCountries();
    }
  };

  const changeActivity = (e) => {
    setActivity({ ...activity, [e.target.name]: e.target.value });
    console.log("aquiesta la actividad :>> ", e);
    if (tried === 1) {
      setErrors(validation({ ...activity, [e.target.name]: e.target.value }));
    }
  };
  const handleSelectedCountries = (e) => {
    const options = Array.from(e.target.options);
    const selected = options
      .filter((option) => option.selected && option.value !== "Nothing")
      .map((option) => option.value);
    const unselected = options
      .filter((option) => !option.selected && option.value !== "Nothing")
      .map((option) => option.value);

    setSelectedCountries(selected);
    setUnSelectedCountries(unselected);
  };

  React.useEffect(() => {
    props.getCountries();
  }, []);

  function formPrueba(e) {
    e.preventDefault();
    console.log("e.target.name :>> ", e.target.name);
    console.log("e.target.value :>> ", e.target.value);
  }

  return (
    <div className="container-form">
      <h1 className="title-form">Create Activity</h1>
      <form onSubmit={handleSubmit}>
        <fieldset className="bord-form">
          <br />
          <fieldset>
        <legend>Selected Continents Information</legend>
        {renderContinentInfo()}
      </fieldset>
          <fieldset>
            <label htmlFor="name">Name</label>
            <input
              placeholder="Activity Name"
              type="text"
              id="name"
              name="name"
              value={activity.name}
              onChange={(e) => {
                changeActivity(e);
              }}
            />
          </fieldset>
          <br />
          <fieldset>
            <label htmlFor="difficulty">Difficulty</label>
            <select
              name="difficulty"
              onChange={changeActivity}
              value={activity.difficulty}
            >
              <option value="Select">Please select</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </fieldset>
          <br />
          <fieldset>
            <label>Season</label>
            <select
              name="season"
              onChange={changeActivity}
              value={activity.season}
            >
              <option value="Select">Please select</option>
              <option value="Winter">Winter</option>
              <option value="Spring">Spring</option>
              <option value="Summer">Summer</option>
              <option value="Autumm">Autumn</option>
            </select>
          </fieldset>
          <br />
          <fieldset>
            <label>Duration</label>
            <input
              type="text"
              onChange={changeActivity}
              placeholder="duration in hours"
              name="duration"
              value={activity.duration}
            />
          </fieldset>
          <div>
            <div width="40%"> {errors.name && <div>{errors.name}</div>}</div>
            <div width="15%">
              {" "}
              {errors.difficulty && <div>{errors.difficulty}</div>}
            </div>
            <div width="15%">
              {" "}
              {errors.season && <div>{errors.season}</div>}
            </div>
            <div width="30%">
              {" "}
              {errors.duration && <div>{errors.duration}</div>}
            </div>
          </div>
          <br />

          <fieldset>
            <legend>Select a continent</legend>

            <div>
              <input
                type="checkbox"
                id="Europe"
                name="Europe"
                value="Europe"
                onChange={handleCheckboxChange}
                checked={selectedContinent.Europe || false}
              />
              <label htmlFor="Europe">Europe</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="Americas"
                name="Americas"
                value="Americas"
                onChange={handleCheckboxChange}
                checked={selectedContinent.Americas || false}
              />
              <label htmlFor="Americas">Americas</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="Antarctic"
                name="Antarctic"
                value="Antarctic"
                onChange={handleCheckboxChange}
                checked={selectedContinent.Antartic || false}
              />
              <label htmlFor="Antartic">Antarctic</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="Africa"
                name="Africa"
                value="Africa"
                onChange={handleCheckboxChange}
                checked={selectedContinent.Africa || false || false}
              />
              <label htmlFor="Africa">Africa</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="Asia"
                name="Asia"
                value="Asia"
                onChange={handleCheckboxChange}
                checked={selectedContinent.Asia || false || false}
              />
              <label htmlFor="Asia">Asia</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="Oceania"
                name="Oceania"
                value="Oceania"
                onChange={handleCheckboxChange}
                checked={selectedContinent.oceania || false}
              />
              <label htmlFor="Oceania">Oceania</label>
            </div>
          </fieldset>
          <fieldset>
            <br />
            <label htmlFor="to">Select countries:</label>
            <select
              id="to"
              name="to"
              size="5"
              multiple
              value={unSelectedCountries}
              onChange={handleSelectedCountries}
            >
              {to.length ? (
                to.map((country, index) => (
                  <option key={index} value={country}>
                    {country}
                  </option>
                ))
              ) : (
                <option value="nothing">Nothing here left!</option>
              )}
            </select>
          </fieldset>

          <input type="button" onClick={changeTo} value=">>" />
          <input type="button" onClick={changeBack} value="<<" />

          <input type="submit" value="Save Activity" />

          <Link to={`/countries/`}>Home</Link>
        </fieldset>
      </form>
    </div>
  );
};

export function mapDispatchToProps(dispatch) {
  return {
    orderCards: function (id) {
      dispatch(orderCards(id));
    },
    filterbyContinent: function (id) {
      dispatch(filterbyContinent(id));
    },
    filterSelectedCountries: function (countriesArray) {
      dispatch(filterSelectedCountries(countriesArray));
    },
    getCountries: function (userData) {
      dispatch(getCountries(userData));
    },
  };
}

export function mapStateToProps(state) {
  return {
    countries: state.countries,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Form);
