import React, { useState } from 'react';
import '../Modal.css';

const getEntries = 'http://localhost:8080/api';
const deleteEntries = 'http://localhost:8080/api/delete';
const updateEntries = 'http://localhost:8080/api/update';

const Modal = ({ entryId, title, text, category, setShowModal }) => {
  function handleUpdate() {
    fetch(updateEntries + '/' + entryId, {
      method: 'PUT',
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }

  const closeModalOnClick = () => {
    setShowModal(false);
  };

  return (
    <div>
      <section className="modal-main">
        <div>
          <form>
            <label htmlFor="category">Choose a category:</label>

            <select name="category" id="category">
              <option value={`${category}`}>{category}</option>
              <option value="Technical Challenges">Technical Challenges</option>
              <option value="APC Notes">APC Notes</option>
              <option value="Reflections">Reflections</option>
              <option value="Misc.">Misc.</option>
            </select>

            {/* <input name='category' type='text' placeholder='Category...'></input> */}
            {/* need to change to textarea */}
            <div>
              <textarea
                name="title"
                type="text"
                defaultValue={`${title}`}
              ></textarea>
            </div>
            <div>
              {' '}
              <textarea
                name="text"
                type="text"
                defaultValue={`${text}`}
              ></textarea>{' '}
            </div>
            <input
              type="submit"
              value="Update Entry"
              className={'closeBtn'}
              onSubmit={handleUpdate}
              onSubmit={closeModalOnClick}
            ></input>
          </form>
          <button onClick={closeModalOnClick}> CLOSE MODAL</button>
        </div>
      </section>
    </div>
  );
};

export default Modal;
