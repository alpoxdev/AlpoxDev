import styled from 'styled-components';

export const Header = styled.h1`
    margin: 0;

    font-family: ${(props) => props.theme.adminFont};
    font-size: 1.8rem;
    font-weight: bold;
    color: #222;
`;

export const Text = styled.p`
    margin: 0;

    font-family: ${(props) => props.theme.adminFont};
    font-size: 0.95rem;
    font-weight: normal;
    color: #222;
`;
