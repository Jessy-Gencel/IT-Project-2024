import * as SecureStore from "expo-secure-store";

const getUserData = async (key) => {
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
    const accessToken = await getUserData("accessToken");
    const refreshToken = await getUserData("refreshToken");

    return { accessToken, refreshToken };
  } catch (error) {
    console.error("Error retrieving tokens:", error);
    return { accessToken: null, refreshToken: null };
  }
};

export {getUserData, getAuthTokens};

// Example usage
//const accessToken = await getToken("accessToken");