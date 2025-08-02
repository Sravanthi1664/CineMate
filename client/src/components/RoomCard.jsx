import { Link } from "react-router-dom";

export default function RoomCard({ id, title, users, poster }) {
  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden shadow-md w-56 sm:w-64 md:w-72 transition-transform hover:scale-105">
      <div className="w-full h-[360px] bg-black">
        <img
          src={poster}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4 space-y-2 text-white">
        <h3 className="text-lg font-semibold truncate">{title}</h3>
        <p className="text-sm text-gray-400">👥 {users} watching</p>

        <div className="flex flex-col gap-2 pt-2">
          <Link
            to={`/room/${id}`}
            className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded text-sm text-center font-medium"
          >
            🎬 Join Room
          </Link>

          <Link
            to={`/movie/${id}`}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm text-center font-medium"
          >
            ℹ️ More Info
          </Link>
        </div>
      </div>
    </div>
  );
}
