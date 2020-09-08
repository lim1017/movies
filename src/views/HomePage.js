import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/App.scss";

import SearchBar from "../components/SearchBar/SearchBar";
import MovieList from "../components/MovieList/MovieList";
import NominationList from "../components/NominationList/NominationList";
import Card from "../components/Card/Card";
import useDebounce from "../hooks/useDebounce";
import movieDBapi from "../apis/movieDBapi";

require("dotenv").config();
const apiKey = process.env.REACT_APP_OMDB;

function App({ isLoggedIn }) {
  const [movieSearchTerm, setMovieSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchResults, setSearchResults] = useState([]);
  const [nominatedMovies, setNominatedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const debouncedSearch = useDebounce(movieSearchTerm, 500);

  useEffect(() => {
    if (Array.isArray(isLoggedIn.nominations)) {
      setNominatedMovies(isLoggedIn.nominations);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const handleSearch = () => {
      setIsLoading(true);
      movieDBapi
        .get(
          `/?s=${movieSearchTerm}&apikey=${apiKey}&page=${currentPage}&type=movie`
        )
        .then((response) => {
          setSearchResults(response.data);
          setIsLoading(false);
        })
        .catch((err) => {
          Swal.fire(
            `Something went wrong.. Please try again later`,
            "",
            "error"
          );
        });
    };

    if (debouncedSearch.replace(/\s/g, "").length !== 0) {
      handleSearch();
    }
  }, [debouncedSearch, currentPage]);

  const changePage = (direction) => {
    if (
      direction === "forward" &&
      currentPage < searchResults.totalResults / 10
    ) {
      setCurrentPage(currentPage + 1);
    }
    if (direction === "back" && currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="App">
      <div className="searchBar-container">
        <SearchBar
          setCurrentPage={setCurrentPage}
          searchTerm={movieSearchTerm}
          setSearchTerm={setMovieSearchTerm}
          type="Movie"
        />
      </div>
      <Container fluid>
        <Row>
          <Col xs={12} md={7}>
            <Card>
              <MovieList
                data={searchResults}
                nominatedMovies={nominatedMovies}
                setNominatedMovies={setNominatedMovies}
                isLoading={isLoading}
                changePage={changePage}
                currentPage={currentPage}
              />
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
