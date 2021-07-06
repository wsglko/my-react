import React from 'react'
import './modal.css'

const Modal = ({ handleClose, show, children }) => {
    const showHide = show ? "modal open" : "modal close"
    return (
        <div className={showHide}>
                <div className="modal-main">
                        {children}
                        <span className="w3-button w3-blue w3-tiny" onClick={handleClose}>&times;</span>
                </div>
        </div>
    )
}
export default Modal