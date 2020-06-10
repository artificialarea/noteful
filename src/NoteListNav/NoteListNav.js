import React from 'react';
import { Link } from 'react-router-dom';
import './NoteListNav.css';

// This component is rendered in the <nav> for the '/' and 'folder/:folderId' routes
export default class NoteListNav extends React.Component {

  render() {
    const { folders, selected } = this.props;    
    return (
      <>
        <ul>
          {folders.map(folder => {
            /* 
            give each folder in the array a class name 
            *PLUS* the class name 'selected' if the folder.id matches selected props (props.match.params.folderId) via this crafty conditional ternary operator 
            */
            const classes = selected === folder.id 
              ? 'folder selected'
              : 'folder'

            return (
            <li className={classes} key={folder.id}>
              <Link to={`/folders/${folder.id}`}>{folder.name}</Link>
            </li>
            )
          })}
        </ul>
        <button>Add folder</button>
      </>
    )
  }
}

NoteListNav.defaultProps = {
  folders: []
}