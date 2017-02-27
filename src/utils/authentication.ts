import http from './http'
const key = 'AUTH'
export const getAuth = () => {
    const user = localStorage.getItem(key)
    if (user) {
        return JSON.parse(user)
    }
    return null
}
export const setHeader = (token) => http.defaults.headers.common['X-Access-Token'] = token
export const isAuthorized = () => {
    const user = getAuth()
    if (user) {
        setHeader(user.Token)
        return true
    }
    return false
}
export const saveAuth = (user) => {
    /**
     * save token to localStorage
     */
    localStorage.setItem(key, JSON.stringify(user))
    /**
     * set common header
     */
    setHeader(user.Token)
}

export const removeAuth = () => localStorage.removeItem(key)