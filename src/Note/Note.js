import React from 'react';
import { Link } from 'react-router-dom';
import './Note.css';

// format Date into something human readable
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date

// Solution via Blake via this on stack overflow: https://stackoverflow.com/questions/3552461/how-to-format-a-javascript-date
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

export default class Note extends React.Component {
  render() {
    // const modified = new Date(this.props.modified);
    const modified = formatDate(new Date(this.props.modified));
    const modifiedTime = formatTime(new Date(this.props.modified));
    
    return (
      <li 
        key={this.props.id}
        className="note"
      >
        <h2><Link to={`/notes/${this.props.id}`}>{this.props.name}</Link></h2>
        <div>
          <p>Last modified: <span className="date">{modified}</span> <span className="time">{modifiedTime}</span></p>
          <button>Delete Note</button> 
        </div>
      </li>
    )
  }
}