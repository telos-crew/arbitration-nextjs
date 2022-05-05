import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'

function Dropzone({ uploadFiles }) {
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
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
    </div>
  )
}

export default Dropzone