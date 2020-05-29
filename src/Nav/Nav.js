import React from 'react';
import './Nav.css';


export default function Nav(props) {

  const { folders } = props;

  return (
    <nav>
      <ul>
        {folders.map(folder => 
          <li key={folder.id}>
            <a href="#">{folder.name}</a>
          </li>
        )}
      </ul>
      <button>Add folder</button>
    </nav>
  )
}

Nav.defaultProps = {
  folders: []
}