import React, { useState } from 'react';
import api from '../../services/api';

export default function Login( {history}) {
    /*
        Conceito de Estado. Estado e qualquer informacao que a gente vai armazenar dentro de um componente 
    */
    const [email, setEmail] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();
 
        //console.log(email);
        const response = await api.post('/sessions', { email });
    
        // pegar somente o id do usuario logado
        //armazenar no localStorage, banco de dados do navegador, para ser acessivel em toda a aplicacao
        const { _id } = response.data;    
        
        localStorage.setItem('user', _id);

        history.push('/dashboard') //enviar o usuario para a rota /dashboard
    }

    return (
        // React nao permite passar componentes separados sem nenhum elemento por fora
        // solucao criar uma tag vazia --'
        <>
            <p>
                Ofereça <strong>spots</strong> para programadores e encontre <strong>talentos</strong> para sua empresa
            </p>

            <form onSubmit={handleSubmit}>
                <label htmlFor="email">E-MAIL *</label>                
                <input
                    id="email"
                    type="email"                
                    placeholder="Seu melhor e-mail"
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                />

                <button className="btn" type="submit" >Entrar</button>      
            </form>
        </>
    )
}