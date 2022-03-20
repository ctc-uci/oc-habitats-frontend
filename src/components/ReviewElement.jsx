import { React } from 'react';
import PropTypes from 'prop-types';
import { Text, Box, Input } from '@chakra-ui/react';

const ReviewElement = ({ sectionTitle, value }) => {
  return (
    <Box>
      <Text>{sectionTitle}</Text>
      <Input isReadOnly="true" bgColor="#EDF2F7" value={value} />
    </Box>
  );
};
ReviewElement.propTypes = {
  sectionTitle: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};
export default ReviewElement;
