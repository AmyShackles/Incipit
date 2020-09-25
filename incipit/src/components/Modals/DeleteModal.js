import React from "react";
import "../bulma.css";

const DeleteModal = (props) => {
  return (
    <div className={`modal ${props.deleteState ? 'is-active' : ''}`}>
      <div className="modal-background" />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Delete Card?</p>
          <button className="delete" aria-label="close" onClick = {props.deleteModalHandler} />
        </header>
    
        <footer className="modal-card-foot">
          <button className="button is-warning" onClick = {() => {
              props.deleteModalHandler()}}>Delete</button>
          <button className="button" onClick = {props.deleteModalHandler}>Cancel</button>
        </footer>
      </div>
    </div>
  );
};

export default DeleteModal;
