import logo from './logo.svg';
import './App.css';
import Form from './Form.js';
import {useState} from 'react';

function App() {

  const [loading, setLoading] = useState(false);
  const [partita, setPartita] = useState([]);
  const [show, setShow] = useState(false);
  const [start, setStart] = useState(true);

  async function nuovaPartita(){
    setStart(false);
    setShow(true);
    setLoading(true);
    const response = await fetch("http://localhost:8080/partita", {method: "POST"});
    const nuovoArray = await response.json();
    setPartita(nuovoArray);
    setLoading(false);
  }

  return (
    <div className="App">
      <h1>Indovina il numero</h1>
      {
        start &&
        <button onClick={nuovaPartita}>Inizia</button>
      }



      {show &&
        <>
        {loading ?
          <div>in caricamento...</div>
        :
        <Form id={partita.id} numero={partita.numero} tentativi={partita.tentativi}/>
        }
        </>
      }
     
    </div>
  );
}

export default App;
