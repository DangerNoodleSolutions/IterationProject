import React, { useState, useEffect, useMemo } from 'react';
import Entries from './Entries';

const Main = (props) => {
  const getEntries = 'http://localhost:8080/api';
  const deleteEntries = 'http://localhost:8080/api/delete';
  const updateEntries = 'http://localhost:8080/api/update';

  const [entries, newEntries] = useState([]);

  useEffect(() => {
    fetch(getEntries, {
      method: 'GET',
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
      body: JSON.stringify({ user_id: props.user_id }),
    })
      .then((res) => res.json()) // Res has to use findAll to make sure we are given an array from the database
      .then((res) => {
        newEntries(res);
      })
      .catch((error) => {
        console.log(`There is an ${error} when mounting Main component`);
      });
  }, [entries]);

  const entry = [];
  for (let i = 0; i < entries.length; i++) {
    entry.push(
      <Entries
        entries={entries[i]}
        entryId={entries[i]._id}
        title={entries[i].title}
        category={entries[i].category}
        body={entries[i].body}
      />
    );
  }

  return (
    <div className={'main-dev'}>
      <div className={'form-div'}>
        <form className={'entryForm'} method="post" action="/api/test">
          <label htmlFor="category">Choose a category:</label>

          <select name="category" id="category" className={'form-items'}>
            <option value="Technical Challenges">Technical Challenges</option>
            <option value="APC Notes">APC Notes</option>
            <option value="Reflections">Reflections</option>
            <option value="Misc.">Misc.</option>
          </select>

          {/* <input name='category' type='text' placeholder='Category...'></input> */}
          <input
            className={'form-items'}
            name="title"
            type="text"
            placeholder="Title..."
          ></input>
          <div>
            {' '}
            <textarea
              id={'description-id'}
              className={'form-items'}
              name="text"
              type="text"
              placeholder="Description..."
            ></textarea>{' '}
          </div>
          <input
            className={'form-items'}
            className={'create-btn'}
            type="submit"
            value="Create Entry"
          ></input>
        </form>
      </div>
      <div className={'outer-entry'}>{entry}</div>
    </div>
  );
};
export default Main;
