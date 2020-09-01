import React, { useEffect, useState } from "react";
import "./styles/App.scss"
import SearchBar from "./components/SearchBar/SearchBar";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import useDebounce from "./hooks/useDebounce";
import MovieList from "./components/MovieList/MovieList";
import NominationList from "./components/NominationList/NominationList";
import AppBar from "./components/AppBar/AppBar"
import movieDBapi from "./apis/movieDBapi"

import Card from "./components/Card/Card";

require("dotenv").config();

const apiKey = process.env.REACT_APP_OMDB;

function App() {
  const [movieSearchTerm, setMovieSearchTerm] = useState("dragon");
  const [searchResults, setSearchResults] = useState([]);
  const [nominatedMovies, setNominatedMovies] = useState([]);
  const [ isLoggedIn, setIsLoggedIn ] = useState({name:"", id: "", nominations:[]})

  const debouncedSearch = useDebounce(movieSearchTerm, 500);


  useEffect(() => {
    console.log(isLoggedIn.nominations)
    setNominatedMovies(isLoggedIn.nominations)

  }, [isLoggedIn])

  useEffect(() => {
    const handleSearch = () => {
      movieDBapi
        .get(`/?s=${movieSearchTerm}&apikey=${apiKey}`)
        .then((response) => {
          setSearchResults(response.data.Search);
        });
    };

    if (debouncedSearch !== "") {
      handleSearch();
    }
  }, [debouncedSearch]);


  return (
    <div className="App">
      <AppBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <div className="searchBar-container">
        <SearchBar
          searchTerm={movieSearchTerm}
          setSearchTerm={setMovieSearchTerm}
          type="Movie"
        />
      </div>
      <Container fluid>
        <Row>
          <Col xs={12} md={7}>
            <Card>
              <MovieList data={searchResults} nominatedMovies={nominatedMovies} setNominatedMovies={setNominatedMovies} />
            </Card>
          </Col>

          <Col xs={12} md={5}>
          <div className="nomination-container">

            <Card nomination className="nomination-container">
              <NominationList 
              nominatedMovies={nominatedMovies} 
              setNominatedMovies={setNominatedMovies} 
              isLoggedIn={isLoggedIn} 
              />
            </Card>

          </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
