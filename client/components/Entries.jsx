import React, { useState } from 'react';
import Modal from './Modal';

//entryId = imported from Main
export default function Entries({
  title,
  category,
  text,
  entryId,
  entries,
  newEntries,
}) {
  const [showModal, setShowModal] = useState(false);

  const getEntries = 'http://localhost:8080/api';
  const deleteEntries = 'http://localhost:8080/api/delete';
  const updateEntries = 'http://localhost:8080/api/update';

  function handleDelete() {
    fetch(deleteEntries + '/' + entryId, {
      method: 'DELETE',
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }

  const showModalOnClick = () => {
    setShowModal(true);
  };

  return (
    <div className={'entry-div'}>
      <div className={'h-tags'}>
        <h4>{title}</h4>
        <h4>{category}</h4>
        {/* <h4>{this.props.entries.date}</h4> */}
      </div>
      <p className={'description'}>{body}</p>
      <div>
        {' '}
        <button className={'update-btn'} onClick={showModalOnClick}>
          Update Entry
        </button>
        <button className={'delete-btn'} onClick={handleDelete}>
          Delete Entry
        </button>{' '}
      </div>
      {showModal ? (
        <Modal
          open={showModal}
          updateEntries={updateEntries}
          entryId={entryId}
          entries={entries}
          title={title}
          body={body}
          category={category}
          setShowModal={setShowModal}
          newEntries={newEntries}
        />
      ) : null}
    </div>
  );
}
