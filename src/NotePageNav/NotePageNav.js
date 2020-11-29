import React from 'react';
import './NotePageNav.css';
import NotesContext from '../NotesContext';
import PropTypes from 'prop-types';


export default class NotePageNav extends React.Component {

    static contextType = NotesContext;

    render() {
        let folderIdFoo = 0;
        //find the id of the note that matches the noteId from the url
        const selectedFolderId = this.context.notes.find(
            note => note.id === this.props.match.params.noteId
        )
        if ( selectedFolderId ) {
            folderIdFoo = selectedFolderId.folderId
        }
        // find the folder with the id that matches 'selectedFolderId'
        const selectedFolder = this.context.folders.find(
            folder => folder.id === folderIdFoo
        )

        return (
            <>
                { selectedFolder && <h2>Folder: {selectedFolder.name}</h2>}
                <nav>
                    <button onClick={this.props.onClickGoBack}>
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

NotePageNav.propTypes = {
    onClickGoBack: PropTypes.func,
    match: PropTypes.object.isRequired,
}