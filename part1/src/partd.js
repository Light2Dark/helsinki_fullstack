import React, {useState} from 'react'

const App2 = (props) => {
    const [clicks, setClicks] = useState({
        left: 0,
        right: 0
    })

    const [allClicks, setAll] = useState([])

    const handleLeftClick = () =>
        setAll(allClicks.concat('L'))
        setClicks({...clicks, left: clicks.left + 1})

    const handleRightClick = () =>
        setAll(allClicks.concat("R"))
        setClicks({...clicks, right: clicks.right + 1})

    // ...clicks creates a new object that copies all properties of the clicks object

    return (
        <div>
            {clicks.left}
            <Button onClick = {handleLeftClick} text = "left" />
            <Button onClick = {handleRightClick} text = "right" />
            {clicks.right}
            <History allClicks = {allClicks} />
        </div>
    )
}

const Button = ({handleClick, text}) => (
    <button onClick = {handleClick}>{text}</button>
)

const History = (props) => {
    if (props.allClicks.length === 0) {
        return (
            <div>the app is used by pressing the button</div>
        )
    }
    return (
        <div>
            button press history: {props.allClicks.join(" ")}
        </div>
    )
}

const hello = (who) => () => {console.log("hello", who)} // customizing event handlers by returning functions

export default App2