import React, { Component, Fragment, useState, useEffect } from 'react';
import { withRouter, Link, history } from 'umi';
import { Redirect } from 'react-router';
import zhCN from 'antd/es/locale/zh_CN';
import classNames from 'classnames';
import { connect } from 'dva';
import { BarsOutlined, UserOutlined } from '@ant-design/icons';
import { Spin, Menu, Popover, ConfigProvider } from 'antd';
import Flex from '../components/Flex';
import { Authenticate as namespace } from '../utils/namespace';
import styles from './index.less';
import { addClass, removeClass } from '../utils/dom';


const ICON_MAP = {
  '管理': styles['icon-guanli'],
  '管理员': styles['icon-admin'],
  '考勤': styles['icon-kaoqin'],
  '基础配置': styles['icon-config'],
};


function MenuItemContent({ menu }) {

  const { link, title, onClick } = menu;
  const _onClick = onClick || (() => {
    // debugger
    history.push(link);
  });
  return (
    <a onClick={_onClick}>
      <span>{title}</span>
    </a>
  );
}

function SideHeader() {
  return (
    <header className={styles['side-header']}>
      <Link to="/">
        <span>管理后台</span>
      </Link>
    </header>
  );
}

function Bars({ onChange, isMin }) {
  return (
    <a className={styles['menu-handle']} onClick={() => {
      onChange(!isMin);
    }}>
      <BarsOutlined />
    </a>
  );
}

const UserSide = connect(state => ({
  resources: state[namespace].resources,
  loading: state.loading.models[namespace],
}))(
  function Side(props) {

    const {
      profile, loading, dispatch, location,
    } = props;

    const [isMin, setIsMin] = useState(true);

    useEffect(() => {
      dispatch({
        type: namespace + '/menu',
      });
    }, [dispatch]);

    useEffect(() => {
      if (isMin) {
        addClass(document.documentElement, 'side-small');
      } else {
        removeClass(document.documentElement, 'side-small');
      }
    }, [isMin]);

    const { pathname } = location;
    const [, defaultOpenKeys] = pathname.split('/');


    const [openKeys, setOpenKeys] = useState([]);

    const menuTree = [{
      key: 'manage',
      title: '用户管理',
      icon: <UserOutlined />,
      children: [{
        key: 'list',
        title: '用户列表',
        link: '/'
      }, {
        key: 'visitor',
        title: '访客列表',
        link: '/visitor'
      }]
    }];

    return (
      <Fragment>
        <Flex direction="column"
          className={classNames(styles['side'], { [styles['min-side']]: isMin })}>
          <SideHeader />
          <Flex.Item className={styles['side-main']}>
            <Bars isMin={isMin} onChange={setIsMin} />
            <Spin spinning={!!loading}>
              {
                <Menu
                  theme="dark"
                  mode={'inline'}
                  inlineCollapsed={!!isMin}
                  defaultOpenKeys={[defaultOpenKeys]}
                  defaultSelectedKeys={[pathname]}
                  onOpenChange={openKeys => setOpenKeys(openKeys.length ? [openKeys.pop()] : [])}
                  openKeys={openKeys}
                >
                  {
                    menuTree && menuTree.map(submenu => (
                      <Menu.SubMenu
                        key={submenu.key}
                        icon={submenu.icon}
                        title={<span>{submenu.title}</span>}
                      >
                        {
                          submenu.children.map((menu) => (
                            <Menu.Item key={menu.link || menu.key}>
                              <MenuItemContent menu={menu} min={isMin} dispatch={dispatch} />
                            </Menu.Item>
                          ))
                        }
                      </Menu.SubMenu>
                    ))}
                </Menu>
              }
            </Spin>
          </Flex.Item>
        </Flex>
      </Fragment>
    );
  },
);


const AppLayout = withRouter(function AppLayout({ children, ...props }) {
  return (
    <div className={styles['layout']}>
      <UserSide {...props} />
      <div className={styles['main']}>
        {children}
      </div>
    </div>
  );
});

function BaseLayout({ location, children, ...props }) {
  const { pathname } = location;
  const notLayoutUrlList = ['/login', '/reset-password'];
  if (notLayoutUrlList.indexOf(pathname) >= 0) {
    return children;
  }
  return (
    <AppLayout {...props} location={location}>{children}</AppLayout>
  );
}

const PrivateRoute = ({ children, location, profile }) => {
  return (
    profile && profile.token ?
      children
      :
      <Redirect
        to={{
          pathname: '/login',
          state: { from: location },
        }}
      />
  );
};

function CheckProfile(props) {
  const { location: { pathname }, children } = props;
  if (pathname === '/login' || pathname === '/reset-password') {
    return children;
  } else {
    return <PrivateRoute {...props} />;
  }
}

class ErrorBoundary extends Component {
  state = {
    error: null,
    info: null,
  };

  componentDidCatch(error, info) {
    this.setState({ error, info });
  }

  render() {
    const { children } = this.props;
    const { error, info } = this.state;
    return (
      <Fragment>
        {children}
        {
          error ?
            <div>
              <h1>出错了</h1>
              <div>{error.message}</div>
              <div>{info}</div>
            </div>
            :
            null
        }
      </Fragment>
    );
  }
}

const App = connect(state => ({
  profile: state[namespace].authenticate,
}))(
  function _App({ children, ...props }) {
    return (
      <ConfigProvider locale={zhCN}>
        <ErrorBoundary {...props}>
          <CheckProfile {...props}>
          <BaseLayout {...props}>
            {children}
          </BaseLayout>
          </CheckProfile>
        </ErrorBoundary>
      </ConfigProvider>
    );
  },
);

export default App;



