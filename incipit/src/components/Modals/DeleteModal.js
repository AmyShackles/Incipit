import React from "react";
import "../bulma.css";
import styled from "styled-components";

const DeleteModal = (props) => {
  return (
    <div class={`modal ${props.deleteState ? 'is-active' : ''}`}>
      <div class="modal-background" />
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Delete Card?</p>
          <button class="delete" aria-label="close" onClick = {props.deleteModalHandler} />
        </header>
    
        <footer class="modal-card-foot">
          <button class="button is-warning" onClick = {() => {
              props.deleteModalHandler()}}>Delete</button>
          <button class="button" onClick = {props.deleteModalHandler}>Cancel</button>
        </footer>
      </div>
    </div>
  );
};

export default DeleteModal;
