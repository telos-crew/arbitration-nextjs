import React, { useState, useEffect } from 'react'
import styles from './ProfileCell.module.scss'
import { FETCH_PROFILE } from '../../constants/profiles';
import classnames from 'classnames';

type Props = {
	account_name: string,
	size?: 'small' | 'medium' | 'large'
}

const ProfileCell = ({ account_name, size }: Props) => {
	const [profile, setProfile] = useState(null)
	const [isImageError, setIsImageError] = useState(false)

	const fetchProfile = async () => {
		try {
			const profileData = await FETCH_PROFILE(account_name)
			setProfile(profileData)
		} catch (err) {
			console.warn(err)
		}
	}

	const onImageError = () => {
		console.log('onImageError')
		setIsImageError(true)
	}

	useEffect(() => {
		fetchProfile()
	}, [])

	if (!profile) {
		return <span>{account_name}</span>
	}

	const { display_name, avatar } = profile

	return (
		<div className={styles.cellContent}>
			{!!avatar && !isImageError && (
				<img src={avatar} className={classnames([styles.avatar, styles[size]])} onerror={onImageError} />
			)}
			<div className={styles.cellInfo}>
				{!!display_name && <><div>{display_name}</div></>}
				<div><strong>@{account_name}</strong></div>
			</div>
		</div>
	)
}

export default ProfileCell