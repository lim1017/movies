import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Modal from "../Modal/Modal";
import MovieListCard from "./MovieListCard";
import {useSpring, useTransition, animated} from 'react-spring'
import logo from '../../assets/shoppiesLogo.png'

import "./_MovieList.scss";

const MovieList = ({ data, nominatedMovies, setNominatedMovies }) => {
  const [showModal, setShowModal] = useState({ state: false, img: "" });


  let searchResults = data.Search ? data.Search : []
  console.log(searchResults)

  const transitions = useTransition(searchResults, result => result.imdbID, {
    from: { transform: 'translate3d(0,-40px,0)' },
    enter: { transform: 'translate3d(0,0px,0)' },
    leave: { transform: 'translate3d(0,+40px,0)' },
  })


  const handleNominate = (movie) => {
    if (nominatedMovies.length >= 5) {
      alert("you can only nominate 5 movies");
      return;
    }
    setNominatedMovies([...nominatedMovies, movie]);
  };

  const renderMovies = () => {
    if (data.Response === "True") {
      
      return transitions.map(({ item, props, key }) => {
        let checkIfNominated = nominatedMovies.filter((nominatedMovie) => {
          return item.imdbID === nominatedMovie.imdbID;
        });

        let isDisabled = checkIfNominated.length !== 0 ? true : false;

        return (
          <animated.div key={key} style={props}>
          <MovieListCard
            movie={item}
            isDisabled={isDisabled}
            setShowModal={setShowModal}
            handleNominate={handleNominate}
          />
          </animated.div>
        );
      });
    } else {
      return <div className="movie-list-error-msg">{data.Error}</div>;
    }
  };


  const renderLogo =()=>{
    return (

      <img style={{display:"flex", margin:"auto", borderRadius:"10px"}} src={logo} alt="Girl in a jacket" width="90%" height="90%" />
    )
  }

  return (
    <div>
      <Modal showModal={showModal} setShowModal={setShowModal} />

      <Container>
        <p className="movie-page-title">Search results</p>
        {searchResults.length === 0 ? renderLogo() : renderMovies()}
      </Container>
    </div>
  );
};

export default MovieList;
