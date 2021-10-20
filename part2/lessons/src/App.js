import React from 'react'
import Note from './components/Note'

const App = ({notes}) => {
  // const {notes} = props // {notes} refers to props.notes

  return (
    <div>
      <h1>Notes</h1>
      <ul> 
        {notes.map(note => 
          <Note key = {note.id} note = {note.content} />
        )}
      </ul>
    </div>
  )
} 

// bcs Javascript thats why wrap in {}
// anti-pattern: notes.map((note, index) => {}) however dont use this

export default App;
