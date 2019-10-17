import React, { useState, useMemo } from 'react'; // useMemo importar para gerar a preview da imagem
import api from '../../services/api' // comunicacao com o backend

import camera from '../../assets/camera.svg'

import './styles.css';

export default function New( {history} ) {

    const [thumbnail, setThumbnail] = useState(null);
    const [company, setCompany] = useState('');
    const [techs, setTechs] = useState('');
    const [price, setPrice] = useState('');   

    const preview = useMemo( () => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null;
    }, [thumbnail])

    // quando usuario realizar submit do form
    // gravas os dados no banco
    async function handleSubmit(event) {
        event.preventDefault(); 

        // por ser um form multipar e nao JSON
        const data = new FormData();
        const user_id = localStorage.getItem('user');

        data.append('thumbnail', thumbnail)
        data.append('company', company)
        data.append('techs', techs)
        data.append('price', price)

        await api.post('/spots', data, {
            headers: { user_id }
        })

        history.push('/dashboard');
    }

    // retornar um formulario pedindo empresa, tecnologias e preco
    return (
        
        <form onSubmit={handleSubmit}>

            <label
                id="thumbnail" 
                style={{backgroundImage: `url(${preview})` }}
                className={thumbnail ? 'has-thumbnail' : ''}
            >
                <input type="file" onChange={event => setThumbnail(event.target.files[0])}/>
                <img src={camera} alt="Select img"/>
            </label>

            <label htmlFor="company">EMPRESA *</label>
            <input
                id="company"
                placeholder="Sua empresa incrivel"
                value={company}
                onChange={event => setCompany(event.target.value)}
            />
           
            <label htmlFor="company">TECNOLOGIAS * <span>(separadas por virgula)</span></label>
            <input
                id="techs"
                placeholder="Quais tecnologias usam"
                value={techs}
                onChange={event => setTechs(event.target.value)}
            />
           
            <label htmlFor="company">VALOR DA DIARIA * <span>(em branco para gratuito)</span></label>
            <input
                id="price"
                placeholder="Valor comprado por dia"
                value={price}
                onChange={event => setPrice(event.target.value)}
            />
            <button type="submit" className="btn">Cadastrar</button>
        </form>
    )
}