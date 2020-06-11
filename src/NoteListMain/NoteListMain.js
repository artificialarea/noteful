import React from 'react';
// import { Link } from 'react-router-dom';
import './NoteListMain.css';
import Note from '../Note/Note';


export default class NoteListMain extends React.Component {
  render() {
    const { notes } = this.props;
    // console.log(notes);
    return (
      <div className="note-list">
        <ul className="notes">
          {notes.map(note => 
            <Note 
              key={note.id}
              id={note.id}
              name={note.name}
              modified={note.modified}
            />
          )}
        </ul>
        {/* <Link className="add-btn" to="/add-note">Add note</Link> */}
      </div>
    )
  }
}

NoteListMain.defaultProps = {
  notes: []
}
