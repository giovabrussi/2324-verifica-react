import {useState} from 'react';


export default function Form({id, numero, tentativi}){

    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(true);
    
    const [n, setN] = useState("");
    const [tent, setTent] = useState(tentativi);
    const [stato, setStato] = useState(-2);

    function controllaNumero(e){
        setN(e.target.value);
    }

    async function invia(){
        setLoading(true);
        const response = await fetch(`http://localhost:8080/partita/${id}`, {
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({numero: n})
        });
        const nuovoArray = await response.json();

        setTent(nuovoArray.tentativi);
        setStato(nuovoArray.risultato);

        setLoading(false);
    }

    async function nuovaPartita(){
        setLoading(true);
        const response = await fetch("http://localhost:8080/partita", {method: "POST"});
        const nuovoArray = await response.json();
        setTent(nuovoArray.tentativi);
        setStato(nuovoArray.risultato);
        setLoading(false);
        setShow(true);
    }


    return(
        <div>
            <div>
                <div>
                    <button onClick={nuovaPartita}>Nuova partita</button>
                    {
                        loading ?
                            <div>in caricamento...</div>
                        :
                        <>

                        {stato === 0 &&
                            <p>Hai indovinato il numero</p>
                        }
                        {stato === -1 &&
                            <p>Il numero è troppo piccolo</p>
                        }
                        {stato === 1 &&
                            <p>Il numero è trooppo grande</p>
                        }
                        
                        {
                            stato != 0 &&
                            <>
                                <p>Tentativi: {tent}</p>
                                <p>ID: {id}</p>
                                <p>Inserisci un numero tra 1 e 100</p>
                                <input type="text" placeholder="Inserisci il numero" value={n} onChange={controllaNumero}></input>
                                <div>
                                    <button onClick={invia}>Invia</button>
                                </div>
                            </>
                        }

                        </>
                    }
                    
                    
                    
                </div>
                
            </div>
        </div>
    )
}