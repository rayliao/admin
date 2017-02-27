import { handle } from 'redux-pack'
import { Map } from 'immutable'
import http from '../../utils/http'

export const LOGIN = 'LOGIN'
/**
 * load user
 * @returns ReduxPackAction
 */
export const login = (user): ReduxPackAction => {
    return {
        type: LOGIN,
        promise: http.post('/ipassport/login', user)
    }
}
/**
 * initial state 
 * @param  {[]}} 
 */
export const initialState = Map({
    user: null
})
/**
 * pure reducer
 * @param  {} state=initialState
 * @param  {} action
 */
export default (state = initialState, action: ReduxPackFinalAction) => {

    const { type, payload } = action
    switch (type) {
        case LOGIN:
            return handle(state, action, {
                success: s => state.set('user', payload.data.data)
            })
        default:
            return state
    }
}