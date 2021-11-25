import React from 'react';
import Entries from './Entries.jsx';

export default function EntryContainer({ entries, categoriesList }) {
  const entry = [];
  for (let i = 0; i < entries.length; i++) {
    entry.push(
      <Entries
        entries={entries[i]}
        entryId={entries[i].id}
        title={entries[i].title}
        category={entries[i].category}
        body={entries[i].body}
        categoriesList={categoriesList}
      />
    );
  }

  return (
    <div className='outer-entry'>
      <div>{entry}</div>
    </div>
  );
}
