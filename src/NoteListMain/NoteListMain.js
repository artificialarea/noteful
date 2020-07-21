import React from 'react';
// import { Link } from 'react-router-dom';
import './NoteListMain.css';
import Note from '../Note/Note';
import NotesContext from '../NotesContext'


export default class NoteListMain extends React.Component {

    static contextType = NotesContext;

    /*
    function that takes an array of notes and filters them against the :folderId
    in the url if it exists, otherwise just return the entire notes array
    */
    getNotesForFolder = (notesArray) => {
        console.log(notesArray);
        console.log(this.props.match.params.folderId)
        if (this.props.match.params.folderId) {
            return notesArray.filter((note) => {
                return note.folderId === this.props.match.params.folderId
            })
        }

        return notesArray
    }

    render() {

        const notes = this.getNotesForFolder(this.context.notes)
        // console.log(notes);
        console.log(notes);

        return (
            <div className="note-list">
                <h2>Notes</h2>
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
