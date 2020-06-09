import React from 'react';
import { Route } from 'react-router-dom';
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
    console.log(this.state);
    const { notes, folders } = this.state 

    return (
      <div className="App">
        <header>
          <h1>Note.ful</h1>
        </header>
        <main>

          <NoteListNav folders={folders}/>
          <NotePageNav />
         

          {/* <NoteListMain notes={this.state.notes}/> */}
          <Route
            exact 
            path='/'
            render={() => {
              return <NoteListMain notes={notes}/>
            }}
          />

          <NotePageMain />

          <Route 
            path = 'notes/:noteId'
            render={(props) => {
              console.log(props)
              return <div />
              // return <Note />
            }}
          />

        </main>
      </div>
    );
  }
}
