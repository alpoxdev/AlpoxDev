import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Header, Text } from 'lib/styles';

export default function TagList({ tags = [] }) {
    const tagList = tags.map((tag) => <TagItem key={tag?.id} tag={tag} />);
    return <TagListView>{tagList}</TagListView>;
}

function TagItem({ tag }) {
    return (
        <Link href="/tags/:id" as={`/tags/${tag?.id}`}>
            <TagItemView>
                <TopView>
                    <TagName>{tag?.tag}</TagName>
                </TopView>
                <BottomView>
                    <TagDescription>{tag?.description}</TagDescription>
                    <PostCount>{tag?.posts}개의 포스팅</PostCount>
                </BottomView>
            </TagItemView>
        </Link>
    );
}

const TagListView = styled.div`
    margin-top: 100px;
    display: flex;
    flex-wrap: wrap;
`;

const TagItemView = styled.div`
    width: calc(100% - 30px);
    height: 196px;
    margin: 15px;

    display: flex;
    flex-direction: column;
    position: relative;
    border-radius: 4px;
    cursor: pointer;

    -webkit-box-shadow: 0 10px 7.5px -6px #e6e6e6;
    -moz-box-shadow: 0 10px 7.5px -6px #e6e6e6;
    box-shadow: 0 10px 7.5px -6px #e6e6e6;

    @media (min-width: 768px) {
        width: calc(50% - 30px);
    }
    @media (min-width: 992px) {
        width: calc(50% - 30px);
    }
    @media (min-width: 1200px) {
        width: calc(33% - 30px);
    }
`;

const TopView = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const TagName = styled(Header)`
    padding-left: 1rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-right: 1.2rem;
    font-size: 1.1rem;
    font-weight: 700;
    line-height: 1.35;
    color: ${(props) => props.theme.textBoldColor};
    background-color: ${(props) => props.theme.subPrimaryColor};
    border-left: 3.5px solid ${(props) => props.theme.primaryColor};
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1; /* number of lines to show */
    -webkit-box-orient: vertical;
`;

const BottomView = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    padding-top: 1.5rem;
    padding-bottom: 1rem;
    padding-right: 0.8rem;
`;

const TagDescription = styled(Text)`
    width: 100%;
    margin: 0;
    padding: 2rem 0;
    padding-top: 0;
    line-height: 1.15;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* number of lines to show */
    -webkit-box-orient: vertical;
`;

const PostCount = styled(Text)`
    margin: 0;
    margin-top: auto;
    margin-left: auto;
    color: ${(props) => props.theme.textColor};
`;
