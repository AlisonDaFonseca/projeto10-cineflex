import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import styled from "styled-components"
import axios from "axios";

export default function SessionsPage() {
    const parametros = useParams();

    const [filme, setFilme] = useState(undefined);
    const [horarios, setHorarios] = useState([]);


    useEffect(() => {
        const URL = `https://mock-api.driven.com.br/api/v8/cineflex/movies/${parametros.idFilme}/showtimes`
        const promise = axios.get(URL);

        promise.then((resposta) => {
            setFilme(resposta.data)
            setHorarios(resposta.data.days)
        });
        promise.catch((erro) => {
            console.log(erro.response.data)
        });
    }, []);

    if (filme === undefined) {
        return (<div><img src="https://www.dcam.ufscar.br/quem-somos/carregando" alt="" /></div>);
    }

    return (
        <PageContainer>
            Selecione o horário
            <div>
                {horarios.map((horario) => (
                    <SessionContainer data-test="movie-day" key={horario.id}>
                        {horario.weekday} - {horario.date}
                        <ButtonsContainer >
                            {horario.showtimes.map(horario => (
                                <Link to={`/assentos/${horario.id}`} key={horario.id}>
                                 <button data-test="showtime">{horario.name}</button>
                                </Link>
                               
                            ))}
                        </ButtonsContainer>
                    </SessionContainer>
                ))}
            </div>

            <FooterContainer data-test="footer">
                <div>
                    <img src={filme.posterURL} alt="poster" />
                </div>
                <div>
                    <p>{filme.title}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
    div {
        margin-top: 20px;
    }
`
const SessionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-family: 'Roboto';
    font-size: 20px;
    color: #293845;
    padding: 0 20px;
    
`
const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 20px 0;
    font-weight: 400;
    button {
        margin-right: 20px;
        border: none;
        background: #E8833A;
        width: 83px;
        height: 43px;
        border-radius: 3px;
        color: #FFFFFF
        
    }
    a {
        text-decoration: none;
    }
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