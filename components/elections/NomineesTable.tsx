import React, { useState, useEffect } from 'react'
import { Col, Card, Row, Table, Button } from "antd"
import basicStyle from "@iso/assets/styles/constants"
import { useSelector } from 'react-redux';
import { RootState } from '../../types';
import { Nominee } from '../../types/blockchain';

const { rowStyle, colStyle } = basicStyle;

type Props = {
	nominees: Nominee[]
}

const NomineesTable = ({ nominees }: Props) => {
	const { identity } = useSelector((state: RootState) => state.auth)

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
	},]

	return (
		<Row style={rowStyle} gutter={24} className='nominees-table-wrap'>
			<Col md={24} sm={24} xs={24} style={colStyle}>
				<Card title='Nominees' variant="outlined">
					<Table columns={columns} dataSource={nominees} key={'nominee_name'} className='nominees-table' />
				</Card>
			</Col>
		</Row>
	)
}

export default NomineesTable