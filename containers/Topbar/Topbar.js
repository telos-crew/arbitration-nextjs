import React, { useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Web3Context } from "../../library/Web3Provider";
import { ethers } from "ethers";
import { Layout } from 'antd';
import appActions from '@iso/redux/app/actions';
import TopbarNotification from './TopbarNotification';
import TopbarMessage from './TopbarMessage';
import TopbarSearch from './TopbarSearch';
import TopbarUser from './TopbarUser';
import TopbarAddtoCart from './TopbarAddToCart';
import TopbarWrapper from './Topbar.styles';
import { TopbarMenuIcon } from '@iso/config/icon.config';
import ConnectButton from "./ConnectButton";

const { Header } = Layout;
const { toggleCollapsed } = appActions;

const TopBar = () => {
  const { acct, eth } = useContext(Web3Context);
  const [account, setAccount] = acct;
  const [ethersProvider, setEthersProvider] = eth;
  const dispatch = useDispatch();
  const { App } = useSelector(state => state);
  const { locale } = useSelector(state => state.LanguageSwitcher.language)
  const customizedTheme = useSelector(state => state.ThemeSwitcher.layoutTheme)
  const { collapsed, openDrawer } = App;
  const isCollapsed = collapsed && !openDrawer;

  const toggleIsCollapsed = () => {
    dispatch(toggleCollapsed());
  }

  useEffect(() => {
    //account found in local storage
    if (window.localStorage.getItem("user") !== null) {
      //save account to context
      setAccount(window.localStorage.getItem("user"));

      //create new ethers provider, save to context
      const ep = new ethers.providers.Web3Provider(window.ethereum);
      setEthersProvider(new ethers.providers.Web3Provider(window.ethereum));

      //query balance, format, save to context
      // let balance = await ep.getBalance(accounts[0])
      // let formattedBal = ethers.utils.formatEther(balance)
      // setBalance(formattedBal)
    }
  }, []);

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
            {account ? (
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
