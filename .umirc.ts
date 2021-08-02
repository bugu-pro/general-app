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
  mfsu: {},
  fastRefresh: {},
  nodeModulesTransform: {
    type: 'none', //不编译npm库的代码，提升编译速度
    exclude: [], //如果npm库为es6代码，可通过 exclude 配置添加额外需要编译的
  },
  webpack5: {},
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
});
