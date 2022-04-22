import { combineReducers } from 'redux';
import App from '@iso/redux/app/reducer';
import ThemeSwitcher from '@iso/redux/themeSwitcher/reducer';
import LanguageSwitcher from '@iso/redux/languageSwitcher/reducer';
import auth from './auth/authReducer'

export default combineReducers({
  App,
  auth,
  LanguageSwitcher,
  ThemeSwitcher,
});
