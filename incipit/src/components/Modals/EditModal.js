import React from "react";
import "../bulma.css";

const EditModal = props => {
  const [front, setFront] = React.useState('');
  const [back, setBack] = React.useState('');

  function handleFrontChange(e) {
    setFront(e.target.value)
  }
  function handleBackChange(e) {
    setBack(e.target.value)
  }
  return (
    <div
      className={`modal ${props.editState ? 'is-active' : ''}`}
    >
      <div className="modal-background" />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Edit Flashcard</p>
          <button
            className="delete"
            aria-label="close"
          onClick={() => props.editModalHandler()}/>
        </header>
        <section className="modal-card-body">
          <div className="field">
            <label className="label">Flashcard front</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="frontInfo"
                defaultValue = {props.currentCard && props.currentCard.front}
                onChange = {handleFrontChange}
                placeholder="Info for front"
              />
            </div>
            <div className="field">
            <label className="label">Flashcard back</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="backInfo"
                defaultValue = {props.currentCard && props.currentCard.back}
                onChange = {handleBackChange}
                placeholder="Info for back"
              />
            </div>
            </div>
          </div>
          
        </section>
        <footer className="modal-card-foot">
          <button
            className="button is-info"onClick = {(e) => {
                e.preventDefault();
                const updates = { ...(front ? { front} : null), ...(back ? { back } : null)}
                props.editCard(props.currentCard._id, updates)
                }}
          >
            Finish
          </button>
          <button className="button"onClick ={() => props.editModalHandler()}>
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
};

export default EditModal;
