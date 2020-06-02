import { IConfig } from 'umi-types';

// ref: https://umijs.org/config/
const config: IConfig =  {
  treeShaking: true,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: { webpackChunkName: true },
      title: 'bugu',
      dll: true,
      hd: true,
      fastClick: true,

      routes: {
        exclude: [
          /models\//,
          /utils\//,
          /caches\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
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
}

export default config;
