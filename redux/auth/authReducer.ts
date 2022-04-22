import { combineReducers } from 'redux'
import { Account } from '../../types'

type AccountAction = {
  type: 'UPDATE_ACCOUNT'
  data: {
    account_name: string
    accountIndex: number
    profiles: any[]
    eosjsInstances: any[]
    profile?: any[]
  }
}

export const identity = (state: Account = null, action: any) => {
  const { type, data } = action
  switch (type) {
    case 'UPDATE_ACCOUNT':
      return data.identity || null
    case 'LOG_OUT':
      return null
    default:
      return state
  }
}

export const account_name = (state: Account = null, action: any) => {
  const { type, data } = action
  switch (type) {
    case 'UPDATE_ACCOUNT':
      return data.account_name || data.identity
    case 'LOG_OUT':
      return null
    default:
      return state
  }
}

export const accountIndex = (state = null, action: any) => {
  const { type, data } = action
  switch (type) {
    case 'UPDATE_ACCOUNT':
      return data.accountIndex
    case 'LOG_OUT':
      return null
    default:
      return state
  }
}

export const account = (state = null, action: any) => {
  const { type, data } = action
  switch (type) {
    case 'UPDATE_TELOS_ACCOUNT_INFO':
      return data.accountInfo.account
    case 'LOG_OUT':
      return null
    default:
      return state
  }
}

export const profiles = (state = [], action: any) => {
  const { type, data } = action
  switch (type) {
    case 'UPDATE_ACCOUNT':
      return data.profiles
    case 'UPDATE_PROFILES':
      return data.profiles
    case 'LOG_OUT':
      return null
    default:
      return state
  }
}

export const chain = (state: string = 'mainnet', action: any) => {
  const { type, data } = action
  switch (type) {
    case 'UPDATE_CHAIN':
      return data
    default:
      return state
  }
}

export const isGuest = (state: boolean = false, action: any) => {
  const { type } = action
  switch (type) {
    case 'SKIP_LOGIN':
      return true
    case 'UPDATE_ACCOUNT':
      return false
    case 'LOG_OUT':
      return false
    default:
      return state
  }
}

export const languageCode = (state: string = 'en', action: any) => {
  const { type, data } = action
  switch (type) {
    case 'SET_LANGUAGE_CODE':
      return data.languageCode
    default:
      return state
  }
}

export default combineReducers({
  identity,
  account_name,
  account,
  accountIndex,
  profiles,
  chain,
  isGuest,
  languageCode
})
