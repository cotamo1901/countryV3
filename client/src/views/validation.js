export default function validation(inputs) {

    const errors = {};
    if (inputs.name === "") {
      errors.name = "Name can't be empty";
    }
    if(inputs.name.length>25){
      errors.name = "Max 25 char";
    }
    if (inputs.difficulty === "" || inputs.difficulty === "Select") {
      errors.difficulty = "Select a difficulty";
    }
  
  
    if (!/^[1-9]+[0-9]*$/.test(inputs.duration) || inputs.duration>23) {
      errors.duration = "Positive Integer less than 24";
    }
  
    if (inputs.season === "" || inputs.season === "Select") {
      errors.season = "Select a season";
    }
    if (inputs.countries.length === 0) {
      errors.countries = "Select at least 1 country";
    }
  
    return errors;
  }
  