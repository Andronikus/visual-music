export const setSong = song => {
    return (dispatch, getState) => {
        try {
            dispatch({
                type: 'SONG_SETTED',
                url: song.url,
                name: song.filename
            });
        } catch (err) {
            dispatch({
                type: 'SONG_ERR',
                err
            });
        }
    };
};

export const clearSong = () => {
    return (dispatch, getState) => {
        try {
            dispatch({
                type: 'SONG_CLEARED'
            });
        } catch (err) {
            dispatch({
                type: 'SONG_ERR',
                err
            });
        }
    };
};

export const storeBlob = blob => {
    return (dispatch, getState) => {
        try {
            dispatch({
                type: 'BLOB_STORED',
                blob
            });
        } catch (err) {
            dispatch({
                type: 'SONG_ERR',
                err
            });
        }
    };
};

export const setPlayPressed = playPressed => {
    return (dispatch, getState) => {
        try{
            dispatch({type: 'PLAY_PRESSED', value: playPressed});
        } catch(err){
            dispatchError(dispatch,err);
        }
    }
}

export const setDuration = duration => {
    return (dispatch, getState) => {
        try{
            console.log('setDuration action');
            dispatch({type: 'SET_DURATION', duration})
        }catch(err){
            dispatchError(dispatch,err);
        }

    }
}

const dispatchError = (dispatch,err) => {dispatch({type: 'SONG_ERR', err})}