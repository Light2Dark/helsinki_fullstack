import React from 'react'

const Persons = (props) => {
    return (
        <>
            {props.persons.map(person => 
                  <Person key = {person.name} name = {person.name} number = {person.number} />  
            )}
        </>
    )
}

const Person = (props) => {
    return (
      <>
        {props.name} {props.number}<br />
      </>
    )
  }

export default Persons