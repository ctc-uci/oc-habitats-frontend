import React, { useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import { Container, Flex, Icon, Text } from '@chakra-ui/react';
import { CgSoftwareUpload } from 'react-icons/cg';
import PropTypes from 'prop-types';
import './Dropzone.css';

const Dropzone = ({ hasUpload, setFiles }) => {
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } = useDropzone({
    accept: 'image/png,image/jpeg,image/jpg',
    onDrop: acceptedFiles => {
      setFiles(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      );
    },
    maxFiles: 1,
    disabled: hasUpload,
  });

  const style = useMemo(() => {
    let base = 'dropzone-zone';
    if (isFocused) {
      base += ' dropzone-focused';
    }
    if (isDragAccept) {
      base += ' dropzone-accept';
    }
    if (isDragReject) {
      base += ' dropzone-reject';
    }
    return base;
  }, [isFocused, isDragAccept, isDragReject]);

  return (
    <Container>
      <div className={style} {...getRootProps()}>
        <input {...getInputProps()} />
        <Text
          as={Flex}
          color={hasUpload ? 'gray.400' : 'ochBlack'}
          fontWeight={500}
          alignItems="center"
          justifyContent="space-between"
          w="41%"
        >
          <Icon
            as={CgSoftwareUpload}
            w="1.5em"
            h="1.5em"
            color={hasUpload ? 'gray.400' : 'ochBlack'}
          />
          Upload Image (Max: 1)
        </Text>
      </div>
    </Container>
  );
};

Dropzone.propTypes = {
  setFiles: PropTypes.func.isRequired,
  hasUpload: PropTypes.bool.isRequired,
};

export default Dropzone;
