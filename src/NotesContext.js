import React from 'react';

const NotesContext = React.createContext({
    // set up some default values. 
    // notes and folders will be updated after api requests complete.
    notes: [],
    folders: [],

    // and 'to give context shape',
    // series of placeholder event handler functions in anticipation of later use.
    // In programming, this concept is appropriately called a "contract".
    addFolder: () => { },
    addNote: () => { },
    deleteNote: () => { },
})

export default NotesContext