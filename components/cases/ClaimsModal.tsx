import React, { useState, useEffect } from 'react'
import { Col, Card, Typography, Row, Table, Button, Modal } from "antd"
import { useSelector } from 'react-redux';
import { RootState } from '../../types';
import useBlockchain from '../../hooks/useBlockchain';

type Props = {
	isVisible: boolean,
	toggle: () => void,
	case_id: number
}

const ClaimsModal = ({ isVisible, toggle, case_id }: Props) => {
	const { FETCH_CLAIMS } = useBlockchain()
	const [claims, setClaims] = useState(null)
	const columns = [{
		title: 'Case ID',
		dataIndex: 'case_id',
		key: 'case_id',
		render: () => <span>{case_id}</span>
	},{
		title: 'Claim ID',
		dataIndex: 'claim_id',
		key: 'claim_id',
	},{
		title: 'Summary',
		dataIndex: 'claim_summary',
		key: 'claim_summary',
	},{
		title: 'Decision Link',
		dataIndex: 'decision_link',
		key: 'decision_link',
	},{
		title: 'Response Link',
		dataIndex: 'response_link',
		key: 'response_link',
	},{
		title: 'Status',
		dataIndex: 'status',
		key: 'status',
	},{
		title: 'Decision Class',
		dataIndex: 'decision_class',
		key: 'decision_class',
	},]

	const fetchClaims = async () => {
		try {
			const response = await FETCH_CLAIMS(case_id)
			console.log('ClaimsModal FETCH_CLAIMS response: ', response)
			setClaims(response)
		} catch (err) {
			console.warn(err)
		}
	}

	useEffect(() => {
		fetchClaims()
	}, [])

	return (
		<Modal title="Claims" visible={isVisible} onOk={toggle} onCancel={toggle} className='claimsModal'>
			<Table columns={columns} dataSource={claims} />
		</Modal>
	)
}

export default ClaimsModal