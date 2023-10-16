//imports depencencies,images,styles*//

import { useEffect, useState } from 'react';

import '../styles/App.scss';

function App() {
  //funcions,vars,handles
  const [countryList, setCountryList] = useState([]);
  const[country,setCountry] = useState("");
  const[continent,setContinent] = useState("");
  const[newCountry,setNewCountry] = useState([{
    "name": {
    "common": "",
    "official": "",
    "nativeName": {
    "fra": {
    "official": "",
    "common": ""
    }
    }
    },
    "capital": [
    ""
    ],
    "flag": "",
    "continents": [
    ""
    ]
    }]);
    const [error,setError] = useState('')

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all?fields=name,capital,flag,continents')
      .then((response) => response.json())
      .then((data) => setCountryList(data));
  }, []);

  const handleClick=() => {
    ev.preventDefault();
    if(newCountry.name==='' || newCountry.capital===''|| newCountry.flag===''||newCountry.continents[0])
    { setError('Rellena todos los campos')}
  
  else { 
  setCountryList([...countryList, newCountry]);
  setNewCountry([{
    "name": {
    "common": "",
    "official": "",
    "nativeName": {
    "fra": {
    "official": "",
    "common": ""
    }
    }
    },
    "capital": [
    ""
    ],
    "flag": "",
    "continents": [
    ""
    ]
    }])}}

const handleNewCountry=(ev)=>{
   const cloneNewCountry={...newCountry}
   cloneNewCountry[ev.target.id]=ev.target.value;
   setNewCountry(cloneNewCountry)
}
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const filterCountry = (ev) => {
    setCountry(ev.target.value);
  };
  
 const filterContinent = (ev) => {
    setContinent(ev.target.value);
  };


  const renderList = () => {
    return countryList


    .filter((eachCountry) =>
    eachCountry.name.official.toLowerCase().includes(country.toLowerCase()))

     .filter ((eachCountry)=> ( eachCountry.continents[0].includes(continent))
   )


    .map((eachCountry, index) => (
    <ul key={index}>
    <li>
      <span>{eachCountry.flag}</span>
      <p>{eachCountry.name.official}</p>
      <span>{eachCountry.capital[0]}</span>
      <p>{eachCountry.continents[0]}</p>
    </li>
    </ul>
    ))
  };

  return (
    <>
      <header>
        <h1>Country Info App</h1>
        <p>
          Explore informaction about countries, capitals and flags.Add new
          countries and filter through the list!{' '}
        </p>
      </header>
      <main>
        <section>
          <form onSubmit={handleSubmit}>
            <h2>Filters</h2>
            <label htmlFor="country">
              By Country
              <input
                type="text"
                name="country"
                placeholder="Spain.."
                onChange={filterCountry}
                value={country.name} />
            
            </label>
            <label htmlFor="continent">
              By Continent:
              <select
                name="continent"
                id="continent"
                onChange={filterContinent}
                value={continent.continents}
              >
                <option value="">All</option>
                <option value="Africa">Africa</option>
                <option value="North America">North America</option>
                <option value="South America">South America</option>
                <option value="Europe">Europe</option>
                <option value="Asia">Asia</option>
                <option value="Oceania">Oceania</option>
              </select>
            </label>
          </form>
          <div>{renderList()}</div>
        </section>
        <section>
<form action="" onSubmit={handleSubmit}>
  <h2>Add Country</h2>
  <input 
  type="text"
  placeholder="Country Name"
  name="name"
  value={newCountry.name}
  id={newCountry.flag}
  onChange={handleNewCountry}
   />
  <input 
  type="text" 
  name="capital"
  placeholder="Capital"
  value={newCountry.capital}
  id={newCountry.flag}
  onChange={handleNewCountry}/>
  <input 
  type="text" 
  placeholder="Flag Icon"
  name="flag"
  id={newCountry.flag}
  value={newCountry.flag}
  onChange={handleNewCountry}
  />
  <input 
  type="text"
  placeholder="Continent"
  name="continent"
  id={newCountry.flag}
  value={newCountry.continents}
  onChange={handleNewCountry}/>
<button onClick={handleClick}>Add Country</button>
<p>{error}</p>


</form>

        </section>
      </main>
    </>
  );
}

export default App;
