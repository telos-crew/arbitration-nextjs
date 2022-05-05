import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import { Progress } from 'antd'

function Dropzone({ uploadFiles, errorMessage, progress }) {
  const onDrop = useCallback(acceptedFiles => {
    uploadFiles(acceptedFiles)
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div
      {...getRootProps()}
      className={`dropzone ${isDragActive && 'dropzone--isActive'}`}
    >
      <input {...getInputProps()} />
      {
        progress > 0 ? (
          <Progress type="circle" percent={progress} />
        ) : (
          isDragActive ?
            <p>Drop the files here ...</p> :
            <p>Drag 'n' drop some files here, or click to select files</p>
        )
      }
    </div>
  )
}

export default Dropzone