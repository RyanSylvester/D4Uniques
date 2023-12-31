import logo from './logo.svg';
import Header from './Components/Header/Header.js'
import ListTable from './Components/listTable/listTable.js'
import './App.css';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header/>
        <ListTable className="uniquesTable"/>
      </header>
    </div>
  );
}

export default App;
