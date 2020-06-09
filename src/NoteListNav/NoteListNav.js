/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import './NoteListNav.css';


export default class NoteListNav extends React.Component {

  render() {
    const { folders } = this.props;    
    return (
      <nav>
        <ul>
          {folders.map(folder => 
            <li key={folder.id}>
              <a href="">{folder.name}</a>
            </li>
          )}
        </ul>
        <button>Add folder</button>
      </nav>
    )
  }
}

NoteListNav.defaultProps = {
  folders: []
}