import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useTransition, animated } from "react-spring";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Swal from "sweetalert2";

import logo from "../../assets/shoppiesLogo.png";
import Loading from "../Loading/Loading";
import PictureModal from "../Modal/PictureModal";
import MovieListCard from "./MovieListCard";
import ProgressBar from "../ProgressBar/ProgressBar"
import "./_MovieList.scss";

const MovieList = ({
  data,
  nominatedMovies,
  setNominatedMovies,
  isLoading,
  changePage,
  currentPage
}) => {
  const [showModal, setShowModal] = useState({ state: false, img: "" });

  let searchResults = data.Search ? data.Search : [];

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

  const renderSearchDetails = () => {
    return (
      <div className="arrow-icons-container">
        {data.totalResults} Results 
        <div>
        <ArrowBackIcon className="arrow-icons" onClick={()=>changePage("back")} />
        <ArrowForwardIcon className="arrow-icons" onClick={()=>changePage("forward")} />
        </div>
      </div>
    )
  }

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
      <PictureModal showModal={showModal} setShowModal={setShowModal} />

      <Container>
        <div className="movie-page-title">
          Search results{" "}
          { data.totalResults > 0 ? renderSearchDetails() : null}
        </div>
        <div>
        { data.totalResults > 0 ? <ProgressBar currentPage={currentPage} totalPages={data.totalResults/10} /> : null}

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
