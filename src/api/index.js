import requests from './requests';
import mockRequests from './mockRequests';

export const reqCategoryList = () => requests({ url: '/product/getBaseCategoryList', method: 'get' });

export const reqGetBannerList = () => mockRequests({ url: '/banner', method: 'get' });

export const reqGetFloorList = () => mockRequests({ url: '/floor', method: 'get' });

export const reqGetGoodsList = (data) => requests({ url: '/list', data, method: 'post' });

export const reqGetGoodsInfo = (skuId) => requests({ url: `/item/${skuId}`, method: 'get' });

export const reqAddCart = (skuId, skuNum) => requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post'});

export const reqGetCartList = () => requests({url: '/cart/cartList', method: 'get'});

export const reqDeleteCartGoods = (skuId) => requests({url: `/cart/deleteCart/${skuId}`, method: 'delete'});

export const reqChangeChecked = (skuId, isChecked) => requests({url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get'});

export const reqGetCode = (phone) => requests({url: `/user/passport/sendCode/${phone}`, method: 'get'});

export const reqRegisterUser = (data) => requests({url: '/user/passport/register', method: 'post', data});

export const reqLoginUser = (data) => requests({url: '/user/passport/login', method: 'post', data});

export const reqGetUserInfo = () => requests({url: '/user/passport/auth/getUserInfo', method: 'get'});

export const reqLogoutUser = () => requests({url: '/user/passport/logout', method: 'get'});

export const reqGetTradeInfo = () => requests({url: '/order/auth/trade', method: 'get'});

export const reqGetUserAddress = () => requests({url: '/user/userAddress/auth/findUserAddressList', method: 'get'});

export const reqSubmitOrder = (tradeNo, data) => requests({url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method: 'post'});

export const reqGetOrderInfo = (orderId) => requests({url: `/payment/weixin/createNative/${orderId}`, method: 'get'});

export const reqGetPayStatus = (orderId) => requests({url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'get'});

export const reqGetMyOrder = (page, limit) => requests({url: `/order/auth/${page}/${limit}`, method: 'get'});