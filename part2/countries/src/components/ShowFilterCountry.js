import React from 'react'

const ShowFilteredCountry = (props) => {
    let numCountries = props.filteredCountries.length
    let weather = props.weather
    console.log(weather)

    return (
        <>
            {
                numCountries > 10 && <div>Too many matches, specify another filter</div>
            }

            {
                numCountries <= 10 &&  numCountries > 1 && props.filteredCountries.map(country => <CountryList key = {country.cca3} countryName = {country.name.common} country = {country}/>)
            }

            {
                numCountries === 1 &&
                props.filteredCountries.map(country => <Country key = {country.cca3} country = {country} weather = {weather} />)
            }
        </>
    )
}
// conditional statement within JSX

const CountryList = ({country}) => {
    return (
        <>
            <div>
                {country.name.common}
                <button>Show</button>
            </div>
        </>
    )
}

const Country = (props) => {
    let languages = []
    let countryLanguages = props.country.languages
    for (const lang in countryLanguages) {
        languages.push(countryLanguages[lang])
    }
    let countryName = props.country.name.common
    console.log(props.weather.current)

    return (
        <>
            <h2>{countryName}</h2>
            <div>Capital: {props.country.capital}</div>
            <div>Population: {props.country.population}</div>

            <h3>Languages</h3>
            <ul>
                {languages.map(language => <li key = {language}>{language}</li>)}
            </ul>
            <div>{props.country.flag}</div>

            <h3>Weather in {countryName}</h3>
            <div><b>temperature: </b>{}</div>
        </>
    )
}

export default ShowFilteredCountry