import React, {useState} from 'react'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)
  const totalStates = good + bad + neutral

  return (
    <div>
      <Title text = "give feedback" />
      <Button text = "good" onClick = {increaseGood} />
      <Button text = "neutral" onClick = {increaseNeutral} />
      <Button text = "bad" onClick = {increaseBad} />

      <Title text = "statistics" />
      <Statistics good = {good} neutral = {neutral} bad = {bad} />
    </div>
  )
}

let Title = ({text}) => <><h1>{text}</h1></>

const Button = ({onClick, text}) => <><button onClick = {onClick}>{text}</button></>

const StatisticLine = ({text, value}) => {
  return (
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
  )
}

const Statistics = ({good, bad, neutral}) => {
  const totalStates = good + bad + neutral

  if (totalStates === 0) return (<div>no feedback given</div>)

  return (
    <>
      <table>
        <tbody>
          <StatisticLine text = "good" value = {good} />
          <StatisticLine text = "neutral" value = {neutral} />
          <StatisticLine text = "bad" value = {bad} />
          <StatisticLine text = "all" value = {totalStates} />
          <StatisticLine text = "average" value = {(good + -bad) / (totalStates)} />
          <StatisticLine text = "positive" value = {good / totalStates * 100} />
        </tbody>
      </table>
    </>
  )
}

export default App;
