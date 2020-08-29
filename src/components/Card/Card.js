import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    border: "3px solid black",
    borderRadius:"5px",
    boxShadow: "10px 5px 5px red",
    padding: 0,
    height:"80vh",
    overflow:"scroll"
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
    height:"80vh",
    overflow:"scroll"
  },
  noPadding:{
    padding:"0px !important",
  }
});

export default function SimpleCard(props) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  // const style = props.small ? classes.small : classes.root

  const style = props.small ? classes.small : props.nomination ? classes.nomination : classes.root

  const padding = props.noPadding ? classes.noPadding : ""

  return (
    <Card className={style}>
      <CardContent className={padding}>
       {props.children}
      </CardContent>
    </Card>
  );
}