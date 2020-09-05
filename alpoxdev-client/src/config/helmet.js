export const defaultHelmet = {
    title: 'AlpoxDev',
    description: 'AlpoxDev Tech Blog',
    image: '',
    keywords: ['React.js', 'Node.js', 'Web', 'App', 'Server', 'html', 'css', 'javascript'].join(' '),
    url: 'https://alpox.kr',
};

export const adminDefaultHelmet = {
    title: '어드민 - AlpoxDev',
};

export const loginHelmet = {
    title: '로그인 - AlpoxDev',
};

export const registerHelmet = {
    title: '회원가입 - AlpoxDev',
};

export const postDetailHelmet = (title, url) => ({
    title: `${title} - AlpoxDev`,
    url,
});

export const tagListHelmet = {
    title : '태그 목록 - AlpoxDev'
}

export const tagDetailHelmet = (tag) => ({
    title: `${tag} - AlpoxDev`,
});
