import styled from 'styled-components';

export const Drawer = styled.div`
    width: 200px;
    height: calc(100vh - 64px);
    padding-right: 30px;

    position: fixed;
    top: 64px;
    right: -200px;
    z-index : -1;

    @media (min-width: 768px) {
        right: calc(50% - 360px);
    }

    @media (min-width: 1200px) {
        right: calc(50% - 570px);
    }
`;
