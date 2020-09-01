import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Card from "../Card/Card";
import serverApi from "../../apis/serverApi"

import "./_NominationList.scss";

const NominationList = ({ nominatedMovies, setNominatedMovies, isLoggedIn }) => {

  let isUserLogged = isLoggedIn?.username !== "" && isLoggedIn?.username !== null ? true : false
  const userId = localStorage.getItem('id');


  const handleDelete = (movieID) => {
    let copy= [...nominatedMovies]
    for (let i = 0; i<nominatedMovies.length; i++){
      if (nominatedMovies[i].imdbID===movieID){
        copy.splice(i,1)
        setNominatedMovies(copy)
      }
    }    
  };

  const submitNominations = async ()=>{
    try{
      await serverApi.patch(`/users/${userId}`, {nominations: JSON.stringify(nominatedMovies)})
      console.log('success')
    }
    catch{
      console.log('error')
    }
  }


  const renderMovies = () => {
    if (nominatedMovies?.length !== 0) {
      return nominatedMovies.map((movie) => {
       

        return (
          <Card small noPadding key={movie.imdbID}>
            <Row>
              <Col xs={4} className="nomination-details-container">
                <img
                  className="nomination-poster"
                  src={movie.Poster}
                  alt="sad face"
                  width="70%"
                  height="80%"
                />
              </Col>
              <Col className="nomination-details-container" >
                <Row className="nomination-title">{movie.Title}</Row>
                <Row className="nomination-details">{movie.Year}</Row>
              </Col>
              <Col className="nomination-details-container">
              <Row className="nomination-buttons-container">
                  <button
                    className="nomination-button"
                    style={{ marginLeft: "2em" }}
                    onClick={()=>handleDelete(movie.imdbID)}
                  >
                    Delete
                  </button>
                </Row>
              </Col>
            </Row>
          </Card>
        );
      });
    } else {
      return (
        <div className="nomination-instructions">
          Nominate 5 movies for the Shoppies!
        </div>
      )
    }
  };

  return <Container>
    <div style={{display:"flex", justifyContent:"space-between"}}>
    <h3>Nomination List</h3>
    {
    nominatedMovies?.length === 5 && isUserLogged ? 
    <button className="nomination-button" onClick={submitNominations}>Save/Submit</button> 
    : null}
    </div>
    {renderMovies()}

    </Container>;
};

export default NominationList;
