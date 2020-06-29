import { defineConfig } from 'umi';

export default defineConfig({
  title: 'bugu-management',
  antd: {},
  dva: {
    skipModelValidate: true
  },
  hash: true,
  // proxy: {
  //   '/api/hii/*': {
  //     'target': 'http://smart-campus-mp-test.yunzhiyuan100.com.cn/',
  //     'changeOrigin': true,
  //   },
  // }
  theme: {
    '@primary-color': '#1DA57A',
  },
})

