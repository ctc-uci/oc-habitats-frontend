import { React } from 'react';
import PropTypes from 'prop-types';
import { InfoIcon } from '@chakra-ui/icons';
import { VStack, HStack, Select, Button, Tooltip, Heading } from '@chakra-ui/react';

function AttributeList({ title, description }) {
  // console.log('AttributeList');
  return (
    <VStack align="start" w="24%">
      <HStack spacing="1.5em" justify="space-between">
        <Heading as="h5" size="md">
          {title}
        </Heading>
        <Tooltip label={description} fontSize="md">
          <InfoIcon />
        </Tooltip>
      </HStack>
      <Select placeholder="None">
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </Select>
      <Button colorScheme="gray" w="100%">
        Add behavior +
      </Button>
    </VStack>
  );
}

AttributeList.defaultProps = {
  title: PropTypes.string,
  description: PropTypes.string,
};

AttributeList.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

export default AttributeList;
