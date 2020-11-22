import styled from 'styled-components';
import { Header, Text } from 'lib/styles';

export const Drawer = styled.div`
    width: 200px;
    height: 100vh;
    padding-left: 30px;
    padding-top: calc(120px + 1rem);
    padding-bottom: 25px;
    display: none;

    position: fixed;
    top: 0;
    left: 0;

    @media (min-width: 1520px) {
        display: block;
    }
`;

export const DrawerLogo = styled(Header)`
    font-family: ${(props) => props.theme.logoFont};
    font-size: 1.76rem;
    font-weight: 700;
    letter-spacing: 0.65px;
    cursor: pointer;
`;

export const DrawerTitle = styled(Header)`
    color: ${(props) => props.theme.textInfoColor};
    font-family: ${(props) => props.theme.subPrimaryFont};
    font-weight: 900;
    font-size: 0.9rem;
    margin-bottom: 0.75rem;
`;

export const DrawerMenuList = styled.div`
    margin-top: 4.5rem;
`;

export const DrawerMenuItem = styled(Text)`
    margin: 0;
    padding-left: 1rem;
    padding-top: 0.5rem;
    padding-bottom: 0.45rem;
    font-family: ${(props) => props.theme.subPrimaryFont};
    font-weight: ${(props) => (props.active === 'true' ? '700' : '400')};
    font-style: ${(props) => (props.active === 'true' ? 'italic' : 'normal')};
    font-size: 1.05rem;
    color: ${(props) =>
        props.active === 'true' ? props.theme.textBoldColor : props.theme.textColor};
    border-left: 3px solid transparent;
    border-color: ${(props) =>
        props.active === 'true' ? props.theme.primaryColor : 'transparent'};
    background-color: ${(props) =>
        props.active === 'true' ? props.theme.subPrimaryColor : 'transparent'};
    cursor: pointer;
`;

export const PopularTagList = styled.div`
    margin-top: 2.5rem;
`;

export const PopularTagItem = styled(Text)`
    padding-left: 1rem;
    padding-bottom: 0.3rem;
    cursor: pointer;
`;
