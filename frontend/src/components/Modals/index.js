import React, { useState } from 'react';
import PostReviewModal from './PostReviewModal';

const AddReviewModal = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  }

  const handleCloseModal = () => {
    setShowModal(false);
  }

  return (
    <div>
      <button onClick={handleShowModal}>Show Modal</button>
      <PostReviewModal show={showModal} handleClose={handleCloseModal}>


       <>
       <h1>How was your stay?</h1>
       <form>
        <div>

        <textarea minLength='10' placeholder='Leave your review here...'></textarea>
        </div>
        <div>

        <label>  Stars:  
            <input type='number' min='1' max='5'/>
        </label>
        </div>
        <button type='Submit'>Submit Your Review</button>
       </form>
       </>
      </PostReviewModal>
    </div>
  );
};

export default AddReviewModal;