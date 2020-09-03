import styled, { keyframes } from 'styled-components';

const loadingAnimation = keyframes`
    0% {
        top: 36px;
        left: 36px;
        width: 0;
        height: 0;
        opacity: 1;
    }
    100% {
        top: 0px;
        left: 0px;
        width: 72px;
        height: 72px;
        opacity: 0;
    }
`;

export const LoadingWrapper = styled.div`
    width: 100%;
    height: 100vh;

    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);

    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    z-index: 9;
`;

export const Loading = styled.div`
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
`;

export const LoadingRing = styled.div`
    position: absolute;
    border: 4px solid #fff;
    opacity: 1;
    border-radius: 50%;
    animation: ${loadingAnimation} 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;

    &:nth-child(3) {
        animation-delay: -0.5s;
    }
`;
