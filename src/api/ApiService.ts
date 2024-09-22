import Api from '@/api/Api'

export default class ApiService {
  private readonly api: Api
  constructor() {
    this.api = Api.createApi()
  }

  public async GET(path: string, config: object = {}) {
    return await this.api.request.get(`${this.api.baseURL}/${path}`, {
      params: config
    })
  }

  public async POST(path: string, config: object = {}) {
    return await this.api.request.post(`${this.api.baseURL}/${path}`, config)
  }
}
