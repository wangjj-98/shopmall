import { request } from './request'
export function getDetail (iid) {
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}
export function getRecommend () {
  return request({
    url: '/recommend'
  })
}

export class GoodsInfo {
  constructor(itemInfo, services) {
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.discount = itemInfo.discountDesc
    this.discountBgColor = itemInfo.discountBgColor
    this.realPrice = itemInfo.lowNowPrice
    this.services = services
  }
}
export class SkuInfo {
  constructor(skuInfo) {
    this.price = skuInfo.defaultPrice
    this.style = skuInfo.props[0]
    this.size = skuInfo.props[1]
    this.sizeKey = skuInfo.sizeKey
    this.styleKey = skuInfo.styleKey
    this.skus = skuInfo.skus
    this.title = skuInfo.title
    this.total = skuInfo.totalStock
  }
}

export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods;
  }
}
export class GoodsParam {
  constructor(info, rule) {
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables
  }
}