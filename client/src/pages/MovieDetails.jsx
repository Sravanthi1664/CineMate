import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

  // Fetch Movie Info
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
        );
        const data = await res.json();
        setMovie(data);
      } catch (err) {
        console.error("Error fetching movie details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id, API_KEY]);

  // Fetch Trailer
  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`
        );
        const data = await res.json();
        if (Array.isArray(data.results)) {
          const trailer = data.results.find(
            (v) => v.site === "YouTube" && v.type === "Trailer"
          );
          if (trailer) setTrailerKey(trailer.key);
        }
      } catch (err) {
        console.error("Error fetching trailer:", err);
      }
    };

    fetchTrailer();
  }, [id, API_KEY]);

  // Loading State
  if (loading || !movie) {
    return (
      <div className="flex justify-center items-center h-screen bg-black text-white">
        <div className="text-xl font-semibold animate-pulse">🎬 Loading movie details...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white p-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Poster */}
        <div className="flex-shrink-0">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full md:w-80 rounded shadow-lg"
          />
        </div>

        {/* Movie Info */}
        <div className="flex-1 space-y-4">
          <h1 className="text-3xl font-bold text-purple-400">{movie.title}</h1>
          <p className="text-gray-300">{movie.overview || "No description available."}</p>
          <p>
            <span className="text-gray-400">Genres:</span>{" "}
            {Array.isArray(movie.genres)
              ? movie.genres.map((g) => g.name).join(", ")
              : "N/A"}
          </p>
          <p><span className="text-gray-400">Release Date:</span> {movie.release_date || "N/A"}</p>
          <p><span className="text-gray-400">Rating:</span> ⭐ {movie.vote_average || "N/A"}</p>

          <Link
            to={`/room/${id}`}
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 mt-4 rounded shadow"
          >
            🎬 Join Room for {movie.title}
          </Link>
        </div>
      </div>

      {/* Trailer Section */}
      {trailerKey && (
        <div className="max-w-4xl mx-auto mt-12">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">🎞️ Trailer</h2>
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title="Trailer"
              frameBorder="0"
              allowFullScreen
              className="w-full h-96 rounded"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}
