import React from 'react'; //necessario inclir mesmo que nao seja usado diretamente
import './App.css';

import logo from './assets/logo.svg';

import Routes from './routes';

function App() {
  return (        
    //div container por volta de toda a aplicacao
    //daqui pra baixo eh HTML
    <div className="container">
      <img src={logo} alt="AirCnC"/>
      
      <div className="content">
        <Routes />
      </div>
    </div>
  );
}

export default App;

/*
  Baseadas em componentizacao. 
  
  -> Permite reutilizacao de codigo, pois cria componentes que podem ser usados da mesma 
      maneira em outras paginas, ou seja edita uma vez e altera em tudo.
  -> Criar componentes para isolar partes do codigo
  -> Cada componente eh uma FUNCAO!! Que retorna um html
  -> Componentes sao conjuntos de codigo HTML isolados
*/  

