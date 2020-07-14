import React from 'react'
import './NotePageMain.css'
import Note from '../Note/Note'
import NotesContext from '../NotesContext'


export default class NotePageMain extends React.Component {

    static contextType = NotesContext;

    handleDeleteNote = (noteId) => {
        console.log(`handleDeleteNote called for ${noteId}`)
        this.props.history.push('/');
    }

    render() {
        // Find the note that has the same id from the url (:noteId) using 'match'
        const selectedNote = this.context.notes.find(
            note => note.id === this.props.match.params.noteId
        )

        return (
            <div className="note-page">
                <Note
                    id={selectedNote.id}
                    name={selectedNote.name}
                    modified={selectedNote.modified}
                    onDeleteNote={this.handleDeleteNote}
                />
                <p>{selectedNote.content}</p>
            </div>
        )
    }
}
