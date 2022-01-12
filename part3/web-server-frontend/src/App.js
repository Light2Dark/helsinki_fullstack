import React, {useState, useEffect} from 'react'
import Note from './components/Note'
import noteService from './services/notes'
import Notification from './components/Notification'
import './index.css'

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }

  return <div style = {footerStyle}>
    <br />
    <em>Note app, Department of Computer Science, Helsinki Unversity 2021</em>
  </div>
}

const App = () => {
  // const {notes} = props // {notes} refers to props.notes
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  const hook = () => {
    console.log("effect")
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })

      // const promise = axios.get("...")
      // promise.then(eventHandler)
  }

  useEffect(hook, []) // does not get called second time bcs [] does not change
  console.log("render", notes.length, "notes")

  const addNote = (event) => {
    event.preventDefault()
    if (newNote === "") return
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      // id: notes.length + 1
    }
    // setNotes(notes.concat(noteObject))
    // setNewNote("")

    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote("")
      })
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id) // return note which has note.id ==== id
    const changedNote = {...note, important: !note.important}
    // `importance of ${id} needs to be toggled`

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(noteHere => noteHere.id !== id ? noteHere : returnedNote)) // create a new array, map all items from old array into new array
      }) 
      .catch(error => {
        setErrorMessage(
          `Note '${note.content}' was already removed from the server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id)) // returns a new array where the items in the list pass the parameter, so if id of this non existent note is 1000, return all the notes that are not 1000
      })
    }

  const notesToShow = showAll ? notes : notes.filter(note => note.important)
  // same as note => note.important === true

  return (
    <div>
      <Notification message = {errorMessage} />
      <h1>Notes</h1>
      <div>
        <button onClick = {() => setShowAll(!showAll)}>
          Show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note key = {note.id} note = {note} toggleImportance ={() => {toggleImportanceOf(note.id)}} />
        )}
      </ul>
      {/* <ul> 
        {notes.map(note => 
          <Note key = {note.id} note = {note} />
        )}
      </ul> */}
      <form onSubmit = {addNote}>
        <input value = {newNote} onChange = {handleNoteChange} /> 
        <button type = "submit">Save</button>
      </form>

      <Footer />
    </div>
  )
} 

// bcs Javascript thats why wrap in {}
// anti-pattern: notes.map((note, index) => {}) however dont use this

export default App;
