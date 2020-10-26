import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import classnames from 'classnames';
import styles from './index.less';

export interface PageProps {
  id?: string;
  title?: string | React.ReactNode;
  footer?: string | React.ReactNode;
  children?: string | React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  htmlTitle?: string;
  loading?: boolean;
}

export default class Page extends Component<PageProps, any> {
  static CID = 1;

  static propTypes = {
    id: PropTypes.string,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    footer: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    className: PropTypes.string,
    style: PropTypes.object,
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
    const { id, title, children, footer, className, style, loading } = this.props;

    const htmlTitle = this.props.htmlTitle || (typeof title === 'string' ? title : null);
    if (htmlTitle && htmlTitle !== document.title) {
      document.title = htmlTitle;
    }

    const props = {
      role: 'Page',
      id: id || this.id,
      className: classnames(styles['page'], className),
      style,
    };
    return (
      <section {...props}>
        <Spin spinning={!!loading}>
          <header>{typeof title === 'string' ? <h1>{title}</h1> : title}</header>
          <main>{children}</main>
          <footer>{footer}</footer>
        </Spin>
      </section>
    );
  }
}
