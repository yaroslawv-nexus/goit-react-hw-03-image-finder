import axios from 'axios';

const API_KEY = "38274690-471133f03d844111201a04d18";
const BASE_URL = "https://pixabay.com/api/"

axios.defaults.params = {key: API_KEY, per_page: 12};

export const getImages = async(value, page = 1) => {
    const data = await axios.get(BASE_URL, { params: { q: value, page:  page} })
    return data;
}