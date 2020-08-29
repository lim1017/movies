import React, {useState} from "react";
import { Container, Row, Col } from "react-bootstrap";
import Card from "../Card/Card";
import Modal from "../Modal/Modal"
import "./_MovieList.scss";

const MovieList = ({ data, nominatedMovies, setNominatedMovies }) => {
  const [showModal, setShowModal] = useState({state:false, img:""})
  
  const handleNominate = (movie) => {

    if(nominatedMovies.length>= 5){
      alert('you can only nominate 5 movies')
      return
    }
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
                  onClick={()=>setShowModal({state:true, img:movie.Poster})}
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

                  <a href={`https://www.imdb.com/title/${movie.imdbID}`} target="_blank">
                  <button
                    className="movie-button"
                    style={{ marginLeft: "2em" }}
                  >
                    Details
                  </button>
                  </a>
                </Row>
              </Col>
            </Row>
          </Card>
        );
      });
    }
  };

  return(
    <div>
          <Modal showModal={showModal} setShowModal={setShowModal} />

    
        <Container>
        {renderMovies()}
        </Container>
        </div>
    
  ) 
};

export default MovieList;
