import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles({
  root: {
    width: "100%",
    marginBottom: "1em",
  },
});

export default function LinearDeterminate({ currentPage, totalPages }) {
  const classes = useStyles();
  const [progress, setProgress] = React.useState(0);

  useEffect(() => {
    setProgress(calculateProgress());
  }, [currentPage]);

  const calculateProgress = () => {
    let progress = (currentPage / Math.ceil(totalPages)) * 100;

    if (progress > 100) {
      progress = 100;
    }
    return progress;
  };

  return (
    <div className={classes.root}>
      <LinearProgress
        variant="determinate"
        value={progress}
        bar={{ height: "20px" }}
      />
    </div>
  );
}
