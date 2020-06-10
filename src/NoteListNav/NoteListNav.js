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

            /* give each folder in the array a class name 
            *plus* the class name 'selected' if the folder's id matches the selected props (props.match.params.folderId)
            via this crafty conditional ternary operator */
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

  // render() {
  //   return (
  //     <div className="Sidebar">
  //       <h2>Folders</h2>
  //       <ul>

  //         {/* Loop through the array of folders passed as a prop */}
  //         {this.props.folders.map((folder) => {

  //           /* for each folder in the array, set variable 'classes' as either
  //           'folder' or 'folder' AND 'selected'. If the selected folderId is
  //           the same as the id of the current folder in the array, then add 'selected' to classes
  //           */
  //           const classes = this.props.selected === folder.id
  //             ? 'folder selected'
  //             : 'folder'

  //           // Create list item for each folder in the array
  //           return(

  //             <li key={folder.id}>
  //               <Link className={classes} to={`/folders/${folder.id}`}>{folder.name}</Link>
  //             </li>
  //           )
  //         })}
  //       </ul>
  //       <button>New Folders</button>
  //     </div>
  //   );
  // }
}

NoteListNav.defaultProps = {
  folders: []
}