import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const getActive = (path) => {
    const pathLength = path?.length;

    if (pathLength >= 2) {
        // / console.log(path[1]);
        if (path[1] === '' || path[1] === 'posts') {
            return 'Posts';
        }
        if (path[1] === 'tags') {
            return 'Tags';
        }
        if (path[1] === 'about') {
            return 'About';
        }
    }

    return 'Posts';
};

export default function Header() {
    const router = useRouter();
    const path = router.pathname.split('/');
    const active = getActive(path);

    return (
        <HeaderView>
            <Logo>Alpox</Logo>
            <Dropdown active={active} />
        </HeaderView>
    );
}

function Dropdown({ active }) {
    const router = useRouter();

    const onItemClick = useCallback((path) => {
        router.push(path);
    });

    return (
        <DropdownView>
            <DropdownItem active={active === 'Posts'} onClick={() => onItemClick('/')}>
                Posts
            </DropdownItem>
            <DropdownItem active={active === 'Tags'} onClick={() => onItemClick('/tags')}>
                Tags
            </DropdownItem>
            <DropdownItem active={active === 'About'} onClick={() => onItemClick('/about')}>
                About
            </DropdownItem>
        </DropdownView>
    );
}

const HeaderView = styled.div`
    width: 100%;
    height: 65px;
    padding: 0 15px;

    display: none;
    align-items: center;

    position: relative;

    @media (max-width: 1520px) {
        display: flex;
    }
`;

const Logo = styled.h1`
    margin: 0;

    font-size: 1.8rem;
    font-weight: bolder;
`;

const DropdownView = styled.div`
    width: 100%;
    padding: 10px 15px;

    display: flex;
    align-items: center;
    justify-content: flex-start;

    position: absolute;
    top: 65px;
    left: 0;
`;

const DropdownItem = styled.p`
    margin-right: 10px;
    padding: 5px 12px;
    padding-top: 6.5px;

    font-family: ${(props) => props.theme.subPrimaryFont};
    font-weight: ${(props) => (props.active ? '700' : '400')};
    font-style: ${(props) => (props.active ? 'italic' : 'normal')};

    color: ${(props) => (props.active ? props.theme.primaryColor : '#111')};
    background-color: ${(props) => (props.active ? props.theme.subPrimaryColor : '#eaeaea')};
    border-radius: 8px;

    cursor: pointer;

    &:last-child {
        margin-right: 0;
    }
`;
