import React, { useState, useEffect } from 'react'
import { Col, Row, Button, Alert, Modal } from 'antd';
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

const { rowStyle, colStyle } = basicStyle;

// name claimant, string claim_link, vector<uint8_t> lang_codes,std::optional<name> respondant

const INITIAL_INPUT = {
	nominee: '',
	credentials_link: ''
}

type Props = {
	onCancel: () => void,
	isVisible: boolean,
	toggle: () => void
}

const RegisterNomineeModal = ({ onCancel, isVisible, toggle }: Props) => {
	const { REG_ARB } = useBlockchain()
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

	const submit = async () => {
		try {
			const url = await REG_ARB({ ...input })
			window.open(url, '_self')
			toggle()
		} catch (err) {
			console.warn(err)
		}
	}

	return (
		<Modal title='Register Nominee' visible={isVisible} onCancel={onCancel} footer={null}>
			<Row style={{ ...rowStyle, display: !isVisible ? 'none' : 'flex' }} gutter={24}>
				<Col md={24} sm={24} xs={24} style={colStyle}>
					<ContentHolder>
						<InputGroup>
							<Input
								defaultValue={input.claimant}
								onChange={(e) => handleTextChange(e, 'nominee')}
								addonBefore='Nominee'
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
					</ContentHolder>
					<br />
					<Button onClick={() => submit('add')} type="primary">Add</Button>&nbsp;&nbsp;
					<Button onClick={onCancel}>Cancel</Button>
					<br /><br />
					{errorMessage && (
						<Alert message={errorMessage} type="error" />
					)}
				</Col>
			</Row>
		</Modal>
	)
}

export default RegisterNomineeModal