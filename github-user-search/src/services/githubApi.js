const GITHUB_API_URL = "https://api.github.com";
const GITHUB_API_KEY = import.meta.env.VITE_APP_GITHUB_API_KEY; // from .env

export const fetchGitHubUser = async (username) => {
  const response = await fetch(`${GITHUB_API_URL}/users/${username}`, {
    headers: {
      Authorization: `token ${GITHUB_API_KEY}`, // works only if you set a PAT
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }

  return await response.json();
};
