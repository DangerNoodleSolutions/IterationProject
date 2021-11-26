// import { getOwnPropertySymbols } from 'core-js/core/object';
import React, { useState } from 'react';

export default function EntryCreate({ categoriesList, user_id, getPosts }) {
  const [body, setBody] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Misc');

  const options = [];
  for (const option of categoriesList) {
    options.push(<option value={option}>{option}</option>);
  }

  async function submitEntryOnClick() {
    console.log('submitEntryOnClick clicked in EntryCreate.jsx');
    if (category === 'Custom') {
      const input = document.getElementById('custom tag').value;
      setCategory(input);
      console.log(category);
    }

    console.log(title);
    await fetch('/api/test', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: title,
        category: category,
        body: body,
        user_id: user_id,
      }),
    });
  }

  return (
    // prettier-ignore
    <div className='form-div entryForm'>
      <input className="category-input" type='text' list="category" onChange={(e) => setCategory(e.target.value)} placeholder="Select or enter custom category"/>
      <datalist
        className='form-items'
        id='category'
        
        // onChange={(e) => setCategory(e.target.value)}
      >
        <option >Misc</option>
        <option >APCs</option>
        <option >Pair Programming</option>
        <option >Mentor/Mentee Sessions</option>
        {options}
      </datalist>
      <input
        className='form-items'
        type='text'
        placeholder='Title...'
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className='form-items'
        id='description-id'
        type='text'
        placeholder='Description...'
        onChange={(e) => setBody(e.target.value)}
      ></input>
      <button
        className='form-items create-btn'
        onClick={() => {
          submitEntryOnClick();
          getPosts();
        }}
      >
        Create Entry
      </button>
    </div>
  );
}

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

      */
