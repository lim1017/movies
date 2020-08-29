import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Card from "../Card/Card"

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    backgroundColor:"#37393e"
  },
}));

export default function TransitionsModal({showModal, setShowModal}) {

  console.log(showModal)

  const classes = useStyles();

  

  const handleClose = () => {
    setShowModal({state:false});
  };

  return (
    <div>
      
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={showModal.state}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={showModal.state}>
          
          <div className={classes.paper}>
            <img src={showModal.img} width="100%" height="100%" />
          </div>
        
        </Fade>
      </Modal>
    </div>
  );
}