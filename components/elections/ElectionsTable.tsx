import React, { useEffect, useState } from 'react'
import { Col, Card, Row, Table } from "antd"
import basicStyle from "@iso/assets/styles/constants"
import { ELECTION_STATUS, FETCH_ELECTIONS, STRING_TO_LOCALE_TIME } from '../../constants/elections';
import { Election } from '../../types/blockchain';
import { ZERO_TIME } from '../../util';

const { rowStyle, colStyle } = basicStyle;

type Props = {
	elections: Election[]
}

const ElectionsTable = ({ elections: initialElections }: Props) => {
	const [elections, setElections] = useState(initialElections)

	const fetchElections = async () => {
		try {
			const electionsData = await FETCH_ELECTIONS()
			setElections(electionsData)
		} catch (error) {
			console.warn(error)
		}
	}

	useEffect(() => {
		const electionsInterval = setInterval(fetchElections, 10000)

		return () => {
			clearInterval(electionsInterval)
		}
	}, [])

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
		render: (text) => <span>{ELECTION_STATUS[text]}</span>
	},]

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