// import React from 'react';
// import './PostModal.css'

// const DeleteSpotModal = ({ handleClose, show, children }) => {
//   const showHideClassName = show ? "modal display-block" : "modal display-none";

//   return (
//     <div className={showHideClassName}>
//       <section className="modal-main-delete-spot">
//         {children}
//         {/* <button onClick={handleClose}>No</button> */}
//       </section>
//     </div>
//   );
// };

// export default DeleteSpotModal;
import './deleteModel.css'
import React from "react"
import { useState } from "react";
// import "./DeleteModal.css"
import { useDispatch } from "react-redux";
// import { CurrentUserSpots, DeleteSpotId } from "../../store/spots";
import { RemoveSpot } from "../../store/spots";
import { UserSpots } from "../../store/spots";


export default function Modal ({spotId}) {
    // console.log(spotId, 'Modal Delete spotId------')
    const dispatch = useDispatch()

    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal)
    };

    const handleDelete = () => {
        dispatch(RemoveSpot(spotId));
        dispatch(UserSpots())
        toggleModal();
    }

    return (
        <>
            <button onClick={toggleModal}
            className="mng-mod-dele-btn">
                Delete
            </button>

            {modal && (
                <div id="modal">
                <div id="del-modal-background" onClick={toggleModal}></div>
                <div id="del-modal-content">
                  <div className = 'del-mod-hds'>

                    <p className = 'del-mod-hds-main'>Confirm Delete</p>
                    <p className = 'del-mod-hds-sub'>Are you sure want to remove this spot
                        from the listings?
                    </p>
                  </div>
                    <div className='del-mod-btns'>

                    <button onClick={handleDelete} id='del-mod-btns-btn1'>
                        Yes (Delete Spot)
                    </button>
                    <button onClick={toggleModal} id='del-mod-btns-btn2'>
                        No (Keep Spot)
                    </button>
                    </div>

                </div>

            </div>
            )}

        </>
    )
}
// export default Modal