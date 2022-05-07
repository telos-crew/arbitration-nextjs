import React, { useState, useEffect } from 'react'
import { Card, Table, Button } from "antd"
import useBlockchain from '../../hooks/useBlockchain';
import { useSelector } from 'react-redux';
import FileCaseModal from './FileCaseModal';
import ClaimsModal from './ClaimsTable';
import { CaseFile, Config, RootState } from '../../types';
import { CASE_STATUS_LIST } from '../../constants/case';
import { LANG_CODES_LIST } from '../../constants/lang';
import ProfileCell from '../profiles/ProfileCell';

type Props = {
	caseFiles: CaseFile[],
	case_id?: number,
	config: Config
}

const CaseFilesTable = ({ caseFiles: initialCaseFiles, config, case_id }: Props) => {
	const { FETCH_CASE_FILES, SHRED_CASE, READY_CASE, ASSIGN_TO_CASE } = useBlockchain()
	const { identity } = useSelector((state: RootState) => state.auth)
	const [caseFiles, setCaseFiles] = useState(initialCaseFiles)
	const [isFileCaseModalVisible, setIsFilecaseModalVisible] = useState(false)

	const { admin } = config

	const columns = [{
		title: 'ID',
		dataIndex: 'case_id',
		key: 'case_id'
	},{
		title: 'Status',
		dataIndex: 'case_status',
		key: 'case_status',
		render: (text: string, record: CaseFile) => (
			<span>{CASE_STATUS_LIST[record.case_status]}</span>
		)
	},{
		title: 'Claimant',
		dataIndex: 'claimant',
		key: 'claimant',
		render: (text: string) => <ProfileCell account_name={text} size='small' />
	},{
		title: 'Respondant',
		dataIndex: 'respondant',
		key: 'respondant',
		render: (text: string) => <ProfileCell account_name={text} size='small' />
	},{
		title: 'Arbitrators',
		dataIndex: 'arbitrators',
		key: 'arbitrators',
		render: (text: string[]) => (
			text.map((arb: string) => <ProfileCell account_name={arb} key={arb} size='small' />)
		)
	},{
		title: 'Approvals',
		dataIndex: 'approvals',
		key: 'approvals',
	},{
		title: '# of Claims',
		dataIndex: 'number_claims',
		key: 'number_claims'
	},{
		title: 'Languages',
		dataIndex: 'required_langs',
		key: 'required_langs',
		render: (text: string, { required_langs }: CaseFile) => (
			<>
				<span>{required_langs.map((langCode: number) => `${LANG_CODES_LIST[langCode]} `)}</span>
			</>
		)
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
			<>
				{identity === record.claimant && (
					<>
					{record.case_status === 0 && (
						<Button onClick={() => onClickStartCase(record.case_id)} type='primary'>Start Case</Button>
					)}
						&nbsp;&nbsp;
						<Button onClick={() => onClickDelete(record.case_id)} danger>Delete</Button>
					</>
				)}
				{identity === admin && <Button onClick={() => onClickAssign(record.case_id)}>Assign Self</Button>}
			</>
		)
	}]

	const onClickAssign = async (case_id: number) => {
		try {
			const url = await ASSIGN_TO_CASE(case_id)
			window.open(url, '_self')
		} catch (err) {
			console.warn(err)
		}
	}	

	const fetchCaseFiles = async () => {
		try {
			const response = await FETCH_CASE_FILES(case_id)
			setCaseFiles(response)
		} catch (err) {
			console.warn(err)
		}
	}

	useEffect(() => {
		const interval = setInterval(fetchCaseFiles, 10000)

		return () => {
			clearInterval(interval)
		}
	}, [])

	const onClickStartCase = async (case_id: number) => {
		if (confirm(`Are you sure you want to start this case (id: ${case_id})?`)) {
			try {
				const url = await READY_CASE(case_id)
				window.open(url, '_self')
			} catch (err) {
				console.warn(err)
			}
		}
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
		<Card title='Case Files'>
			{!!identity && (
				<>
					<Button onClick={() => setIsFilecaseModalVisible(!isFileCaseModalVisible)} type="primary">File New Case</Button>
					<br /><br />
				</>
			)}
			<Table columns={columns} dataSource={caseFiles} key={'case_id'} />
			{!!identity && (
				<FileCaseModal isVisible={isFileCaseModalVisible} toggle={() => setIsFilecaseModalVisible(!isFileCaseModalVisible)} />
			)}
		</Card>
	)
}

export default CaseFilesTable