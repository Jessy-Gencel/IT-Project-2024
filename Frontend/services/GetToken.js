import * as SecureStore from "expo-secure-store";

const getUserData = async (key) => {
  try {
    console.log("key: ", key);
    
    const token = await SecureStore.getItemAsync(key);
    console.log("token: ", token);

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
    const userId = await getUserData("id");
    return { accessToken, refreshToken, userId };
  } catch (error) {
    console.error("Error retrieving tokens:", error);
    return { accessToken: null, refreshToken: null, userId: null };
  }
};
const storeSecretStorage = async (key, value) => {
  try {
    await SecureStore.setItemAsync(key, value);
    console.log(`${key} stored successfully`);
  } catch (error) {
    console.error(`Error storing ${key}:`, error);
  }
};

export {getUserData, getAuthTokens,storeSecretStorage};

// Example usage
//const accessToken = await getToken("accessToken");