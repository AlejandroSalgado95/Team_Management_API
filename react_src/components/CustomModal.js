import React from 'react';
import Modal from 'react-modal';

 const customStyles = {
      content: {
        top: '35%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        width: '60%',
        transform: 'translate(-40%, -10%)',
      },
      overlay: {zIndex: 1000}
    }

const CustomModal = (props) => (
  <Modal
      isOpen={props.openModal}
      onRequestClose={props.closeModal}
      closeTimeoutMS={200}
      style={customStyles}
  >
    <center>
      <p className="m-font-size">{props.openModal}</p>
      {props.children}
    </center>

</Modal>
);

export default CustomModal;
