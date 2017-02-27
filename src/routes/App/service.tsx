import { handle } from 'redux-pack'
import { Map } from 'immutable'
import http from '../../utils/http'
import menu from '../../utils/menu'
import { getAuth } from '../../utils/authentication'
export const LOAD_MENU = 'LOAD_MENU'
/**
 * config
 * @returns ReduxPackAction
 */
export const loadMenu = (): ReduxPackAction => {
    return {
        type: LOAD_MENU,
        promise: Promise.resolve({
            data: menu
        })
    }
}

export const HANDLE_HTTP_STATUS = 'HANDLE_HTTP_STATUS'
/**
 * handle http status 
 * @returns ReduxPackAction
 */
export const handleHttpStatus = (data): ReduxPackAction => {
    return {
        type: HANDLE_HTTP_STATUS,
        promise: Promise.resolve({
            data
        })
    }
}

export const LOGOUT = 'LOGOUT'
/**
 * logout 
 * @returns ReduxPackAction
 */
export const logout = (): ReduxPackAction => {
    return {
        type: LOGOUT,
        promise: http.post('/ipassport/logout')
    }
}

export const GET_AUTH = 'GET_AUTH'
/**
 * get login user infomation
 * @returns ReduxPackAction
 */
export const getUser = (): ReduxPackAction => {
    return {
        type: GET_AUTH,
        promise: Promise.resolve({
            data: getAuth()
        })
    }
}

/**
 * initial state 
 * @param  {{}} 
 */
export const initialState = Map({
    menus: [],
    httpStatus: null,
    user: null
})
/**
 * logoutReducer
 */
export const logoutReducer = (appReducer) => {
    return (state, action) => {
        if (action.type === LOGOUT) {
            state = undefined
        }
        return appReducer(state, action)
    }
}
/**
 * pure reducer
 * @param  {} state=initialState
 * @param  {} action
 */
export default (state = initialState, action: ReduxPackFinalAction) => {

    const { type, payload } = action
    switch (type) {
        case LOAD_MENU:
            return handle(state, action, {
                success: s => state.set('menus', payload.data)
            })
        case HANDLE_HTTP_STATUS:
            return handle(state, action, {
                success: s => state.set('httpStatus', payload.data)
            })
        case GET_AUTH:
            return handle(state, action, {
                success: s => state.set('user', payload.data)
            })
        case LOGOUT:
            return handle(state, action, {
                success: s => state.set('user', null)
            })
        default:
            return state
    }
}