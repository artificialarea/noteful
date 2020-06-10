import React from 'react';
import { Link } from 'react-router-dom';
import './Note.css';


export default class Note extends React.Component {
  render() {
    return (
      <li 
        key={this.props.id}
        className="note"
      >
        <h2><Link to={`/notes/${this.props.id}`}>{this.props.name}</Link></h2>
        <div>
          <p>Date modified on {this.props.modified}</p>
          <button>Delete Note</button> 
        </div>
      </li>
    )
  }
}