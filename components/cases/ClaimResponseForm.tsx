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

type Props = {
	onCancel: () => void,
	case_id: number,
	claim_id: number,
	toggle: () => void
}

const ClaimResponseForm = ({ onCancel, case_id, toggle, claim_id}: Props) => {
	const { RESPOND } = useBlockchain()
	const { identity } = useSelector((state: RootState) => state.auth)
	const [responseLink, setResponseLink] = useState('')
	const [errorMessage, setErrorMessage] = useState('')

	const handleHashChange = (hash: string) => {
		setErrorMessage('')
		setResponseLink(hash)
	}

	const submit = async (type: string) => {
		if (!responseLink) {
			setErrorMessage('Please fill all the fields')
			return
		}
		if (!validateIpfsHash(responseLink)) {
			setErrorMessage('Invalid IPFS hash, should start with \'Qm\' and be 46 or 49 characters in length')
			return
		}

		try {
			const url = await RESPOND({
				respondant: identity,
				claim_id,
				response_link: responseLink,
				case_id
			})
			window.open(url, '_self')
			toggle()
		} catch (err) {
			console.warn(err)
		}
	}

	return (
		<Row style={{ ...rowStyle }} gutter={24}>
			<Col md={12} sm={12} xs={24} style={colStyle}>
				<p>Respond to existing claim by uploading response document:</p><br />
				<InputGroup>
					<Input
						defaultValue={identity}
						addonBefore='Respondant'
						disabled
					/>
				</InputGroup>
				<InputGroup>
					<Input
						onChange={(text) => handleHashChange(text)}
						addonBefore='IPFS Hash'
						placeholder="Qmdn7bZ8z25bM735R91rFkbvkBXfvo5oEtRQadjb2RdMce"
						value={responseLink}
					/>
				</InputGroup>
			</Col>
			<Col md={12} sm={12} xs={24} style={colStyle} className='file-upload-area'>
				<DstorUpload setHash={setResponseLink} />
			</Col>
			<br />
			<Button onClick={() => submit('add')} type="primary">Submit Response</Button>&nbsp;&nbsp;
			<Button onClick={onCancel}>Cancel</Button>
			<br /><br />
			{errorMessage && (
				<Alert message={errorMessage} type="error" />
			)}
		</Row>
	)
}

export default ClaimResponseForm