import { useSelector } from 'react-redux'
import { SigningRequest } from 'eosio-signing-request'
import axios from 'axios'
import { Claim, TableRowsConfig } from '../types'
import { getEsrOptions } from '../constants/esr'
import { RootState } from '../types/redux'

type SigningRequestData = {
  callback?: string,
  chainId?: string,
  actions: any[],
  expire_seconds?: number
}

const TABLE_ROWS_ENDPOINT = 'v1/chain/get_table_rows'

export const MAINNET_ENDPOINTS = ['https://telos.caleos.io', 'https://mainnet.telosusa.io']
export const TESTNET_ENDPOINTS = [
  // 'https://testnet.telosusa.io',
  'https://testnet.telos.caleos.io'
]

const CONFIG = {
  testnet: {
    NEXT_PUBLIC_TELOS_API_ENDPOINTS: TESTNET_ENDPOINTS,
    NEXT_PUBLIC_CHAIN_ID: '1eaa0824707c8c16bd25145493bf062aecddfeb56c736f6ba6397f3195f33c9f',
    NEXT_PUBLIC_BLOCK_EXPLORER_ENDPOINT: 'https://telos-test.bloks.io',
    ARBITRACTION_CONTRACT: 'testtelosarb',
    NEXT_PUBLIC_APP_HOSTNAME: 'http://localhost:3003'
  },
  mainnet: {
    NEXT_PUBLIC_TELOS_API_ENDPOINTS: MAINNET_ENDPOINTS,
    NEXT_PUBLIC_CHAIN_ID: '4667b205c6838ef70ff7988f6e8257e8be0e1284a2f59699054a018f743b1d11',
    NEXT_PUBLIC_BLOCK_EXPLORER_ENDPOINT: 'https://telos.bloks.io',
    ARBITRACTION_CONTRACT: 'testtelosarb',
    NEXT_PUBLIC_APP_HOSTNAME: 'http://localhost:3003'
  }
}


