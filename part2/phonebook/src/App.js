import React, {useState, useEffect} from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import axios from 'axios'

function App() {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    console.log("effect")
    axios
      .get("http://localhost:3001/persons")
      .then(response => {setPersons(response.data)} )
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    for (const person of persons) {
      if (person.name === newName) {
        alert(`${newName} is already added in the phonebook.`)
        return
      }
    }

    const personObject = {
      name: newName,
      number: newNumber,
    }
    
    setPersons(persons.concat(personObject))
    setNewName("")
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <PersonForm onSubmit = {addPerson} persons = {persons} newName = {newName} handleNameChange = {handleNameChange} number = {newNumber} handleNumberChange = {handleNumberChange} />

      <h2>Numbers</h2>
      <Persons persons = {persons}/>
    </div>
  );
}

export default App;
