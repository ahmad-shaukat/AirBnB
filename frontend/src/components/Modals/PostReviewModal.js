import React from 'react';
import './PostModal.css';

const PostReviewModal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  // below function has condition that checks what was clicked. if event.target(click) is on the same outer div(event.currentTarget) it will run close handle. if it is clicked on anything else it will not invoke handleClose. 
  const handleOutsideClick = (event) => {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  };

  return (
    <div className={showHideClassName} onClick={handleOutsideClick}>
      <section className="modal-main">
        {children}
        {/* <button onClick={handleClose}>Close</button> */}
      </section>
    </div>
  );
};

export default PostReviewModal;