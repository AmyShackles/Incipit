import React from "react";
import "./../global-variables.css";
import "./../bulma.css";

const AddDeckModal = () => {
  return (
    <div class="modal">
      <div class="modal-background" />
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Add Deck</p>
          <button class="delete" aria-label="close" />
        </header>
        <section class="modal-card-body">
          <div class="field">
            <label class="label">Deck Name</label>
            <div class="control">
              <input class="input" type="text" placeholder="Name" />
            </div>
          </div>
          <div className = "control">
          <label class="radio">
            <input type="radio" name="answer" />
            Private?
          </label>
          <label class="radio">
            <input type="radio" name="answer" />
            Public?
          </label>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-info">Add</button>
          <button class="button">Cancel</button>
        </footer>
      </div>
    </div>
  );
};

export default AddDeckModal;
