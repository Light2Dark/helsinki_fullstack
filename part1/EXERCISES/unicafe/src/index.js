import ReactDOM from 'react-dom';
import App from './App';
import AnecdoteApp from './Anecdotes'

ReactDOM.render(
  <AnecdoteApp />, // can change this to <App /> for unicafe app
  document.getElementById('root')
);
