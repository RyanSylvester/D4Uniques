import Header from './Components/Header/Header.js'
import ListTable from './Components/listTable/listTable.js'
import './App.css';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header/>
        <ListTable/>
      </header>
    </div>
  );
}

export default App;
