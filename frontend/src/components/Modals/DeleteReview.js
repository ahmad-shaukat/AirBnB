import React from 'react';
import './PostModal.css'

const DeleteReviewModal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main-delete-rev">
        {children}
        <div className='rev-del-btn-ctn'>

        <button onClick={handleClose} className='rev-del-btn'>No (Keep Review)</button>
        </div>
      </section>
    </div>
  );
};

export default DeleteReviewModal;