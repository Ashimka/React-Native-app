import Constants from "expo-constants";

// Set your actual backend URL here. For development:
// - Android emulator: use 10.0.2.2 instead of localhost
// - iOS simulator: can use localhost or your machine's IP
// - Physical device: use your machine's local IP (e.g., 192.168.x.x)
// When running on Android (emulator or device) using Expo Go, the host machine
// is not accessible as "localhost". The Android emulator maps 10.0.2.2 to the
// host loopback interface, and physical devices need the machine's LAN IP.
// For convenience we automatically rewrite "localhost" to 10.0.2.2 on Android.
const rawUrl =
  (Constants.expoConfig as any)?.extra?.SERVER_URL ??
  process.env.SERVER_URL ??
  "http://10.0.2.2:8040/api"; // default for Android emulator

function normalizeServerUrl(url: string): string {
  if (Constants.platform?.android) {
    // replace localhost with emulator address if necessary
    return url.replace("localhost", "10.0.2.2");
  }
  return url;
}

export const SERVER_URL: string = normalizeServerUrl(rawUrl);

export const API_ENDPOINTS = {
  AUTH: `/auth/email`,
  VERIFY_CODE: `/auth/verify-code`,
  CARS: `/cars`,
};
