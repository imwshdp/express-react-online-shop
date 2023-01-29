import axios from 'axios';

const $host = axios.create({
  baseURL: process.env.REACT_APP_API_URL
})

const $authHost = axios.create({
  baseURL: process.env.REACT_APP_API_URL
})

// adding authorization header with jwt
const authInterceptor = config => {
  config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
  return config
}

// adding interceptor to instance
$authHost.interceptors.request.use(authInterceptor)

export {
  $host,
  $authHost
}