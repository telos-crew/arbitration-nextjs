import { combineReducers } from 'redux';
import App from '@iso/redux/app/reducer';
import ThemeSwitcher from '@iso/redux/themeSwitcher/reducer';
import LanguageSwitcher from '@iso/redux/languageSwitcher/reducer';

export default combineReducers({
  App,
  LanguageSwitcher,
  ThemeSwitcher,
});
