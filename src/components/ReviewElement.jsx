import { React } from 'react';
import PropTypes from 'prop-types';
import { Text, Box, Input } from '@chakra-ui/react';

const ReviewElement = ({ sectionTitle, value }) => {
  return (
    <Box>
      <Text>{sectionTitle}</Text>
      <Input isReadOnly="true">{value}</Input>
    </Box>
  );
};
ReviewElement.propTypes = {
  sectionTitle: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};
export default ReviewElement;
