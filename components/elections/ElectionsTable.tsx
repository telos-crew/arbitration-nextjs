import React, { useState, useEffect } from 'react'
import { Col, Card, Row, Table, Button } from "antd"
import basicStyle from "@iso/assets/styles/constants"
import { useSelector } from 'react-redux';
import { RootState } from '../../types';
import { ELECTION_STATUS, STRING_TO_LOCALE_TIME } from '../../constants/elections';
import { Election } from '../../types/blockchain';
import { ZERO_TIME } from '../../util';

const { rowStyle, colStyle } = basicStyle;

type Props = {
	elections: Election[]
}

const ElectionsTable = ({ elections }: Props) => {
	const { identity } = useSelector((state: RootState) => state.auth)

	const columns = [{
		title: 'ID',
		dataIndex: 'election_id',
	},{
		title: 'Ballot Name',
		dataIndex: 'ballot_name',
	},{
		title: 'Info URL',
		dataIndex: 'info_url',
	},{
		title: 'Candidates',
		dataIndex: 'candidates',
		render: (text) => (
			text.map(item => <><span>{item.name} ({item.votes})</span><br /></>)
		)
	},{
		title: 'Seats',
		dataIndex: 'available_seats',
	},{
		title: 'Start Add Candidates',
		dataIndex: 'begin_add_candidates_ts',
		render: (time: string) => <span>{time !== ZERO_TIME && STRING_TO_LOCALE_TIME(time)}</span>
	},{
		title: 'End Add Candidates',
		dataIndex: 'end_add_candidates_ts',
		render: (time: string) => <span>{time !== ZERO_TIME && STRING_TO_LOCALE_TIME(time)}</span>
	},{
		title: 'Start Voting',
		dataIndex: 'begin_voting_ts',
		render: (time: string) => <span>{time !== ZERO_TIME && STRING_TO_LOCALE_TIME(time)}</span>
	},{
		title: 'End Voting',
		dataIndex: 'end_voting_ts',
		render: (time: string) => <span>{time !== ZERO_TIME && STRING_TO_LOCALE_TIME(time)}</span>
	},{
		title: 'Status',
		dataIndex: 'status',
		key: 'status',
		render: (text) => <span>{ELECTION_STATUS[text]}</span>
	},]
	console.log('process.env.NEXT_PUBLIC_ARBITRATION_CONTRACT: ', process.env.NEXT_PUBLIC_ARBITRATION_CONTRACT)
	console.log('elections: ', elections)

	return (
		<Row style={rowStyle} gutter={24}>
			<Col md={24} sm={24} xs={24} style={colStyle}>
				<Card title='Elections'>
					<Table columns={columns} dataSource={elections} key={'election_id'} />
				</Card>
			</Col>
		</Row>
	)
}

export default ElectionsTable