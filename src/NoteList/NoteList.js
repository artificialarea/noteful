import React from 'react';
import './NoteList.css';
import NoteItem from '../NoteItem/NoteItem';


export default function NoteList(props) {
  const { notes } = props;
  // console.log(notes);
  return (
    <div className="note-list">
      <ul className="notes">
        {notes.map(note => 
          <NoteItem 
            key={note.id}
            name={note.name}
            modified={note.modified}
            folderId={note.folderId}
            content={note.content}
          />
        )}

      </ul>
    </div>
  )
}

NoteList.defaultProps = {
  notes: []
}
