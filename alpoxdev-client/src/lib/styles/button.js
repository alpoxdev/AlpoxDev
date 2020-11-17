import styled from 'styled-components';

export const Button = styled.button`
    padding: 0.8rem 1.2rem;
    background-color: ${(props) => props.theme.primaryColor};
    color: #fff;
    outline: none;
    border: 1px solid #eaeaea;
    border-radius: 4px;
    cursor: pointer;
`;
