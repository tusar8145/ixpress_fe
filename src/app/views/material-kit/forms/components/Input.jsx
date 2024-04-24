import React from 'react';
import styled from 'styled-components';

const Input = ({
    changeState2
}) => {

    return (
        <StyledInput
            type="text"
            onChange={changeState2}
        />
    )
}
const StyledInput = styled.input`
width:20rem;
height:2rem;
border-radius:0.5rem;
border:2px solid black;
margin:5% 0 0 20%;
outline:none;
`
export default Input