import React from 'react';
import * as styled from './styled';

export default function Loading({ view }) {
    if (!view) return null;

    return (
        <styled.LoadingWrapper>
            <styled.Loading>
                <styled.LoadingRing />
                <styled.LoadingRing />
            </styled.Loading>
        </styled.LoadingWrapper>
    );
}
