import React, {useState} from 'react'

const AnecdoteApp = () => {
    const anecdotes = [
        'If it hurts, do it more often',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
      ]
       
      const [selected, setSelected] = useState(0)
      const [votes, setVote] = useState([0,0,0,0,0,0,0])
      const copyVotes = [...votes]
      const maxValue = Math.max(...copyVotes)
      
      const getRandomNum = () => Math.floor(Math.random() * anecdotes.length)

      const nextAnecdote = () => {
        setSelected(getRandomNum)
        // do not modify state like this: selected = setSelected(getRandomNum)
      }

      const voteAnecdote = () => {
        copyVotes[selected] += 1
        setVote(copyVotes)
      }

      return (
        <div>
            <Title text = "Anecdote of the day" />
            {anecdotes[selected]}
            <div>has {votes[selected]} votes</div>

            <div>
                <Button text = "next anecdote" onClick = {nextAnecdote} />
                <Button text = "vote" onClick = {voteAnecdote}/>
            </div>

            <Title text = "Anecdote with most votes" />
            {anecdotes[maxValue]}
            <div>has {maxValue} votes</div>
        </div>
      )
}

const Button = ({text, onClick}) => <><button onClick = {onClick}>{text}</button> </>

const Title = ({text}) => <><h1>{text}</h1></>

// From solutions
const Anecdote = ({text, votes = 0}) => {
  return (
    <div>
      <div>
        {text}
      </div>
      <div>
        has {value} votes
      </div>
    </div>
  )
}

export default AnecdoteApp;