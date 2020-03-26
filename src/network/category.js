import { request } from './request'
export function getCategory () {
  return request({
    url: '/category'
  })
}
export function getmaitKey (maitKey) {
  return request({
    url: '/subcategory',
    params: {
      maitKey
    }
  })

}
export function getWallKey (miniWallkey, type) {
  return request({
    url: '/subcategory/detail',
    params: {
      miniWallkey, type
    }
  })

}