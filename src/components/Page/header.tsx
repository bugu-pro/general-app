import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './index.less';

export interface HeaderProps {
  title?: string | React.ReactNode;
  children?: string | React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default class Header extends Component<HeaderProps, any> {
  static propTypes = {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    className: PropTypes.string,
    style: PropTypes.object,
  };

  render() {
    const {title, children, className, style} = this.props;
    const props = {
      className: classnames(styles['page-header'], className),
      style,
    };
    return (
      <header {...props}>
        {typeof title === 'string' ? <h1>{title}</h1> : title}
        {children}
      </header>
    );
  }
}
