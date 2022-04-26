import React, { useState, useEffect } from 'react'
import { Col, Card, Row, Table, Button } from "antd"
import basicStyle from "@iso/assets/styles/constants"
import { useSelector } from 'react-redux';
import { RootState } from '../../types';
import { ELECTION_STATUS } from '../../constants/elections';
import { Election } from '../../types/blockchain';

const { rowStyle, colStyle } = basicStyle;

type Props = {
	elections: Election[]
}

const ElectionsTable = ({ elections }: Props) => {
	const { identity } = useSelector((state: RootState) => state.auth)

	const columns = [{
		title: 'ID',
		dataIndex: 'election_id',
		key: 'election_id'
	},{
		title: 'Ballot Name',
		dataIndex: 'ballot_name',
		key: 'ballot_name'
	},{
		title: 'Info URL',
		dataIndex: 'info_url',
		key: 'info_url'
	},{
		title: 'Candidates',
		dataIndex: 'candidates',
		key: 'candidates',
		render: (text) => (
			text.map(item => <><span>{item.name} ({item.votes})</span><br /></>)
		)
	},{
		title: 'Available Seats',
		dataIndex: 'available_seats',
		key: 'available_seats'
	},{
		title: 'Begin Add Candidates',
		dataIndex: 'begin_add_candidates_ts:',
		key: 'begin_add_candidates_ts:'
	},{
		title: 'End Add Candidates',
		dataIndex: 'end_add_candidates_ts',
		key: 'end_add_candidates_ts'
	},{
		title: 'Begin Voting',
		dataIndex: 'begin_votin_tsg',
		key: 'begin_voting_ts'
	},{
		title: 'End Voting',
		dataIndex: 'end_voting_ts',
		key: 'end_voting_ts'
	},{
		title: 'Status',
		dataIndex: 'status',
		key: 'status',
		render: (text) => <span>{ELECTION_STATUS[text]}</span>
	},]

	return (
		<Row style={rowStyle} gutter={24}>
			<Col md={24} sm={24} xs={24} style={colStyle}>
				<Card title='Elections' variant="outlined">
					<Table columns={columns} dataSource={elections} key={'election_id'} />
				</Card>
			</Col>
		</Row>
	)
}

export default ElectionsTable