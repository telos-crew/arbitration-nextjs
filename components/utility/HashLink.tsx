import React from 'react'
import styles from './HashLink.module.scss'
import { AiFillCopy } from 'react-icons/ai'
import Notification from '../Notification'

type Props = {
	hash: string
}

const HashLink = ({ hash }: Props) => {
	const copyToClipboard = () => {
		navigator.clipboard.writeText(hash)
		Notification('success', 'Copied to clipboard', '', 2)
	}

	return (
		<div className={styles.hashWrap}>
			<p className={styles.ellipsizeHash}>
				<AiFillCopy
					color='#bbbbbb'
					size={18}
					className={styles.copyIcon}
					onClick={copyToClipboard}
				/>&nbsp;
				<a href={`https://api.dstor.cloud/ipfs/${hash}`} target='_blank'>
					{hash}
				</a>
			</p>
		</div>
	)
}

export default HashLink