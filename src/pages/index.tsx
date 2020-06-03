import React from 'react';
import Page from '@/components/Page';
import styles from './index.less';

export default function() {
  return (
    <Page className={styles.normal} htmlTitle="首页">
      <div className={styles.welcome} />
    </Page>
  );
}
