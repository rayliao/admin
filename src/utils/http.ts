import axios from 'axios'
import { message } from 'antd'

const options = {
    timeout: 30000,
    headers: {},
}

/**
 * instance of axios
 */
const http = axios.create(options)

// Add a response interceptor
http.interceptors.response.use((response) => {
    if (process.env.NODE_ENV !== 'production') {
        console.log(response)
    }
    // Do something with response data
    return response
},                             (error) => {
    if (error && error.response && error.response.statusText) {

        message.error(error.response.statusText)
    }
    // Do something with response error
    return Promise.reject(error)
})

// https://github.com/mzabriskie/axios#request-config
export default http