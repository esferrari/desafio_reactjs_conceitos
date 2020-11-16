import React, {useState, useEffect } from "react";

import "./styles.css";

import api from './services/api';


function App() {

  const [repositories, setRepositories] = useState([]);
  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data)
    });
  }, [])

  async function handleAddRepository() {    
  
    const body = {
              title:"NodeJS",
              url:"https://github.com/esferrari/desafio_conceitos_nodejs.git",
              techs:["Node JS","python"]
            }
    const response =  await api.post('/repositories',body)

    const repository = response.data;

    setRepositories([... repositories, repository]);
    
  }

  async function handleRemoveRepository(id) {

    const response = await api.delete(`/repositories/${id}`);

    setRepositories(repositories.filter(repository => repository.id !== id));
    

  }

  return (
    <div>
      <ul data-testid="repository-list">
            {repositories.map(repository => <li key={repository.id}>{repository.title} 
            
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>         
            
          </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
