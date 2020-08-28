import React, { useEffect, useState } from "react";
import './App.css';
import SearchBar from "./components/SearchBar"
import { debounce } from 'lodash';
import useDebounce from "./hooks/useDebounce"


require("dotenv").config();
const axios = require("axios");

const apiKey=process.env.REACT_APP_OMDB;


function App() {

  const [movieSearchTerm, setMovieSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([])

  const debouncedSearch = useDebounce(movieSearchTerm, 500);

useEffect(() => {

  const handleSearch = ()=>{
    axios.get(`http://www.omdbapi.com/?s=${movieSearchTerm}&apikey=${apiKey}`).then((response)=>{
      console.log(response.data)
    })
  }

  handleSearch()
 
}, [debouncedSearch])
  
  return (
    <div className="App">
     REACT movieSearch
     <SearchBar
        searchTerm={movieSearchTerm}
        setSearchTerm={setMovieSearchTerm}
        type="Movie"
      />
    </div>
  );
}

export default App;
