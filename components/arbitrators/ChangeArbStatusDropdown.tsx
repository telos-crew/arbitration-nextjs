import { Menu, Dropdown, Button } from 'antd'
import React from 'react'
import { ARBITRATOR_STATUS_LIST } from '../../constants/arbitrators';
import { useSelector } from 'react-redux';
import { RootState } from '../../types';
import useBlockchain from '../../hooks/useBlockchain';

type Props = {}

const ChangeArbStatusDropdown = (props: Props) => {
	const { identity } = useSelector((state: RootState) => state.auth)
	const { CHANGE_ARB_STATUS } = useBlockchain()

	const changeArbStatus = async (index: number) => {
		try {
			const data = {
				arbitrator: identity,
				new_status: index
			}
			const url = await CHANGE_ARB_STATUS(data)
			window.open(url, '_self')
		} catch (err) {
			console.warn(err)
		}
	}

	const menu = (
		<Menu>
		{ARBITRATOR_STATUS_LIST.map((status: string, index: number) => (
			<Menu.Item key={status} onClick={() => changeArbStatus(index)}>
				{status}
			</Menu.Item>
		))}
	</Menu>		
	)
	return (
    <Dropdown overlay={menu}>
			<Button>Change Status</Button>
    </Dropdown>		
	)
}

export default ChangeArbStatusDropdown