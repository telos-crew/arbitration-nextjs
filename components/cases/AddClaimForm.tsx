import React, { useState, useEffect } from 'react'
import { Col, Row, Button, Alert } from "antd"
import basicStyle from "@iso/assets/styles/constants"
import Input, {
  InputGroup,
} from '@iso/components/uielements/input';
import Box from '@iso/components/utility/box';
import ContentHolder from '@iso/components/utility/contentHolder';
import { validateName, validateIpfsHash } from '../../util/blockchain';
import useBlockchain from '../../hooks/useBlockchain';
import { useSelector } from 'react-redux';
import { RootState } from '../../types';
import DstorUpload from '../utility/DstorUpload';

const { rowStyle, colStyle } = basicStyle;

// name claimant, string claim_link, vector<uint8_t> lang_codes,std::optional<name> respondant

const INITIAL_INPUT = {
	claim_link: '',
	claimant: ''
}

type Props = {
	onCancel: () => void,
	case_id: number,
	isVisible: boolean,
	toggle: () => void
}

const AddClaimForm = ({ onCancel, case_id, isVisible, toggle }: Props) => {
	const { ADD_CLAIM } = useBlockchain()
	const { identity } = useSelector((state: RootState) => state.auth)
	const [input, setInput] = useState({
		...INITIAL_INPUT,
		claimant: identity
	})
	const [errorMessage, setErrorMessage] = useState('')

	const handleTextChange = (e: any, field: string) => {
		setErrorMessage('')
		setInput({
			...input,
			[field]: e.target.value
		})
	}

	const setClaimLink = (hash: string) => {
		setInput({
			...input,
			claim_link: hash
		})
	}

	const submit = async (type: string) => {
		const { claimant, claim_link } = input
		if (!claimant || !claim_link) {
			setErrorMessage('Please fill all the fields')
			return
		}
		if (!validateName(claimant)) {
			setErrorMessage('Invalid claimant name')
			return
		}
		if (!validateIpfsHash(claim_link)) {
			setErrorMessage('Invalid IPFS hash, should start with \'Qm\' and be 46 or 49 characters in length')
			return
		}

		try {
			const url = await ADD_CLAIM({ ...input, case_id })
			window.open(url, '_self')
			toggle()
		} catch (err) {
			console.warn(err)
		}
	}

	return (
		<Box
			title='Add Case Claim'
			subtitle='Add a claim to an existing case'
		>
			<ContentHolder>
				<Row style={{ ...rowStyle, display: !isVisible ? 'none' : 'flex' }} gutter={24}>
					<Col md={12} sm={12} xs={24} style={colStyle}>
						<InputGroup>
							<Input
								defaultValue={input.claimant}
								onChange={(e) => handleTextChange(e, 'claimant')}
								addonBefore='Claimant'
								placeholder="myaccount111"
							/>
						</InputGroup>
						<InputGroup>
							<Input
								onChange={(e) => handleTextChange(e, 'claim_link')}
								addonBefore='IPFS Hash'
								placeholder="Qmdn7bZ8z25bM735R91rFkbvkBXfvo5oEtRQadjb2RdMce"
							/>
						</InputGroup>
					</Col>
					<Col md={12} sm={12} xs={24} style={colStyle}>
						<DstorUpload setHash={setClaimLink} />
					</Col>
				</Row>
			</ContentHolder>
			<br />
			<Button onClick={() => submit('add')} type="primary">Add</Button>&nbsp;&nbsp;
			<Button onClick={onCancel}>Cancel</Button>
			<br /><br />
			{errorMessage && (
				<Alert message={errorMessage} type="error" />
			)}
		</Box>
	)
}

export default AddClaimForm