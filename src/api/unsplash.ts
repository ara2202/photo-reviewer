import axios from "axios";
import {Photo} from './types';

const BASE_URL="https://api.unsplash.com/"
const ACCESS_KEY="YOUR_ACCESS_KEY_HERE"; // FIXME: insert your key

const unsplashAxiosInstance = axios.create({
  baseURL: BASE_URL
})

const fetchRandomPhoto = () => unsplashAxiosInstance.get<Photo>('photos/random', {
  headers: {
    Authorization: `Client-ID ${ACCESS_KEY}`
  }
});

export const UnsplashAPI = {
  fetchRandomPhoto,
}