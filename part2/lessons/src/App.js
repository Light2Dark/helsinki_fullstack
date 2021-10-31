import React, {useState} from 'react'
import Note from './components/Note'

const App = (props) => {
  // const {notes} = props // {notes} refers to props.notes
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: notes.length + 1
    }
    setNotes(notes.concat(noteObject))
    setNewNote("")
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important)
  // same as note => note.important === true

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick = {() => setShowAll(!showAll)}>
          Show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note key = {note.id} note = {note.content} />
        )}
      </ul>
      {/* <ul> 
        {notes.map(note => 
          <Note key = {note.id} note = {note.content} />
        )}
      </ul> */}
      <form onSubmit = {addNote}>
        <input value = {newNote} onChange = {handleNoteChange} /> 
        <button type = "submit">Save</button>
      </form>
    </div>
  )
} 

// bcs Javascript thats why wrap in {}
// anti-pattern: notes.map((note, index) => {}) however dont use this

export default App;
