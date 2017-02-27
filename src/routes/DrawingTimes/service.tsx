import { handle } from 'redux-pack'
import { Map } from 'immutable'
import http from '../../utils/http'

/*
 * DrawingTimes constants
 */
export const ADD_DRAWING_TIME = 'ADD_DRAWING_TIME'

/**
 * Post actions
 * @returns ReduxPackAction
 */
export const add = (data): ReduxPackAction => {
    return {
        type: ADD_DRAWING_TIME,
        promise: http.post('/IMarkSix/InsertDrawingTime', data)
    }
}

/**
 * initial state 
 * @param  {[]}} 
 */
export const initialState = Map({
    post: []
})
/**
 * DrawingTimes reducer
 * @param  {} state=initialState
 * @param  {} action
 */
export default (state = initialState, action: ReduxPackFinalAction) => {

    const { type, payload } = action
    switch (type) {
        case ADD_DRAWING_TIME:
            return handle(state, action, {
                success: s => state.set('post', payload.data)
            })
        default:
            return state
    }
}