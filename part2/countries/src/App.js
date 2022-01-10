import React, {useState, useEffect} from 'react'
import axios from 'axios'
import FindCountry from './components/FindCountry'
import ShowFilteredCountry from './components/ShowFilterCountry'

function App() {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [newCountry, setNewCountry] = useState("")
  const [weather, setWeather] = useState([])

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  // useEffect(() => {
  //   axios
  //     .get("http://api.weatherstack.com/current", {params: {access_key: process.env.REACT_APP_WEATHERKEY, query: "New York"}})
  //     .then(response => {
  //       setWeather(response.data)
  //     })
  // }, [])

  const changeWeather = (countryName) => {
    axios
      .get("http://api.weatherstack.com/current", {params: {access_key: process.env.REACT_APP_WEATHERKEY, query: countryName}})
      .then(response => {
        setWeather(response.data)
      })
  }
  // also can do const url = "http://..../current?access_key=${}&query..."

  const handleChangeCountry = (event) => { 
    let countryName = event.target.value
    countryName = countryName.charAt(0).toUpperCase() + countryName.slice(1)
    
    setNewCountry(countryName)
    setFilteredCountries(countries.filter(country => country.name.common.includes(countryName)))
    changeWeather(countryName)
  }
  // event refers to controlled input elem, event.target.val refers to input val of elem

  return (
    <div>
      <h1>Countries</h1>
      <FindCountry inputVal = {newCountry} onChange = {handleChangeCountry} />
      <ShowFilteredCountry filteredCountries = {filteredCountries} weather = {weather} />
    </div>
  );
}

export default App;
