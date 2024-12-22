import 'dotenv/config';

export default {
  expo: {
    name: "Frontend",
    slug: "Frontend",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    splash: {
      image: "./assets/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      package: "com.anonymous.Frontend"
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    extra: {
      BASE_URL: process.env.FRONTEND_BASE_URL,
    },
    plugins: [
      "expo-secure-store"
    ]
  }
};
