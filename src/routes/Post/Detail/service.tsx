import { handle } from 'redux-pack'
import { Map } from 'immutable'
import http from '../../../utils/http'

export const LOAD_POSTS = 'LOAD_POSTS'
/**
 * load posts
 * @returns ReduxPackAction
 */
export const loadPosts = (): ReduxPackAction => {
    return {
        type: LOAD_POSTS,
        promise: http.get('/posts')
    }
}
/**
 * initial state 
 * @param  {[]}} 
 */
export const initialState = Map({
    posts: []
})
/**
 * pure reducer
 * @param  {} state=initialState
 * @param  {} action
 */
export default (state = initialState, action: ReduxPackFinalAction) => {

    const { type, payload } = action
    switch (type) {
        case LOAD_POSTS:
            return handle(state, action, {
                success: s => state.set('posts', payload.data)
            })
        default:
            return state
    }
}