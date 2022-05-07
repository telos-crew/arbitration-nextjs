import React, { useState, useEffect } from 'react'
import { Table, Button, Modal } from "antd"
import { useSelector } from 'react-redux';
import { RootState } from '../../types';
import useBlockchain from '../../hooks/useBlockchain';
import AddClaimForm from './AddClaimForm';
import { Claim } from '../../types/blockchain';
import { DECISION_CLASS_LIST, CLAIM_STATUS_LIST  } from '../../constants/claim';

type Props = {
	isVisible: boolean,
	toggle: () => void,
	case_id: number
}

const ClaimsModal = ({ isVisible, toggle, case_id }: Props) => {
	const { FETCH_CLAIMS, FETCH_CASE_FILES, REMOVE_CLAIM } = useBlockchain()
	const { identity } = useSelector((state: RootState) => state.auth)
	const [caseFile, setCaseFile] = useState(null)
	const [claims, setClaims] = useState(null)
	const [isAddClaimFormVisible, setIsAddClaimFormVisible] = useState(false)

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
		render: (text: string) => <span>{CLAIM_STATUS_LIST[text]}</span>
	},{
		title: 'Decision Class',
		dataIndex: 'decision_class',
		key: 'decision_class',
		render: (text: string) => <span>{DECISION_CLASS_LIST[text]}</span>
	},{
		title: 'Actions',
		key: 'actions',
		render: (text: any, claim: Claim) => (
			<>
					{caseFile && (caseFile.claimant === identity) && (
						<>
							<Button onClick={() => onRemoveClaim(claim)} danger>Delete</Button>&nbsp;
						</>
					)}
					{caseFile && (caseFile.respondant === identity) && (
						<>
							Hello
						</>
					)}
				</>
			)
	}]

	const fetchClaims = async () => {
		try {
			const response = await FETCH_CLAIMS(case_id)
			console.log('ClaimsModal FETCH_CLAIMS response: ', response)
			setClaims(response)
		} catch (err) {
			console.warn(err)
		}
	}

	const fetchCaseFile = async () => {
		try {
			const [response] = await FETCH_CASE_FILES(case_id)
			setCaseFile(response)
		} catch (err) {
			console.warn(err)
		}
	}

	useEffect(() => {
		fetchClaims()
		fetchCaseFile()

		const interval = setInterval(() => {
			fetchClaims()
			fetchCaseFile()
		}, 10000)

		return () => {
			clearInterval(interval)
		}
	}, [])

	const onRemoveClaim = async ({ claim_id }: Claim) => {
		try {
			const url = await REMOVE_CLAIM({
				claim_id,
				claimant: caseFile.claimant,
				case_id
			})
			window.open(url, '_self')
		} catch (err) {
			console.warn(err)
		}
	}

	return (
		<Modal title="Claims" visible={isVisible} onOk={toggle} onCancel={toggle} className='claimsModal'>
			{!!caseFile && (identity === caseFile.claimant) && (
				<>
					<AddClaimForm
						onCancel={() => setIsAddClaimFormVisible(!isAddClaimFormVisible)}
						case_id={caseFile.case_id}
						isVisible={isAddClaimFormVisible}
						toggle={() => setIsAddClaimFormVisible(!isAddClaimFormVisible)}
					/>
				</>
			)}
			{!isAddClaimFormVisible && (
				<div>
					<Button onClick={() => setIsAddClaimFormVisible(!isAddClaimFormVisible)} type='primary'>Add New Claim</Button><br /><br />
					<Table columns={columns} dataSource={claims} key={'claim_id'} />
				</div>
			)}
		</Modal>
	)
}

export default ClaimsModal