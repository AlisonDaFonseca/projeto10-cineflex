import styled from "styled-components"
import HomePage from "./pages/HomePage/HomePage"
import SeatsPage from "./pages/SeatsPage/SeatsPage"
import SessionsPage from "./pages/SessionsPage/SessionsPage"
import SuccessPage from "./pages/SuccessPage/SuccessPage"
import axios from 'axios'
import { Link } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState } from "react"

export default function App() {
    axios.defaults.headers.common['Authorization'] = 'GMpMHZ3apRoj0Qr7d6T8eNLY';

    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [lista, setLista] = useState(undefined);
    const [sessao, setSessao] = useState(undefined);
   

    return (
        <BrowserRouter>
            <NavContainer>
                <Link to="/">
                    CINEFLEX
                </Link>
            </NavContainer>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/sessions/:idFilme" element={<SessionsPage />} />
                <Route path="/seats/:idHorarios" element={<SeatsPage nome={nome} setNome={setNome}cpf={cpf} setCpf={setCpf} lista={lista} setLista={setLista} sessao={sessao} setSessao={setSessao}/>} />
                <Route path="/success" element={<SuccessPage lista={lista} setLista={setLista} nome={nome} setNome={setNome} cpf={cpf} setCpf={setCpf} setSessao={setSessao} sessao={sessao} /> } />
            </Routes>
        </BrowserRouter>
    )
}

const NavContainer = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #C3CFD9;
    color: #E8833A;
    font-family: 'Roboto', sans-serif;
    font-size: 34px;
    position: fixed;
    top: 0;
    a {
        text-decoration: none;
        color: #E8833A;
    }
`
