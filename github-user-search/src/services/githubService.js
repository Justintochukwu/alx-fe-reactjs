import axios from "axios";

const BASE_URL = "https://api.github.com/search/users";

/**
 * Fetch users with advanced search
 * @param {Object} params - search parameters
 * @param {string} params.username - GitHub username
 * @param {string} [params.location] - optional location filter
 * @param {number} [params.minRepos] - optional minimum repo count
 */
export const fetchUserData = async ({ username, location, minRepos }) => {
  try {
    // Build query string
    let query = username ? `${username} in:login` : "";
    if (location) query += ` location:${location}`;
    if (minRepos) query += ` repos:>=${minRepos}`;

    const response = await axios.get(`${BASE_URL}?q=${query}`);
    return response.data; // includes items (list of users)
  } catch (error) {
    throw new Error("Looks like we cant find the user");
  }
};
