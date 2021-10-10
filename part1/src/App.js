import React, {useState} from 'react' // importing the useState function

const App = (props) => {
  const [counter, setCounter] = useState(0) // adds state to the component and renders it initialized with value of 0. returns an array with 2 items which are assigned to variables counter..

  // setTimeout(
  //   () => setCounter(counter + 1), // react will rerender this component
  //   1000
  // )

  // when the component is re-executed, useState is called again but this time returns the value of 1. setTimeout function that occurs again to increment counter value and re-render component

  const increaseByOne = () => setCounter(counter + 1)
  const decreaseByOne = () => setCounter(counter-1)
  const setToZero = () => setCounter(0)

  return (
    <>
      <Display counter = {counter} />
      <Button onClick = {increaseByOne} text = "plus" />
      <Button onClick = {decreaseByOne} text = "minus" />
      <Button onClick = {setToZero} text = "zero" />
    </>
  )
}
// same as const App = () => (...)

const Button = ({onClick, text}) => <button onClick = {onClick}>{text}</button>

const Display = ({counter}) => <div>{counter}</div>

const Hello = ({name, age}) => {

  const bornYear = () => new Date().getFullYear() - age

  return (
    <div>
      <p>Hello {name}. You are {age} years old!</p>
      <p>So, you were probably born in {bornYear()}</p>
    </div>
  )
}

let Simple = () => (
  <p>This is a simple function. This will be returned.</p>
)

export default App;
