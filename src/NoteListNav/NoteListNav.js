import React from 'react';
import { Link } from 'react-router-dom';
import './NoteListNav.css';
import NotesContext from '../NotesContext';
import PropTypes from 'prop-types';


// This component is rendered in the <nav> for the '/' and 'folder/:folderId' routes
export default class NoteListNav extends React.Component {

    static contextType = NotesContext;

    render() {
        const { folders } = this.context;
        return (
            <>
                <h2>Folders</h2>
                <nav>
                    <ul>
                        {folders.map(folder => {
                            /* for each folder in the array, set variable 'classes' as either
                            'folder' or 'folder' AND 'selected'. If the selected folderId is
                            the same as the id of the current folder in the array, then add 'selected' to classes
                            */
                            const classes = this.props.match.params.folderId === folder.id
                                ? 'folder selected'
                                : 'folder'

                            return (
                                <li className={classes} key={folder.id}>
                                    <Link to={`/folders/${folder.id}`}>{folder.name}</Link>
                                </li>
                            )
                        })}
                    </ul>
                    <Link className="add-btn" to='/add-folder'>Add folder</Link>
                </nav>
            </>
        )
    }
}

NoteListNav.defaultProps = {
    folders: []
}

NoteListNav.defaultProps = {
    match: PropTypes.object.isRequired,
}
