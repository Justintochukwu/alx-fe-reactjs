import axios from "axios";

const BASE_URL = "https://api.github.com";

export async function fetchUserData({ username, location, minRepos, page = 1 }) {
  try {
    let query = "";

    if (username) query += `${username} in:login`;
    if (location) query += ` location:${location}`;
    if (minRepos) query += ` repos:>=${minRepos}`;

    const response = await axios.get(`${BASE_URL}/search/users`, {
      params: { q: query, per_page: 10, page },
      headers: {
        Accept: "application/vnd.github.v3+json",
        Authorization: import.meta.env.VITE_APP_GITHUB_API_KEY
          ? `token ${import.meta.env.VITE_APP_GITHUB_API_KEY}`
          : undefined,
      },
    });

    return response.data.items;
  } catch (error) {
    throw new Error("Looks like we cant find the user");
  }
}
