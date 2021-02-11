import React, { Component } from 'react';
import Head from 'next/head';
import styled from '@emotion/styled';

import Prism from 'prismjs';
import { onParseMarkdown } from 'utils';

import 'prismjs/components/prism-bash.min.js'; // bash
import 'prismjs/components/prism-json.min.js'; // json

// languages
import 'prismjs/components/prism-c.min.js'; // c
import 'prismjs/components/prism-python.min.js'; // python
import 'prismjs/components/prism-java.min.js'; // java
import 'prismjs/components/prism-javascript.min.js'; // javascript
import 'prismjs/components/prism-typescript.min.js'; // typescript
import 'prismjs/components/prism-jsx.min.js'; // jsx
import 'prismjs/components/prism-tsx.min.js'; // tsx
import 'prismjs/components/prism-go.min.js'; // tsx
import 'prismjs/components/prism-scss.min.js'; // scss
import 'prismjs/components/prism-css.min.js'; // css

export default class PostDetailContent extends Component<{ content: string }> {
  componentDidMount(): void {
    Prism.highlightAll();
  }

  componentDidUpdate(): void {
    Prism.highlightAll();
  }

  render(): JSX.Element {
    const { content } = this.props;

    return (
      <>
        <Head>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/4.0.0/github-markdown.min.css"
            integrity="sha512-Oy18vBnbSJkXTndr2n6lDMO5NN31UljR8e/ICzVPrGpSud4Gkckb8yUpqhKuUNoE+o9gAb4O/rAxxw1ojyUVzg=="
            crossOrigin="anonymous"
          />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.21.0/themes/prism-tomorrow.min.css"
            integrity="sha512-vswe+cgvic/XBoF1OcM/TeJ2FW0OofqAVdCZiEYkd6dwGXthvkSFWOoGGJgS2CW70VK5dQM5Oh+7ne47s74VTg=="
            crossOrigin="anonymous"
          />
        </Head>
        <ContentDiv
          className="markdown-body"
          dangerouslySetInnerHTML={{ __html: onParseMarkdown(content) }}
        />
      </>
    );
  }
}

const ContentDiv = styled.div`
  width: 100%;
  height: 100%;

  &.markdown-body {
    font-size: 14px;
  }

  &.markdown-body pre[class*='language-'] {
    font-size: 13px;
  }
`;