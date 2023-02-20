import './App.css';
import Chuck from './chuck-norris.png';
import React, { useState, useEffect } from 'react';

const URL = "API URL HERE";

function App() {
  const [buttons, setButtons] = useState([]);
  const [joke, setJoke] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    let URLI = URL + 'categories';

    const fetchData = async () => {
      try {
        const response = await fetch(URLI);
        const json = await response.json();
        setButtons(json);
      } catch (error) {
        console.log("Error: Try again.", error);
      }
    };

    fetchData();

  }, []);

  const handleSearch = async () => {
    let URLI = URL + 'search?query=' + searchTerm;
    try {
      const response = await fetch(URLI);
      const json = await response.json();
      setJoke(json.result[0]);
    } catch (error) {
      console.log("Error: Cannot found, try again.", error);
    }
  }

  const getJoke = async (category) => {
    let URLI = URL + 'random?category=' + category;
    try {
      const response = await fetch(URLI);
      const json = await response.json();
      setJoke(json);
    } catch (error) {
      console.log("Error: Cannot find a word", error);
    }
  }

  const getRandomJoke = async () => {
    let URLI = URL + 'random';
    try {
      const response = await fetch(URLI);
      const json = await response.json();
      setJoke(json);
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
          <h1 className="title">Chuck Norris Jokes API</h1>
          <img src={Chuck} alt="Chuck Norris" />
        </div>
        <div className="col-6">
          <div className="card">
            <div className="card-header">
              Search with a word
            </div>
            <div className="search-wrapper">
              <input type="text"
                placeholder="Enter a keyword to search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="search-btn" onClick={handleSearch}>Search</button>
            </div>
            <button className="btn-wrapper btn-2" onClick={getRandomJoke}>Random Joke</button>
          </div>
          <div className="btn-wrapper btn-warning">
            {buttons.map((item) => {
              return (
                <button
                  key={item}
                  className="btn"
                  onClick={() => getJoke(item)}
                >{item}</button>
              )
            })}
          </div>
          <div>
          </div>
          <div className="joke-wrapper">
            <p>"{joke.value}"</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
