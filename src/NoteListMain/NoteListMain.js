import React from 'react';
import './NoteListMain.css';
import Note from '../Note/Note';


export default function NoteListMain(props) {
  const { notes } = props;
  // console.log(notes);
  return (
    <div className="note-list">
      <ul className="notes">
        {notes.map(note => 
          <Note 
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

NoteListMain.defaultProps = {
  notes: []
}
