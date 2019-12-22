import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Visualizer from '../../components/Visualizer/Visualizer.component';
import PlayerBar from '../../components/PlayerBar/PlayerBar';
import classes from './App.module.scss';

import HamburgerToggle from '../../components/HamburgerToggle/HamburgerToggle';
import VisualPanel from '../../components/VisualPanel/VisualPanel';

import { setPlayPressed, setDuration} from '../../store/actions/songActions';

export default function App({ song }) {
    // States
    const [uploadedSong, setUploadedSong] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    // const [duration, setDuration] = useState('0:00');
    const [volume, setVolume] = useState(0.5);
    const [togglePanel, setTogglePanel] = useState(false);
    const [songEnded, setSongEnded] = useState(false);
    const [blob, setBlob] = useState(null);

    const downloadState = useSelector(state => state.download.downloadState);
    const playPressed = useSelector(state => state.song.playPressed);
    const duration = useSelector(state => state.song.duration);
    // Refs
    const audioRef = useRef(null);
    // Dispatch
    const dispatch = useDispatch();

    // Effects
    useEffect(() => {
        console.log('useEffects1', song);
        setUploadedSong(song);
        setBlob(song.blob);
        setSongEnded(false);
        setIsPlaying(false);
    }, [song]);

    /*
    useEffect( (dispatch) => {
        console.log('useEffects2');
        dispatch(setPlayPressed(false));
        // dispatch(setDuration('0:00'));
        return () => {
            dispatch(setPlayPressed(false));
            dispatch(setDuration('0:00'));
        }
    }, []);
*/
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
    const handleMetadata = event => {
        const duration = event.currentTarget.duration;
        console.log('duration: ', duration);
        dispatch(setDuration(getTime(duration)));
    };

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
                        onLoadedMetadata={handleMetadata}
                        onPlay={onAudioPlay}
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
                        duration={duration}
                        songEnded={songEnded}
                    />
                </div>
            </div>
        </div>
    );
}
