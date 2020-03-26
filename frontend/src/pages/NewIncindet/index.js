import React,{useState} from 'react';
import './styles.css';
import logoImg from '../../assets/logo.svg';
import { FiArrowLeft } from 'react-icons/fi';
import {Link, useHistory} from 'react-router-dom';
import api from '../../services/api';

export default function NewIncent(){
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const ongId = localStorage.getItem('ongId');
    const history = useHistory();

    async function handleNewIncident(e){
        e.preventDefault();

        const data ={
            title,
            description,
            value,
        };

        try{
            await api.post('incidents',data, {
                headers: {
                    Authorization: ongId,
                }
            })
            history.push('/profile');
        }catch(err){
            alert('erro');
        }
    }

    return(
        <div className="new-incident-container">
            <div className="container">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>
                    <h1>Cadastrar Novo Caso</h1>
                    <p>Descreva o caso detalhadamente para econtrar um herói que revolva isso.</p>

                    <Link className="back-link" to="/profile">
                    <FiArrowLeft size={16} color="#E02041"/>
                       Voltar Para Home
                    </Link>
                </section>
                <form onSubmit={handleNewIncident}>
                    <input type="text" 
                        placeholder="Titulo do Caso"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea 
                        placeholder="descricao" 
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input type="text" 
                        placeholder="Valor em reais"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}
