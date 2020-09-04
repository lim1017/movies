import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useTransition, animated } from "react-spring";
import Swal from "sweetalert2";

import logo from "../../assets/shoppiesLogo.png";
import Loading from "../Loading/Loading";
import Modal from "../Modal/Modal";
import MovieListCard from "./MovieListCard";
import "./_MovieList.scss";

const MovieList = ({
  data,
  nominatedMovies,
  setNominatedMovies,
  isLoading,
}) => {
  const [showModal, setShowModal] = useState({ state: false, img: "" });

  let searchResults = data.Search ? data.Search : [];
  console.log(searchResults);

  const transitions = useTransition(searchResults, (result) => result.imdbID, {
    from: { transform: "translate3d(0,-40px,0)" },
    enter: { transform: "translate3d(0,0px,0)" },
    leave: { transform: "translate3d(0,+40px,0)" },
  });

  const handleNominate = (movie) => {
    if (nominatedMovies.length >= 5) {
      Swal.fire("You can only nominate 5 movies!", "", "error");
      return;
    }
    setNominatedMovies([...nominatedMovies, movie]);
  };

  const renderMovies = () => {
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
  };

  const renderLogo = () => {
    return (
      <img
        style={{ display: "flex", margin: "auto", borderRadius: "10px" }}
        src={logo}
        alt="Girl in a jacket"
        width="90%"
        height="90%"
      />
    );
  };

  return (
    <div>
      <Modal showModal={showModal} setShowModal={setShowModal} />

      <Container>
        <div className="movie-page-title">
          Search results{" "}
          {data.Response === "False" ? (
            <div className="movie-list-error-msg">{data.Error}</div>
          ) : null}{" "}
        </div>
        {isLoading ? (
          <div style={{ marginTop: "5em" }}>
            <Loading size={80} color="secondary" row />
          </div>
        ) : searchResults.length === 0 ? (
          renderLogo()
        ) : (
          renderMovies()
        )}
      </Container>
    </div>
  );
};

export default MovieList;
