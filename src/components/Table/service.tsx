import { handle } from 'redux-pack'
import { Map } from 'immutable'
import http from '../../utils/http'

export const LOAD_TABLE_DATA = 'LOAD_TABLE_DATA'
/**
 * load posts
 * @returns ReduxPackAction
 */
export const load = (url: string, model: string, data: any): ReduxPackAction => {
    return {
        type: LOAD_TABLE_DATA,
        promise: http.get(url, data),
        payload: {
            model
        }
    }
}

export const RESET_TABLE = 'RESET_TABLE'
/**
 * reset current model
 */
export const init = (model: string): ReduxPackAction => {
    return {
        type: RESET_TABLE,
        promise: Promise.resolve({
            data: model
        })
    }
}

/**
 * initial state 
 * @param  {[]}} 
 */
export const initialState = Map({

})
/**
 * pure reducer
 * @param  {} state=initialState
 * @param  {} action
 */
export default (state = initialState, action: ReduxPackFinalAction) => {

    const { type, payload } = action
    switch (type) {

        case LOAD_TABLE_DATA:
            return handle(state, action, {
                success: s => state.set(action.meta.startPayload.model, payload.data.data)
                    .set('empty', !payload.data.data.length)
            })
        case RESET_TABLE:
            return handle(state, action, {
                success: s => state.set(payload.data, [])
            })
        // tslint:disable-next-line:no-switch-case-fall-through
        default:
            return state
    }
}