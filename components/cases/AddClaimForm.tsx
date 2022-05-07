import React, { useState, useEffect } from 'react'
import { Col, Row, Button, Alert } from "antd"
import basicStyle from "@iso/assets/styles/constants"
import Input, {
  InputGroup,
} from '@iso/components/uielements/input';
import { validateName, validateIpfsHash } from '../../util/blockchain';
import useBlockchain from '../../hooks/useBlockchain';
import { useSelector } from 'react-redux';
import { RootState } from '../../types';
import DstorUpload from '../utility/DstorUpload';

const { rowStyle, colStyle } = basicStyle;

// name claimant, string claim_link, vector<uint8_t> lang_codes,std::optional<name> respondant

const INITIAL_INPUT = {
	claim_link: ''
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
	const [claimLink, setClaimLink] = useState('')
	const [errorMessage, setErrorMessage] = useState('')

	const submit = async (type: string) => {
		if (!claimLink) {
			setErrorMessage('Please fill all the fields')
			return
		}
		if (!validateIpfsHash(claimLink)) {
			setErrorMessage('Invalid IPFS hash, should start with \'Qm\' and be 46 or 49 characters in length')
			return
		}

		try {
			const url = await ADD_CLAIM({
				claim_link: claimLink,
				claimant: identity,	
				case_id
			})
			window.open(url, '_self')
			toggle()
		} catch (err) {
			console.warn(err)
		}
	}

	return (
				<Row style={{ ...rowStyle, display: !isVisible ? 'none' : 'flex' }} gutter={24}>
					<Col md={12} sm={12} xs={24} style={colStyle}>
						<p>Add a claim to an existing case:</p><br />
						<InputGroup>
							<Input
								defaultValue={identity}
								addonBefore='Claimant'
								placeholder="myaccount111"
								value={identity}
								disabled
							/>
						</InputGroup>
						<InputGroup>
							<Input
								onChange={(text) => setClaimLink(text)}
								addonBefore='IPFS Hash'
								placeholder="Qmdn7bZ8z25bM735R91rFkbvkBXfvo5oEtRQadjb2RdMce"
								value={claimLink}
							/>
						</InputGroup>
					</Col>
					<Col md={12} sm={12} xs={24} style={colStyle} className='file-upload-area'>
						<DstorUpload setHash={setClaimLink} />
					</Col>
					<br />
					<Button onClick={() => submit('add')} type="primary">Add</Button>&nbsp;&nbsp;
					<Button onClick={onCancel}>Cancel</Button>
					<br /><br />
					{errorMessage && (
						<Alert message={errorMessage} type="error" />
					)}
				</Row>
	)
}

export default AddClaimForm