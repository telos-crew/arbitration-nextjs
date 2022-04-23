import React from 'react';
import App from 'next/app';
import { Provider } from 'react-redux';
import Web3Provider from '../library/Web3Provider'
import withRedux from 'next-redux-wrapper';
import ThemeProvider from '../containers/ThemeProvider';
import initStore from '../redux/store';
import 'antd/dist/antd.css';
import '@glidejs/glide/dist/css/glide.core.min.css';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.core.css';
import '../style/global.css';
import './index.scss'

class CustomApp extends App {
  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Provider store={store}>
        <Web3Provider>
          <ThemeProvider>
            <Component {...pageProps} />
          </ThemeProvider>
        </Web3Provider>
      </Provider>
    );
  }
}

export default withRedux(initStore)(CustomApp);
