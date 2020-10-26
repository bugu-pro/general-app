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
  // 页面过多，文件资源较大但情况下开启动态加载
  // chunks: ['vendors', 'umi'],
  // chainWebpack: function (config, { webpack }) {
  //   config.merge({
  //     optimization: {
  //       minimize: true,
  //       splitChunks: {
  //         chunks: 'all',
  //         minSize: 30000,
  //         minChunks: 3,
  //         automaticNameDelimiter: '.',
  //         cacheGroups: {
  //           vendor: {
  //             name: 'vendors',
  //             test({ resource }) {
  //               return /[\\/]node_modules[\\/]/.test(resource);
  //             },
  //             priority: 10,
  //           },
  //         },
  //       },
  //     }
  //   });
  // },
});
