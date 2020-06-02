import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Button, Icon, Popconfirm, Popover, Tooltip, Menu, Modal, Cascader } from 'antd';
import { Authenticate } from '../../utils/namespace';
import { router, Link } from 'umi';
import './index.less';

@connect(state => ({
  profile: state[Authenticate].authenticate,
}))
class HeaderOperation extends Component {
  static propTypes = {
    profile: PropTypes.object,
    buttons: PropTypes.array,
  };

  handelSwitchCampus = ({ item, key }) => {
    const { profile, dispatch } = this.props;
    const { currentSchool, currentCampus } = profile || {};
    const campusList = currentSchool && currentSchool.campusList || null;

    const targetCampus = campusList && campusList.find(it => it.id === key * 1) || {};

    if (currentCampus && (key * 1 !== currentCampus.id)) {
      Modal.confirm({
        title: `确定切换到${targetCampus.name || '其他校区'}？`,
        content: window.location.pathname !== '/' ? '并将跳转至首页' : null,
        okText: '确定',
        cancelText: '取消',
        onOk() {
          dispatch({type: 'RESET'});
          dispatch({
            type: Authenticate + '/switchCampus',
            payload: {
              id: key,
            },
          });
        },
      });
    }
  };

  render() {
    const { profile, buttons = [], children, dispatch } = this.props;
    const defaultButtons = {
      edit: {
        title: '编辑',
        icon: 'edit',
        onClick: () => {
          console.error('没有实现的编辑操作');
        },
      },
      remove: {
        title: '删除',
        icon: 'cross-circle-o',
        confirm: '',
        onConfirm: () => {
          console.error('没有实现的删除操作');
        },
      },
      cancel: {
        title: '取消',
        icon: 'rollback',
        onClick: e => {
          e.preventDefault();
          router.goBack();
          // dispatch(routerRedux.goBack());
        },
      },
      rollback: {
        title: '返回',
        icon: 'rollback',
        onClick: e => {
          e.preventDefault();
          router.goBack();
        },
      },
      add: {
        title: '添加',
        icon: 'plus',
        onClick: () => {
          console.error('没有实现的添加操作');
        },
      },
      filter: {
        title: '筛选',
        icon: 'filter',
        onClick: () => {
          console.error('没有实现的筛选操作');
        },
      },
      save: {
        title: '保存',
        icon: 'save',
        onClick() {
          console.error('没有实现的保存操作');
        },
      },
    };
    const operations =
      buttons && buttons.length ? (
        <Button.Group className={'page-header-right-operations'}>
          {buttons.map(button => {
            const props = { ...defaultButtons[button.key], ...button };
            const title = props.title;
            const onConfirm = props.onConfirm;
            const confirm = props.confirm;

            if (!props.children) {
              props.children = title || props.key;
            }

            delete props.title;
            delete props.onConfirm;
            delete props.confirm;

            if (props.link) {
              const link = props.link;
              delete props.link;
              return (
                <Tooltip title={title} key={props.key + 'tooltip'}>
                  <Link to={link}>
                    <Button type="ghost" {...props} />
                  </Link>
                </Tooltip>
              );
            }
            const btn = (
              <Tooltip title={title} key={props.key + 'tooltip'}>
                <Button type="ghost" {...props} />
              </Tooltip>
            );

            return onConfirm ? (
              <Popconfirm
                title={confirm || '确定要删除吗？'}
                key={props.key + 'pop-confirm'}
                onConfirm={onConfirm}
              >
                {btn}
              </Popconfirm>
            ) : (
              btn
            );
          })}
        </Button.Group>
      ) : null;

    const handleExit = e => {
      e.preventDefault();
      dispatch({
        type: Authenticate + '/logout',
      });
    };


    const { schoolCampusList, currentSchool, schoolCampusName, schoolId, campusId } = profile || {};
    const campusList = currentSchool && currentSchool.campusList || null;

    const userOperations = profile ? (
      <ul>
        {
          schoolCampusName ?
            <li style={{ marginBottom: '5px' }}>{schoolCampusName}</li>
            :
            null
        }
        <li style={{ display: 'flex' }}>
          <div style={{ flex: 1 }}>
            {
              ((schoolCampusList && schoolCampusList.length > 1) || (campusList && campusList.length > 1)) ?
                <a onClick={() => {
                  let selectedSchoolCampusIds;
                  const selectModal = Modal.confirm({
                    icon: null,
                    title: `切换${(schoolCampusList && schoolCampusList.length > 1) ? '学校' : '校区'}`,
                    content: (
                      <div style={{ padding: '10px 0' }}>
                        <Cascader
                          placeholder="请依次选择学校及校区"
                          defaultValue={[schoolId, campusId]}
                          style={{ width: '100%' }}
                          options={schoolCampusList.map(it => ({
                            value: it.id,
                            label: it.name,
                            children: it.campusList && it.campusList.length ?
                              it.campusList.map(campus => ({
                                value: campus.id,
                                label: campus.name,
                              }))
                              :
                              null,
                          }))}
                          onChange={(value) => {
                            selectedSchoolCampusIds = value;
                          }}
                        />
                      </div>
                    ),
                    cancelText: '取消',
                    okText: '确定',
                    onOk: () => {
                      if (selectedSchoolCampusIds && selectedSchoolCampusIds.length === 2) {
                        if (selectedSchoolCampusIds[1] !== campusId) {
                          selectModal.destroy();

                          const targetSchool = schoolCampusList.find(it => it.id === selectedSchoolCampusIds[0]);
                          const targetCampus = targetSchool && targetSchool.campusList.find(it => it.id === selectedSchoolCampusIds[1]);

                          Modal.confirm({
                            title: `确定切换到${[targetSchool.name, targetCampus.name].join(' - ')}？`,
                            content: window.location.pathname !== '/' ? '并将跳转至首页' : null,
                            okText: '确定',
                            cancelText: '取消',
                            onOk() {
                              dispatch({type: 'RESET'});
                              dispatch({
                                type: Authenticate + '/switchCampus',
                                payload: {
                                  id: selectedSchoolCampusIds[1],
                                },
                              });
                            },
                          });
                        }
                      }
                    },
                  });
                }}>切换{(schoolCampusList && schoolCampusList.length > 1) ? '学校' : '校区'}</a>
                :
                null
            }
          </div>
          <a onClick={handleExit}>退出</a>
        </li>
      </ul>
    ) : null;

    return (
      <div className="page-header-right">
        {operations}
        {children}
        {
          userOperations ?
            <Popover placement="leftTop" title={`用户：${profile.nick || profile.username}`} content={userOperations}>
              <Button type="ghost" shape="circle" style={{ marginLeft: '1em', border: 'none' }}>
                <Icon type={'user'} style={{ fontSize: '32px', color: '#0088ff' }}/>
              </Button>
            </Popover>
            :
            null
        }
      </div>
    );
  }
}

export default HeaderOperation;
