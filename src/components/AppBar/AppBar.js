import React,{ useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import BasicTextField from "../TextField/TextField"
import TextField from '@material-ui/core/TextField';

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
  const [user, setUser] = useState("")

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <div style={{width:"100%", display:"flex", justifyContent:"space-between"}}>
            <div>
              <h1>The Shoppies</h1>
            </div>
            <div>
            <TextField 
            style={{ backgroundColor:"white", borderRadius:"10px" }}
            id="outlined-basic" variant="outlined" 
            placeholder="Username"
            onChange={e=>setUser(e.target.value)}
            />
              <button className="movie-button" style={{ marginLeft: "2em" }}>
                Login
              </button>

              <button className="movie-button" style={{ marginLeft: "2em" }}>
                Register
              </button>
              
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default ButtonAppBar;
