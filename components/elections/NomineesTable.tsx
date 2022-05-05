import React, { useState, useEffect } from 'react'
import { Col, Card, Row, Table, Button } from "antd"
import basicStyle from "@iso/assets/styles/constants"
import { useSelector } from 'react-redux';
import { RootState } from '../../types';
import { Nominee } from '../../types/blockchain';
import useBlockchain from '../../hooks/useBlockchain';
import RegisterNomineeModal from './RegisterNomineeModal';

const { rowStyle, colStyle } = basicStyle;

type Props = {
	nominees: Nominee[]
}

const NomineesTable = ({ nominees }: Props) => {
	const { REG_ARB, UNREG_NOMINEE } = useBlockchain()
	const { identity } = useSelector((state: RootState) => state.auth)
	const [isAddNomineeModalVisible, setIsAddNomineeModalVisible] = useState(false)

	const onClickRemoveNominee = async (account_name: string) => {
		if (confirm(`Are you sure that you would like to remove ${account_name} from the list of nominees?`)) {
			try {
				const url = await UNREG_NOMINEE(account_name)
				window.open(url, '_self')
			} catch (err) {
				console.warn(err)
			}
		}
	}

	const columns = [{
		title: 'Name',
		dataIndex: 'nominee_name',
		key: 'nominee_name'
	},{
		title: 'Credentials Link',
		dataIndex: 'credentials_link',
		key: 'credentials_link',
		render: (text) => (
			<p className="ipfs-link">
				<a href={`https://api.dstor.cloud/${text}`} target="_blank">{text}</a>
			</p>
		)
	},{
		title: 'Application Time',
		dataIndex: 'application_time',
		key: 'application_time'
	},{
		title: 'Actions',
		key: 'actions',
		render: (record: Nominee) => (
			<>
				{record.nominee_name === identity && (
					<Button onClick={() => onClickRemoveNominee(record.nominee_name)} danger>Remove</Button>
				)}
			</>
		)
	}]

	const isUserPresent = nominees.find((nominee: Nominee) => nominee.nominee_name === identity)
	const isAddButtonVisible = identity && !isUserPresent

	return (
		<Row style={rowStyle} gutter={24} className='nominees-table-wrap'>
			<Col md={24} sm={24} xs={24} style={colStyle}>
				<Card title='Nominees'>
					{isAddButtonVisible && (
						<>
							<Button onClick={() => setIsAddNomineeModalVisible(!isAddNomineeModalVisible)} type="primary">Nominate Self</Button>
							<br /><br />
						</>
					)}
					<Table columns={columns} dataSource={nominees} key={'nominee_name'} className='nominees-table' />
				</Card>
			</Col>
			{isAddNomineeModalVisible && (
				<RegisterNomineeModal
					isVisible={isAddNomineeModalVisible}
					toggle={() => setIsAddNomineeModalVisible(!isAddNomineeModalVisible)}
					onCancel={() => console.log('onCancel')}
				/>
			)}
		</Row>
	)
}

export default NomineesTable