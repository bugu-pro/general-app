import { defineConfig } from 'umi';

export default defineConfig({
  title: 'bugu-hd-template',
  antd: {},
  dva: {
    skipModelValidate: true,
  },
  mfsu: {
    production: {},
  },
  fastRefresh: {},
  nodeModulesTransform: {
    type: 'none', //不编译npm库的代码，提升编译速度
    exclude: [], //如果npm库为es6代码，可通过 exclude 配置添加额外需要编译的
  },
  webpack5: {},
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
    ios: 8.4,
    android: 4.2,
  },
  // proxy: {
  //   '/api/hii/*': {
  //     'target': 'http://localhost:3000',
  //     'changeOrigin': true,
  //   },
  // }
  theme: {
    '@primary-color': '#1DA57A',
  },
});
