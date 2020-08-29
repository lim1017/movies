import React, { useEffect, useState } from "react";
import "./App.scss";
import SearchBar from "./components/SearchBar/SearchBar";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import useDebounce from "./hooks/useDebounce";
import MovieList from "./components/MovieList/MovieList";
import Paper from "./components/Paper/Paper";
import Card from "./components/Card/Card";

require("dotenv").config();
const axios = require("axios");

const apiKey = process.env.REACT_APP_OMDB;

function App() {
  const [movieSearchTerm, setMovieSearchTerm] = useState<string>("dragon");
  const [searchResults, setSearchResults] = useState<object[]>([]);
  const [nominatedMovies, setNominatedMovies] = useState([]);



  const debouncedSearch = useDebounce(movieSearchTerm, 500);

  useEffect(() => {
    const handleSearch = () => {
      axios
        .get(`http://www.omdbapi.com/?s=${movieSearchTerm}&apikey=${apiKey}`)
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
      <h1 style={{display:"flex", justifyContent:"center", color:"white"}}>REACT movieSearch</h1>
      <div className="searchBar-container">
        <SearchBar
          searchTerm={movieSearchTerm}
          setSearchTerm={setMovieSearchTerm}
          type="Movie"
        />
      </div>
      <Container fluid>
        <Row>
          <Col xs={7}>
            <Card>
              <MovieList data={searchResults} nominatedMovies={nominatedMovies} setNominatedMovies={setNominatedMovies} />
            </Card>
          </Col>

          <Col xs={5}>
            <div
              className="nomination-container"
              style={{
                backgroundColor: "blue",
                width: "100%",
                height: "100px",
              }}
            ></div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
