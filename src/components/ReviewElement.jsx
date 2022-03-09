import { React } from 'react';
import PropTypes from 'prop-types';
import { Text, Box, Input, SimpleGrid, GridItem } from '@chakra-ui/react';

const ReviewElement = ({ sectionTitle, value, splitField }) => {
  return (
    <Box>
      <Text>{sectionTitle}</Text>
      {splitField ? (
        <SimpleGrid columns={2} spacing="12px">
          <GridItem>
            <Input isReadOnly="true" bgColor="#EDF2F7" value={value} />
          </GridItem>
          <GridItem>
            <Input isReadOnly="true" bgColor="#EDF2F7" value={value} />
          </GridItem>
        </SimpleGrid>
      ) : (
        <Input isReadOnly="true" bgColor="#EDF2F7" value={value} />
      )}
    </Box>
  );
};
ReviewElement.defaultProps = {
  splitField: false,
};
ReviewElement.propTypes = {
  sectionTitle: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  splitField: PropTypes.bool,
};
export default ReviewElement;
