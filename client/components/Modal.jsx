import React, { useState } from 'react';
import '../Modal.css';

const getEntries = 'http://localhost:8080/api';
const deleteEntries = 'http://localhost:8080/api/delete';
const updateEntries = 'http://localhost:8080/api/update';

// /api/update/:entryId
// Make State items that update onChange in text fields to save user input, which we can use in our fetch request to update entries
const Modal = ({
  entryId,
  title,
  body,
  category,
  categoriesList,
  setShowModal,
  newEntries,
  getPosts,
}) => {
  //   const [body, setBody] = useState('');
  //   const [title, setTitle] = useState('');
  //   const [category, setCategory] = useState(categoriesList[0]);

  const [modalBody, setModalBody] = useState(body);
  const [modalTitle, setModalTitle] = useState(title);
  const [modalCategory, setModalCategory] = useState(category);

  function handleUpdate() {
    console.log(entryId);
    fetch(`/api/update/${entryId}`, {
      method: 'PUT',
      // body: {
      //   title: title,
      //   category: category,
      //   date: date,
      //   body: text,
      // },
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
      body: JSON.stringify({
        entryId: entryId,
        title: modalTitle,
        body: modalBody,
        category: modalCategory,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }

  const closeModalOnClick = () => {
    setShowModal(false);
  };

  const options = [];
  for (const option of categoriesList) {
    options.push(<option value={option}>{option}</option>);
  }

  return (
    <div>
      <section className="modal-main">
        <div>
          <input
            className="category-input"
            type="text"
            list="category"
            onChange={(e) => setModalCategory(e.target.value)}
            placeholder="Select or enter custom category"
          />
          <datalist className="form-items" id="category">
            <option>Misc</option>
            <option>APCs</option>
            <option>Pair Programming</option>
            <option>Mentor/Mentee Sessions</option>
            {options}
          </datalist>
          <input
            type="text"
            defaultValue={`${title}`}
            onChange={(e) => setModalTitle(e.target.value)}
          />
          <input
            type="text"
            defaultValue={`${body}`}
            onChange={(e) => setModalBody(e.target.value)}
          />
          <button onClick={() => closeModalOnClick()}> CLOSE MODAL</button>
          <button
            onClick={() => {
              handleUpdate();
              getPosts();
              closeModalOnClick();
            }}
          >
            Update
          </button>
        </div>
      </section>
    </div>
  );
};

export default Modal;

{
  /* <div>
            <textarea
              name='title'
              type='text'
              defaultValue={`${title}`}
            ></textarea>
          </div>
          <div>
         
            <textarea
              name='text'
              type='text'
              defaultValue={`${body}`}
            ></textarea>
          </div>
          <button onClick={() => {
              handleUpdate();
              closeModalOnClick();
            }}
          >
            Update
          </button>
          
        </div>
      </section> */
}
