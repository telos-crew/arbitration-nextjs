import React, { useState, useEffect } from 'react'
import { Table, Button, Modal } from "antd"
import { useSelector } from 'react-redux';
import { CaseFile, RootState } from '../../types';
import useBlockchain from '../../hooks/useBlockchain';
import AddClaimForm from './AddClaimForm';
import { Claim } from '../../types';
import { DECISION_CLASS_LIST, CLAIM_STATUS_LIST, FETCH_CASE_FILES } from '../../constants';

type Props = {
	claims: Claim[],
	case_id: number,
	caseFile: CaseFile
}

const ClaimsTable = ({ claims: initialClaims, caseFile: initialCaseFile, case_id }: Props) => {
	const { FETCH_CLAIMS, REMOVE_CLAIM } = useBlockchain()
	const { identity } = useSelector((state: RootState) => state.auth)
	const [caseFile, setCaseFile] = useState(initialCaseFile)
	const [claims, setClaims] = useState(initialClaims)
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

	const fetchCaseFile = async () => {
		try {
			const [response] = await FETCH_CASE_FILES(case_id)
			setCaseFile(response)
		} catch (err) {
			console.warn(err)
		}
	}

	const fetchClaims = async () => {
		try {
			const response = await FETCH_CLAIMS(case_id)
			setClaims(response)
		} catch (err) {
			console.warn(err)
		}
	}

	useEffect(() => {
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
		<>
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
		</>
	)
}

export default ClaimsTable