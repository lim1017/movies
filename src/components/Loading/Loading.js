import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent:"center",
    flexDirection: "column",
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
    
  },
  row: {
    display: 'flex',
    justifyContent:"center",
    // flexDirection: "column",
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
    
  },
  msg:{
    fontSize: "18px",
    fontWeight:"bold",
    marginTop: "1em"
  }
}));

export default function CircularIndeterminate({size, color, msg, row}) {
  const classes = useStyles();

  let style = row ? classes.row : classes.root

  return (
    <div className={style}>
      <CircularProgress color={color} size={size} thickness={8.5} />
      <div className={classes.msg}>{msg} </div>
    </div>
  );
}