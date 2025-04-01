import { useEffect, useRef, useState } from "react";

export const useAudio = (src, { volume = 1, isPlaying = false }) => {
  const audioRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;
    audio.preload = "auto";

    const updateMediaSession = () => {
      if ("mediaSession" in navigator && audioRef.current?.src) {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: "Current Track",
          artist: "Unknown Artist",
    }); } };

    const handleEvents = () => {
      audio.addEventListener("loadedmetadata", () => {
        setDuration(audio.duration);
        setIsReady(true);
        updateMediaSession();
      });

      audio.addEventListener("timeupdate", () => {
        setCurrentTime(audio.currentTime);
      });

      audio.addEventListener("error", () => {
        setError("Audio playback error");
        setIsReady(false);
      });

      audio.addEventListener("ended", () => {
        setIsPlaying(false);
    }); };

    handleEvents();

    return () => {
      audio.pause();
      audio.src = "";
      audio.removeEventListener("loadedmetadata", handleEvents);
      audio.removeEventListener("timeupdate", handleEvents);
      audio.removeEventListener("error", handleEvents);
      audio.removeEventListener("ended", handleEvents);
  }; }, []);

  useEffect(() => {
    if (!audioRef.current || !src) return;

    setIsReady(false);
    setError(null);
    audioRef.current.src = src;
    audioRef.current.load();
  }, [src]);

  useEffect(() => {
    if (!audioRef.current || !isReady) return;

    const controlPlayback = async () => {
      try {
        if (isPlaying) {
          await audioRef.current.play();
        } else {
          audioRef.current.pause();
        }
      } catch (err) {
        setError(`Playback error: ${err.message}`);
        setIsPlaying(false);
    } };

    controlPlayback();
  }, [isPlaying, isReady]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
  } }, [volume]);

  const seek = (time) => {
    if (audioRef.current && !isNaN(time)) {
      audioRef.current.currentTime = Math.max(0, Math.min(time, duration));
  } };

  return {
    audioRef,
    isReady,
    duration,
    currentTime,
    error,
    seek,
}; };