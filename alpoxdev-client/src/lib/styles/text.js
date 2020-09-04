import styled from 'styled-components';

export const Header = styled.h1`
    margin: 0;
    font-family: ${(props) => props.theme.primaryFont};
    font-size: 1.8rem;
    font-weight: bold;
    color: ${(props) => props.theme.textBoldColor};
`;

export const Text = styled.p`
    margin: 0;
    font-family: ${(props) => props.theme.primaryFont};
    font-size: 0.95rem;
    font-weight: normal;
    color: ${(props) => props.theme.textColor};
`;
