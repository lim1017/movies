import React, { useEffect, useState } from "react";
import NominationList from "../components/NominationList/NominationList";
import serverAPI from "../apis/serverApi";
import Card from "../components/Card/Card";

import '../styles/App.scss'


const PublicProfile = (props) => {
  const { match, history } = props
  const [nominatedMovies, setNominatedMovies] = useState([]);
  const [isUserExist, setIsUserExist] = useState(true)

  const activeUser = match.params.username;


  useEffect(() => {
    const fetchUser = async () => {

      try {
        const response = await serverAPI.get(`/users/${activeUser}`);
        const { nominations, user_id, username } = response.data[0]
  
        setNominatedMovies(nominations)
      }
      catch{
        setIsUserExist(false)
        alert('user does not exist')
        history.push('/')
      }
    };


    fetchUser();
  }, []);




  return (
    <div className="App" style={{display:"flex", justifyContent:"center", height:"100vh"}}>
      <Card publicNomination className="nomination-container">

      <NominationList 
        isUserExist={isUserExist}
        nominatedMovies={nominatedMovies} 
        setNominatedMovies={setNominatedMovies} 
        share={true}
        activeUser={activeUser}
      />
      </Card>
    </div>
  );
};

export default PublicProfile;
