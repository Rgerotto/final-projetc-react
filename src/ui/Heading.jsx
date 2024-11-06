import styled, { css } from "styled-components";


const H1 = styled.h1`
${(props) => 
    props.as === 'h1' && 
    css`
    font-size: 3rem;
    font-weight: 600;
    `}

${(props) => 
    props.as === 'h2' && 
    css`
    font-size: 2rem;
    font-weight: 300;
    `}

${(props) => 
    props.as === 'h3' && 
    css`
    font-size: 1.5rem;
    font-weight: 900;
    color: orange `}
`

export default H1