import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

import NominationList from "../components/NominationList/NominationList";
import serverAPI from "../apis/serverApi";
import Card from "../components/Card/Card";
import "../styles/App.scss";

const PublicProfile = (props) => {
  const { match, history } = props;
  const [nominatedMovies, setNominatedMovies] = useState([]);
  const [isUserExist, setIsUserExist] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const activeUser = match.params.username;

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
      
        const response = await serverAPI.get(`/users/${activeUser}`);
        const { nominations, user_id, username } = response.data[0];
        console.log(Object.keys(nominations))
        if(Object.keys(nominations).length === 0){

          setNominatedMovies([]);
        } else{
          setNominatedMovies(nominations);
        }

        setIsLoading(false);
      } catch {
        setIsUserExist(false);
        Swal.fire("User does not exist!", "", "error");
        history.push("/");
      }
    };

    fetchUser();
  }, []);

  return (
    <div
      className="App"
      style={{ display: "flex", justifyContent: "center", height: "100vh" }}
    >
      <Card publicNomination className="nomination-container">
        <NominationList
          isUserExist={isUserExist}
          nominatedMovies={nominatedMovies}
          setNominatedMovies={setNominatedMovies}
          share={true}
          activeUser={activeUser}
          isLoading={isLoading}
        />
      </Card>
    </div>
  );
};

export default PublicProfile;
