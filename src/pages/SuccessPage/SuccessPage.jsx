import styled from "styled-components"
import { useNavigate } from "react-router-dom"

export default function SuccessPage({sessao, lista, setLista, setSessao, nome, setNome, cpf, setCpf}) {

    const navigate = useNavigate();
    const listaVazia = [];

    function voltar(){
        setNome('');
        setCpf('');
        setSessao('')
        setLista(listaVazia)
        navigate('/');
    }

    return (
        <PageContainer>
            <h1>Pedido feito <br /> com sucesso!</h1>

            <TextContainer data-test="movie-info">
                <strong><p>Filme e sessão</p></strong>
                <p>{sessao.movie.title}</p>
                <p>{sessao.day.date} - {sessao.name}</p>
            </TextContainer>

            <TextContainer data-test="seats-info">
                <strong><p>Ingressos</p></strong>
                {lista.map((assento, indice) => <p key={indice}>Assento {indice + 1}</p>)}
            </TextContainer>

            <TextContainer data-test="client-info">
                <strong><p>Comprador</p></strong>
                <p>Nome: {nome}</p>
                <p>CPF: {cpf[0]}{cpf[1]}{cpf[2]}.{cpf[3]}{cpf[4]}{cpf[5]}.{cpf[6]}{cpf[7]}{cpf[8]}-{cpf[9]}{cpf[10]}</p>
            </TextContainer>

            <button data-test="go-home-btn" onClick={voltar}>Voltar para Home</button>
        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    color: #293845;
    margin: 30px 20px;
    padding-bottom: 120px;
    padding-top: 70px;
    a {
        text-decoration: none;
    }
    button {
        margin-top: 50px;
        border: none;
        width: 225px;
        height: 42px;
        background: #E8833A;
        border-radius: 3px;
        color: #FFFFFF;
    }
    h1 {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        display: flex;
        align-items: center;
        text-align: center;
        color: #247A6B;
    }
`
const TextContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 30px;
    strong {
        font-weight: bold;
        margin-bottom: 10px;
    }
`