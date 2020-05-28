import React from 'react';
import './App.css';
import NoteList from './NoteList/NoteList';
import Nav from './Nav/Nav';


export default class App extends React.Component {
  render() {
    return (
      <main className="App">
        NOTEFUL
        <Nav />
        <NoteList />
      </main>
    );
  }
}
