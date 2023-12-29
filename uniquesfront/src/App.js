import logo from './logo.svg';
import Header from './Components/Header/Header.js'
import Checklist from './Components/Checklist/Checklist.js'
import './App.css';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header/>
        <Checklist/>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;
