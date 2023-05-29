import styled from "styled-components"
import axios from "axios"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
    const URL = 'https://mock-api.driven.com.br/api/v8/cineflex/movies'
    const promise = axios.get(URL);
    const [filmes, setFilmes] = useState([]);

    useEffect(() => {
        promise.then((resposta) => {
            setFilmes(resposta.data)
           
        });
        promise.catch((erro) => {
            console.log(erro.response.data)
        });
    }, []);

    if (filmes.length === 0) {
        return (<div><img src="https://www.dcam.ufscar.br/quem-somos/carregando" alt="" /></div>);
    }


    return (
        <PageContainer>
            Selecione o filme

            <ListContainer>
                {filmes.map(filme => (
                        <MovieContainer data-test="movie" key={filme.id}>
                            <Link to={`/sessions/${filme.id}`}>
                            <img src={filme.posterURL} alt="poster" />
                            </Link>
                        </MovieContainer>
                ))}
            </ListContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-top: 70px;
`
const ListContainer = styled.div`
    width: 330px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    padding: 10px;
`
const MovieContainer = styled.div`
    width: 145px;
    height: 210px;
    box-shadow: 0px 2px 4px 2px #0000001A;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    img {
        width: 130px;
        height: 190px;
    }
`