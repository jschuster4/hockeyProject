import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import Players from './components/Players';
import {Routes, Route} from 'react-router-dom';
import OnePlayer from './components/OnePlayer';
import OneGoalie from './components/OneGoalie';
import '../node_modules/bootstrap/dist/css/bootstrap.css'

function App() {
  return (
    <div className="App" style={{paddingBottom: '15px'}}>
      <div style={{display: 'flex', backgroundColor: 'navy', alignItems: 'center',  borderBottom: 'solid black 5px', justifyContent: 'space-around', alignItems: 'center'}}>
        <img style={{flex: '1'}} src="https://upload.wikimedia.org/wikipedia/en/thumb/4/42/Logo_New_York_Islanders.svg/1200px-Logo_New_York_Islanders.svg.png" alt="Islanders Logo" />
        <h1 style={{ flex: '20', color: 'MintCream', padding: '20px', margin: '15px' }}>NHL Player Encyclopedia</h1>
        <img style={{flex: '1'}} src="https://upload.wikimedia.org/wikipedia/en/thumb/3/3a/05_NHL_Shield.svg/1200px-05_NHL_Shield.svg.png" alt="NHL Logo" />

        
      </div>
      <Routes>
        <Route path="/home" element={<Home/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="/roster/:_id/:_teamName" element={<Players/>}/>
        <Route path="/players/:_playerID" element={<OnePlayer/>}/>
        <Route path="/goalies/:_playerID" element={<OneGoalie/>}/>
      </Routes>
    </div>
  );
}

export default App;
