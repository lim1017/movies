import React from "react";
import { Container, Row, Col } from "react-bootstrap";

// interface Props {
//   data: object[];
// }

// type MovieListProps= {
//   data: object[];
// }

const MovieList= ({ data }) => {
  console.log(data);

  const renderMovies = () => {
    if (data.length !== 0) {
      return data.map((movie) => {
        return (
          <Row>
            <Col><img src={movie.Poster} alt="sad face" width="40%" height="85%"></img></Col>
            <Col>
              <Row>
                Title:{movie.Title}
              </Row>
              <Row>
                Release:{movie.Year}
              </Row> 
              <Row>
                <button>Nominate</button>
                <button>Details</button>

              </Row>
            </Col>
          </Row>
        )
      });
    }
  };

  return <Container>{renderMovies()}</Container>;
};

export default MovieList;
