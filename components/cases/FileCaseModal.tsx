import React, { useState, useEffect } from 'react'
import { Col, Row, Button, Alert } from "antd"
import basicStyle from "@iso/assets/styles/constants"
import Input, {
  InputGroup,
} from '@iso/components/uielements/input';
import Select, { SelectOption } from '@iso/components/uielements/select';
import Box from '@iso/components/utility/box';
import ContentHolder from '@iso/components/utility/contentHolder';
import { LANG_CODES_LIST } from '../../constants';
import { validateName, validateIpfsHash } from '../../util/blockchain';
import useBlockchain from '../../hooks/useBlockchain';
import { useSelector } from 'react-redux';
import { RootState } from '../../types';


import isoModal from '../Feedback/Modal'
import Modals from '../Card/Modal.style';

const Modal = Modals(isoModal);
const Option = SelectOption;
const { rowStyle, colStyle } = basicStyle;

const INITIAL_INPUT = {
	claimant: '',
	respondant:'',
	lang_codes: [],
	claim_link: ''
}

type Props = {
	isVisible: boolean,
	toggle: () => void,
}

const FileCaseModal = ({ isVisible, toggle }: Props) => {
	const { FILE_CASE } = useBlockchain()
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

	const handleSelectChange = (value: string[]) => {
		setErrorMessage('')		
		setInput({
			...input,
			lang_codes: value
		})
	}

	const submit = async () => {
		const { claimant, respondant, lang_codes, claim_link } = input
		if (!claimant || !respondant || !claim_link) {
			setErrorMessage('Please fill all the fields')
			return
		}
		if (!validateName(claimant)) {
			setErrorMessage('Invalid claimant name')
			return
		}
		if (!validateName(respondant)) {
			setErrorMessage('Invalid respondant name')
			return
		}
		if (!validateIpfsHash(claim_link)) {
			setErrorMessage('Invalid IPFS hash, should start with \'Qm\' and be 46 or 49 characters in length')
			return
		}
		if (lang_codes.length === 0) {
			setErrorMessage('Must select at least one language')
			return
		}

		try {
			const url = await FILE_CASE(input)
			window.open(url, '_self')
		} catch (err) {
			console.warn(err)
		}
	}
	
	return (
		<Modal
			title={'File New Case'}
			visible={isVisible}
			onCancel={toggle}
			cancelText="Cancel"
			onOk={submit}
			okText={'Submit'}
		>
			<Row style={rowStyle} gutter={24}>
				<Col md={24} sm={24} xs={24} style={colStyle}>
						<p>Submit a new case file for arbitration</p><br />
						<InputGroup>
							<Input defaultValue={input.claimant} onChange={(e) => handleTextChange(e, 'claimant')} addonBefore='Claimant' placeholder="myaccount111" />
						</InputGroup>
						<InputGroup>
							<Input onChange={(e) => handleTextChange(e, 'respondant')} addonBefore='Respondant' placeholder="theiraccount" />
						</InputGroup>
						<InputGroup>
							<Select
								mode="multiple"
								style={{ width: '100%' }}
								placeholder="Please select languages"
								defaultValue={[]}
								onChange={handleSelectChange}
							>
								{LANG_CODES_LIST.map((lang: string, index: number) => (
									<Option key={lang} value={index}>{lang}</Option>
								))}
							</Select>		
						</InputGroup>
						<InputGroup>
							<Input onChange={(e) => handleTextChange(e, 'claim_link')} addonBefore='IPFS Hash' placeholder="Qmdn7bZ8z25bM735R91rFkbvkBXfvo5oEtRQadjb2RdMce" />
						</InputGroup>
					<br />
					{errorMessage && (
						<Alert message={errorMessage} type="error" />
					)}
				</Col>
			</Row>
		</Modal>
	)
}

export default FileCaseModal