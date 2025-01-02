import axios from "axios";
import { IP_ADDRESS_SERVER } from '@env'

const axiosInstance = axios.create({
    baseURL: IP_ADDRESS_SERVER,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

export default axiosInstance;