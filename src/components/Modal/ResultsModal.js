import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import TreeMap from "../Chart/TreeMap"
import TreeMap2 from "../Chart/TreeMap2"


const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    backgroundColor: "#37393e",
  },
}));

export default function TransitionsModal({ showModal, setShowModal, voteTotal }) {
  const classes = useStyles();

  const handleClose = () => {
    setShowModal(false);
  };

  const convertData = (data) =>{
    let finalOP=[]

    // console.log(data)

    data.forEach(element => {
      finalOP.push({ name:[element[0] + ": " + element[1]], size: element[1] })
      // finalOP[element[0] + ": " + element[1]] = element[1]
    });

    // console.log(finalOP)
    return finalOP
  }

  const data=Object.entries(voteTotal) 

  let formatted=convertData(data)

  console.log(formatted)
  

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={showModal}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={showModal}>
          <div className={classes.paper}>
            <TreeMap2 data={voteTotal} />
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
