# Tapmath

```json
"dependencies": {
    "axios": "^0.19.2",
    "express": "4.17.1",
    "immutable": "4.0.0-rc.12",
    "next": "^9.3.1",
    "next-redux-wrapper": "6.0.2",
    "react": "^16.7.0",
    "react-dom": "^16.7.0",
    "react-dropzone": "11.0.3",
    "react-google-login": "5.1.21",
    "react-redux": "7.2.1",
    "redux": "4.0.5",
    "redux-actions": "2.6.5",
    "redux-logger": "3.0.6",
    "redux-persist": "6.0.0",
    "redux-persist-transform-immutable": "5.0.0",
    "redux-thunk": "2.3.0",
    "serverless-http": "2.5.0",
    "styled-components": "^5.0.1"
}
```

# 모듈 간단 설명
- axios : 서버에 요청하는 모듈
- express : 서버를 만들고 클라이언트에 따른 요청에 따라 응답을 해줌. SEO(Search Engine Optimization)을 위해서 클라이언트를 서버위에 올리기 위해 서버를 만듦.
- next : React를 SSR(Server Side Rendering: 서버사이드 렌더링) 간편하게 구현할 수 있게 해주는 모듈
- react-dropzone : 이미지를 올리게 할 수 있는 모듈
- react-google-login : 구글 로그인을 해주게 하는 모듈
- redux, react-redux : 리덕스라는 React 대표 모듈로, 상태관리(데이터 관리)를 컴포넌트 안이 아닌 바깥에서 할 수 있게 해주는 모듈. 데이터 관리가 용이해짐.[velopert.com/3528](https://velopert.com/3528) 참고
- redux-actions, redux-thunk : 리덕스를 좀 더 간편하게 만들어주는 모듈
- redux-persist : 브라우저에 데이터를 저장하고자 할 때 redux데이터를 브라우저에 저장해주는 모듈
- immutable, redux-persist-transform-immutable : React의 규칙인 불변성을 쉽게 지키기 위한 모듈 immutable과 redux-persist에 이용하기 위해서 immutable을 object로 변환해주는 모듈 redux-persist-transform-immutable 모듈
- serverless-http : React를 Serverless로 간편하게 올리기 위해 사용되는 모듈. express와 같이 사용됩니다.
- styled-components : css를 js코드 안에 작성할 수 있는 모듈. css를 만듦과 동시에 컴포넌트를 만들 수 있어 자주 애용되는 React 모듈이다.