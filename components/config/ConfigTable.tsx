import React from 'react'
import { Config } from '../../types';
import { Card, Table } from 'antd'
import { secondsToDhms } from '../../util';
import ProfileCell from '../profiles/ProfileCell';

type Props = {
	config: Config
}

const ConfigTable = ({ config }: Props) => {

	const columns = [{
		title: 'Admin',
		dataIndex: 'admin',
		render: (text: string) => <ProfileCell account_name={text} size='small' />
	},{
		title: 'Arbitrator Term',
		dataIndex: 'arb_term_length',
		render: (text: number) => secondsToDhms(text)
	},{
		title: 'Available Funds',
		dataIndex: 'available_funds'
	},{
		title: 'Contract Version',
		dataIndex: 'contract_version'
	},{
		title: 'Current Election ID',
		dataIndex: 'current_election_id'
	},{
		title: 'Nomination Period Duration',
		dataIndex: 'election_add_candidates_ts',
		render: (text: number) => secondsToDhms(text)
	},{
		title: 'Election Duration',
		dataIndex: 'election_voting_ts',
		render: (text: number) => secondsToDhms(text)
	},{
		title: 'Fee Structure',
		dataIndex: 'fee_structure'
	},{
		title: '# Arbs to Elect',
		dataIndex: 'max_elected_arbs'
	}]

	return (
		<Card title='Contract Info'>
			<Table columns={columns} dataSource={[config]} key={'case_id'} />
		</Card>
	)
}

export default ConfigTable