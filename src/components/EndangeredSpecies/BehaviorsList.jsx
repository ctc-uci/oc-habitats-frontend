import { React, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { InfoIcon } from '@chakra-ui/icons';
import {
  VStack,
  HStack,
  Select,
  Button,
  Tooltip,
  Heading,
  Stack,
  Flex,
  FormControl,
} from '@chakra-ui/react';

const BehaviorsList = ({ title, description, options }) => {
  const [trigger, setTrigger] = useState(false);
  const flagsRef = useRef([0]);

  // Populate dropdown menu with options
  const createOptions = () => {
    return options.map(option => {
      return (
        <option key={option} value={option}>
          {option}
        </option>
      );
    });
  };

  const setFlags = event => {
    // Using index to keep order of dropdown menus after rerender
    const { selectedIndex } = event.target.options;
    const { value } = event.target.dataset;

    // Did not select None
    if (selectedIndex !== 0) {
      flagsRef.current[parseInt(value, 10)] = selectedIndex;
    } else {
      // Selected None
      flagsRef.current.splice(value, 1);
    }

    // Trigger rerender
    setTrigger(!trigger);
  };

  // Create dropdown menu(s)
  const createBehaviorSelection = () => {
    return flagsRef.current.map((e, i) => {
      return (
        <FormControl // eslint-disable-next-line react/no-array-index-key
          key={`${title} ${i}`}
          w="23%"
          mr="5em"
        >
          <Select
            data-value={i}
            id={`${title} ${i}`}
            value={options[e]}
            order={i}
            onChange={event => {
              setFlags(event);
            }}
          >
            {createOptions()}
          </Select>
        </FormControl>
      );
    });
  };

  // Add dropdown menu
  const addBehavior = () => {
    // Check if a dropdown menu has None before adding new dropdown
    if (!flagsRef.current.includes(0)) {
      flagsRef.current.push(0);
      setTrigger(!trigger);
    }
  };

  return (
    <VStack align="start" w="100%">
      <HStack spacing="1.5em" justify="space-between">
        <Heading as="h3" size="md">
          {title}
        </Heading>
        <Tooltip label={description} fontSize="md">
          <InfoIcon boxSize={5} />
        </Tooltip>
      </HStack>

      <Stack direction={['column', 'row']} w="100%">
        <Flex d="flex" gridGap={8} wrap="wrap" w="inherit" m="1em auto">
          {createBehaviorSelection()}
        </Flex>
      </Stack>

      <Button id={null} bgColor="gray.700" textColor="gray.50" w="23%" onClick={addBehavior}>
        Add behavior +
      </Button>
    </VStack>
  );
};

BehaviorsList.defaultProps = {
  title: PropTypes.string,
  description: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string),
};

BehaviorsList.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string),
};

export default BehaviorsList;
