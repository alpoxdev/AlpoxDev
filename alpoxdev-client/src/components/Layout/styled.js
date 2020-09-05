import styled from 'styled-components';

export const LayoutWrapper = styled.div`
    width: 100%;
    min-height: 100vh;
    background-color: ${(props) => props.theme.backgroundColor};
`;

export const Layout = styled.div`
    width: 100%;
    min-height: 100vh;

    margin: 0 auto;
    padding: 1rem;

    @media (min-width: 992px) {
        width: 960px;
    }
    @media (min-width: 1200px) {
        width: 1140px;
    }
`;
