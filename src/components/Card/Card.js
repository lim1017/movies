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
    padding: 0
  },
  small:{
    border: "1px solid black",
    borderRadius:"5px",
    boxShadow: "10px 5px 5px grey",
    marginBottom:"10px"
  }
});

export default function SimpleCard(props) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  const style = props.small ? classes.small : classes.root

  return (
    <Card className={style}>
      <CardContent>
       {props.children}
      </CardContent>
    </Card>
  );
}