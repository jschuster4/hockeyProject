import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import Players from './components/Players';
import {Routes, Route} from 'react-router-dom';
import OnePlayer from './components/OnePlayer';
import OneGoalie from './components/OneGoalie';

function App() {
  return (
    <div className="App">
      <h1>Islanders App</h1>
      <Routes>
        <Route path="/home" element={<Home/>}/>
        <Route path="/roster/:_id/:_teamName" element={<Players/>}/>
        <Route path="/players/:_playerID" element={<OnePlayer/>}/>
        <Route path="/goalies/:_playerID" element={<OneGoalie/>}/>
      </Routes>
    </div>
  );
}

export default App;
