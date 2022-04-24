import React, { useState, useEffect } from 'react'
import { Col, Row, Button, Alert } from "antd"
import basicStyle from "@iso/assets/styles/constants"
import Input, {
  InputGroup,
} from '@iso/components/uielements/input';
import Select, { SelectOption } from '@iso/components/uielements/select';
import Box from '@iso/components/utility/box';
import ContentHolder from '@iso/components/utility/contentHolder';
import IntlMessages from '@iso/components/utility/intlMessages';
import { validateName, validateIpfsHash } from '../../util/blockchain';
import useBlockchain from '../../hooks/useBlockchain';
import { CaseFile } from '../../types/blockchain';
import { useSelector } from 'react-redux';
import { RootState } from '../../types';

const Option = SelectOption;
const { rowStyle, colStyle } = basicStyle;

// name claimant, string claim_link, vector<uint8_t> lang_codes,std::optional<name> respondant

const INITIAL_INPUT = {
	case_id: null,
	claim_link: '',
	claimant: ''
}

const AddClaimForm = () => {
	const { ADD_CLAIM, REMOVE_CLAIM, FETCH_CASE_FILES } = useBlockchain()
	const { identity } = useSelector((state: RootState) => state.auth)
	const [userCases, setUserCases] = useState([])
	const [input, setInput] = useState({
		...INITIAL_INPUT,
		claimant: identity
	})
	const [errorMessage, setErrorMessage] = useState('')

	const fetchUserCases = async () => {
		try {
			const rows: CaseFile[] = await FETCH_CASE_FILES()
			const result = rows.filter(item => {
				if (item.claimant === identity) return true
				return false
			})
			setUserCases(result)
		} catch (err) {
			console.warn(err)
		}
	}

	useEffect(() => {
		fetchUserCases()
	}, [])

	const handleTextChange = (e: any, field: string) => {
		setErrorMessage('')
		setInput({
			...input,
			[field]: e.target.value
		})
	}

	const handleSelectChange = (value: string) => {
		setErrorMessage('')		
		setInput({
			...input,
			case_id: value
		})
	}

	const submit = async (type: string) => {
		const { claimant, case_id, claim_link } = input
		if (!claimant || !case_id || !claim_link) {
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
			let url
			if (type === 'add') {
				url = await ADD_CLAIM(input)
			} else {
				if (confirm('Are you sure you want to delete this claim?') == true) {
					url = await REMOVE_CLAIM(input)
				}
			}
			window.open(url, '_self')
		} catch (err) {
			console.warn(err)
		}
	}

	return (
		<Row style={rowStyle} gutter={24}>
			<Col md={24} sm={24} xs={24} style={colStyle}>
				<Box
            title='Add Case Claim'
            subtitle='Add a claim to an existing case'
          >
            <ContentHolder>
							<InputGroup>
              	<Input
									defaultValue={input.claimant}
									onChange={(e) => handleTextChange(e, 'claimant')}
									addonBefore='Claimant'
									placeholder="myaccount111"
								/>
							</InputGroup>
							<InputGroup>
								<Select
                  onChange={handleSelectChange}
                  placeholder="Please select case ID"
									addonBefore='Case ID'
                  style={{ minWidth: '240px' }}
                >
									{userCases.map((item) => (
										<Option key={item.case_id} value={item.case_id}>{item.case_id}</Option>
									))}
                </Select>
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
						<Button onClick={() => submit('remove')} danger>Remove</Button>
						<br /><br />
						{errorMessage && (
							<Alert message={errorMessage} type="error" />
						)}
          </Box>
			</Col>
		</Row>
	)
}

export default AddClaimForm