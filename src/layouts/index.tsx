import React, { Component, Fragment, useState, useEffect } from 'react';
import { withRouter, Link, router } from 'umi';
import { connect } from 'dva';
import { BarsOutlined } from '@ant-design/icons';
import { Spin, Menu, Popover, ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import classNames from 'classnames';
import Flex from '../components/Flex';
import { Authenticate as namespace } from '../utils/namespace';
import styles from './index.less';
import { addClass, removeClass } from '../utils/dom';
import { Redirect } from 'react-router';


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
    router.push(link);
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
        <span>智慧校园</span>
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

function SideFooter({ profile, dispatch }) {
  return (
    <footer className={styles['side-footer']}>
      <Popover placement="rightBottom" title={`用户：${profile.nick || profile.username}`} content={
        <ul>
          <li>
            <a onClick={() => {
              dispatch({ type: namespace + '/logout' });
            }}>退出</a>
          </li>
        </ul>
      }>
        <a className={styles['user-menu']}>{profile.nick}</a>
      </Popover>
    </footer>
  );
}


const UserSide = connect(state => ({
  menuTree: state[namespace].menuTree,
  resources: state[namespace].resources,
  loading: state.loading.models[namespace],
}))(
  function Side(props) {

    const {
      profile, loading, dispatch, location, menuTree = [],
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


    return (
      <Fragment>
        <Flex direction="column"
              className={classNames(styles['side'], { [styles['min-side']]: isMin })}
              onTransitionEnd={(e) => {
                if (e.propertyName === 'width') {
                  const event = document.createEvent('HTMLEvents');
                  event.initEvent('resize', true, true);
                  window.dispatchEvent(event);
                }
              }}>
          <SideHeader/>
          <Flex.Item className={styles['side-main']}>
            <Bars isMin={isMin} onChange={setIsMin}/>
            <Spin spinning={!!loading}>
              {
                <Menu
                  mode={isMin ? 'vertical' : 'inline'}
                  defaultOpenKeys={[defaultOpenKeys]}
                  defaultSelectedKeys={[pathname]}
                  onOpenChange={openKeys => setOpenKeys(openKeys.length ? [openKeys.pop()] : [])}
                  openKeys={openKeys}
                >
                  {
                    menuTree && menuTree.map(submenu => (
                      <Menu.SubMenu
                        key={submenu.key}
                        title={
                          <span
                            className={classNames(styles['menu-submenu'], ICON_MAP[submenu.title])}>{submenu.title}</span>
                        }
                      >
                        {
                          submenu.items.map((menus, mi) =>
                            <Menu.ItemGroup
                              key={'menu-item-group-' + submenu.key + '-' + mi}
                              title={menus.title}
                            >
                              {
                                menus.items.map((item) => (
                                  <Menu.Item key={item.link || item.key} id={item.link}>
                                    <MenuItemContent menu={item} min={isMin} dispatch={dispatch}/>
                                  </Menu.Item>
                                ))
                              }
                            </Menu.ItemGroup>,
                          )
                        }
                      </Menu.SubMenu>
                    ))}
                </Menu>
              }
            </Spin>
          </Flex.Item>
          {
            profile ?
              <SideFooter profile={profile} dispatch={dispatch}/>
              :
              null
          }
        </Flex>
      </Fragment>
    );
  },
);


const AppLayout = withRouter(function AppLayout({ children, ...props }) {
  return (
    <div className={styles['layout']}>
      <UserSide {...props}  />
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



