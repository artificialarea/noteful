import React from 'react';

const NotesContext = React.createContext({
  notes: [],
  deleteNote: () => {}
  // Empty event handler function in anticipation of use,
  // so we have 'the shape' of the context ready for Context.Provider later.
  // In programming, this concept is appropriately called a "contract"
})

export default NotesContext