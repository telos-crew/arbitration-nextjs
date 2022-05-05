import React, { useState } from 'react'
import axios from 'axios'
import Dropzone from './Dropzone'

type Props = {
	setHash: (hash: string) => void
}

const DstorUpload = ({ setHash }: Props) => {
	const [isUploading, setIsUploading] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')

	const uploadFiles = async (files: any) => {
		setErrorMessage('')
		setIsUploading(true)
		try {
			const formData = new FormData()
			formData.append('file', files[0])
			const { data: { Hash } } = await axios.post(`/api/upload`, formData, {
				headers: { 'content-type': 'multipart/form-data' },
				onUploadProgress: (event) => {
					console.log(`Current progress:`, Math.round((event.loaded * 100) / event.total));
				},
				data: formData
			})
			setHash(Hash)
		} catch (err) {
			console.warn(err)
			setErrorMessage(err.message)
		} finally {
			setIsUploading(false)
		}
	}

	return (
		<Dropzone uploadFiles={uploadFiles} isUploading={isUploading} errorMessage={errorMessage} />
	)
}

export default DstorUpload