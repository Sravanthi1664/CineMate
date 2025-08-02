import React from "react";

const trendingRooms = [
  { title: "Interstellar", viewers: 8, emoji: "🎬" },
  { title: "Inception", viewers: 5, emoji: "🔥" },
  { title: "The Batman", viewers: 3, emoji: "🦇" },
  { title: "Dune", viewers: 6, emoji: "🌌" },
  { title: "Oppenheimer", viewers: 9, emoji: "💥" },
];

export default function TrendingTicker() {
  return (
    <div className="bg-gray-900 py-2 overflow-hidden border-t border-b border-gray-700">
      <div className="animate-marquee whitespace-nowrap text-white text-sm font-medium flex gap-8 px-4">
        {trendingRooms.map((room, idx) => (
          <span key={idx} className="inline-block">
            {room.emoji} {room.title} – {room.viewers} watching
          </span>
        ))}
      </div>
    </div>
  );
}
