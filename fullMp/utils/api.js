import { axiosAPI } from './request'
export function Login(data) {
  return axiosAPI({
    url: '/login',
    data,
    method: 'get'
  })
}