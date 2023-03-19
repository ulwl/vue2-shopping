// import Home from '@/views/Home';
// import Search from '@/views/Search';
import Register from '@/views/Register';
import Login from '@/views/Login';
import Detail from '@/views/Detail';
import AddCartSuccess from '@/views/AddCartSuccess';
import ShopCart from '@/views/ShopCart';
import Trade from '@/views/Trade';
import Pay from '@/views/Pay';
import PaySuccess from '@/views/PaySuccess';
import Center from '@/views/Center';
import MyOrder from '@/views/Center/MyOrder';
import GroupOrder from '@/views/Center/GroupOrder';

export default [
  {
    path: '/home',
    component: () => import('@/views/Home'),
    meta: {isShowFooter: true}
  }, {
    path: '/',
    redirect: '/home'
  }, {
    path: '/search/:keyword?',
    name: 'search',
    component: () => import('@/views/Search'),
    meta: {isShowFooter: true}
  }, {
    path: '/register',
    component: Register,
    meta: {isShowFooter: false}
  }, {
    path: '/login',
    component: Login,
    meta: {isShowFooter: false}
  }, {
    path: '/detail/:skuId',
    component: Detail,
    meta: {isShowFooter: true}
  }, {
    path: '/addcartsuccess',
    name: 'addcartsuccess',
    component: AddCartSuccess,
    meta: {isShowFooter: true}
  }, {
    path: '/shopcart',
    component: ShopCart,
    meta: {isShowFooter: true}
  }, {
    path: '/trade',
    component: Trade,
    meta: {isShowFooter: true},
    beforeEnter(to, from, next) {
      if(from.path === '/shopcart') {
        next();
      } else {
        next(false);
      }
    }
  }, {
    path: '/pay',
    component: Pay,
    meta: {isShowFooter: true},
    beforeEnter(to, from, next) {
      if(from.path === '/trade') {
        next();
      } else {
        next(false);
      }
    }
  }, {
    path: '/paysuccess',
    component: PaySuccess,
    meta: {isShowFooter: true},
    beforeEnter(to, from, next) {
      if(from.path === '/pay') {
        next();
      } else {
        next(false);
      }
    }
  }, {
    path: '/center',
    component: Center,
    meta: {isShowFooter: true},
    redirect: '/center/myorder',
    children: [
      {
        path: '/center/myorder',
        component: MyOrder
      }, {
        path: '/center/grouporder',
        component: GroupOrder
      }
    ]
  }
]
