import axios from 'axios'

export const http = axios.create({
  baseURL: '',
  withCredentials: true,
})

http.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error)
    return Promise.reject(error)
  }
)
