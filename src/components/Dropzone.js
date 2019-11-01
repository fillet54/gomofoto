import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Pane, Card, Heading} from 'evergreen-ui'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from '@fortawesome/pro-light-svg-icons';

const normalDropStyle = {
    borderStyle: 'dashed',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#dbdbdb',
    width: "100%",
    backgroundColor: '#fbfbfb',
    height: 560,
    transform: "scale(1)",
    transition: "all .3s ease-in-out",
    boxShadow: "0 0 0 rgba(0,0,0,0)"
}
const dragginStyle = {
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 5,
    transform: "scale(1.05)",
    boxShadow: "0 0 50px rgba(0,0,0,.2)"
}

const DropZone = ({flexBasis=320}) => {
  const maxSize = 5242880;

  const onDrop = useCallback(acceptedFiles => {
    console.log(acceptedFiles);
  }, []);

  const {
    isDragActive,
    getRootProps,
    getInputProps,
    isDragReject,
    acceptedFiles,
    rejectedFiles
  } = useDropzone({
    onDrop,
    accept: ["image/png", "image/jpeg"],
    minSize: 0,
    maxSize
  });

  const isFileTooLarge =
    rejectedFiles.length > 0 && rejectedFiles[0].size > maxSize;

  const dropStyle = !isDragActive ? normalDropStyle : dragginStyle
  return (
    <Pane flexBasis={flexBasis} marginRight={60}>
        <div {...getRootProps()}>
      <Card 
      {...normalDropStyle}
      {...(isDragActive && dragginStyle)}
      {...dropStyle}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      cursor="pointer">
        <input {...getInputProps()} />
        <FontAwesomeIcon icon={faPlus} size="4x" color="green" />
        {!isDragActive && <Heading>Drag and Drop an Image File</Heading>}
        {isDragActive && !isDragReject && "Drop it like it's hot!"}
        {isDragReject && "File type not accepted, sorry!"}
        {isFileTooLarge && (
          <div>File is too large.</div>
        )}
      </Card>
      </div>
    </Pane>
  );
};

export default DropZone;