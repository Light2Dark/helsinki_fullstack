import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Note from './components/Note'

const App = () => {
  // const {notes} = props // {notes} refers to props.notes
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  const hook = () => {
    console.log("effect")
    axios
      .get("http://localhost:3001/notes")
      .then(response => {
        console.log("promise fulfilled")
        setNotes(response.data)
      })

      // const promise = axios.get("...")
      // promise.then(eventHandler)
  }

  useEffect(hook, []) // does not get called second time bcs [] does not change
  console.log("render", notes.length, "notes")

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
