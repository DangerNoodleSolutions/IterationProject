import React, { useState, useEffect, useMemo } from 'react';
import Entries from './Entries';
import EntryContainer from './EntryContainer';
import EntryCreate from './EntryCreate';
import { useLocation } from 'react-router-dom';
const Main = (props) => {
  const { state } = useLocation();
  const { user_id } = state;
  const getEntries = 'http://localhost:8080/api';
  const deleteEntries = 'http://localhost:8080/api/delete';
  const updateEntries = 'http://localhost:8080/api/update';

  const [entries, newEntries] = useState([]);
  const [categoriesList, updateCategories] = useState([]);

  useEffect(() => {
    console.log('USER_ID IN MAIN.JSX: ', user_id);
    fetch(getEntries + '?user_id=' + user_id, {
      method: 'GET',
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    })
      .then((res) => res.json())
      .then((res) => {
        newEntries(res.reverse());
        updateCategories([...new Set(res.map((obj) => obj.category))]);
      })
      .catch((error) => {
        console.log(`There is an ${error} when mounting Main component`);
      });
  }, []);

  const getPosts = () => {
    console.log('USER_ID IN MAIN.JSX: ', user_id);
    fetch(getEntries + '?user_id=' + user_id, {
      method: 'GET',
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    })
      .then((res) => res.json())
      .then((res) => {
        newEntries(res.reverse());
        updateCategories([...new Set(res.map((obj) => obj.category))]);
      })
      .catch((error) => {
        console.log(`There is an ${error} when mounting Main component`);
      });
  };

  return (
    <div className="main-div">
      <EntryCreate
        getPosts={getPosts}
        categoriesList={categoriesList}
        user_id={user_id}
      />
      <EntryContainer
        getPosts={getPosts}
        entries={entries}
        categoriesList={categoriesList}
      />
    </div>
  );
};
export default Main;

/*
<div className={'form-div'}>
        <form className={'entryForm'} method='post' action='/api/test'>
          <label htmlFor='category'>Choose a category:</label>

          <select name='category' id='category' className={'form-items'}>
            <option value='Technical Challenges'>Technical Challenges</option>
            <option value='APC Notes'>APC Notes</option>
            <option value='Reflections'>Reflections</option>
            <option value='Misc.'>Misc.</option>
          </select>

          <input name='category' type='text' placeholder='Category...'></input> 
          <input
            className={'form-items'}
            name='title'
            type='text'
            placeholder='Title...'
          ></input>
          <div>
            {' '}
            <textarea
              id={'description-id'}
              className={'form-items'}
              name='body'
              type='text'
              placeholder='Description...'
            ></textarea>{' '}
          </div>
          <input
            className={'form-items'}
            className={'create-btn'}
            type='submit'
            value='Create Entry'
          ></input>
        </form>
      </div>
      <div className={'outer-entry'}>{entry}</div>

      */
