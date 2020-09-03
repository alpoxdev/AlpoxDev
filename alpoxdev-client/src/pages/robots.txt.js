import React from 'react';

const robots = `# Group 1
User-agent: Googlebot
Allow: *

# Group 2
User-agent: *
Allow: *

Sitemap: https://tapmath.kr/sitemap.xml`;

export default class Robots extends React.Component {
    static async getInitialProps({ res }) {
        res.setHeader('Content-Type', 'text/plain');
        res.write(robots);
        res.end();
    }
}
