import { HttpProvider } from './../../providers/http/http'

export abstract class ProviderBase<T> {
  constructor(public url: string, public http: HttpProvider) {}

  get() {
    return this.http.get(this.url)
  }

  getById(id: string) {
    return this.http.get(`${this.url}/${id}`)
  }

  post(model: T) {
    return this.http.post(this.url, model)
  }

  put(id: string, model: T) {
    return this.http.put(`${this.url}/${id}`, model)
  }

  delete(id: string) {
    return this.http.delete(`${this.url}/${id}`)
  }
}
