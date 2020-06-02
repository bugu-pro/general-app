import React from 'react';
import styles from './index.less';

const BasicLayout: React.FC = props => {
  return (
    <div className={styles.normal}>
      <h1 className={styles.title}>Welcome to Bugu!</h1>
      {props.children}
    </div>
  );
};

export default BasicLayout;
