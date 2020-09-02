import React, { useEffect, useState } from "react";
import NominationList from "../components/NominationList/NominationList";
import serverAPI from "../apis/serverApi";
import Card from "../components/Card/Card";

import '../styles/App.scss'


const PublicProfile = ({ match }) => {

  const [nominatedMovies, setNominatedMovies] = useState([]);


  useEffect(() => {
    const activeUser = match.params.username;

    const fetchUser = async () => {
      const response = await serverAPI.get(`/users/${activeUser}`);

      const { nominations, user_id, username } = response.data[0]

      setNominatedMovies(nominations)
    };


    fetchUser();
  }, []);




  return (
    <div className="App" style={{display:"flex", justifyContent:"center", height:"100vh"}}>
      <Card publicNomination className="nomination-container">

      <NominationList 
        nominatedMovies={nominatedMovies} 
        setNominatedMovies={setNominatedMovies} 
        share={true}
      />
      </Card>
    </div>
  );
};

export default PublicProfile;
