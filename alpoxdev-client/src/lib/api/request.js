import axios from 'axios';

export default class Request {
    static onError(error) {
        if (error.response) {
            // 반응은 왔지만 에러 발생
            console.log(error.response.status, error.response.data);

            const { status, data } = error?.response;
            return { status, data };
        }
        if (error.request) {
            // 요청을 했지만 응답을 받지 못함
            console.log(error.request);
        } else {
            // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
            console.log('Error', error.message);
        }

        return {
            status: '500',
            data: 'Server Internal Error',
        };
    }

    static async onRequestGet({ url, headers }) {
        try {
            return await this.tryRequestGet({ url, headers });
        } catch (error) {
            return this.onError(error);
        }
    }

    static async tryRequestGet({ url, headers }) {
        const response = await axios.get(url, { headers });
        const status = response?.status;
        const data = response?.data;

        return { status, data };
    }

    static async onRequestPost({ url, params, headers }) {
        try {
            return await this.tryRequestPost({ url, params, headers });
        } catch (error) {
            return this.onError(error);
        }
    }

    static async tryRequestPost({ url, params, headers }) {
        const response = await axios.post(url, params, { headers });
        const status = response?.status;
        const data = response?.data;

        return { status, data };
    }

    static async onRequestPatch({ url, params, headers }) {
        try {
            return await this.tryRequestPatch({ url, params, headers });
        } catch (error) {
            return this.onError(error);
        }
    }

    static async tryRequestPatch({ url, params, headers }) {
        const response = await axios({
            method: 'PATCH',
            url,
            data: params,
            headers,
        });
        const status = response?.status;
        const data = response?.data;

        return { status, data };
    }

    static async onRequestDelete({ url, params, headers }){
        try{
            return await this.tryRequestDelete({ url, params, headers });
        }catch(error){
            return this.onError(error);
        }
    }

    static async tryRequestDelete({ url, params, headers }){
        console.log(url, params, headers);
        const response = await axios.delete(url, { data : params, headers });
        const status = response?.status;
        const data = response?.data;

        return { status, data };
    }
}
