import React,{ useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import TextField from '@material-ui/core/TextField';
import axios from 'axios'
import Swal from 'sweetalert2'
import serverApi from "../../apis/serverApi"

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
  const classes = useStyles();
  const [ userTextField, setUserTextField ] = useState("")
  
  const [ isLoggedIn, setIsLoggedIn ] = useState(false)


  useEffect(() => {
    
    const userId = localStorage.getItem('id');
    const userName = localStorage.getItem('username');
    console.log(userName)
    setIsLoggedIn({name:userName, id: userId})

  }, [])

  useEffect(() => {
    
    
  }, [])

  function login() {
    Promise.all([serverApi.get(`/users/${userTextField}`)])
      .then(response => {
        if (response[0].data.length === 0) {

          Swal.fire(
            'Error user does not exist!',
            'Please Register',
            'error'
          )

        } else {
          const userz = response[0].data[0];
          localStorage.setItem("username", userz.username);
          localStorage.setItem("id", userz.user_id);
          setIsLoggedIn({ name: userz.username, id: userz.user_id });

          Swal.fire(
            `Welcome ${userz.username}`,
            '',
            'success'
          )
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  function logout() {
    localStorage.clear();
    setIsLoggedIn(false)
  }

  const register = async()=>{
    try{
      await serverApi.put('/users/register', {username: userTextField})
      login()
      
    }
    catch{
      Swal.fire(
        'Error user already exist!',
        'Please Login or try another name',
        'error'
      )    }
    
  }


  const renderLoginLogout = ()=>{

    if (!isLoggedIn || isLoggedIn.name === null){
      return (
        <div>
          <TextField 
          style={{ backgroundColor:"white", borderRadius:"10px" }}
          id="outlined-basic" variant="outlined" 
          placeholder="Username"
          onChange={e=>setUserTextField(e.target.value)}
          />
          <button 
          className="movie-button" 
          style={{ marginLeft: "2em" }}
          onClick={()=>login()}
          >
            Login
          </button>
          <button 
          className="movie-button" 
          style={{ marginLeft: "2em" }}
          onClick={register}
          >
            Register
          </button>
          
        </div>
      )
    } else {
      return (
        <div style={{display:"flex"}}>
          <h3 style={{alignSelf:"center"}}>Hello {isLoggedIn.name}</h3>
          <button 
          className="movie-button" 
          style={{ marginLeft: "2em" }}
          onClick={logout}
          >
              Logout
          </button>
        </div>
      )
    }

  }


  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <div style={{width:"100%", display:"flex", justifyContent:"space-between"}}>
            <div>
              <h1>The Shoppies</h1>
            </div>

            {renderLoginLogout()}

          
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default ButtonAppBar;
