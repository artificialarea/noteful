import React from 'react'
import './NotePageMain.css'
import Note from '../Note/Note'


export default class NotePageMain extends React.Component {
  render() {
    return (
      <div className="note-page">
        <Note 
          key={this.props.id}
          id={this.props.id}
          name={this.props.name}
          modified={this.props.modified}
          folderId={this.props.folderId}
        />
        <p>{this.props.content}</p>
      </div>
    )
  }
}
