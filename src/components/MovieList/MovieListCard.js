import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import Card from "../Card/Card";

export default function MovieListCard({
  movie,
  isDisabled,
  setShowModal,
  handleNominate,
}) {
  return (
    <Card small={true} key={movie.imdbID}>
      <Row className="individual-movie-card">
        <Col xs={4} style={{ display: "flex" }}>
          <img
            onClick={() => setShowModal({ state: true, img: movie.Poster })}
            className="movie-poster"
            src={movie.Poster}
            alt="sad face"
            width="80%"
            height="90%"
          />
        </Col>

        <Col className="movie-details-and-buttons-container">
          <div>
            <Row className="movie-title">{movie.Title}</Row>
            <Row className="movie-details">{movie.Year}</Row>
          </div>
          <Row className="movie-buttons-container">
            <button
              // type="button"
              className="movie-button"
              onClick={() => handleNominate(movie)}
              disabled={isDisabled}
            >
              Nominate{" "}
            </button>

            <a
              href={`https://www.imdb.com/title/${movie.imdbID}`}
              target="_blank"
            >
              <button className="movie-button" style={{ marginLeft: "2em" }}>
                Details
              </button>
            </a>
          </Row>
        </Col>
      </Row>
    </Card>
  );
}
