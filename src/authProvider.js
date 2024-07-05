let refreshTimeOutId

const abordRefreshToken = () => {
  if (refreshTimeOutId) {
    window.clearTimeout(refreshTimeOutId)
  }
}

const getRefreshedToken = async () => {
  let refreshToken = localStorage.getItem('refresh_token')

  const res = await fetch(`${process.env.REACT_APP_API_ENTRYPOINT}/token/refresh`, {
    headers: {
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json',
    },
    timeout: 10000,
    method: 'POST',
    body: JSON.stringify({
      refresh_token: refreshToken,
    }),
  })
  const jsonResponse = await res.json()
  if (jsonResponse.token) {
    localStorage.setItem('token', jsonResponse.token)
    localStorage.setItem('refresh_token', jsonResponse.refresh_token)
  }
}

const auth =  {
  login: ({ username, password }) => {
    const request = new Request(`${process.env.REACT_APP_API_ENTRYPOINT}/login_check`, {
      method: 'POST',
      body: JSON.stringify({ email: username, password }),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    })
    return fetch(request)
      .then((response) => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText)
        }
        return response.json()
      })
      .then(({ token, refresh_token }) => {
        localStorage.setItem('token', token)
        localStorage.setItem('refresh_token', refresh_token)
        refreshTimeOutId = window.setInterval(getRefreshedToken, 60000 * 40)
      })
  },
  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('refresh_token')
    abordRefreshToken()
    return Promise.resolve()
  },
  checkAuth: () => (localStorage.getItem('token') ? Promise.resolve() : Promise.reject()),
  checkError: ({ response }) => {
    const status = response.status
    if (status === 401 || status === 403) {
      localStorage.removeItem('token')
      return Promise.reject()
    }
    return Promise.resolve()
  },
  getPermissions: (params) => Promise.resolve(),
}

export default auth
