import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Visualizer from '../../components/Visualizer/Visualizer.component';
import PlayerBar from '../../components/PlayerBar/PlayerBar';
import classes from './App.module.scss';

import HamburgerToggle from '../../components/HamburgerToggle/HamburgerToggle';
import VisualPanel from '../../components/VisualPanel/VisualPanel';

import { setPlayPressed, setDuration, setCurrentTime} from '../../store/actions/songRuntimeInfoActions';

export default function App({ song }) {
    // States
    const [uploadedSong, setUploadedSong] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const [togglePanel, setTogglePanel] = useState(false);
    const [songEnded, setSongEnded] = useState(false);
    const [blob, setBlob] = useState(null);

    const downloadState = useSelector(state => state.download.downloadState);
    const playPressed = useSelector(state => state.songRuntimeInfo.playPressed);
    const songDuration = useSelector(state => state.songRuntimeInfo.duration);
    const songCurrentTime = useSelector(state => state.songRuntimeInfo.currentTime);
    // Refs
    const audioRef = useRef(null);
    // Dispatch
    const dispatch = useDispatch();

    // Effects
    useEffect(() => {
        setUploadedSong(song);
        setBlob(song.blob);
        setSongEnded(false);
        setIsPlaying(false);
    }, [song]);

    
    useEffect( () => {
        return () => {
            dispatch(setPlayPressed(false));
            dispatch(setDuration('0:00'));
        }
    }, [dispatch]);

    /********************************************
        Handles changing of volume state upon
        slider interaction. State changes are sent to
        sketch file adjusting the sound's actual
        volume to change ellipse diameter on redraw.
    ********************************************/
    const onVolumeChange = event => {
        setVolume(event.target.value);
    };

    /*********************************************
        Handles toggling of pause/play button.
        Used to monitor if the user wants to pause/play
        the loaded sound. State changes are sent to
        sketch file which executes a .pause() or .play()
        command.
    *********************************************/
    const onPlayPress = event => {
        if (uploadedSong) {
            dispatch(setPlayPressed(!playPressed));
        } else {
            alert('No file loaded');
        }
    };

    const onAudioPlay = () => {
        setIsPlaying(true);
    };

    const onSongEnd = () => {
        setIsPlaying(false);
        dispatch(setPlayPressed(false));
        setSongEnded(true);
    };

    /********************************************
        Uploaded audio file duration converted in
        to proper format e.g. 3:14
    ********************************************/
    const handleMetadata = (songDuration, event) => {
        const duration = getTime(event.currentTarget.duration);
        if(!songDuration || duration !== songDuration){
            dispatch(setDuration(duration));
        }
    };

    const handleTimeUpdate = (songCurrentTime , event) => {
        const currentTime = getTime(event.currentTarget.currentTime);
        if(!songCurrentTime || songCurrentTime !== currentTime){
            dispatch(setCurrentTime(currentTime));
        }
    }

    const getTime = dur => {
        return (
            Math.floor(dur / 60) + ':' + ('0' + Math.floor(dur % 60)).slice(-2)
        );
    };

    /********************************************
        Handle hamburger toggle callback. When 
        hamburger toggle's state changed, we need
        to set togglePanel state
    *********************************************/
    const onTogglePanel = toggleState => {
        setTogglePanel(toggleState);
    };

    return (
        <div className={classes.pageContainer}>
            <div className={classes.visualmusic}>
                <div className={classes.visualContainer}>
                    <div
                        className={`${classes.visualmusic} ${
                            togglePanel ? classes.shrink : ''
                        }`}
                    >
                        <div className={classes.hamburger}>
                            <HamburgerToggle
                                initToggle={togglePanel}
                                onClick={onTogglePanel}
                            />
                        </div>
                        <Visualizer
                            volume={volume}
                            playPressed={playPressed}
                            uploadedSong={uploadedSong && uploadedSong.url}
                            blob={blob}
                            audioRef={audioRef.current}
                            downloadVisual={songEnded && downloadState}
                        />
                    </div>
                    <div
                        className={`${classes.visualPanel} ${
                            togglePanel ? classes.slideIn : ''
                        }`}
                    >
                        <VisualPanel />
                    </div>
                </div>
                <div>
                    <audio
                        id="audio"
                        ref={audioRef}
                        onEnded={onSongEnd}
                        onLoadedMetadata={(event) => handleMetadata(songDuration,event)}
                        onPlay={onAudioPlay}
                        onTimeUpdate={(event) => handleTimeUpdate(songCurrentTime, event)}
                    ></audio>
                </div>
                <div className={classes.bar}>
                    <PlayerBar
                        currentTime={
                            audioRef.current &&
                            getTime(audioRef.current.currentTime)
                        }
                        volume={volume}
                        onVolumeChange={onVolumeChange}
                        onPlayPress={onPlayPress}
                        playPressed={playPressed}
                        isPlaying={isPlaying}
                        uploadedSong={uploadedSong}
                        duration={songDuration}
                        songEnded={songEnded}
                    />
                </div>
            </div>
        </div>
    );
}
