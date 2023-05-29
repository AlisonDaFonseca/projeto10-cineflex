import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"
import axios from "axios";
import Seat from "../../components/Seat";

export default function SeatsPage({ nome, setNome, cpf, setCpf, lista, setLista, sessao, setSessao }) {


    const parametros = useParams();
    
    const navigate = useNavigate();

    function reservar(e) {
        e.preventDefault();
        const url = 'https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many';
        const reserva = { ids: lista, name: nome, cpf: cpf }
        const promise = axios.post(url, reserva);

        promise.then(resposta => {
            navigate('/sucesso')
        })
        promise.catch(erro => alert(erro.response.data.message))

    }






    useEffect(() => {
        const url = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${parametros.idSessao}/seats`;
        const promise = axios.get(url);

        promise.then((resposta) => {
            setSessao(resposta.data)

        })
        promise.catch((erro) => {
            console.log(erro.response.data)
        })
    }, []);

    if (sessao === undefined) {
        return (<div><img src="https://www.dcam.ufscar.br/quem-somos/carregando" alt="" /></div>);
    }

    return (
        <PageContainer onSubmit={reservar}>
            Selecione o(s) assento(s)

            <SeatsContainer>
                {sessao.seats.map(seat => <Seat data-test="seat" key={seat.id} seat={seat} setLista={setLista} />)}
            </SeatsContainer>
            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircle cor="#1AAE9E" borda="#0E7D71" />
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle cor="#C3CFD9" borda="#7B8B99" />
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle cor="#FBE192" borda="#F7C52B" />
                    Indisponível
                </CaptionItem>
            </CaptionContainer>

            <FormContainer>
                Nome do Comprador:
                <input data-test="client-name" placeholder="Digite seu nome..."
                    required
                    value={nome}
                    onChange={(e) => setNome(e.target.value)} />

                CPF do Comprador:
                <input data-test="client-cpf" placeholder="Digite seu CPF..."
                    type="number"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                />


                <button data-test="book-seat-btn">Reservar Assento(s)</button>


            </FormContainer>

            <FooterContainer data-test="footer">
                <div>
                    <img src={sessao.movie.posterURL} alt="poster" />
                </div>
                <div>
                    <p>{sessao.movie.title}</p>
                    <p>{sessao.day.weekday} - {sessao.name}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const PageContainer = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
const FormContainer = styled.div`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    
    button {
        align-self: center;
        width: 225px;
        height: 42px;
        background-color: #E8833A;
        border-radius: 3px;
        border: none;
        color: #FFFFFF;
        margin-top: 10%;
    }
    input {
        width: calc(100vw - 60px);
        height: 51px;
    }
`
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`
const CaptionCircle = styled.div`
    border: 1px solid ${props => { return props.borda }};         // Essa cor deve mudar
    background-color: ${(props) => { return props.cor }};    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`
const SeatItem = styled.button`
    border: 1px solid ${(props) => props.cor === 'nao-disponivel' ? '#F7C52B' : props.cor === 'disponivel' ? '#7B8B99' : props.cor === 'selecionado' && '#0E7D71'};         // Essa cor deve mudar
    background-color: ${(props) => props.cor === 'nao-disponivel' ? '#FBE192' : props.cor === 'disponivel' ? '#C3CFD9' : props.cor === 'selecionado' && '#1AAE9E'};    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`