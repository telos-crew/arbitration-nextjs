import React, { useState, useEffect } from 'react'
import { Table, Button, Modal } from "antd"
import { useSelector } from 'react-redux';
import { CaseFile, RootState } from '../../types';
import styles from './ClaimsTable.module.scss'
import useBlockchain from '../../hooks/useBlockchain';
import AddClaimForm from './AddClaimForm';
import { Claim } from '../../types';
import { DECISION_CLASS_LIST, CLAIM_STATUS_LIST, FETCH_CASE_FILES, CASE_STATUS_LIST } from '../../constants'
import ClaimResponseForm from './ClaimResponseForm';
import HashLink from '../utility/HashLink';

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
	const [activeClaimId, setActiveClaimId] = useState(null)
	const [isAddClaimFormVisible, setIsAddClaimFormVisible] = useState(false)
	const [isClaimResponseFormVisible, setIsClaimResponseFormVisible] = useState(false)

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
		render: (text: string) => <HashLink hash={text} />
	},{
		title: 'Decision Link',
		dataIndex: 'decision_link',
		key: 'decision_link',
		render: (text: string) => <HashLink hash={text} />
	},{
		title: 'Response Link',
		dataIndex: 'response_link',
		key: 'response_link',
		render: (text: string) => <HashLink hash={text} />
	},{
		title: 'Status',
		dataIndex: 'status',
		key: 'status',
		render: (text: string) => <span>{CASE_STATUS_LIST[text]}</span>
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
							<Button onClick={() => onPressRespond(claim)}>Respond</Button>&nbsp;
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

	const onPressRespond = (claim: Claim) => {
		setActiveClaimId(claim.claim_id)
		setIsClaimResponseFormVisible(true)
	}

	const onCloseClaimResponseForm = () => {
		setActiveClaimId(null)
		setIsClaimResponseFormVisible(false)
	}

	const isCaseSetup = caseFile.case_status === 0
	const isAddClaimButtonVisible = isCaseSetup && (caseFile.claimant === identity)

	return (
		<>
			{!!caseFile && isAddClaimFormVisible && (
				<Modal
					visible={isAddClaimFormVisible}
					onCancel={() => setIsAddClaimFormVisible(!isAddClaimFormVisible)}
					footer={null}
					className={styles.addClaimModal}
					title='Add Case Claim'
				>
					<AddClaimForm
						onCancel={() => setIsAddClaimFormVisible(!isAddClaimFormVisible)}
						case_id={caseFile.case_id}
						isVisible={isAddClaimFormVisible}
						toggle={() => setIsAddClaimFormVisible(!isAddClaimFormVisible)}
					/>
				</Modal>
			)}
			{!!caseFile && isClaimResponseFormVisible && (
				<Modal
					visible={isClaimResponseFormVisible}
					onCancel={() => setIsAddClaimFormVisible(!isClaimResponseFormVisible)}
					footer={null}
					className={styles.addClaimModal}
					title='Respond to Claim'
				>
					<ClaimResponseForm
						onCancel={onCloseClaimResponseForm}
						case_id={caseFile.case_id}
						toggle={() => setIsClaimResponseFormVisible(!isClaimResponseFormVisible)}
						claim_id={activeClaimId}
					/>
				</Modal>
			)}
			<div>
				{isAddClaimButtonVisible && (
					<>
						<Button onClick={() => setIsAddClaimFormVisible(!isAddClaimFormVisible)} type='primary'>Add New Claim</Button><br /><br />
					</>
				)}
				<Table columns={columns} dataSource={claims} key={'claim_id'} />
			</div>
		</>
	)
}

export default ClaimsTable