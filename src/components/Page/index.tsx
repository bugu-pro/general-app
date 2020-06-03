import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './index.less';
import Header from './header';
import {Icon} from 'antd-mobile';

export interface PageProps {
  id?: string;
  title?: string | React.ReactNode;
  footer?: string | React.ReactNode;
  children?: string | React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  footerIsFixed?: boolean;
  mainIsFixed?: boolean;
  headerIsFixed?: boolean;
  htmlTitle?: string;
  loading?: boolean;
}

export default class Page extends Component<PageProps, any> {

  static CID = 1;

  static Header = Header;

  static propTypes = {
    id: PropTypes.string,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    footer: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    className: PropTypes.string,
    style: PropTypes.object,
    footerIsFixed: PropTypes.bool,
    mainIsFixed: PropTypes.bool,
    headerIsFixed: PropTypes.bool,
    htmlTitle: PropTypes.string,
    loading: PropTypes.bool,
  };

  static defaultProps = {
    footerIsFixed: false,
    mainIsFixed: false,
    loading: false,
  };

  id = 'Page-' + Page.CID++;

  render() {
    const {
      id,
      title,
      children,
      footer,
      className,
      style,
      footerIsFixed,
      mainIsFixed,
      headerIsFixed,
      loading,
    } = this.props;

    const htmlTitle = this.props.htmlTitle || (typeof title === 'string' ? title : null);
    if (htmlTitle && htmlTitle !== document.title) {
      document.title = htmlTitle;
    }

    const props = {
      role: 'Page',
      id: id || this.id,
      className: classnames(styles['page'], className, {
        [styles['page-footer-fixed']]: footerIsFixed,
        [styles['page-main-fixed']]: mainIsFixed,
        [styles['page-header-fixed']]: headerIsFixed,
        [styles['page-loading']]: loading,
      }),
      style,
    };
    return (
      <section {...props}>
        <header>{typeof title === 'string' ? <h1>{title}</h1> : title}</header>
        <main>{children}</main>
        <footer>{footer}</footer>
        {loading && (
          <div className={styles['loading']}>
            <Icon type="loading" size="lg"/>
          </div>
        )}
      </section>
    );
  }
}
