import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom'; //serve para criar links para que o usuario clique e va para a rota pra nao ter qrue usar history
import socketio from 'socket.io-client';
import api from '../../services/api';

import './styles.css';

export default function Dashboard() {
    //nome do estado e funcao pra setar estados
    const [spots, setSpots] = useState([]);
    const [requests, setRequests] = useState([]);

    const user_id = localStorage.getItem('user')

    // ja eh o suficiente para se conectar com o backend
    const socket = useMemo(() => socketio('http://localhost:3333', {
        query: { user_id },
    }), [user_id]);

    useEffect( () => {
        // ouvir evento de requisicao
        socket.on('booking_request', data => {
            setRequests([...requests, data]);
        })
    }, [requests, socket]); 

    useEffect(() => {
        // toda vez que muda o parametro da funcao, executa a funcao
        async function loadSpots() {
            const user_id = localStorage.getItem('user')
            const response = await api.get('/dashboard', {
                headers: { user_id }
            });
            setSpots(response.data)
            //console.log(response.data)
        }
        loadSpots();

    }, []);

    async function handleAccept(id){
        // como nao vou receber nenhuma resposta chamamos direto o await
        await api.post(`/bookings/${id}/approvals`);

        setRequests(requests.filter(request => request._id !== id));
    }

    async function handleReject(id){
        await api.post(`/bookings/${id}/rejections`);

        setRequests(requests.filter(request => request._id !== id));
    }


    return (
        // percorrer o array do response identificando e listando os spots
        <>
            <ul className="notifications">
                {requests.map(request => (
                    <li key={request._id}>
                        <p>
                            <strong>{request.user.email}</strong> está solicitando uma reserva em <strong>{request.spot.company}</strong> para a data: <strong>{request.date}</strong>
                        </p>
                        <button className="accept" onClick={() => handleAccept(request._id)}>ACEITAR</button>
                        <button className="reject" onClick={() => handleReject(request._id)}>REJEITAR</button>
                    </li>
                ))}
            </ul>

            <ul className="spot-list">
                {spots.map(spot => (
                    <li key={spot._id}>
                        <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }}/>
                        <strong>{spot.company}</strong>
                        <span>{spot.price ? `R$${spot.price}/dia` : 'FREE!'}</span>
                    </li>
                ))}

            </ul>

            <Link to="/new">
                <button className='btn'>Cadastrar novo spot</button>
            </Link>
        </>
    )
}

/*
    Em react toda vez que se faz uma estrutura de repeticao eh necessario
    usar uma propriedade chamada 'key' dentro do primeiro
    elemento que vem depois do map
    informando uma informacao dentro do spot que seja unica
*/