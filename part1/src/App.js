import React from 'react'

const App = () => {
  
  const name = "Peter"
  const age = 10

  return (
    <>
      <h1>Greetings</h1>
      <Hello name = "Blear" age = {26 + 10} />
      <Hello name = {name} age = {age} />
    </>
  )
}
// same as const App = () => (...)

const Hello = (props) => {
  return (
    <>
      <p>Hello {props.name}. You are {props.age} years old!</p>
    </>
  )
}

let Simple = () => (
  <p>This is a simple function. This will be returned.</p>
)

export default App;
