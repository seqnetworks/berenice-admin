import axios from "axios"
import { updateToken, updateCurrentUserAclAsync } from "../redux/index.actions"
import { store } from "../redux/store"

export const api = axios.create({
  baseURL: "https://yt3rvmt0pa.execute-api.eu-central-1.amazonaws.com/dev",
})

export const req = axios.create({
  baseURL: "https://yt3rvmt0pa.execute-api.eu-central-1.amazonaws.com/dev",
})

req.interceptors.request.use(
  config => {
    const accessToken = store.getState().auth.currentUser.tokens.accessToken
    if (accessToken) {
      config.headers["Authorization"] = "Bearer " + accessToken
    }
    config.headers["Content-Type"] = "application/json"
    return config
  },
  error => {
    Promise.reject(error)
  }
)

req.interceptors.response.use(
  response => {
    return response
  },
  async function (error) {
    const currentUser = store.getState().auth.currentUser
    const originalRequest = error.config
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      const refreshToken = currentUser.tokens.refreshToken
      const expiredToken = currentUser.tokens.accessToken
      const result = await axios.post(
        "https://yt3rvmt0pa.execute-api.eu-central-1.amazonaws.com/dev/berenice_auth/refresh_token",
        { refreshToken: refreshToken },
        { headers: { Authorization: "Bearer " + expiredToken } }
      )
      store.dispatch(updateToken(result.data.accessToken))
      store.dispatch(updateCurrentUserAclAsync(currentUser.uuid))
      const accessToken = currentUser.tokens.accessToken
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
      return req(originalRequest)
    }
    return Promise.reject(error)
  }
)
