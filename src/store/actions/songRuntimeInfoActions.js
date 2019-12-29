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
            dispatch({type: 'SET_DURATION', duration})
        }catch(err){
            dispatchError(dispatch,err);
        }

    }
}

export const setCurrentTime = currentTime => {
    return (dispatch, getState) => {
        try{
            dispatch({type: 'SET_CURRENT_TIME', currentTime})
        }catch(err){
            dispatchError(dispatch,err);
        }

    }
}

const dispatchError = (dispatch,err) => {dispatch({type: 'SONG_ERR', err})}