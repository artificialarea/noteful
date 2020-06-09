import React from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import dummyStore from './dummy-store.js'; 
import NoteListNav from './NoteListNav/NoteListNav';
import NoteListMain from './NoteListMain/NoteListMain';
import NotePageNav from './NotePageNav/NotePageNav';
import NotePageMain from './NotePageMain/NotePageMain';
import Note from './Note/Note';


export default class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { 
      folders: [],
      notes: [],
    }
  }

  componentDidMount() {
    // mimic API fetch call for now
    setTimeout(() => {
      this.setState(
        dummyStore
      )
    }, 500);
  }

  updateFolderView() {
    this.setState({

    })
  }

  render() {
    const { notes, folders } = this.state 
    // console.log(this.state);

    return (
      <div className="App">
        <header>
          <h1><Link to='/'>Note.ful</Link></h1>
        </header>
        <div className="container">

          <nav>

            <Route 
              exact path='/'
              render={() => 
                <NoteListNav folders={folders}/>
              } 
            />

            <Route
              exact path='/folders/:folderId'
              render={(props) => {
              // ^^^^^^^^^^^^^^^^
              // crucial 'route props' (inherent properties in a Route object like match, location, history, etc) obtained via route render prop function  
                return (
                  <NoteListNav 
                    folders={folders}
                    // selected route prop via the id from the url path (:folderId)
                    selected={props.match.params.folderId} 
                  />
                )
              }}
            />

            <Route 
              exact path='/notes/:noteId'
              render={(props) => {
                const { folders, notes } = this.state

                // find the id of the note that matches the noteId from the url path
                // to find it's associated folderId
                const selectedFolderId = notes.find(
                  note => note.id === props.match.params.noteId
                ).folderId

                // then find the folder with the id that matches the note.folderId
                const selectedFolder = folders.find(
                  folder => folder.id === selectedFolderId
                )

                return (
                  <NotePageNav {...selectedFolder} />
                  // ^^ spread operator (...) alternative to:
                  // <NotePageNav id={selectedFolder.id} name={selectedFolder.name} />
                )
              }}
            />

          </nav>

          <main>

            <Route
              exact path='/'
              render={() => {
                return <NoteListMain notes={notes}/>
              }}
            />

            <Route 
              exact path='/folders/:folderId'
              render={(props) => {
                return (
                  // filter this.props.notes to only pass notes props 
                  // that have a folderId
                  // that matches the :folderId path of url
                  <NoteListMain 
                    notes={notes.filter(
                      note => note.folderId === props.match.params.folderId
                    )}
                  />
                )
              }}
            />

            <Route
              exact path='/notes/:noteId'
              render={(props) => {
                const { notes } = this.state;
                const selectedNote = notes.find(
                  note => note.id === props.match.params.noteId
                )
                return (
                  <NotePageMain {...selectedNote} />
                  // ^^ spread operator (...) alternative to:
                  // <NotePageMain id={selectedNote.id} folderId={selectedNote.folderId} content={selectedNote.content} name={selectedNote.name} modified={selectedNote.modified}/>
                  // Phew!!
                )
              }}
            />

          </main>

        </div>
      </div>
    );
  }
}
