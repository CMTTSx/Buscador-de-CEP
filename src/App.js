import { useState } from 'react';

// Importando Api
import api from './services/api'

import styles from './styles.css'
import { FiSearch } from 'react-icons/fi';

function App() {

  const [input,setInput] = useState('');
  const [cep,setCep] = useState({});

async function handleSearch() {
    
    if(input === '') {
      alert('Preencha algum CEP!')
      return;
    }
 
    try {

      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput("");
    
    } catch {
    
      alert('Aconteceu algum erro, tente novamente com um CEP correto!')
      setInput("")
    }

}





  return (
    <div className="container">
      <h1 className="title">
        Buscador de CEP
      </h1>
    
      <div className="containerInput">
        <input 
        type="text"
        placeholder="Digite seu CEP..."
        value={input}
        onChange={(e)=> setInput(e.target.value)}
        />


      <button className="buttonSearch" onClick={handleSearch}>
        <FiSearch size="25" color={'#fff'} />
      </button>
      </div>

    {Object.keys(cep).length > 0 && ( // Renderização Condicional
      <main className="main">
            
      <h2>CEP: {cep.cep}</h2>

      <span>{cep.logradouro}</span>
      <span>{cep.complemento}</span>
      <span>{cep.bairro}</span>
      <span>{cep.localidade} - {cep.uf}</span>
      </main>
    )}
   


    </div>

  );
}

export default App;
