import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

export const search = async (query: string) => {
    try {
        const response = await axios.get(`${BASE_URL}/search?query=${query}`);
        return response.data;
    } catch (error) {
        return error;
    }
}

export const findSimilar = async (url: string) => {
    try {
        const response = await axios.post(`${BASE_URL}/similar`, { url });
        return response.data;
    } catch (error) {
        return error;
    }
}

export const summarize = async (ids: Array<string>) => {
    try {
        const response = await axios.post(`${BASE_URL}/summarize`, { ids });
        return response.data;
    } catch (error) {
        return error;
    }
}
