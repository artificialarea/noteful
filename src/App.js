import React from 'react';
import './App.css';
import NoteList from './NoteList/NoteList';
import Nav from './Nav/Nav';
import STORE from './dummy-store.js';


export default class App extends React.Component {

  state = { 
    store : STORE, 
  }

  render() {
    // console.log(this.state.store);
    return (
      <div className="App">
        <header>
          <h1>Note.ful</h1>
        </header>
        <main>
          <Nav folders={this.state.store.folders}/>
          <NoteList notes={this.state.store.notes}/>
        </main>
      </div>
    );
  }
}
