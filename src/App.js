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
            notes: [],
            folders: []
        }
    }

    componentDidMount() {

        // PROMISES: COMPOSITION
        // https://courses.thinkful.com/react-v1/checkpoint/13#composition
        // 
        // Promise.all().then();
        //
        // Promise
        //   .all([p1, p2, p3])
        //   .then(arr => {
        //     // 'arr' is an array [result-p1, result-p2, result-p3]
        //     // ala .then(([result-p1, result-p2, result-p3]) => {...})
        //   });
        //
        // Promise required in this scenario, 
        // because multiple seperate asynchronous requests

        Promise.all([
            fetch(`${config.API_ENDPOINT}/notes`),
            fetch(`${config.API_ENDPOINT}/folders`)
        ])
            .then(([notesResponse, foldersResponse]) => {
                if (!notesResponse.ok) // look ma, no brackets {} (in lieu, return with ;)!
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

        const { submit, ...rest } = note // purging 'submit' property from note object
        this.setState({
            notes: [rest, ...this.state.notes]
        })
    }


    render() {
        const { notes, folders } = this.state
        console.log(this.state);

        const contextValue = {
            notes: this.state.notes,
            folders: this.state.folders,
            addFolder: this.handleAddFolder,
            addNote: this.handleAddNote,
            deleteNote: this.handleDeleteNote,
        }

        return (
            <div className="App">
                <NotesContext.Provider value={contextValue}>
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
                                // component={NotePageNav}
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
                                // render={({ history }) => {
                                //     return (
                                //         <AddNote
                                //             folders={folders}
                                //             handleNoteState={(note) => this.addNoteState(note)}
                                //             onClickCancel={() => history.push('/')}
                                //         />
                                //     )
                                // }}
                            />

                        </main>
                    </div>
                </NotesContext.Provider>
            </div>
        );
    }
}
