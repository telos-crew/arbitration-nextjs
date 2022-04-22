import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Popover from '@iso/components/uielements/popover';
import authAction from '../../authentication/actions';
import TopbarDropdownWrapper from './TopbarDropdown.styles';

const { logout } = authAction;
import userpic from '@iso/assets/images/user1.png';

export default function TopbarUser() {
  const [visible, setVisibility] = useState(false);
  const dispatch = useDispatch();
  function handleVisibleChange() {
    setVisibility(visible => !visible);
  }

  const content = (
    <TopbarDropdownWrapper className="isoUserDropdown">
      <a className="isoDropdownLink">Membership</a>
      <a className="isoDropdownLink">Inventory</a>
      <a className="isoDropdownLink">History</a>
      <a className="isoDropdownLink" onClick={() => dispatch(logout())}>
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
        <img alt="user" src={userpic} />
        <span className="userActivity online" />
      </div>
    </Popover>
  );
}
