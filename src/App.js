import React from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import config from './config.js';
import NoteListNav from './NoteListNav/NoteListNav';
import NoteListMain from './NoteListMain/NoteListMain';
import NotePageNav from './NotePageNav/NotePageNav';
import NotePageMain from './NotePageMain/NotePageMain';
import AddFolder from './AddFolder/AddFolder';
import AddNote from './AddNote/AddNote';

import NotesContext from './NotesContext';
import ErrorBoundary from './ErrorBoundary';


export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            notes: [],
            folders: []
        }
    }

    componentDidMount() {
        Promise.all([
            fetch(`${config.API_ENDPOINT}/notes`),
            fetch(`${config.API_ENDPOINT}/folders`)
        ])
            .then(([notesResponse, foldersResponse]) => {
                if (!notesResponse.ok) 
                    return notesResponse.json().then(err => Promise.reject(err));
                if (!foldersResponse.ok)
                    return foldersResponse.json().then(err => Promise.reject(err));

                return Promise.all([notesResponse.json(), foldersResponse.json()])
            })
            .then(([notes, folders]) => {
                this.setState({ notes, folders })
            })
            .catch(err => {
                console.log(err)
            })
    }

    handleDeleteNote = (noteId) => {
        this.setState({
            notes: this.state.notes.filter(note => note.id !== noteId)
        })
    }

    handleAddFolder = (folder) => {
        this.setState({
            folders: [...this.state.folders, folder]
        })
    }

    handleAddNote = (note) => {
        this.setState({
            notes: [...this.state.notes, note]
        })
    }

    render() {

        const contextValue = {
            notes: this.state.notes,
            folders: this.state.folders,
            addFolder: this.handleAddFolder,
            addNote: this.handleAddNote,
            deleteNote: this.handleDeleteNote,
        }

        return (
            <ErrorBoundary>
                <NotesContext.Provider value={contextValue}>
                    <div className="App">
                        <header>
                            <h1><Link to='/'>Note.ful</Link></h1>
                            <Link className="add-btn" to="/add-note">Add note</Link>
                            <Link className="add-btn" to='/add-folder'>Add folder</Link>
                        </header>
                        <div className="container">

                            <aside>

                                {/* Main Route */}
                                <Route
                                    exact path='/'
                                    component={NoteListNav}
                                />
                                {/* Folder Route  */}
                                <Route
                                    exact path='/folders/:folderId'
                                    component={NoteListNav}
                                />
                                {/* Note Route  */}
                                <Route
                                    exact path='/notes/:noteId'
                                    render={(props) =>
                                        <NotePageNav
                                            {...props}
                                            onClickGoBack={() => { props.history.goBack() }}
                                        />
                                    }
                                />

                            </aside>

                            <main>

                                {/* Main Route  */}
                                <Route
                                    exact path='/'
                                    component={NoteListMain}
                                />
                                {/* Folder Route  */}
                                <Route
                                    exact path='/folders/:folderId'
                                    component={NoteListMain}
                                />
                                {/* Note Route  */}
                                <Route
                                    exact path='/notes/:noteId'
                                    component={NotePageMain}
                                />


                                {/* Add Folder Route  */}
                                <Route
                                    exact path='/add-folder'
                                    component={AddFolder}
                                />
                                {/* Add Note Route  */}
                                <Route
                                    exact path='/add-note'
                                    component={AddNote}
                                />

                            </main>
                        </div>
                    </div>
                </NotesContext.Provider>
            </ErrorBoundary>
        );
    }
}
