import React, { useEffect, useState } from "react";
import './App.css';
import SearchBar from "./components/SearchBar"

require("dotenv").config();
const axios = require("axios");

const apiKey=process.env.REACT_APP_OMDB;


function App() {

  const [movieSearchTerm, setMovieSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([])

useEffect(() => {

  console.log(movieSearchTerm)
  const handleSearch = ()=>{
    axios.get(`http://www.omdbapi.com/?s=${movieSearchTerm}&apikey=${apiKey}`).then((response)=>{
      console.log(response.data)
    })
  }

  handleSearch()
 
}, [movieSearchTerm])
  
  return (
    <div className="App">
     REACT movieSearch
     <SearchBar
        nameSearch={movieSearchTerm}
        setNameSearch={setMovieSearchTerm}
        type="Movie"
      />
    </div>
  );
}

export default App;
