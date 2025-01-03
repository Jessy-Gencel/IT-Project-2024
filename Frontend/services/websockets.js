import io from "socket.io-client";
import Constants from 'expo-constants';

const socket = io(Constants.expoConfig.extra.BASE_URL);

export default socket