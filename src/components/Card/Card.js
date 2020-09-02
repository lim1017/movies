import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';


const useStyles = makeStyles((theme)=> {

  return {
    root: {
      minWidth: 275,
      border: "3px solid black",
      borderRadius:"5px",
      boxShadow: "10px 5px 5px red",
      padding: 0,
      height: "60vh",
      overflow:"scroll",
      [theme.breakpoints.up(750)]: {
        height: "80vh"                   // secondary
      }
    },
    small:{
      border: "5px solid black",
      borderRadius:"5px",
      boxShadow: "10px 5px 5px grey",
      marginBottom:"5px",
      marginTop:"8px",
      padding:"0px"
    },
    nomination:{
      border: "3px solid black",
      borderRadius:"5px",
      boxShadow: "10px 5px 5px red",
      padding: 0,
      height:"60vh",
      overflow:"scroll",
      [theme.breakpoints.up(750)]: {
        height: "80vh"                   // secondary
      }
    },
    publicNomination:{
      border: "3px solid black",
      borderRadius:"5px",
      boxShadow: "10px 5px 5px red",
      padding: 0,
      height:"80vh",
      width:"90vw",
      overflow:"scroll",
      display:"flex",
      alignSelf:"center",
      [theme.breakpoints.up(750)]: {
        height:"80vh",
        width:"50vw"
       }

    },
    noPadding:{
      padding:"0px !important",
    }
  }

});

export default function SimpleCard(props) {
  const classes = useStyles();
  const style = props.small ? classes.small : props.nomination ? classes.nomination : props.publicNomination ? classes.publicNomination : classes.root;
  const padding = props.noPadding ? classes.noPadding : ""

  return (
    <Card className={style}>
      <CardContent className={padding}>
       {props.children}
      </CardContent>
    </Card>
  );
}