import { useState, useEffect } from "react";
import axios from "axios";

function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim().length >= 2) {
        axios
          .get(`http://localhost:5000/api/search?q=${query}`) // backend should run on 5000
          .then((res) => setResults(res.data))
          .catch(console.error);
      } else {
        setResults([]);
      }
    }, 300); // Debounce

    return () => clearTimeout(delayDebounce);
  }, [query]);

  return (
    <div className="relative w-full max-w-lg mx-auto my-6">
      <input
        type="text"
        placeholder="Search movies..."
        className="w-full px-4 py-2 rounded-xl bg-zinc-800 text-white border focus:outline-none"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {results.length > 0 && (
        <ul className="absolute top-12 bg-white text-black rounded-md shadow-md w-full z-10 max-h-60 overflow-y-auto">
          {results.map((item) => (
            <li
              key={item._id}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {item.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
