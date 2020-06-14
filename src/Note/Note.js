import React from 'react';
import { Link } from 'react-router-dom';
import config from '../config';
import NotesContext from '../NotesContext';
import './Note.css';

// format Date into something human readable
// [1] https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date
// [2] Solution via Blake via this on stack overflow: https://stackoverflow.com/questions/3552461/how-to-format-a-javascript-date
function formatDate(date) {
  var monthNames = [
    "Jan", "Feb", "Mar",
    "Apr", "May", "Jun", "Jul",
    "Aug", "Sep", "Oct",
    "Nov", "Dec"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return monthNames[monthIndex] + ' ' + day + ', ' + year;
}

function formatTime(date) {
  var hours = date.getHours();
  var mins = date.getMinutes();
  var secs = date.getSeconds();
  if (mins < 10) {
    mins = '0' + mins;
  }
  if (secs < 10) {
    secs = '0' + secs;
  }

  return hours + ':' + mins + ':' + secs;
}

function deleteNoteRequest(noteId, callback) {

  const baseUrl = config.API_ENDPOINT;
  // const url = baseUrl + '/db';
  // ^^^^^^ two birds with one stone
  // const urlFolders = baseUrl + '/folders';
  const url = baseUrl + `/notes/${noteId}`;
  const options = {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
    }
  }

  fetch(url, options)
    .then(response => {
      if(!response.ok) {
        throw new Error('Houston, we have a problem.')
      }
      return response.json()
    })
    .then(data => {
      console.log(callback)
      callback(noteId)
      // callback is a param for argument
      // this.context.deleteNote(noteId)

      // for instances where deleted :note.id in while NotePageMain view of :note.id.
      if (this.props.match.params.noteId) { 
        this.props.history.push('/');
      }
      console.log("this.props.match.params.noteId: ", this.props.match.params.noteId)
    })
    .catch(err => {
      console.log(err)
    });
}

// annoyingly Context.Consumer (this.context.deleteNote) didn't work in a class component
// so refactored as a function component
export default function Note(props) {
  // const modified = new Date(props.modified);
  const modified = formatDate(new Date(props.modified));
  const modifiedTime = formatTime(new Date(props.modified));

  
  return (
    <NotesContext.Consumer>
      {(context) => (
        <li 
          key={props.id}
          className="note"
        >
          <h2><Link to={`/notes/${props.id}`}>{props.name}</Link></h2>
          <div>
            <p>Last modified: <span className="date">{modified}</span> <span className="time">{modifiedTime}</span></p>
            <button
              onClick={() => {
                deleteNoteRequest(
                  props.id,
                  context.deleteNote
                )
              }}
            >
              Delete Note
            </button> 
          </div>
        </li>
      )}
    </NotesContext.Consumer>
  )
}

// GRRRRRRRRR
// why didn't Context.Consumer (this.context.deleteNote) work within a class component ????

// export default class Note extends React.Component {
//   render() {
//     // const modified = new Date(this.props.modified);
//     const modified = formatDate(new Date(this.props.modified));
//     const modifiedTime = formatTime(new Date(this.props.modified));

//     return (
//       <NotesContext.Consumer>
//         {(context) => {
//           console.log(context)
//           return (
//             <>
//           <li 
//             key={this.props.id}
//             className="note"
//           >
//             <h2><Link to={`/notes/${this.props.id}`}>{this.props.name}</Link></h2>
//             <div>
//               <p>Last modified: <span className="date">{modified}</span> <span className="time">{modifiedTime}</span></p>
//               <button
//                 onClick={() => {
//                   deleteNoteRequest(
//                     this.props.id,
//                     this.context.deleteNote
//                   )
//                 }}
//               >
//                 Delete Note
//               </button> 
//             </div>
//           </li>
//           </>
//           )
//         }}
//       </NotesContext.Consumer>
//     )
//   }
// }

