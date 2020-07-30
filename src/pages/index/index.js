import React from 'react';
import {connect} from 'dva';
import Page from '../../components/Page';
import styles from './index.less';
import {Authenticate} from '../../utils/namespace';
// import authenticateCache from '../../caches/authenticate';
import moment from 'moment';


function Home({loading, dispatch, profile, menuTree}) {

  const breadcrumb = ['首页'];

  const {schoolCampusName = '欢迎来到后台管理系统'} = profile || {};

  const title = schoolCampusName;
  const headerOperation = <Page.Header.Operation dispatch={dispatch} />;
  const header = <Page.Header breadcrumb={breadcrumb} title={title} operation={headerOperation} />;

  const menuList = menuTree && menuTree.length ? menuTree.reduce((arr, it) => {
    if (it.items && it.items.length) {
      return it.items.reduce((arr, itt) => {
        if (itt.items && itt.items.length) {
          return arr.concat(itt.items);
        }
        return arr;
      }, arr);
    }
    return arr;
  }, []) : null;

  return (
    <Page className={styles['home-page']} mainClassName={styles['page-main']} header={header} loading={!!loading}>

      <div className={styles['welcome']}>
        <h3>今日，</h3>
        <p>{`${moment().format('YYYY年MM月DD日dddd')}，欢迎您使用后台管理系统。`}</p>
      </div>
    </Page>

  );
};

export default connect(state => ({
  menuTree: state[Authenticate].menuTree,
  profile: state[Authenticate].authenticate || {},
  loading: state.loading.global,
}))(Home)
