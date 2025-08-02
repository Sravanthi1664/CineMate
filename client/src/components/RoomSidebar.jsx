// RoomSidebar.jsx
export default function RoomSidebar() {
  return (
    <div className="bg-gray-900 p-5 rounded-xl shadow-lg border border-gray-800">
      <h2 className="text-lg font-semibold mb-4 text-purple-300">👥 Participants</h2>
      <ul className="space-y-2 text-gray-300 text-sm">
        <li className="flex items-center gap-2">
          <span className="text-green-400">●</span> You
        </li>
        <li className="flex items-center gap-2">
          <span className="text-gray-500">○</span> Waiting for others...
        </li>
      </ul>
    </div>
  );
}