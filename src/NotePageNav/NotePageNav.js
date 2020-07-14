import React from 'react';
import { Link } from 'react-router-dom';
import './NotePageNav.css';
import NotesContext from '../NotesContext'


export default class NotePageNav extends React.Component {

    static contextType = NotesContext;

    render() {

        //find the id of the note that matches the noteId from the url
        const selectedFolderId = this.context.notes.find(
            note => note.id === this.props.match.params.noteId
        ).folderId

        // find the folder with the id that matches 'selectedFolderId'
        const selectedFolder = this.context.folders.find(
            folder => folder.id === selectedFolderId
        )

        return (
            <>
                <h2>Folder: {selectedFolder.name}</h2>
                <nav>
                    {/* <Link to='/'>Go back</Link> */}
                    {/* return to folder/:folderId view, if applicable */}
                    <button
                        onClick={this.props.onClickGoBack}
                    >
                        Go back
                    </button>
                </nav>
            </>
        )
    }
}

NotePageNav.defaultProps = {
    notes: [],
    folders: []
}