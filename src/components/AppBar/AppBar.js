import React, { useState, useEffect, useRef } from "react";
import { withRouter, Link } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import TextField from "@material-ui/core/TextField";
import Swal from "sweetalert2";
import serverApi from "../../apis/serverApi";
import "./_AppBar.scss";
import Loading from "../Loading/Loading";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function ButtonAppBar(props) {
  const header = useRef()
  const classes = useStyles();

  const [userTextField, setUserTextField] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(header?.current?.clientHeight)

  const { isLoggedIn, setIsLoggedIn } = props

  let isDisabled = userTextField === "" ? true : false;

  useEffect(() => {
    const userName = localStorage.getItem("username");
    setHeaderHeight(header.current.clientHeight)

    const fetchUser = async () => {
      setIsLoading(true);
      const response = await serverApi.get(`/users/${userName}`);
      setIsLoggedIn(response.data[0]);
      setIsLoading(false);
    };

    if (userName !== null) {
      fetchUser();
    }
  }, []);

  function login() {
    setIsLoading(true);
    Promise.all([serverApi.get(`/users/${userTextField}`)])
      .then((response) => {
        const userz = response[0].data[0];
        localStorage.setItem("username", userz.username);
        localStorage.setItem("id", userz.user_id);
        setIsLoggedIn(userz);
        setIsLoading(false);

        Swal.fire(`Welcome ${userz.username}`, "", "success");
      })
      .catch((error) => {
        setIsLoading(false);
        Swal.fire("Error user does not exist!", "Please Register", "error");
      });
  }

  function logout() {
    localStorage.clear();
    setUserTextField("")
    setIsLoggedIn({ username: "", user_id: "", nominations: [] });
  }

  const register = async () => {
    try {
      setIsLoading(true);
      await serverApi.put("/users/register", { username: userTextField });
      login();
    } catch {
      setIsLoading(false);
      Swal.fire(
        "Error user already exist!",
        "Please Login or try another name",
        "error"
      );
    }
  };

  const renderLoginLogout = () => {
    if (isLoggedIn?.username === "" || isLoggedIn?.username === null) {
      return (
        <div className="login-components-container">
          <TextField
            style={{
              backgroundColor: "white",
              borderRadius: "10px",
              flexDirection: "row",
              marginLeft: "0.5em",
            }}
            id="outlined-basic"
            variant="outlined"
            placeholder="Username"
            onChange={(e) => setUserTextField(e.target.value)}
            inputProps={{
              className: "appbar-textfield",
            }}
          />
          {isLoading ? (
            <div style={{ marginLeft: "1em" }}>
              <Loading size={40} color="primary" row />{" "}
            </div>
          ) : (
            <>
              <button
                className="app-bar-button"
                style={{ marginLeft: "0.5em" }}
                onClick={() => login()}
                disabled={isDisabled}
              >
                Login
              </button>
              <button
                className="app-bar-button"
                style={{ marginLeft: "0.5em" }}
                onClick={register}
                disabled={isDisabled}
              >
                Register
              </button>
            </>
          )}
        </div>
      );
    } else {
      return (
        <div style={{ display: "flex" }}>
          <p className="hello-user-msg" style={{ alignSelf: "center" }}>
            Hello {isLoggedIn?.username}
          </p>
          <button
            className="app-bar-button"
            style={{ marginLeft: "0.5em" }}
            onClick={logout}
          >
            Logout
          </button>
        </div>
      );
    }
  };

  return (
    <div className={classes.root}  style={{marginBottom: headerHeight}}>
      <AppBar ref={header} position="fixed" color="secondary">
        <Toolbar>
          <div
            style={{
              width: "100vw",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>
              <Link
               style={{textDecoration: 'none', color:"white"}}
               to="/" 
              >
                <p className="page-title">Shoppies</p>
              </Link>
            </div>

            { props.location.pathname === "/" ? renderLoginLogout() : null}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withRouter(ButtonAppBar);
