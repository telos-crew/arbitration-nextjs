import React, { useState, useEffect } from 'react'
import { Col, Card, Typography, Row, Table } from "antd"
import basicStyle from "@iso/assets/styles/constants"
import useBlockchain from '../../hooks/useBlockchain';

const columns = [{
	title: 'ID',
	dataIndex: 'case_id',
	key: 'case_id',
},{
	title: 'Status',
	dataIndex: 'case_status',
	key: 'case_status',
},{
	title: 'Claimant',
	dataIndex: 'claimant',
	key: 'claimant',
},{
	title: 'Respondant',
	dataIndex: 'respondant',
	key: 'respondant',
},{
	title: 'Arbitrators',
	dataIndex: 'arbitrators',
	key: 'arbitrators',
},{
	title: 'Approvals',
	dataIndex: 'approvals',
	key: 'approvals',
},{
	title: '# of Claims',
	dataIndex: 'number_claims',
	key: 'number_claims',
},{
	title: 'Languages',
	dataIndex: 'required_langs',
	key: 'required_langs',
},{
	title: 'Ruling',
	dataIndex: 'case_ruling',
	key: 'case_ruling',
},{
	title: 'Last Updated',
	dataIndex: 'update_ts',
	key: 'update_ts',
},]

const CaseFilesTable = () => {
	const { FETCH_CASE_FILES } = useBlockchain()
	const [caseFiles, setCaseFiles] = useState()

	const { rowStyle, colStyle } = basicStyle;

	const fetchCaseFiles = async () => {
		try {
			const response = await FETCH_CASE_FILES()
			setCaseFiles(response)
		} catch (err) {
			console.warn(err)
		}
	}

	useEffect(() => {
		fetchCaseFiles()
	}, [])

	return (
		<Row style={rowStyle} gutter={24}>
			<Col md={24} sm={24} xs={24} style={colStyle}>
				<Card variant="outlined">
					<Table columns={columns} dataSource={caseFiles} />
				</Card>
			</Col>
		</Row>
	)
}

export default CaseFilesTable