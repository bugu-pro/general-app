import { defineConfig } from 'umi';

export default defineConfig({
  title: 'bugu',
  antd: {},
  dva: {
    skipModelValidate: true,
  },
  dynamicImport: {
    loading: '@/Loading',
  },
  hash: true,
  targets: {
    ios: '8.4',
    android: '4.2',
  },
  // proxy: {
  //   '/api/hii/*': {
  //     'target': 'http://smart-campus-mp-test.yunzhiyuan100.com.cn/',
  //     'changeOrigin': true,
  //   },
  // }
  theme: {
    '@primary-color': '#1DA57A',
  },
});
