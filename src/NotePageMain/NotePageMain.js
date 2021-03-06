import React from 'react'
import './NotePageMain.css'
import Note from '../Note/Note'
import NotesContext from '../NotesContext'
import PropTypes from 'prop-types'


export default class NotePageMain extends React.Component {

    static defaultProps = {
        match: {
          params: {}
        }
    }

    static contextType = NotesContext;

    handleDeleteNote = (noteId) => {
        this.props.history.push('/');
    }

    render() {
        const { notes=[] } = this.context;
        const selectedNote = notes.find(
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

NotePageMain.propTypes = {
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
}
