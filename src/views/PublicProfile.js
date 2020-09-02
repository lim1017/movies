import React, { useEffect, useState } from "react";
import NominationList from "../components/NominationList/NominationList";
import serverAPI from "../apis/serverApi";
import Card from "../components/Card/Card";


const PublicProfile = ({ match }) => {

  const [nominatedMovies, setNominatedMovies] = useState([]);
  const [ isLoggedIn, setIsLoggedIn ] = useState({username:"", user_id: "", nominations:[]})


  useEffect(() => {
    const activeUser = match.params.username;

    const fetchUser = async () => {
      const response = await serverAPI.get(`/users/${activeUser}`);

      const { nominations, user_id, username } = response.data[0]

      setNominatedMovies(nominations)
      setIsLoggedIn({username, user_id, nominations})
    };


    fetchUser();
  }, []);




  return (
    <div>
      <Card nomination className="nomination-container">

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
