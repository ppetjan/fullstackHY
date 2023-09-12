import { useEffect, useState } from 'react'
import axios from 'axios'

const Filter = ({ currentSearch, handleSearch }) => (
  <div>
    find countries
    <input
      onChange={handleSearch}
      value={currentSearch}
    />
  </div>
)

const Countries = ({ countries, currentSearch, setNewSearch }) => {
  const matches = countries.filter(country => country.name.common.toLowerCase().includes(currentSearch.toLowerCase()))
  if (matches.length < 10)  {
      if (matches.length === 1) return (<Country country={matches[0]} setNewSearch={setNewSearch}/>)
    return ( matches.map(country => 
      <p key={country.name.common}>
        {country.name.common}
        <button onClick={() => setNewSearch(country.name.common)}>show</button>
      </p>
      )
    )
  }
  return (<p>Too many matches, specify another filter</p>)
}

const Country = ({ country, setNewSearch }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <LanguageList country={country}/>
      <img src={country.flags.png} alt={country.flags.alt}/>
      <br/>
      <button onClick={() => setNewSearch('')}>Back</button>
    </div>      
  )
}

const LanguageList = ({ country }) => (
  <div>
    <h3>Languages:</h3>
    <ul>
      {Object.values(country.languages).map(language => (
        <li key={language}>{language}</li>
      ))}
    </ul>
  </div>
)

const App = () => {
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all/')
      .then( response => {
        setCountries(response.data)
      })
  }, [])

  const [currentSearch, setNewSearch] = useState('')

  const handleSearch = (event) => {
    setNewSearch(event.target.value.trim())
  }

  return (
    <div>
      <Filter currentSearchr={currentSearch}
              handleSearch={handleSearch}/>
      <Countries countries={countries}
                 currentSearch={currentSearch}
                 setNewSearch={setNewSearch}/>
    </div>
  )
}

export default App
