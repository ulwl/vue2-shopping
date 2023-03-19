import axios from 'axios';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import store from '@/store';

const requests = axios.create({
  baseURL: '/api',
  timeout: 5000
});

requests.interceptors.request.use(config => {
  nprogress.start();
  // console.log(store.state.detail.uuid_token);
  if(store.state.detail.uuid_token) {
    config.headers.userTempId = store.state.detail.uuid_token;
  }
  if(store.state.user.token) {
    config.headers.token = store.state.user.token;
    // 如果有token，则把假的uuid清空
    config.headers.userTempId = '';
  }
  return config;
});

requests.interceptors.response.use(res => {
  nprogress.done();
  return res.data;
}, error => {
  return Promise.reject(new Error('Response Failed!'));
});

export default requests;