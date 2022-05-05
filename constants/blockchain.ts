import axios from 'axios'
import { TableRowsConfig, Config } from '../types/blockchain';

const ARBITRATION_CONTRACT = process.env.ARBITRATION_CONTRACT
const TELOS_API_ENDPOINT = process.env.TELOS_API_ENDPOINT
const TABLE_ROWS_ENDPOINT = 'v1/chain/get_table_rows'

export const GET_AUTHORIZATION = () => [
	{
		actor: identity,
		permission: 'active'
	}
]

export const GET_TABLE_ROWS = async (config: TableRowsConfig): Promise<{rows: any[]}> => {
	const { data } = await axios({
		url: `${TELOS_API_ENDPOINT}/${TABLE_ROWS_ENDPOINT}`,
		method: 'post',
		headers: {
			'content-type': 'application/json'
		},
		data: {
			index_position: "1",
			json: true,
			key_type: "i64",
			limit: 100,
			lower_bound: null,
			reverse: false,
			table_key: "",
			...config
		}
	})
	return data
}

export const FETCH_CONFIG = async (): Promise<Config[]> => {
	const { rows: [config] } = await GET_TABLE_ROWS({
		code: ARBITRATION_CONTRACT,
		scope: ARBITRATION_CONTRACT,
		table: 'config',
		reverse: true
	})
	return config
}
