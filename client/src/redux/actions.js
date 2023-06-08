import axios from "axios";
export const GET_COUNTRIES = "GET_COUNTRIES";
export const GET_ACTIVITIES = "GET_ACTIVITIES";
export const GOTO_PAGE = "GOTO_PAGE";
export const ON_SEARCH = "ON_SEARCH";
export const ORDER = "ORDER";
export const CREATE_ERROR = "CREATE_ERROR";
export const FILTER_BY_CONTINENT = "FILTER_BY_CONTINENT";
export const FILTER_BY_ACTIVITY = "FILTER_BY_ACTIVITY";
export const FILTER_SELECTED_COUNTRIES = "FILTER_SELECTED_COUNTRIES";

export function getCountries(character) {
  return function (dispatch) {
    axios
      .get(`http://localhost:3001/countries`)
      .then((response) => response.data)
      .then((data) => dispatch({ type: GET_COUNTRIES, payload: data }))


  };
}

export function getActivities() {
  return function (dispatch) {
    axios
      .get(`http://localhost:3001/activities`)
      .then((response) => response.data)
      .then((data) => dispatch({ type: GET_ACTIVITIES, payload: data }));
  };
}

export function gotoPage(page) {
  return { type: GOTO_PAGE, payload: page };
}

export function orderCards(id) {
  return { type: ORDER, payload: id };
}

export function filterbyContinent(id) {
  return { type: FILTER_BY_CONTINENT, payload: id };
}

export function filterbyActivity(id) {
  return { type: FILTER_BY_ACTIVITY, payload: id };
}

export function filterSelectedCountries(countriesArray) {
  return { type: FILTER_SELECTED_COUNTRIES, payload: countriesArray };
}

export function onSearch(input) {
  return function (dispatch) {
    axios
      .get(`http://localhost:3001/countries/?name=${input}`)
      .then((response) => response.data)
      .then((data) => dispatch({ type: ON_SEARCH, payload: data }))
      .catch(e=>{dispatch({type: "CREATE_ERROR", payload:e})})
  };
}