const useBlockchain = () => {
  const { identity, chain } = useSelector((state: RootState) => state.auth)
  const chainConfig = CONFIG[chain]
  const { NEXT_PUBLIC_TELOS_API_ENDPOINTS, NEXT_PUBLIC_BLOCK_EXPLORER_ENDPOINT, NEXT_PUBLIC_CHAIN_ID } = chainConfig

  const GET_AUTHORIZATION = () => [
    {
      actor: identity,
      permission: 'active'
    }
  ]

  const GET_TRX_WEB_LINK = (trx_id: string) => `${NEXT_PUBLIC_BLOCK_EXPLORER_ENDPOINT}/transaction/${trx_id}`

  const CREATE_IDENTITY_REQUEST = (): string => {
    const config = {
      callback: `${CONFIG[chain].NEXT_PUBLIC_APP_HOSTNAME}?id={{sa}}`,
      chainId: NEXT_PUBLIC_CHAIN_ID,
      account: '',
      expire_seconds: 600,
      name: 'identity',
      authorization: [
        {
          actor: '............1',
          permission: '............2'
        }
      ],
      data: {
        permission: {
          actor: '............1',
          permission: '............2'
        }
      }
    }
    const req1 = SigningRequest.identity(config, getEsrOptions(NEXT_PUBLIC_TELOS_API_ENDPOINTS[0]))
    const encoded = req1.encode()
    return encoded
  }

  const CREATE_SIGNING_REQUEST = async (data: SigningRequestData): Promise<string> => {
    const dataWithChainId = {
      ...data,
      chainId: NEXT_PUBLIC_CHAIN_ID
    }
    console.log('identity: ', identity)
    console.log('dataWithChainId: ', dataWithChainId)
    console.log('data: ', data)
    console.log(JSON.stringify(dataWithChainId))
    const req1 = await SigningRequest.create(dataWithChainId, getEsrOptions(NEXT_PUBLIC_TELOS_API_ENDPOINTS[0]))
    const encoded = req1.encode()
    return encoded
  }

  const FETCH_USER_PROFILE = async (account_name: string) => {
    const { rows } = await GET_TABLE_ROWS({
      code: 'profiles',
      scope: 'profiles',
      table: 'profiles',
      lower_bound: account_name,
      upper_bound: account_name
    })
    console.log('FETCH_USER_PROFILE rows: ', rows)
    const [profile] = rows
    return profile
  }

	const GET_TABLE_ROWS = async (config: TableRowsConfig): Promise<{rows: any[]}> => {
		const { data } = await axios({
			url: `${NEXT_PUBLIC_TELOS_API_ENDPOINTS[0]}/${TABLE_ROWS_ENDPOINT}`,
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

	const FETCH_CASE_FILES = async (case_id?: number): Promise<any> => {
		const { rows } = await GET_TABLE_ROWS({
			code: CONFIG[chain].ARBITRACTION_CONTRACT,
			scope: CONFIG[chain].ARBITRACTION_CONTRACT,
			table: 'casefiles',
      upper_bound: case_id,
      lower_bound: case_id
		});
		return rows
	}

  type FileCaseData = {
    claimant: string,
    respondant: string,
    claim_link: string,
    lang_codes: number[]
  }

  const FILE_CASE = async (data: FileCaseData, callbackRoute?: string): Promise<any> => {
    const actions = [
      {
        account: CONFIG[chain].ARBITRACTION_CONTRACT,
        name: 'filecase',
        authorization: GET_AUTHORIZATION(),
        data
      }
    ]
    const signingRequest = await CREATE_SIGNING_REQUEST({
      callback: `${CONFIG[chain].NEXT_PUBLIC_APP_HOSTNAME}/${callbackRoute}`,
      chainId: NEXT_PUBLIC_CHAIN_ID,
      actions
    })
    return signingRequest
  }

  const READY_CASE = async (case_id: number, callbackRoute?: string): Promise<any> => {
    const actions = [
      {
        account: CONFIG[chain].ARBITRACTION_CONTRACT,
        name: 'readycase',
        authorization: GET_AUTHORIZATION(),
        data: { case_id, claimant: identity }
      }
    ]
    const signingRequest = await CREATE_SIGNING_REQUEST({
      callback: `${CONFIG[chain].NEXT_PUBLIC_APP_HOSTNAME}/${callbackRoute}`,
      chainId: NEXT_PUBLIC_CHAIN_ID,
      actions
    })
    return signingRequest
  }

  const SHRED_CASE = async (case_id: number, callbackRoute?: string): Promise<any> => {
    const actions = [
      {
        account: CONFIG[chain].ARBITRACTION_CONTRACT,
        name: 'shredcase',
        authorization: GET_AUTHORIZATION(),
        data: { case_id, claimant: identity }
      }
    ]
    const signingRequest = await CREATE_SIGNING_REQUEST({
      callback: `${CONFIG[chain].NEXT_PUBLIC_APP_HOSTNAME}/${callbackRoute}`,
      chainId: NEXT_PUBLIC_CHAIN_ID,
      actions
    })
    return signingRequest
  }

  const FETCH_CLAIMS = async (case_id: number): Promise<Claim[]> => {
    const { rows } = await GET_TABLE_ROWS({
      code: CONFIG[chain].ARBITRACTION_CONTRACT,
      scope: case_id,
      table: 'claims'
    })
    return rows
  }

  type AddClaimData = {
    case_id: number,
    claimant: string,
    claim_link: string,
  }

  const ADD_CLAIM = async (data: AddClaimData, callbackRoute?: string): Promise<any> => {
    const actions = [
      {
        account: CONFIG[chain].ARBITRACTION_CONTRACT,
        name: 'addclaim',
        authorization: GET_AUTHORIZATION(),
        data
      }
    ]
    const signingRequest = await CREATE_SIGNING_REQUEST({
      callback: `${CONFIG[chain].NEXT_PUBLIC_APP_HOSTNAME}/${callbackRoute}`,
      chainId: NEXT_PUBLIC_CHAIN_ID,
      actions
    })
    return signingRequest
  }

  type RespondData = {
    case_id: number,
    claim_id: number,
    respondant: string,
    response_link: string,
  }

  const RESPOND = async (data: RespondData, callbackRoute?: string): Promise<any> => {
    const actions = [
      {
        account: CONFIG[chain].ARBITRACTION_CONTRACT,
        name: 'respond',
        authorization: GET_AUTHORIZATION(),
        data
      }
    ]
    const signingRequest = await CREATE_SIGNING_REQUEST({
      callback: `${CONFIG[chain].NEXT_PUBLIC_APP_HOSTNAME}/${callbackRoute}`,
      chainId: NEXT_PUBLIC_CHAIN_ID,
      actions
    })
    return signingRequest
  }  

  type RemoveClaimData = {
    case_id: number,
    claimant: string,
    claim_link: string,
  }

  const REMOVE_CLAIM = async (data: RemoveClaimData, callbackRoute?: string): Promise<any> => {
    const actions = [
      {
        account: CONFIG[chain].ARBITRACTION_CONTRACT,
        name: 'removeclaim',
        authorization: GET_AUTHORIZATION(),
        data
      }
    ]
    const signingRequest = await CREATE_SIGNING_REQUEST({
      callback: `${CONFIG[chain].NEXT_PUBLIC_APP_HOSTNAME}/${callbackRoute}`,
      chainId: NEXT_PUBLIC_CHAIN_ID,
      actions
    })
    return signingRequest
  }    

  const FETCH_ELECTIONS = async () => {
    const data = await GET_TABLE_ROWS({
      code: CONFIG[chain].ARBITRACTION_CONTRACT,
      scope: CONFIG[chain].ARBITRACTION_CONTRACT,
      table: 'elections'
    })
    console.log('FETCH_ELECTIONS data: ', data)
    return data
  }

  const UNREG_NOMINEE = async (nominee: string, callbackRoute?: string): Promise<any> => {
    const actions = [
      {
        account: CONFIG[chain].ARBITRACTION_CONTRACT,
        name: 'unregnominee',
        authorization: GET_AUTHORIZATION(),
        data: {
          nominee
        }
      }
    ]
    const signingRequest = await CREATE_SIGNING_REQUEST({
      callback: `${CONFIG[chain].NEXT_PUBLIC_APP_HOSTNAME}/${callbackRoute}`,
      chainId: NEXT_PUBLIC_CHAIN_ID,
      actions
    })
    return signingRequest
  }

  const REG_ARB = async (data: { nominee: string, credentials_link: string}, callbackRoute?: string): Promise<any> => {
    const actions = [
      {
        account: CONFIG[chain].ARBITRACTION_CONTRACT,
        name: 'regarb',
        authorization: GET_AUTHORIZATION(),
        data
      }
    ]
    const signingRequest = await CREATE_SIGNING_REQUEST({
      callback: `${CONFIG[chain].NEXT_PUBLIC_APP_HOSTNAME}/${callbackRoute}`,
      chainId: NEXT_PUBLIC_CHAIN_ID,
      actions
    })
    return signingRequest
  }

  const CHANGE_ARB_STATUS = async (data: { arbitrator: string, new_status: number }, callbackRoute?: string) => {
    const actions = [
      {
        account: CONFIG[chain].ARBITRACTION_CONTRACT,
        name: 'newarbstatus',
        authorization: GET_AUTHORIZATION(),
        data
      }
    ]
    const signingRequest = await CREATE_SIGNING_REQUEST({
      callback: `${CONFIG[chain].NEXT_PUBLIC_APP_HOSTNAME}/${callbackRoute}`,
      chainId: NEXT_PUBLIC_CHAIN_ID,
      actions
    })
    return signingRequest
  }

  const ASSIGN_TO_CASE = async (case_id: number, callbackRoute?: string) => {
    const data = {
      case_id,
      arb_to_assign: identity
    }
    const actions = [
      {
        account: CONFIG[chain].ARBITRACTION_CONTRACT,
        name: 'assigntocase',
        authorization: GET_AUTHORIZATION(),
        data
      }
    ]
    const signingRequest = await CREATE_SIGNING_REQUEST({
      callback: `${CONFIG[chain].NEXT_PUBLIC_APP_HOSTNAME}/${callbackRoute}`,
      chainId: NEXT_PUBLIC_CHAIN_ID,
      actions
    })
    return signingRequest
  }

	return {
    GET_AUTHORIZATION,
    CREATE_SIGNING_REQUEST,
		GET_TRX_WEB_LINK,
		CREATE_IDENTITY_REQUEST,
    FETCH_USER_PROFILE,
		GET_TABLE_ROWS,
		FETCH_CASE_FILES,
    FILE_CASE,
    SHRED_CASE,
    READY_CASE,
    FETCH_CLAIMS,
    ADD_CLAIM,
    REMOVE_CLAIM,
    RESPOND,
    FETCH_ELECTIONS,
    REG_ARB,
    CHANGE_ARB_STATUS,
    ASSIGN_TO_CASE,
    UNREG_NOMINEE
	}
}

export default useBlockchain