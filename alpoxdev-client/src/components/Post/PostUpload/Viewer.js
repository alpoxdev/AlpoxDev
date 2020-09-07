import React from 'react';
import Head from 'next/head';
import * as styled from './styled';

// marked
import marked from 'marked';

// prismjs
import Prism from 'prismjs';
// import 'prismjs/themes/prism-tomorrow.css';
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

const renderer = new marked.Renderer();
renderer.code = function(code, lang, escaped) {
    code = this.options.highlight(code, lang);
    if (!lang) {
        return `<pre><code>${code}</code></pre>`;
    }

    const langClass = "language-" + lang;
    return `<pre class="${langClass}"><code class="${langClass}">${code}</code></pre>`;
};

marked.setOptions({
    renderer,
    highlight: function(code, lang) {
        try {
            return prismjs.highlight(code, prismjs.languages[lang], lang);
        } catch {
            return code;
        }
    }
});

export default function Viewer({ markdown }){
    React.useEffect(()=>{
        Prism.highlightAll();
    }, [markdown]);

    return (
        <>
            <Head>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/4.0.0/github-markdown.min.css" integrity="sha512-Oy18vBnbSJkXTndr2n6lDMO5NN31UljR8e/ICzVPrGpSud4Gkckb8yUpqhKuUNoE+o9gAb4O/rAxxw1ojyUVzg==" crossorigin="anonymous" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.21.0/themes/prism-tomorrow.min.css" integrity="sha512-vswe+cgvic/XBoF1OcM/TeJ2FW0OofqAVdCZiEYkd6dwGXthvkSFWOoGGJgS2CW70VK5dQM5Oh+7ne47s74VTg==" crossorigin="anonymous" />
            </Head>
            <styled.Viewer
                className="markdown-body"
                dangerouslySetInnerHTML={{ __html: marked(markdown) }}
            />
        </>
    );
}