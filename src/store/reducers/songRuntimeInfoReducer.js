import initialState from './initialState';

export const songRuntimeInfoReducer = (state = initialState.songRuntimeInfo, action) => {
    switch (action.type) {
        case 'PLAY_PRESSED':
            return {
                ...state,
                playPressed: action.value
            }
        case 'SET_DURATION':
            return {
                ...state,
                duration: action.duration
            }
        case 'SET_CURRENT_TIME':
            return {
                ...state,
                currentTime: action.currentTime
            }
        default:
            return state;
    }
};
