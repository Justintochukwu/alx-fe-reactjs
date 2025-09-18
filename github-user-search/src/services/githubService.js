import axios from "axios";

// GitHub API Base URL
const GITHUB_API_URL = "https://api.github.com";

// Read API key from environment (optional, helps with rate limits)
const GITHUB_API_KEY = import.meta.env.VITE_APP_GITHUB_API_KEY;

export const fetchUserData = async (username) => {
  try {
    const response = await axios.get(`${GITHUB_API_URL}/users/${username}`, {
      headers: GITHUB_API_KEY
        ? { Authorization: `token ${GITHUB_API_KEY}` }
        : {}, // only add header if API key exists
    });

    return response.data; // user object
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch GitHub user"
    );
  }
};
