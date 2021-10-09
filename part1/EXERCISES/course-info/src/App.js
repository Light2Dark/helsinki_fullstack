import React from 'react'

const App = () => {
  const course = {
    name: "Half Stack Application Development",
    parts: 
    [
      {
        name: "Fundamentals of React",
        exercises: 10
      },
      {
        name: "Using props to pass data",
        exercises: 7
      },
      {
        name: "State of a component",
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header name = {course.name}/>
      <Content parts = {course.parts}/>
      <Total parts = {course.parts} />
    </div>
  )
}

const Header = (obj) => {
  return (
    <>
      <h1>{obj.name}</h1>
    </>
  )
}

// the obj passed in has a parameter parts which is an array of objects
const Content = (obj) => (
  <>
    <Part part = {obj.parts[0]} />
    <Part part = {obj.parts[1]} />
    <Part part = {obj.parts[2]} />
  </>
)

// now passing in an object which has a parameter part that has a single obj
const Part = (props) => (
  <>
    <p>{props.part.name} {props.part.exercises}</p>
  </>
)

const Total = (obj) => {
  return (
    <div>
      <p>Number of exercises: {obj.parts[0].exercises + obj.parts[1].exercises + obj.parts[2].exercises}</p>
    </div>
  )
}

export default App;
