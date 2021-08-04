import React from 'react';
import {connect} from 'dva';
import moment from 'moment';
import Page from '@/components/Page';
import {Authenticate} from '@/utils/namespace';
import styles from './index.less';


const Home = (props:any) => {

  const {loading, profile, dispatch} = props;

  const breadcrumb = ['首页'];

  const {schoolCampusName = '欢迎来到后台管理系统'} = profile || {};

  const title = schoolCampusName;
  const headerOperation = <Page.Header.Operation dispatch={dispatch} />;
  const header = <Page.Header breadcrumb={breadcrumb} title={title} operation={headerOperation} />;

  return (
    <Page className={styles['home-page']} mainClassName={styles['page-main']} header={header} loading={!!loading}>

      <div className={styles['welcome']}>
        <h3>今日，</h3>
        <p>{`${moment().format('YYYY年MM月DD日dddd')}，欢迎您使用后台管理系统。`}</p>
      </div>
    </Page>

  );
};

export default connect((state:any) => ({
  menuTree: state[Authenticate].menuTree,
  profile: state[Authenticate].authenticate || {},
  loading: state.loading.global,
}))(Home)
