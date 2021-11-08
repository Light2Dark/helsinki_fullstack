import React, {useState, useEffect} from 'react'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import phoneService from './services/phoneService'

function App() {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    console.log("effect")
    phoneService
      .getAll()
      .then(personsData => {setPersons(personsData)} )
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
    console.log(setNewNumber)
    setNewName("")

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
      <PersonForm onSubmit = {addPerson} persons = {persons} newName = {newName} handleNameChange = {handleNameChange} number = {newNumber} handleNumberChange = {handleNumberChange} />

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
