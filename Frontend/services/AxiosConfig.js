import axios from "axios";
import Constants from 'expo-constants';

const axiosInstance = axios.create({
    baseURL: Constants.expoConfig.extra.BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

export default axiosInstance;