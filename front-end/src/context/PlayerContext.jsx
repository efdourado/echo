import React, { createContext, useCallback, useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { songsArray } from '../assets/db/songs';
import { useAudio } from '../hooks/useAudio';

export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [queue, setQueue] = useState([]);
  const [history, setHistory] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  
  const { 
    audioRef, 
    isReady, 
    duration, 
    currentTime, 
    seek,
    error: audioError
  } = useAudio(currentTrack?.audio || '', {
    volume: isMuted ? 0 : volume,
    isPlaying
  });

  const getRandomSongId = useCallback((artist, excludeId = null) => {
    const artistSongs = songsArray.filter(
      (song) => song.artist === artist && song._id !== excludeId
    );
    return artistSongs.length > 0 
      ? artistSongs[Math.floor(Math.random() * artistSongs.length)]._id 
      : null;
  }, []);

  const playTrack = useCallback((track) => {
    if (!track?.audio) return;

    setCurrentTrack({
      ...track,
      randomIdFromArtist: getRandomSongId(track.artist, track._id),
      randomId2FromArtist: getRandomSongId(track.artist, track._id),
    });
    setIsPlaying(true);
    setHistory(prev => [track, ...prev].slice(0, 50)); // Keep last 50 tracks
  }, [getRandomSongId]);

  const pauseTrack = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const togglePlayPause = useCallback(() => {
    if (!currentTrack) return;
    setIsPlaying(prev => !prev);
  }, [currentTrack]);

  const skipTrack = useCallback((direction) => {
    if (!currentTrack) return;
    
    const trackId = direction === 'forward' 
      ? currentTrack.randomId2FromArtist 
      : currentTrack.randomIdFromArtist;
    
    if (trackId) {
      const nextTrack = songsArray.find(song => song._id === trackId);
      if (nextTrack) playTrack(nextTrack);
    }
  }, [currentTrack, playTrack]);

  const addToQueue = useCallback((track) => {
    setQueue(prev => [...prev, track]);
  }, []);

  const clearQueue = useCallback(() => {
    setQueue([]);
  }, []);

  const contextValue = useMemo(() => ({
    // State
    currentTrack,
    isPlaying,
    queue,
    history,
    volume,
    isMuted,
    isReady,
    duration,
    currentTime,
    error: audioError,
    
    audioRef,
    
    playTrack,
    pauseTrack,
    togglePlayPause,
    skipTrack,
    addToQueue,
    clearQueue,
    setVolume,
    setIsMuted,
    seek,
  }), [
    currentTrack,
    isPlaying,
    queue,
    history,
    volume,
    isMuted,
    isReady,
    duration,
    currentTime,
    audioError,
    audioRef,
    playTrack,
    pauseTrack,
    togglePlayPause,
    skipTrack,
    addToQueue,
    clearQueue,
    seek,
  ]);

  return (
    <PlayerContext.Provider value={contextValue}>
      {children}
    </PlayerContext.Provider>
  );
};

// Custom hook for consuming the context
export const usePlayer = () => {
  const context = React.useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};

PlayerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};