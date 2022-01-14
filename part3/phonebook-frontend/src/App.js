import React, {useState, useEffect} from 'react'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import phoneService from './services/phoneService'
import {SuccessNotification, ErrorNotification} from './components/Notification'
import './index.css'


function App() {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [addedMessage, setAddedMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    phoneService
      .getAll()
      .then(personsData => {setPersons(personsData.persons)} )
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    
    const personObject = {
      name: newName,
      number: newNumber,
    }

    for (const person of persons) {
      if (person.name === personObject.name) {
        
        if (window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)) {
          phoneService
            .replace(person.id, personObject) // put returns updated person
            .then(returnedPerson => {
              setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
            })
            .catch(error => {
              setErrorMessage(`Information of ${person.name} has already been removed from the server`)
              setTimeout(() => {
                setErrorMessage(null)
              }, 4000)
              setPersons(persons.filter(p => person.name !== p.name))
            })
        }
        setNewName("")
        setNewNumber("")
        return
      }
    }
    
    phoneService
      .create(personObject)
      .then(newPerson => setPersons(persons.concat(newPerson)))

    setNewNumber("")
    setNewName("")
    setAddedMessage(`Added ${personObject.name}`)
    setTimeout(() => {
      setAddedMessage(null)
    }, 4000)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const deleteNum = (id, name) => {
    if (!(window.confirm(`Delete ${name}?`))) return // if user cancels, return
    phoneService
      .deleteNum(id)
      .then(setPersons(persons.filter(person => person.id !== id)))
      .catch(error => {
        alert(`The number for ${name} has ${error}`)
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <SuccessNotification message = {errorMessage} />
      <ErrorNotification message = {addedMessage} />
      <PersonForm onSubmit = {addPerson} persons = {persons} newName = {newName} handleNameChange = {handleNameChange} newNumber = {newNumber} handleNumberChange = {handleNumberChange} />

      <h2>Numbers</h2>
      {persons.map(person => {
        return (
          <Person key = {person.id} name = {person.name} number = {person.number} deleteNum = {() => deleteNum(person.id, person.name)} />
        )
      })}
    </div>
  );
}

export default App;
