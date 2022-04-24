import React, { useState, useEffect } from 'react'
import { Col, Card, Row, Table, Button } from "antd"
import basicStyle from "@iso/assets/styles/constants"
import useBlockchain from '../../hooks/useBlockchain';
import { useSelector } from 'react-redux';
import FileCaseModal from './FileCaseModal';
import ClaimsModal from './ClaimsModal';
import { RootState } from '../../types';

const CaseFilesTable = () => {
	const { identity } = useSelector((state: RootState) => state.auth)
	const { FETCH_CASE_FILES, SHRED_CASE } = useBlockchain()
	const [caseFiles, setCaseFiles] = useState()
	const [isFileCaseModalVisible, setIsFilecaseModalVisible] = useState(false)
	const [isClaimsModalVisible, setIsClaimsModalVisible] = useState(false)
	const [activeCaseId, setActiveCaseId] = useState(null)

	const columns = [{
		title: 'ID',
		dataIndex: 'case_id',
		key: 'case_id'
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
		render: (text: string, record: any) => (
			<><span>{text}</span>&nbsp;&nbsp;&nbsp;<Button onClick={() => openClaimsModal(record)}>View</Button></>
		)
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
	},{
		title: 'Actions',
		key: 'actions',
		render: (text: string, record: any) => (
			identity === record.claimant && (
				<>
					<Button onClick={() => onClickDelete(record.case_id)} danger>Delete</Button>
				</>
			)
		)
	}]

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

	const openClaimsModal = (record: any) => {
		console.log('openClaimsModal, record: ', record)
		setIsClaimsModalVisible(true)
		setActiveCaseId(record.case_id)
	}

	const onClickDelete = async (case_id: number) => {
		if (confirm(`Are you sure you want to delete this case (id: ${case_id})?`)) {
			try {
				const url = await SHRED_CASE(case_id)
				window.open(url, '_self')
			} catch (err) {
				console.warn(err)
			}
		}
	}

	return (
		<Row style={rowStyle} gutter={24}>
			<Col md={24} sm={24} xs={24} style={colStyle}>
				<Card variant="outlined">
					{!!identity && (
						<>
							<Button onClick={() => setIsFilecaseModalVisible(!isFileCaseModalVisible)} type="primary">File New Case</Button>
							<br /><br />
						</>
					)}
					<Table columns={columns} dataSource={caseFiles} key={'case_id'} />
				</Card>
			</Col>
			{!!identity && (
				<FileCaseModal isVisible={isFileCaseModalVisible} toggle={() => setIsFilecaseModalVisible(!isFileCaseModalVisible)} />
			)}
			{isClaimsModalVisible && (
				<ClaimsModal isVisible={isClaimsModalVisible} toggle={() => setIsClaimsModalVisible(!isClaimsModalVisible)} case_id={activeCaseId} />
			)}
		</Row>
	)
}

export default CaseFilesTable