import React, { useState, useEffect } from "react";
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
  const [selectedContinent, setSelectedContinent] = useState("");
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [unSelectedCountries, setUnSelectedCountries] = useState([]);
  const [tried, setTried] = useState(0);
  const [activity, setActivity] = useState({
    countries: [],
    name: "",
    difficulty: "",
    duration: "",
    season: "",
  });
  const [errors, setErrors] = useState({
    countries: ``,
    name: "",
    difficulty: "",
    duration: "",
    season: "",
  });

  const [to, setTo] = useState([]);

  const handleRadio = (e) => {
    setSelectedContinent(e.target.value);
    props.filterbyContinent(e.target.value);
    props.orderCards("AA");
    props.filterSelectedCountries(to);
    setSelectedCountries([]);
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
    if (tried === 1) {
      setErrors(validation({ ...activity, [e.target.name]: e.target.value }));
    }
  };
  const handleSelectedCountries = (e) => {
    const options = e.target.options;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected && options[i].value !== "Nothing") {
        selected.push(options[i].value);
      }
    }
    setSelectedCountries(selected);
  };

  useEffect(() => {
    props.getCountries();
  }, []);

  return (
    <div className="container-form">
      <h1 className="title-form">Create Activity</h1>
      <form onSubmit={handleSubmit}>
        <fieldset className="bord-form">
          <br />
      <fieldset>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" onChange={changeActivity} />
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
        <select name="season" onChange={changeActivity} value={activity.season}>
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
          <div width="15%"> {errors.season && <div>{errors.season}</div>}</div>
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
              type="radio"
              id="Europe"
              name="continent"
              value="Europe"
              onChange={handleRadio}
              checked={selectedContinent === "Europe"}
            />
            <label htmlFor="Europe">Europe</label>
          </div>
          <div>
            <input
              type="radio"
              id="Americas"
              name="continent"
              value="Americas"
              onChange={handleRadio}
              checked={selectedContinent === "Americas"}
            />
            <label htmlFor="Americas">Americas</label>
          </div>
          <div>
            <input
              type="radio"
              id="Antarctic"
              name="continent"
              value="Antarctic"
              onChange={handleRadio}
              checked={selectedContinent === "Antarctic"}
            />
            <label htmlFor="Antartic">Antarctic</label>
          </div>
          <div>
            <input
              type="radio"
              id="Africa"
              name="continent"
              value="Africa"
              onChange={handleRadio}
              checked={selectedContinent === "Africa"}
            />
            <label htmlFor="Africa">Africa</label>
          </div>
          <div>
            <input
              type="radio"
              id="Asia"
              name="continent"
              value="Asia"
              onChange={handleRadio}
              checked={selectedContinent === "Asia"}
            />
            <label htmlFor="Asia">Asia</label>
          </div>
          <div>
            <input
              type="radio"
              id="Oceania"
              name="continent"
              value="Oceania"
              onChange={handleRadio}
              checked={selectedContinent === "Oceania"}
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
            to.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))
          ) : (
            <option value="nothing">Nothing here yet!</option>
          )}
        </select>
        </fieldset>


        <input type="button" onClick={changeTo} value=">>" />
        <input type="button" onClick={changeBack} value="<<" />

        <input type="submit" value="Save Activity" />
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

