import React from 'react';
import Link from 'next/link';
import * as styled from './styled';

export const menus = [
    {
        id: 1,
        menu: 'Posts',
        href: '/',
    },
    {
        id: 2,
        menu: 'Tags',
        href: '/tags',
    },
    {
        id: 4,
        menu: 'About',
        href: '/about',
    },
];

export default function Drawer({ tags = [], active }) {
    return (
        <styled.Drawer>
            <Link href="/" as="/">
                <styled.DrawerLogo>AlpoxDev</styled.DrawerLogo>
            </Link>

            <DrawerMenuList active={active} />
            <PopularTagList tags={tags} />
        </styled.Drawer>
    );
}

export function DrawerMenuList({ active }) {
    const menuList = menus.map((menu) => {
        return <DrawerMenuItem key={menu.id} menu={menu} active={active} />;
    });

    return (
        <styled.DrawerMenuList>
            <styled.DrawerTitle>WHERE AM I?</styled.DrawerTitle>
            {menuList}
        </styled.DrawerMenuList>
    );
}

export function DrawerMenuItem({ menu = null, active = 'Posts' }) {
    return (
        <Link href={menu.href} as={menu.href}>
            <styled.DrawerMenuItem active={active === menu.menu ? 'true' : ''}>
                {menu.menu}
            </styled.DrawerMenuItem>
        </Link>
    );
}

export function PopularTagList({ tags = [] }) {
    const tagList = tags.slice(0, 5).map((tag) => {
        return <PopularTagItem key={tag.id} tag={tag} />;
    });

    return (
        <styled.PopularTagList>
            <styled.DrawerTitle>TAGS</styled.DrawerTitle>
            {tagList}
        </styled.PopularTagList>
    );
}

export function PopularTagItem({ tag = null }) {
    return (
        <Link href="/tags/[id]" as={`/tags/${tag.id}`}>
            <styled.PopularTagItem># {tag.tag}</styled.PopularTagItem>
        </Link>
    );
}
