import logo from '../logo.svg';
import '../css/App.css';
import MyFunctionalComponent from './MyFunctionalComponent';
import MyReactComponent from './MyReactComponent';
import MyReactPureComponent from './MyReactPureComponent';
import MyCreateElementComponent from './MyCreateElementComponent';

function App() {
  return (
    <div className="App">
      <MyCreateElementComponent />
      <MyFunctionalComponent />
      <MyReactComponent />
      <MyReactPureComponent />

      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
