import React from 'react'

const Person = (props) => {
    return (
      <>
        {props.name} {props.number} <button onClick = {props.deleteNum}>delete</button><br />
      </>
    )
  }

export default Person