import { useEffect, useRef } from "react";
import socket from "../socket";

export default function VideoPlayer() {
  const videoRef = useRef(null);
  const isSyncing = useRef(false);

  // Get roomId from the URL
  const roomId = window.location.pathname.split("/").pop();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // 🎬 Log when video is ready
    const handleLoaded = () => {
      console.log("🎞️ Video loaded");
    };
    video.addEventListener("loadedmetadata", handleLoaded);

    // 🔼 Emit play event
    const handlePlay = () => {
      if (isSyncing.current) return;
      console.log("🔵 Emitting play");
      socket.emit("video_play", { roomId });
    };

    // 🔼 Emit pause event
    const handlePause = () => {
      if (isSyncing.current) return;
      console.log("🔵 Emitting pause");
      socket.emit("video_pause", { roomId });
    };

    // 🔼 Emit seek event
    const handleSeek = () => {
      if (isSyncing.current || video.readyState < 1) return;
      console.log("🔵 Emitting seek:", video.currentTime);
      socket.emit("video_seek", { roomId, time: video.currentTime });
    };

    // ⏺️ Add video event listeners
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("seeked", handleSeek);

    // 🔻 Receive play event from server
    socket.on("sync_play", () => {
      console.log("🔴 Received sync_play");
      if (!video.paused) return;
      isSyncing.current = true;
      video.play().finally(() => {
        isSyncing.current = false;
      });
    });

    // 🔻 Receive pause event from server
    socket.on("sync_pause", () => {
      console.log("🔴 Received sync_pause");
      if (video.paused) return;
      isSyncing.current = true;
      video.pause();
      isSyncing.current = false;
    });

    // 🔻 Receive seek event from server
    socket.on("sync_seek", ({ time }) => {
      console.log("🔴 Received sync_seek:", time);
      if (Math.abs(video.currentTime - time) > 0.5) {
        isSyncing.current = true;
        video.currentTime = time;
        setTimeout(() => {
          isSyncing.current = false;
        }, 300);
      }
    });

    // 🔚 Cleanup on unmount
    return () => {
      video.removeEventListener("loadedmetadata", handleLoaded);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("seeked", handleSeek);

      socket.off("sync_play");
      socket.off("sync_pause");
      socket.off("sync_seek");
    };
  }, [roomId]);

  return (
    <div className="rounded-xl overflow-hidden shadow-lg">
      <video
        ref={videoRef}
        className="w-full h-auto"
        controls
        src="/SampleVideo.mp4" // ✅ Must start with `/` to resolve from public/
      />
    </div>
  );
}
