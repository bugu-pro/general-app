import Model from 'dva-model';
import { Authenticate as namespace } from '../utils/namespace';
// import authenticateCache from '../caches/authenticate';

export default Model(
  {
    namespace,
    state: {},
    subscriptions: {
      // setup({dispatch, history}) {
      // }
    },
    effects: {},
    reducers: {},
  },
  {
    //services
  },
  {
    //caches
    //login: authenticateCache
  },
);
