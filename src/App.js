import React from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
// import dummyStore from './dummy-store.js'; 
import config from './config.js';
import NoteListNav from './NoteListNav/NoteListNav';
import NoteListMain from './NoteListMain/NoteListMain';
import NotePageNav from './NotePageNav/NotePageNav';
import NotePageMain from './NotePageMain/NotePageMain';
import AddFolder from './AddFolder/AddFolder';
import AddNote from './AddNote/AddNote';

import NotesContext from './NotesContext';


export default class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { 
      folders: [],
      notes: [],
    }
  }

  componentDidMount() {
 
    const baseUrl = config.API_ENDPOINT;
    const url = baseUrl + '/db';
    // ^^^^^^ two birds with one stone
    // const urlFolders = baseurl + '/folders';
    // const urlNotes = baseurl + '/notes';
    const options = {
      method: 'GET',
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
        // smthin
        this.setState({
          folders: data.folders,
          notes: data.notes
        })
      })
      .catch(err => {
        console.log(err)
      })

    // earlier, mimiced API fetch call
    // setTimeout(() => {
    //   this.setState(
    //     dummyStore
    //   )
    // }, 500);
  }

  addFolderState(folder) {
    // console.log('folder arg: ', folder)
    this.setState({
      folders: [...this.state.folders, folder]
    })
  }

  addNoteState(note) {
    const { submit, ...rest } = note // purging 'submit' property from note object
    this.setState({
      notes: [rest, ...this.state.notes]
    })
  }

  deleteNote = noteId => {
    const newNotes = this.state.notes.filter(note =>
      note.id !== noteId
    )
    this.setState({
      notes: newNotes
    })
  }

  render() {
    const { notes, folders } = this.state 
    // console.log(this.state);

    const noteContextValue = {
      notes: this.state.notes,
      deleteNote: this.deleteNote
    }

    return (
      
      <div className="App">
        <header>
          <h1><Link to='/'>Note.ful</Link></h1>
          <Link className="add-btn" to="/add-note">Add note</Link>
          <Link className="add-btn" to='/add-folder'>Add folder</Link>
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
                // const { folders, notes } = this.state

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
            <NotesContext.Provider
              value={noteContextValue}>
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
                  // const { notes } = this.state;
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
            </NotesContext.Provider>

            <Route 
              exact path='/add-folder'
              render={({history}) => {
                return (
                  <AddFolder 
                    handleFolderState={(folder) => this.addFolderState(folder)}
                    // onClickCancel={() => history.goBack()}
                    onClickCancel={() => history.push('/')}
                  />
                )
              }}
            />

            <Route 
              exact path='/add-note'
              render={({history}) => {
                return(
                  <AddNote 
                    folders = {folders}
                    handleNoteState={(note) => this.addNoteState(note)}
                    onClickCancel={() => history.push('/')}
                  />
                )
              }}
            />

          </main>

        </div>
      </div>
    );
  }
}
