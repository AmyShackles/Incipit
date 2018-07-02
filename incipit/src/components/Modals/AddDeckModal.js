import React from "react";
import "./../global-variables.css";
import "./../bulma.css";

const AddDeckModal = (props) => {
  return (
    <div className={`modal ${props.addModalActive ? 'is-active' : 'is-hidden'}`}>
      <div className="modal-background" />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Add Deck</p>
          <button className="delete" aria-label="close" />
        </header>
        <section className="modal-card-body">
          <div className="field">
            <label className="label">Deck Name</label>
            <div className="control">
              <input className="input" type="text" placeholder="Name" />
            </div>
          </div>
          <div className = "control">
          <label className="radio">
            <input type="radio" name="answer" />
            Private?
          </label>
          <label className="radio">
            <input type="radio" name="answer" />
            Public?
          </label>
          </div>
        </section>
        <footer className="modal-card-foot">
          <button className="button is-info">Add</button>
          <button className="button">Cancel</button>
        </footer>
      </div>
    </div>
  );
};

export default AddDeckModal;
