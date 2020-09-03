import React, {useState} from "react";
import { Container, Row, Col } from "react-bootstrap";
import {useSpring, useTransition, animated} from 'react-spring'


import Card from "../Card/Card";
import serverApi from "../../apis/serverApi"
import NominationListCard from "./NominationListCard"
import "./_NominationList.scss";

const NominationList = ({ nominatedMovies, setNominatedMovies, isLoggedIn, share, activeUser }) => {

  let isUserLogged = isLoggedIn?.username !== "" && isLoggedIn?.username !== null ? true : false
  const userId = localStorage.getItem('id');

  console.log(nominatedMovies)
  const transitions = useTransition(nominatedMovies, movie => movie.imdbID, {
    from: { transform: 'translate3d(0,-40px,0)' },
    enter: { transform: 'translate3d(0,0px,0)' },
    leave: { transform: 'translate3d(0,-40px,0)' },
  })
  
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
    }
    catch{
      console.log('error')
    }
  }

  const renderMovies = () => {
    if (nominatedMovies?.length !== 0) {
      // return nominatedMovies.map((movie) => {


        return transitions.map(({ item, props, key }) => {
          return(

             <animated.div key={key} style={props} >
               <NominationListCard item={item} share={share} handleDelete={handleDelete}/>
              </animated.div>
          


          )
        }

        )


      
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
    <p className="nomination-page-title"> {share ? activeUser +"'s" : null} Nominations</p>
    {
    nominatedMovies?.length === 5 && isUserLogged && !share ? 
    <button className="nomination-button" onClick={submitNominations}>Save/Submit</button> 
    : null}

{
    nominatedMovies?.length === 5 && !isUserLogged && !share ? 
    <button className="login-register-prompt-button" disabled >Login/Register to Vote</button> 
    : null}
    </div>
    {renderMovies()}

    </Container>;
};

export default NominationList;
