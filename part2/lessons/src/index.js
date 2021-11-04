import ReactDOM from 'react-dom';
import App from './App.js'
import axios from 'axios'

// const promise = axios.get("http://localhost:3001/notes")
// promise.then(response => console.log(response))

axios
  .get("http://localhost:3001/notes")
  .then(response => {
    const notes = response.data
    console.log(notes)
  })


// const promise2 = axios.get("http://localhost:3001/foobar")
// console.log(promise2); will be rejected promise

ReactDOM.render(
  <App/>,
  document.getElementById("root")
);

// XHR method OBSOLETE
// const xhttp = new XMLHttpRequest()

// xhttp.onreadystatechange = function() {    --event handler obj to rep HTTP Req.
//   if (this.readyState == 4 && this.status == 200) {
//     const data = JSON.parse(this.responseText)
//     // handle the response that is saved in variable data
//   }
// }

// xhttp.open('GET', '/data.json', true)
// xhttp.send() asynchronous call of func
