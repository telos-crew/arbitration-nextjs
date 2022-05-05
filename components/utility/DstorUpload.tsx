import React from 'react'
import axios from 'axios'
import Dropzone from './Dropzone'

type Props = {}

const DstorUpload = (props: Props) => {
	const APP_HOSTNAME = process.env.APP_HOSTNAME
	console.log('APP_HOSTNAME: ', APP_HOSTNAME)
	const uploadFiles = async (files: any) => {
		try {
			const formData = new FormData()
			// console.log('files: ', files[0])
			// formData.append('theFile', files[0])
			// formData.append('theFiles', files[0])
			formData.append('file', files[0])
			// formData.append('files', files[0])
			const response = await axios.post(`/api/upload`, formData, {
				headers: { 'content-type': 'multipart/form-data' },
				onUploadProgress: (event) => {
					console.log(`Current progress:`, Math.round((event.loaded * 100) / event.total));
				},
				data: formData
			})
		} catch (err) {
			console.warn(err)
		}
	}

	return (
		<Dropzone uploadFiles={uploadFiles} />
	)
}

export default DstorUpload