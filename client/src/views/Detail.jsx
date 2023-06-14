import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import '../assets/styles/Detail.css';

const Detail = () => {
  let { id } = useParams();
  const [country, setCountry] = React.useState({});

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/countries/${id}`);
        const countryData = response.data;
        const activitiesResponse = await axios.get(`http://localhost:3001/activities?countryId=${id}`);
        const activitiesData = activitiesResponse.data;
        const countryWithActivities = { ...countryData, activities: activitiesData };

        setCountry(countryWithActivities);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    fetchCountryData();
  }, [id]);

  return (
    <div className="detail-page">
      <div className="detail-container">
        <div>Code: {country.id}</div>
        <div>Name: {country.name}</div>
        <div>
          <img src={country.flagImage} alt="Flag not found" />
        </div>
        <div>Region: {country.continent}</div>
        <div>Capital City: {country.capital}</div>
        <div>Subregion: {country?.subregion}</div>
        <div>Surface: {country?.surface?.toLocaleString()} KM<sup>2</sup></div>
        <div>Population: {country?.population?.toLocaleString()}</div>
        <div>
          <b>Touristic Activities:</b>
        </div>
        {!country.activities?.length && <div>There aren't any activities to show</div>}
        {country.activities &&
          country.activities.map((activity) => <div key={activity.id}>{activity.name}</div>)}
        <Link to={`/countries/`}>Back</Link>
      </div>
    </div>
  );
};

export default Detail;
