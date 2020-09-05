import styled from 'styled-components';
import { Header as Header1, Text } from 'lib/styles';

export const HeaderWrapper = styled.div`
    width: 100%;
    height: 64px;

    position: fixed;
    top: 0;

    background-color: #fff;
    box-shadow: rgb(230, 230, 230) 0px 10px 7.5px -6px;
`;

export const Header = styled.div`
    width: 100%;
    height: 100%;
    margin: 0 auto;
    padding: 0 30px;

    display: flex;
    flex-wrap: wrap;
    align-items: center;

    @media (min-width: 768px) {
        width: 720px;
    }

    @media (min-width: 1200px) {
        width: 1140px;
    }
`;

export const HeaderLogo = styled(Header)`
    margin-left: 15px;
    font-family: ${(props) => props.theme.logoFont};
    font-size: 1.3rem;
    font-weight: 700;
    letter-spacing: 0.65px;
    cursor: pointer;
    
    @media (min-width: 1520px) {
        display: none;
    }
`;