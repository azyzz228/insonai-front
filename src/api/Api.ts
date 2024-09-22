import Axios, { type AxiosInstance } from 'axios'
import { useRouter } from 'vue-router'

export default class Api {
  static instance: Api
  request: AxiosInstance
  router = useRouter()
  t: any
  baseURL = `${import.meta.env.VITE_API_URL}`

  constructor() {
    this.request = Axios.create()
    this.setInterceptors()
    this.locale = localStorage.getItem('locale') ?? 'en'
  }
  public static createApi(): Api {
    if (!Api.instance) Api.instance = new Api()
    return Api.instance
  }
  set locale(value: string) {
    if (value) {
      localStorage.setItem('locale', value)
      this.setHeaders({ title: 'Locale', value })
    } else localStorage.removeItem('locale')
  }
  setHeaders(header: { title: string; value: string }) {
    this.request.defaults.headers[header.title] = header.value
  }

  setInterceptors() {
    this.request.interceptors.response.use(
      (response) => {
        return response
      },
      (error) => {
        const errorResponse = error.response

        if (errorResponse?.status) {
          console.log(error.response)
        }
        return errorResponse
      }
    )
  }
}
