import React from 'react'
import './NotePageMain.css'
import Note from '../Note/Note'
import NotesContext from '../NotesContext'


export default class NotePageMain extends React.Component {

  static contextType = NotesContext;

  render() {

    // Find the note that has the same id from the url (:noteId) using 'match'
    const selectedNote = this.context.notes.find(
      note => note.id === this.props.match.params.noteId
    )

    return (
      <div className="note-page">
        <Note 
          key={selectedNote.id}
          id={selectedNote.id}
          name={selectedNote.name}
          modified={selectedNote.modified}
          folderId={selectedNote.folderId}
        />
        <p>{selectedNote.content}</p>
      </div>
    )
  }
}
