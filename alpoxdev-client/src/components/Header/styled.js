import styled from 'styled-components';
import { Header as Header1, Text } from 'lib/styles';

export const HeaderWrapper = styled.div`
    width: 100%;
    height: 64px;

    position: fixed;
    top: 0;
    z-index : 3;

    background-color: #fff;
    box-shadow: rgb(230, 230, 230) 0px 10px 7.5px -6px;

    @media (min-width: 1520px) {
        background-color: transparent;
        box-shadow : none;
    }
`;

export const Header = styled.div`
    width: 100%;
    height: 100%;
    margin: 0 auto;
    padding: 0 20px;

    display: flex;
    flex-wrap: wrap;
    align-items: center;

    @media (min-width: 992px) {
        width: 960px;
    }
    @media (min-width: 1200px) {
        width: 1140px;
    }
`;

export const HeaderLogo = styled(Header)`
    font-family: ${(props) => props.theme.logoFont};
    font-size: 1.3rem;
    font-weight: 700;
    letter-spacing: 0.65px;
    cursor: pointer;
    
    @media (min-width: 1520px) {
        display: none;
    }
`;