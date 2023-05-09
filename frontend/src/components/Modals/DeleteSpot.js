import React from 'react';
import './PostModal.css'

const DeleteSpotModal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <button onClick={handleClose}>No</button>
      </section>
    </div>
  );
};

export default DeleteSpotModal;