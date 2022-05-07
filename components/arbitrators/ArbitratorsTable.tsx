import React, { useEffect, useState } from 'react'
import { Card, Table } from "antd"
import basicStyle from "@iso/assets/styles/constants"
import { FETCH_ARBITRATORS } from '../../constants/elections';
import { Arbitrator } from '../../types/blockchain';
import ProfileCell from '../profiles/ProfileCell';
import { RootState } from '../../types';
import { useSelector } from 'react-redux';
import { ARBITRATOR_STATUS_LIST } from '../../constants/arbitrators';
import ChangeArbStatusDropdown from './ChangeArbStatusDropdown';

const { rowStyle, colStyle } = basicStyle;

type Props = {
	arbitrators: Arbitrator[]
}

const ArbitratorsTable = ({ arbitrators: initialArbitrators }: Props) => {
	const { identity } = useSelector((state: RootState) => state.auth);
	const [arbitrators, setArbitrators] = useState(initialArbitrators)

	const fetchArbitrators = async () => {
		try {
			const arbitratorData = await FETCH_ARBITRATORS()
			setArbitrators(arbitratorData)
		} catch (error) {
			console.warn(error)
		}
	}

	useEffect(() => {
		const arbitratorsInterval = setInterval(fetchArbitrators, 10000)

		return () => {
			clearInterval(arbitratorsInterval)
		}
	}, [])

	const columns = [{
		title: 'Arbitrator',
		dataIndex: 'arb',
		render: (text: string) => <ProfileCell account_name={text} />
	},{
		title: 'Status',
		dataIndex: 'arb_status',
		render: (text: number) => <span>{ARBITRATOR_STATUS_LIST[text]}</span>
	},{
		title: 'Open Cases',
		dataIndex: 'open_case_ids',
	},{
		title: 'Closed Cases',
		dataIndex: 'closed_case_ids',
	},{
		title: 'Credentials',
		dataIndex: 'credentials_link',
	},{
		title: 'Elected',
		dataIndex: 'elected_time',
	},{
		title: 'Term Expires',
		dataIndex: 'term_expiration',
	},{
		title: 'Languages',
		dataIndex: 'languages',
	}, {
		title: 'Actions',
		render: (text, record) => (record.arb === identity && <ChangeArbStatusDropdown />)
	}]

	return (
		<Card title='Arbitrators'>
			<Table columns={columns} dataSource={arbitrators} key={'arb'} />
		</Card>
	)
}

export default ArbitratorsTable