import { useState } from "react";
import { fetchUserData } from "./services/githubService";
import Search from "./components/Search";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (username) => {
    setLoading(true);
    setError("");
    setUser(null);

    try {
      const data = await fetchUserData(username);
      setUser(data);
    } catch (err) {
      setError("Looks like we can't find the user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>🔍 GitHub User Search</h1>
      <Search onSearch={handleSearch} />

      {/* Conditional Rendering */}
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {user && (
        <div className="user-card">
          <img src={user.avatar_url} alt={user.login} className="avatar" />
          <h2>{user.name || user.login}</h2>
          <a href={user.html_url} target="_blank" rel="noreferrer">
            Visit Profile
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
