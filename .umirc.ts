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
  plugins: ['@alitajs/hd'],
  hd: {
    // same as config.theme, default set @hd: 2px
    theme: {},
    px2rem: {
      rootValue: 100,
      unitPrecision: 5,
      propWhiteList: [],
      propBlackList: [],
      exclude: false,
      selectorBlackList: [],
      ignoreIdentifier: false,
      replace: true,
      mediaQuery: false,
      minPixelValue: 0,
    },
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
