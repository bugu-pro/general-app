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
  targets: {
    ie: 11,
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
