import React,{ useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import TextField from '@material-ui/core/TextField';
import Swal from 'sweetalert2'
import serverApi from "../../apis/serverApi"
import './_AppBar.scss'

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






function ButtonAppBar({isLoggedIn, setIsLoggedIn}) {
  const classes = useStyles();
  const [ userTextField, setUserTextField ] = useState("")
  

  let isDisabled = userTextField === "" ? true : false;

  useEffect(() => {
    
    const userName = localStorage.getItem('username');

    const fetchUser = async ()=>{
     const response= await serverApi.get(`/users/${userName}`)

     setIsLoggedIn(response.data[0])
    }

    if(userName!==null){
      fetchUser()

    }


  }, [])

  function login() {
    Promise.all([serverApi.get(`/users/${userTextField}`)])
      .then(response => {
    
          const userz = response[0].data[0];
          localStorage.setItem("username", userz.username);
          localStorage.setItem("id", userz.user_id);
          // setIsLoggedIn({ name: userz.username, id: userz.user_id, nominations:userz.nominations });
          console.log(userz)
          setIsLoggedIn(userz)

          Swal.fire(
            `Welcome ${userz.username}`,
            '',
            'success'
          )
        
      })
      .catch(error => {
        console.log(error);
        Swal.fire(
          'Error user does not exist!',
          'Please Register',
          'error'
        )
      });
  } 

  function logout() {
    localStorage.clear();
    setIsLoggedIn({username:"", user_id: "", nominations:[]})
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

    if (isLoggedIn?.username === "" || isLoggedIn?.username === null){
      return (
        <div className="login-components-container">
          <TextField 
          style={{ backgroundColor:"white", borderRadius:"10px", flexDirection:"row", marginLeft:"0.5em" }}
          id="outlined-basic" variant="outlined" 
          placeholder="Username"
          onChange={e=>setUserTextField(e.target.value)}
          inputProps={{
            className:"appbar-textfield"
          }}
          />
          <button 
          className="app-bar-button" 
          style={{ marginLeft: "0.5em" }}
          onClick={()=>login()}
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
          
        </div>
      )
    } else {
      return (
        <div style={{display:"flex"}}>
          <h3 style={{alignSelf:"center"}}>Hello {isLoggedIn?.username}</h3>
          <button 
          className="app-bar-button" 
          // style={{ marginLeft: "2em" }}
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
      <AppBar position="static" color="secondary">
        <Toolbar>
          <div style={{width:"100vw", display:"flex", justifyContent:"space-between"}}>
            <div>
              <p className="page-title">Shoppies</p>
            </div>

            {renderLoginLogout()}

          
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default ButtonAppBar;
