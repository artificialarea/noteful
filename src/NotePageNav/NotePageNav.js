import React from 'react';
import { Link } from 'react-router-dom';
import './NotePageNav.css';


export default class NotePageNav extends React.Component {
  
  render() {
    return (
      <>
        <h2>Folder: {this.props.name}</h2>
        <Link to='/'>Go back</Link>
      </>
    )
  }
}