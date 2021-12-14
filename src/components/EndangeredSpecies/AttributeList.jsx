/* eslint-disable no-unused-vars */
import { React } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Text,
  Stack,
  VStack,
  HStack,
  Select,
  Button,
  Tooltip,
  Heading,
} from '@chakra-ui/react';

function AttributeList({ title }) {
  return (
    <VStack>
      <HStack>
        <Heading as="h5" size="md">
          {title}
        </Heading>
        <Tooltip label="info" fontSize="md">
          icon
        </Tooltip>
      </HStack>
      <Select placeholder="None">
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </Select>
      <Button>Add behavior +</Button>
    </VStack>
  );
}

AttributeList.defaultProps = {
  title: PropTypes.string,
};

AttributeList.propTypes = {
  title: PropTypes.string,
};

export default AttributeList;
