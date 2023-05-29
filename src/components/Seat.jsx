import styled from "styled-components"
import { useState } from "react";
let novaArray = [];
export default function Seat({seat, setLista}) {
    const [cor, setCor] = useState(seat.isAvailable === true ? 'disponivel' : 'nao-disponivel');
    
    
    
    
    
    function selecionaAssento(seat) {

        
        if (seat.isAvailable === false) {
            alert('Esse assento não está disponível')
        } else if (novaArray.includes(seat.id)) {
            setCor('disponivel');
            novaArray = novaArray.filter(assento => assento !== seat.id)
        } else {
            setCor('selecionado')
            novaArray.push(seat.id);
            
        }
        setLista(novaArray)
    }

    return (
        <SeatItem data-test="seat" type="button"
            cor={cor}
            onClick={() => { selecionaAssento(seat) }}
        >
            {seat.name}
        </SeatItem>
    );
}

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