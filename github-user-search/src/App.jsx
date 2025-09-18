import { useState } from "react";
import { fetchGitHubUser } from "./services/githubApi";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    try {
      const data = await fetchGitHubUser(username);
      setUser(data);
      setError("");
    } catch (err) {
      setError(err.message);
      setUser(null);
    }
  };

  return (
    <div className="App">
      <h1>🔍 GitHub User Search</h1>

      <div className="search">
        <input
          type="text"
          placeholder="Enter GitHub username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {user && (
        <div className="user-card">
          <img src={user.avatar_url} alt={user.login} width={120} />
          <h2>{user.login}</h2>
          <p>{user.bio || "No bio available"}</p>
          <p>Followers: {user.followers} | Following: {user.following}</p>
          <a href={user.html_url} target="_blank" rel="noreferrer">
            View Profile
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
