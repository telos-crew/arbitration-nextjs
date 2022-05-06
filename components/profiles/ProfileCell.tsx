import React, { useState, useEffect } from 'react'
import styles from './ProfileCell.module.scss'
import { FETCH_PROFILE } from '../../constants/profiles';

type Props = {}

const ProfileCell = ({ account_name }) => {
	const [profile, setProfile] = useState(null)

	const fetchProfile = async () => {
		try {
			const profileData = await FETCH_PROFILE(account_name)
			setProfile(profileData)
		} catch (err) {
			console.warn(err)
		}
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
			{!!avatar && (
				<img src={avatar} className={styles.avatar} />
			)}
			<div className={styles.cellInfo}>
				{!!display_name && <><div>{display_name}</div></>}
				<div><strong>@{account_name}</strong></div>
			</div>
		</div>
	)
}

export default ProfileCell