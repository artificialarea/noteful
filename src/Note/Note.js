import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
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

class Note extends React.Component {

    static defaultProps = {
        onDeleteNote: () => { },
        match: {
            params: {}
        }
    }

    static contextType = NotesContext;

    handleClickDelete = e => {
        e.preventDefault();

        const noteId = this.props.id;

        // make api request
        fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(err => Promise.reject(err));
                }
                return res.json();
            })
            .then(() => {
                // window.history.back();
                window.location = '/'
                this.context.deleteNote(noteId)

                // programmable navigation via parent to go to another url
                // otherwise, will remain at this (now deleted) url, resulting in app crashing
                // this.props.onDeleteNote(noteId)
            })
            .catch(error => {
                console.error({ error })
            })
    }

    render() {

        const modifiedDate = formatDate(new Date(this.props.modified));
        const modifiedTime = formatTime(new Date(this.props.modified));

        return (
            <li className="note">
                <h2><Link to={`/notes/${this.props.id}`}>
                    {this.props.name}
                </Link></h2>
                <div>
                    <p>Last modified: <span className="date">{modifiedDate}</span> <span className="time">{modifiedTime}</span></p>

                    <button onClick={this.handleClickDelete}>
                        Delete Note
        </button>
                </div>
            </li>
        )
    }

}

export default Note;

Note.propTypes = {
    modified: PropTypes.string,
    // id: PropTypes.string,
    name: PropTypes.string,
}











//                                              _ 
//                                             | |
//  __ _ _ __ __ ___   _____ _   _  __ _ _ __ __| |
// / _` | '__/ _` \ \ / / _ \ | | |/ _` | '__/ _` |
// | (_| | | | (_| |\ V /  __/ |_| | (_| | | | (_| |
// \__, |_|  \__,_| \_/ \___|\__, |\__,_|_|  \__,_|
// __/ |                     __/ |                
// |___/                     |___/                 


// function deleteNoteRequest(noteId, callback) {

//   // for instances where deleted :note.id in while NotePageMain view of :note.id.
//   // if (this.props.match.params.noteId) { 
//   //   this.props.history.push('/');
//   // }
//   // console.log("this.props.match.params.noteId: ", this.props.match.params.noteId)

//   const url = `${config.API_ENDPOINT}/notes/${noteId}`;
//   const options = {
//     method: 'DELETE',
//     headers: {
//       'content-type': 'application/json',
//     }
//   }

//   fetch(url, options)
//     .then(response => {
//       if(!response.ok) {
//         throw new Error('Houston, we have a problem.')
//       }
//       return response.json()
//     })
//     .then(data => {
//       props.history.push('/')    // available via withRouter
//       callback(noteId)
//       // callback is a param for argument
//       // this.context.deleteNote(noteId)


//     })
//     .catch(err => {
//       console.log(err)
//     });
// }

// // annoyingly Context.Consumer (this.context.deleteNote) didn't work in a class component
// // so refactored as a function component
// function Note(props) {
//   // const modified = new Date(props.modified);
//   const modified = formatDate(new Date(props.modified));
//   const modifiedTime = formatTime(new Date(props.modified));


//   return (
//     <NotesContext.Consumer>
//       {(context) => (
//         <li 
//           key={props.id}
//           className="note"
//         >
//           <h2><Link to={`/notes/${props.id}`}>{props.name}</Link></h2>
//           <div>
//             <p>Last modified: <span className="date">{modified}</span> <span className="time">{modifiedTime}</span></p>
//             <button
//               onClick={() => {
//                 deleteNoteRequest(
//                   props.id,
//                   context.deleteNote
//                 )
//               }}
//             >
//               Delete Note
//             </button> 
//           </div>
//         </li>
//       )}
//     </NotesContext.Consumer>
//   )
// }

// export default withRouter(Note);