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

    padding: 0 1.2rem;
    padding-top: 94px;

    @media (min-width: 768px) {
        max-width: 720px;
    }

    @media (min-width: 1200px) {
        max-width: 1140px;
    }
`;
