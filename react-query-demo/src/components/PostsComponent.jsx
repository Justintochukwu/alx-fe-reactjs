import React from "react";
import { useQuery } from "react-query";

// Function to fetch posts from JSONPlaceholder API
const fetchPosts = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const PostsComponent = () => {
  // ✅ useQuery with advanced configuration
  const {
    data: posts,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery("posts", fetchPosts, {
    // ✅ Caching & refetch behavior settings
    cacheTime: 1000 * 60 * 10, // 10 minutes in cache before garbage collection
    staleTime: 1000 * 60 * 1, // 1 minute before data becomes stale
    refetchOnWindowFocus: false, // don’t refetch when window regains focus
    keepPreviousData: true, // keep old data while fetching new one
  });

  // Loading state
  if (isLoading) return <p className="text-blue-600">Loading posts...</p>;

  // Error state
  if (isError) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <div className="w-full max-w-2xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Posts</h2>
        <button
          onClick={() => refetch()}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {isFetching ? "Refreshing..." : "Refetch Data"}
        </button>
      </div>

      <ul className="space-y-3">
        {posts.slice(0, 10).map((post) => (
          <li
            key={post.id}
            className="bg-white p-4 rounded-md shadow hover:shadow-lg transition"
          >
            <h3 className="font-bold text-lg">{post.title}</h3>
            <p className="text-gray-700">{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostsComponent;
