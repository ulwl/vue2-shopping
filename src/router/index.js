import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import store from '@/store';

Vue.use(VueRouter);

// console.log(VueRouter.prototype);

const originPush = VueRouter.prototype.push;
const originReplace = VueRouter.prototype.replace;

VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, req, res);
  } else {
    originPush.call(this, location, () => { }, () => { })
  }
};

VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject);
  } else {
    originReplace.call(this, location, () => { }, () => { });
  }
}

const router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { y: 0 }
  },
  // mode: 'history'
});

router.beforeEach(async (to, from, next) => {
  const token = store.state.user.token;
  const username = store.state.user.userInfo.name;
  if(token) {
    if(to.path === '/login') {
      next('/home');
    } else {
      if(!username) {
        try {
          await store.dispatch('getUserInfo');
          next();
        } catch (error) {
          await store.dispatch('logoutUser');
          next('/login');
        }
      } else {
        next();
      }
    }
  } else {
    const toPath = to.path;
    if(toPath.indexOf('/trade')!==-1 || toPath.indexOf('/center')!==-1 || toPath.indexOf('/pay') !== -1) {
      next('/login?redirect=' +to.path);
    } else {
      next();
    }
  }
})

export default router;