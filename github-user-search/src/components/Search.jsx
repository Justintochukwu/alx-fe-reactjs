import { useState } from "react";
import { fetchUserData } from "../services/githubService";

function Search() {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username && !location && !minRepos) return;

    setLoading(true);
    setError("");
    setUsers([]);
    setPage(1);

    try {
      const results = await fetchUserData({ username, location, minRepos, page: 1 });
      setUsers(results);
      setHasMore(results.length === 10); // assume more if got 10 results
    } catch (err) {
      setError("Looks like we cant find the user");
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    const nextPage = page + 1;
    setLoading(true);

    try {
      const results = await fetchUserData({ username, location, minRepos, page: nextPage });
      setUsers((prev) => [...prev, ...results]);
      setPage(nextPage);
      setHasMore(results.length === 10);
    } catch (err) {
      setError("Looks like we cant load more users");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      {/* Search Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 flex flex-col gap-4"
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          GitHub Advanced Search
        </h2>

        <input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          placeholder="Filter by location (optional)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="number"
          placeholder="Minimum repos (optional)"
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
          className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          Search
        </button>
      </form>

      {/* Results Section */}
      <div className="mt-6">
        {loading && <p className="text-gray-600">Loading...</p>}
        {error && <p className="text-red-600">{error}</p>}

        {users.length > 0 && (
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {users.map((user) => (
              <li
                key={user.id}
                className="p-4 border rounded-lg shadow-sm bg-gray-50 flex flex-col items-center"
              >
                <img
                  src={user.avatar_url}
                  alt={user.login}
                  className="w-20 h-20 rounded-full mb-2"
                />
                <h3 className="font-semibold">{user.login}</h3>
                <a
                  href={user.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 hover:underline mt-1"
                >
                  View Profile
                </a>
              </li>
            ))}
          </ul>
        )}

        {/* Load More Button */}
        {hasMore && !loading && (
          <button
            onClick={loadMore}
            className="mt-4 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900"
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
}

export default Search;
