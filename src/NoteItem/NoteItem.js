import React from 'react';
import './NoteItem.css';


export default function NoteItem(props) {
  // console.log(props)
  return (
    <li 
      key={props.id}
      className="note-item"
    >
      <h2>{props.name}</h2>
      <div>
        <p>Date modified on {props.modified}</p>
        <button>Delete Note</button> 
      </div>
    </li>
  )
}