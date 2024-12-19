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
export {getToken};

// Example usage
//const accessToken = await getToken("accessToken");