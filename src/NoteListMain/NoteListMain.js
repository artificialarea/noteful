import React from 'react';
import { Link } from 'react-router-dom';
import './NoteListMain.css';
import Note from '../Note/Note';
import NotesContext from '../NotesContext';
import PropTypes from 'prop-types';


export default class NoteListMain extends React.Component {

    static defaultProps = {
        match: {
          params: {}
        }
      }

    static contextType = NotesContext;

    /*
    function that takes an array of notes and filters them against the :folderId
    in the url if it exists, otherwise just return the entire notes array
    */
    getNotesForFolder = (notesArray) => {
        if (this.props.match.params.folderId) {
            return notesArray.filter((note) => {
                return note.folderId === this.props.match.params.folderId
            })
        }

        return notesArray
    }

    render() {

        const notes = this.getNotesForFolder(this.context.notes)

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
                <Link className="add-btn" to="/add-note">Add note</Link>
            </div>
        )
    }
}

NoteListMain.defaultProps = {
    match: PropTypes.object.isRequired,
}