import React, { useEffect, useState } from "react";
import './App.css';
import SearchBar from "./components/SearchBar/SearchBar"
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import useDebounce from "./hooks/useDebounce"
import MovieList from "./components/MovieList/MovieList";


require("dotenv").config();
const axios = require("axios");

const apiKey=process.env.REACT_APP_OMDB;


function App() {

  const [movieSearchTerm, setMovieSearchTerm] = useState<string>("dragon");
  const [searchResults, setSearchResults] = useState<object[]>([])

  const debouncedSearch = useDebounce(movieSearchTerm, 500);

useEffect(() => {

  const handleSearch = ()=>{
    axios.get(`http://www.omdbapi.com/?s=${movieSearchTerm}&apikey=${apiKey}`).then((response)=>{
      setSearchResults(response.data.Search)
    })
  }

  if(debouncedSearch !== ""){
    handleSearch()
  }
 
}, [debouncedSearch])
  


  return (
    <div className="App">
     REACT movieSearch
     <SearchBar
        searchTerm={movieSearchTerm}
        setSearchTerm={setMovieSearchTerm}
        type="Movie"
      />

<Container fluid>
  <Row>
    <Col xs={8}>
      <div style={{backgroundColor:"red", width:"100%", height:"100px"}}>
        <MovieList data={searchResults}/>
      </div>
    </Col>

    <Col xs={4}>
      <div style={{backgroundColor:"blue", width:"100%", height:"100px"}}>

      </div>

    </Col>
    </Row>
</Container>

    </div>
  );
}

export default App;
