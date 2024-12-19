import * as SecureStore from "expo-secure-store";

const getToken = async (key) => {
  try {
    const token = await SecureStore.getItemAsync(key);
    return token;
  } catch (error) {
    console.error(`Error retrieving ${key}:`, error);
    return null;
  }
};
const getAuthTokens = async () => {
  try {
    const accessToken = await getToken("accessToken");
    const refreshToken = await getToken("refreshToken");

    return { accessToken, refreshToken };
  } catch (error) {
    console.error("Error retrieving tokens:", error);
    return { accessToken: null, refreshToken: null };
  }
};

export {getToken, getAuthTokens};

// Example usage
//const accessToken = await getToken("accessToken");