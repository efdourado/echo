import React, { createContext, useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { songsArray } from '../assets/db/songs';
import { useAudio } from '../hooks/useAudio';

export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [state, setState] = useState({
    currentTrack: null,
    queue: [],
    history: [],
    isPlaying: false,
    volume: 0.7,
    isMuted: false
  });

  const audio = useAudio({
    src: state.currentTrack?.audio || '',
    volume: state.isMuted ? 0 : state.volume,
    isPlaying: state.isPlaying,
    onPlay: () => setState(prev => ({ ...prev, isPlaying: true })),
    onPause: () => setState(prev => ({ ...prev, isPlaying: false })),
    onEnded: () => skipTrack('forward')
  });

  const getRandomTracks = useCallback((artist, excludeId) => {
    return songsArray
      .filter(song => song.artist === artist && song._id !== excludeId)
      .sort(() => 0.5 - Math.random())
      .slice(0, 2);
  }, []);

  const playTrack = useCallback((track) => {
    if (!track?.audio) {
      console.error("No audio source for this track");
      return;
    }

    const [randomTrack1, randomTrack2] = getRandomTracks(track.artist, track._id);

    setState(prev => ({
      ...prev,
      currentTrack: {
        ...track,
        randomNextId: randomTrack1?._id,
        randomPrevId: randomTrack2?._id
      },
      isPlaying: true,
      history: [track, ...prev.history.slice(0, 49)]
    }));
  }, [getRandomTracks]);

  const togglePlayPause = useCallback(() => {
    if (!state.currentTrack) return;
    setState(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
  }, [state.currentTrack]);

  const skipTrack = useCallback((direction) => {
    if (!state.currentTrack) return;
    
    const trackId = direction === 'forward' 
      ? state.currentTrack.randomNextId 
      : state.currentTrack.randomPrevId;
    
    const nextTrack = songsArray.find(song => song._id === trackId);
    if (nextTrack) {
      playTrack(nextTrack);
    } else {
      setState(prev => ({ ...prev, isPlaying: false }));
    }
  }, [state.currentTrack, playTrack]);

  const value = useMemo(() => ({
    ...state,
    currentTime: audio.currentTime,
    duration: audio.duration,
    audioRef: audio.audioRef,
    playTrack,
    togglePlayPause,
    skipTrack,
    setVolume: (volume) => setState(prev => ({ ...prev, volume })),
    setIsMuted: (isMuted) => setState(prev => ({ ...prev, isMuted })),
    seek: audio.seek
  }), [state, audio, playTrack, togglePlayPause, skipTrack]);

  return (
    <PlayerContext.Provider value={value}>
      {children}
    </PlayerContext.Provider>
); };

PlayerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};