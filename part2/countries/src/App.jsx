  import { useState, useEffect } from "react"
  import axios from "axios"

  function App() {

    const [word, setWord] = useState("")
    const [countries, setCountries] = useState([])
    const [weather, setWeather] = useState(null)

    const api_key = import.meta.env.VITE_SOME_KEY

    const countriesToShow = (word === "")
      ? countries
      : countries.filter(country => country.name.common.toLocaleLowerCase().includes(word.toLocaleLowerCase()))

    useEffect( ()=> {
      axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then( response => setCountries(response.data))
    },[])

    useEffect( ()=> {
      console.log("effect weather")
      if (countriesToShow.length === 1){
        axios
        .get(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${countriesToShow[0].latlng[0]}&lon=${countriesToShow[0].latlng[1]}&appid=${api_key}`)
        .then( response => setWeather({
          wind: response.data.wind.speed,
          temperature: response.data.main.temp,
          icon: response.data.weather[0].icon
        }))}
        
    },[word])

    const handleInputChange = (e) => {
      setWord(e.target.value)
    }

    const handleShowButton = (country) => {
      const input =  document.querySelector("input")
      input.value = country
      setWord(country)
    }

 
      return (
        <>
            find countries <input onChange={handleInputChange} /><br/>
            
            {
              (countriesToShow.length>10)
              ?"Too Many matches, specify another filter"
              :(countriesToShow.length===1)
              ?
              <>
              
                <h1>{countriesToShow[0].name.common}</h1>
                <p>capital {countriesToShow[0].capital}</p>
                <p>area {countriesToShow[0].area}</p>
                <h3>languages:</h3>
                <ul>
                  {Object.keys(countriesToShow[0].languages).map((key, index)=>(
                    <li key={index}>{countriesToShow[0].languages[key]}</li>
                  ))}
                </ul>
                <img src={countriesToShow[0].flags.svg} width="300" height="200"/>        
                
                {
                (weather)
                ?
                <>
                <h2>Weather in {countriesToShow[0].capital}</h2>
                <p> temperature {weather.temperature} Celsius</p>
                <img src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}/>
                <p> wind {weather.wind} m/s</p>
                </>
                :null
                }
              </>
              :countriesToShow.map( country => <p key={country.name.common}>{country.name.common} <button onClick={() => handleShowButton(country.name.common)}>show</button></p>)
              
            }
        </>
      )
    
  }

  export default App
