import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Card from "../Card/Card";
import "./_MovieList.scss";

const MovieList = ({ data, nominatedMovies, setNominatedMovies }) => {
  const handleNominate = (movie) => {
    setNominatedMovies([...nominatedMovies, movie]);
  };


  const renderMovies = () => {
    if (data.length !== 0) {
      return data.map((movie) => {
        let checkIfNominated = nominatedMovies.filter((nominatedMovie) => {
          return movie.imdbID === nominatedMovie.imdbID;
        });

        let isDisabled = checkIfNominated.length !== 0 ? true : false;

        return (
          <Card small={true} key={movie.imdbID}>
            <Row>
              <Col xs={4} style={{ display: "flex" }}>
                <img
                  className="movie-poster"
                  src={movie.Poster}
                  alt="sad face"
                  width="80%"
                  height="90%"
                />
              </Col>

              <Col>
                <Row className="movie-title">{movie.Title}</Row>
                <Row className="movie-details">{movie.Year}</Row>
                <Row className="movie-buttons-container">
                  <button
                    // type="button"
                    className="movie-button"
                    onClick={() => handleNominate(movie)}
                    disabled={isDisabled}
                  >
                    Nominate{" "}
                  </button>

                  <button
                    className="movie-button"
                    style={{ marginLeft: "2em" }}
                  >
                    Details
                  </button>
                </Row>
              </Col>
            </Row>
          </Card>
        );
      });
    }
  };

  return <Container>{renderMovies()}</Container>;
};

export default MovieList;
