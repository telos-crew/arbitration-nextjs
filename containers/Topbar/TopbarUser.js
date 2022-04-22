import React, { useState } from 'react';
import { useRouter } from 'next/router'
import { useDispatch,  useSelector } from 'react-redux';
import Popover from '@iso/components/uielements/popover';
import TopbarDropdownWrapper from './TopbarDropdown.styles';

export default function TopbarUser() {
  const dispatch = useDispatch()
  const avatar = useSelector(state => (state.auth.profiles && state.auth.profiles[0] && state.auth.profiles[0].avatar) || '')
  const [visible, setVisibility] = useState(false);
  function handleVisibleChange() {
    setVisibility(visible => !visible);
  }

  const logout = () => {
    dispatch({ type: 'LOG_OUT'})
  }

  const content = (
    <TopbarDropdownWrapper className="isoUserDropdown">
      <a className="isoDropdownLink" onClick={logout}>
        Logout
      </a>
    </TopbarDropdownWrapper>
  );

  return (
    <Popover
      content={content}
      trigger="click"
      visible={visible}
      onVisibleChange={handleVisibleChange}
      arrowPointAtCenter={true}
      placement="bottomLeft"
    >
      <div className="isoImgWrapper">
        <img alt="user" src={avatar} />
      </div>
    </Popover>
  );
}
