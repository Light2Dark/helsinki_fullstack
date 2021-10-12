import ReactDOM from 'react-dom';
import App from './App';
import App2 from './partd'

let counter = 1

ReactDOM.render(
  <App />,
  document.getElementById("root")
)

const badWay = () => {
  setInterval(() => {
    // refresh()
    counter++
  }, 1000)
}