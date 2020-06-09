import React from 'react';
import './Note.css';


export default function Note(props) {
  // console.log(props)
  return (
    <li 
      key={props.id}
      className="note"
    >
      <h2>{props.name}</h2>
      <div>
        <p>Date modified on {props.modified}</p>
        <button>Delete Note</button> 
      </div>
    </li>
  )
}