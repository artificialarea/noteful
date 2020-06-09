import React from 'react';
import './Note.css';


export default class Note extends React.Component {
  render() {
    return (
      <li 
        key={this.props.id}
        className="note"
      >
        <h2>{this.props.name}</h2>
        <div>
          <p>Date modified on {this.props.modified}</p>
          <button>Delete Note</button> 
        </div>
      </li>
    )
  }
}