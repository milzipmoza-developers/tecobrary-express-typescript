import axios from "axios";

import naverApi from '../../infra/config/naverApi';

export const searchBooks = async (title: string, number: number, offset: number) => {
    const response = await axios.get(`https://openapi.naver.com/v1/search/book.json`, {
        headers: {
            "X-Naver-Client-Id": naverApi.clientId,
            "X-Naver-Client-Secret": naverApi.clientSecret,
        },
        params: {
            "query": title,
            "display": number,
            "start": offset
        }
    });
    const books = [];
    response.data.items.forEach(item => {
        books.push(JSON.parse(JSON.stringify(item).replace(/(<([^>]+)>)/ig, "")))
    });
    return books;
};