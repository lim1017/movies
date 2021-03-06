import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useTransition, animated } from "react-spring";
import { CopyToClipboard } from "react-copy-to-clipboard";
import SadFace from "@material-ui/icons/SentimentVeryDissatisfied";
import Swal from "sweetalert2";

import serverApi from "../../apis/serverApi";
import NominationListCard from "./NominationListCard";
import Loading from "../Loading/Loading";
import ResultsModal from "../Modal/ResultsModal";
import PictureModal from "../Modal/PictureModal";

import "./_NominationList.scss";

const NominationList = ({
  nominatedMovies,
  setNominatedMovies,
  isLoggedIn,
  share,
  activeUser,
  isLoading,
}) => {
  const [showPictureModal, setShowPictureModal] = useState({
    state: false,
    img: "",
  });
  const [showResultsModal, setShowResultsModal] = useState(false);
  const [voteTotal, setVoteTotal] = useState({});

  let isUserLogged =
    isLoggedIn?.username !== "" && isLoggedIn?.username !== null ? true : false;
  const userId = localStorage.getItem("id");

  const transitions = useTransition(nominatedMovies, (movie) => movie.imdbID, {
    from: { transform: "translate3d(0,-40px,0)" },
    enter: { transform: "translate3d(0,0px,0)" },
    leave: { transform: "translate3d(0,-40px,0)" },
  });

  const handleDelete = (movieID) => {
    let copy = [...nominatedMovies];
    for (let i = 0; i < nominatedMovies.length; i++) {
      if (nominatedMovies[i].imdbID === movieID) {
        copy.splice(i, 1);
        setNominatedMovies(copy);
      }
    }
  };

  const submitNominations = async () => {
    try {
      await serverApi.patch(`/users/${userId}`, {
        nominations: JSON.stringify(nominatedMovies),
      });

      Swal.fire(`Thank you for your submission`, "", "success");
    } catch {
      Swal.fire(`Something went wrong.. Please try again later`, "", "error");
    }
  };

  const renderMovies = () => {
    if (nominatedMovies.length !== 0) {
      return transitions.map(({ item, props, key }) => {
        return (
          <animated.div key={key} style={props}>
            <NominationListCard
              item={item}
              share={share}
              handleDelete={handleDelete}
              setShowPictureModal={setShowPictureModal}
            />
          </animated.div>
        );
      });
    } else {
      return (
        <div className="nomination-instructions">
          {share ? (
            <div>
              This user has Nominations yet{" "}
              <SadFace style={{ fontSize: "35px" }} />{" "}
            </div>
          ) : (
            <div>Nominate 5 movies for the Shoppies!</div>
          )}
        </div>
      );
    }
  };

  const shareProfile = () => {
    Swal.fire(`Copied shareable link to clipboard`, "", "success");
  };

  const compileResults = async () => {
    let finalOP = {};

    const results = await serverApi.get("/users");
    const userVotes = results.data;
    userVotes.forEach((user) => {
      const { nominations } = user;

      if (Object.keys(nominations).length !== 0) {
        nominations.forEach((nomination) => {
          if (!finalOP[nomination.Title]) {
            finalOP[nomination.Title] = 1;
          } else {
            finalOP[nomination.Title] += 1;
          }
        });
      }
    });

    setVoteTotal(finalOP);
    setShowResultsModal(true);
  };

  return (
    <Container>
      <ResultsModal
        showModal={showResultsModal}
        setShowModal={setShowResultsModal}
        voteTotal={voteTotal}
      />
      <PictureModal
        showModal={showPictureModal}
        setShowModal={setShowPictureModal}
      />

      <div className="nomination-header-container">
        <p className="nomination-page-title">
          {" "}
          {share ? activeUser + "'s" : null} Nominations
        </p>
        <div className="results-promp-container">
          {nominatedMovies?.length === 5 && isUserLogged && !share ? (
            <button className="nomination-button" onClick={submitNominations}>
              Save/Submit
            </button>
          ) : null}

          {isUserLogged ? (
            <CopyToClipboard
              copy={shareProfile}
              text={`https://tlim-shoppies.netlify.app/#/profile/${isLoggedIn?.username}`}
            >
              <button
                onClick={shareProfile}
                style={{ marginLeft: "1em", marginRight: "1em" }}
                className="nomination-button"
              >
                Share
              </button>
            </CopyToClipboard>
          ) : null}
          <button onClick={compileResults} className="nomination-button">
            Results
          </button>

          {nominatedMovies?.length === 5 && !isUserLogged && !share ? (
            <button className="login-register-prompt-button" disabled>
              Login/Register to Vote
            </button>
          ) : null}
        </div>
      </div>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "5em",
          }}
        >
          {" "}
          <Loading size={80} color="secondary" msg="Heroku..." />{" "}
        </div>
      ) : (
        renderMovies()
      )}
    </Container>
  );
};

export default NominationList;
