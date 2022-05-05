import React, { useState } from 'react'
import axios from 'axios'
import Dropzone from './Dropzone'

type Props = {
	setHash: (hash: string) => void
}

const DstorUpload = ({ setHash }: Props) => {
	const [isUploading, setIsUploading] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')
	const [progress, setProgress] = useState(0)

	const uploadFiles = async (files: any) => {
		setErrorMessage('')
		setProgress(0.1)
		try {
			const formData = new FormData()
			formData.append('file', files[0])
			const { data: { Hash } } = await axios.post(`/api/upload`, formData, {
				headers: { 'content-type': 'multipart/form-data' },
				onUploadProgress: (event) => {
					const portion = (Math.round((event.loaded * 100) * 0.9 / event.total))
					console.log(`Current progress:`, portion);
					setProgress(portion)
				},
				data: formData,
				maxContentLength: 100000000,
				maxBodyLength: 100000000
			})
			setProgress(100)
			setHash(Hash)
		} catch (err) {
			console.warn(err)
			setErrorMessage(err.message)
		} finally {
			setIsUploading(false)
		}
	}

	return (
		<Dropzone
			uploadFiles={uploadFiles}
			errorMessage={errorMessage}
			progress={progress}
		/>
	)
}

export default DstorUpload