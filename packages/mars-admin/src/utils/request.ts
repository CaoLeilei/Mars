import axios, { Axios } from 'axios';
import { set } from 'lodash'
import { AxiosResponse, AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';

const DEFAULT_CONFIG: AxiosRequestConfig = {}

/**
 * 创建一个网络请求库
 * @param confing
 */
export function createRequest(config: AxiosRequestConfig) {
  // 生成一个基本的配置文件，转们用来进行构建
  const axiosConfig =   Object.assign({}, DEFAULT_CONFIG, config)
  // 创建生成axios实例
  const axiosInstance = axios.create(axiosConfig)

  // 请求拦截器
  axiosInstance.interceptors.request.use(async config => {
    return config
  }, (axiosError: AxiosError) => {})

  // 相应拦截器
  axiosInstance.interceptors.response.use(async (response: AxiosResponse) => {
    return response
  }, (axiosError: AxiosError) => {
  })

  return axiosInstance
}

const DEFAULT_AXIOS_CONFIG = {}
export interface HttpRequestOptions extends AxiosRequestConfig {
}
export class HttpRequest {
  axiosInstance: AxiosInstance
  constructor(options: HttpRequestOptions) {
    this.axiosInstance = axios.create(options)
    this.initInterceptors(this.axiosInstance)
  }
  // 初始化拦截器
  private initInterceptors(axiosInstance: AxiosInstance) {
    this.initRequestInterceptors(axiosInstance)
    this.initResponseInterceptors(axiosInstance)
  }
  // 初始化请求拦截器
  private initRequestInterceptors(axiosInstance: AxiosInstance) {
    axiosInstance.interceptors.request.use(async config => {
      return config
    })
  }
  // 初始化响应拦截去
  private initResponseInterceptors(axiosInstance: AxiosInstance) {
    axiosInstance.interceptors.response.use(async (response: AxiosResponse) => {
      return response
    }, async (error: AxiosError) => {

    })
  }

  public async request(config: AxiosRequestConfig): Promise<any> {}
  public async get(url: string, params?: any, config: AxiosRequestConfig = {}): Promise<any> {
    const axiosConfig = Object.assign({}, config)
    if (params) {
      set(axiosConfig, 'params', params)
    }
    return this.axiosInstance.get
  }
  public post() {}
  public put() {}
  public delete() {}
  public download() {}
}

export function createAxios(config: AxiosRequestConfig) {
  const axiosConfig: AxiosRequestConfig = Object.assign({}, DEFAULT_AXIOS_CONFIG, config)
  const httpRequest = new HttpRequest(axiosConfig)
  return httpRequest
}