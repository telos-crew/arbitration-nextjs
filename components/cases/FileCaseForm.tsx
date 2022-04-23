import React, { useState } from 'react'
import { Col, Row, Button, Alert } from "antd"
import basicStyle from "@iso/assets/styles/constants"
import Input, {
  InputGroup,
} from '@iso/components/uielements/input';
import Select, { SelectOption } from '@iso/components/uielements/select';
import Box from '@iso/components/utility/box';
import ContentHolder from '@iso/components/utility/contentHolder';
import IntlMessages from '@iso/components/utility/intlMessages';
import { LANG_CODES_LIST } from '../../constants';
import { validateName, validateIpfsHash } from '../../util/blockchain';

const Option = SelectOption;
const { rowStyle, colStyle } = basicStyle;

// name claimant, string claim_link, vector<uint8_t> lang_codes,std::optional<name> respondant

const INITIAL_INPUT = {
	claimant: '',
	respondant:'',
	lang_codes: [],
	claim_link: ''
}

const FileCaseForm = () => {
	const [input, setInput] = useState(INITIAL_INPUT)
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

	const submit = () => {
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
	}

	return (
		<Row style={rowStyle} gutter={24}>
			<Col md={24} sm={24} xs={24} style={colStyle}>
				<Box
            title='File New Case'
            subtitle='Submit a new case file for arbitration'
          >
            <ContentHolder>
							<InputGroup>
              	<Input onChange={(e) => handleTextChange(e, 'claimant')} addonBefore='Claimant' placeholder="myaccount111" />
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
									addonBefore='Languages'
                >
									{LANG_CODES_LIST.map((lang: string, index: number) => (
										<Option key={lang} value={index}>{lang}</Option>
									))}
                </Select>		
							</InputGroup>
							<InputGroup>
								<Input onChange={(e) => handleTextChange(e, 'claim_link')} addonBefore='IPFS Hash' placeholder="Qmdn7bZ8z25bM735R91rFkbvkBXfvo5oEtRQadjb2RdMce" />
							</InputGroup>
            </ContentHolder>
						<br />
						<Button onClick={submit} type="primary">Submit</Button>
						<br /><br />
						{errorMessage && (
							<Alert message={errorMessage} type="error" />
						)}
          </Box>
			</Col>
		</Row>
	)
}

export default FileCaseForm