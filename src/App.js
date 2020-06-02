import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import NoteList from './NoteList/NoteList';
import Nav from './Nav/Nav';
import dummyStore from './dummy-store.js'; 


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

          <Nav folders={folders}/>

          {/* <NoteList notes={this.state.notes}/> */}
          <Route
            exact 
            path ='/'
            render={() => {
              return <NoteList notes={notes}/>
            }}
          />

        </main>
      </div>
    );
  }
}
