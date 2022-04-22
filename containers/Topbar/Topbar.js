import React, { useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Web3Context } from "../../library/Web3Provider";
import { ethers } from "ethers";
import { Layout } from 'antd';
import appActions from '@iso/redux/app/actions';
// import TopbarNotification from './TopbarNotification';
import TopbarUser from './TopbarUser';
import TopbarWrapper from './Topbar.styles';
import { TopbarMenuIcon } from '@iso/config/icon.config';
import ConnectButton from "./ConnectButton";

const { Header } = Layout;
const { toggleCollapsed } = appActions;

const TopBar = () => {
  const dispatch = useDispatch();
  const { App, auth: { identity } } = useSelector(state => state);
  const { locale } = useSelector(state => state.LanguageSwitcher.language)
  const customizedTheme = useSelector(state => state.ThemeSwitcher.layoutTheme)
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
              <ConnectButton />
            )}
        </ul>
      </Header>
    </TopbarWrapper>
  );
}

export default TopBar
