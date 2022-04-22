import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Layout } from 'antd';
import appActions from '@iso/redux/app/actions';
// import TopbarNotification from './TopbarNotification';
import TopbarUser from './TopbarUser';
import TopbarWrapper from './Topbar.styles';
import { TopbarMenuIcon } from '@iso/config/icon.config';
import ConnectButton from "./ConnectButton";
import { getUrlParam } from '../../util/url';
import { RootState } from '../../types/redux';
import useBlockchain from '../../hooks/useBlockchain';

const { Header } = Layout;
const { toggleCollapsed } = appActions;

const TopBar = () => {
  const dispatch = useDispatch();
  const { CREATE_IDENTITY_REQUEST, FETCH_USER_PROFILE } = useBlockchain()
  const { App, auth: { identity } } = useSelector((state: RootState) => state);
  const { locale } = useSelector((state: RootState) => state.LanguageSwitcher.language)
  const customizedTheme = useSelector((state: RootState) => state.ThemeSwitcher.layoutTheme)
  const { collapsed, openDrawer } = App;
  const isCollapsed = collapsed && !openDrawer;

  const toggleIsCollapsed = () => {
    dispatch(toggleCollapsed());
  }

  const styling = {
    background: customizedTheme.backgroundColor,
    position: 'fixed',
    width: '100%',
    height: 70,
  }

  const createIdentityRequest = () => {
    const url = CREATE_IDENTITY_REQUEST()
    window.open(url, '_self')
  }

  const login = async (identity: string) => {
    dispatch({
      type: 'UPDATE_IDENTITY',
      data: {
        identity
      }
    })
    try {
      const profile = await FETCH_USER_PROFILE(identity)
      dispatch({
        type: 'UPDATE_PROFILES',
        data: {
          profiles: [profile]
        }
      })
    } catch (err) {
      console.warn(err)
    }
  }

  useEffect(() => {
    console.log('window.location.href is: ', window.location.href)
    const id = getUrlParam(window.location.href, 'id')
    if (id) {
      login(id)
    }
  }, [])

  return (
    <TopbarWrapper>
      <Header
        style={styling}
        className={
          isCollapsed ? 'isomorphicTopbar collapsed' : 'isomorphicTopbar'
        }
      >
        <div className="isoLeft">
          <button
            className={
              isCollapsed ? 'triggerBtn menuCollapsed' : 'triggerBtn menuOpen'
            }
            style={{ color: customizedTheme.textColor }}
            onClick={toggleIsCollapsed}
          >
            <TopbarMenuIcon size={24} color={customizedTheme.textColor} />
          </button>
        </div>

        <ul className="isoRight">
          {/* <li className="isoSearch">
            <TopbarSearch locale={locale} />
          </li>

          <li
            onClick={() => this.setState({ selectedItem: 'notification' })}
            className="isoNotify"
          >
            <TopbarNotification locale={locale} />
          </li>

          <li
            onClick={() => this.setState({ selectedItem: 'message' })}
            className="isoMsg"
          >
            <TopbarMessage locale={locale} />
          </li>
          <li
            onClick={() => this.setState({ selectedItem: 'addToCart' })}
            className="isoCart"
          >
            <TopbarAddtoCart url={url} locale={locale} />
          </li> */}
            {identity ? (
              <li
                className="isoUser"
              >
                <TopbarUser locale={locale} />
              </li>
            ) : (
              <ConnectButton createIdentityRequest={createIdentityRequest} />
            )}
        </ul>
      </Header>
    </TopbarWrapper>
  );
}

export default TopBar
