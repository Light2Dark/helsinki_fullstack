import React from 'react'

const Header = ({ course }) => {
    return (
      <h1>{course.name}</h1>
    )
  }
  
const Total = ({ course }) => {
    // const sum = course.parts.reduce((sum, {exercises}) => sum += exercises,0)

    const sum = course.parts.reduce((sum, {exercises}) => {
        return sum += exercises
    }, 0)
    // reason to use {exercises} is because that is a prop of course, key of course

    return(
        <p><b>Number of exercises {sum}</b></p>
    ) 
}
  
const Part = (props) => {
    return (
        <p>
            {props.name} {props.exercises}
        </p>    
    )
}
  
const Content = ({ course }) => {
    return (
        <div>            
            {course.parts.map(part => 
                <Part key = {part.id} name = {part.name} exercises = {part.exercises} />
            )}
        </div>
    )
}

const Course = ({course}) => {
    return (
        <>
            <Header course = {course} />
            <Content course = {course} />
            <Total course = {course} />
        </>
    )
}

const Courses = (props) => {
    return (
        <div>
            {props.courses.map(course => {
                return (
                    <Course key = {course.id} course = {course} />
                )
            })}
        </div>  
    )
}

export default Courses