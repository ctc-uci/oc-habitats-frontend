import { React, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { InfoIcon } from '@chakra-ui/icons';
import { VStack, HStack, Select, Button, Tooltip, Heading, Stack, Flex } from '@chakra-ui/react';

function BehaviorsList({ title, description, options }) {
  const [, setTrigger] = useState(false);
  const flagsRef = useRef([0]);

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
    const { selectedIndex } = event.target.options;
    const { value } = event.target.dataset;

    // Did not select None
    if (selectedIndex !== 0) {
      flagsRef.current[parseInt(value, 10)] = selectedIndex;
    } else {
      // Selected None
      flagsRef.current.splice(value, 1);
    }
    setTrigger(prevState => {
      return !prevState;
    });
  };

  const createBehaviorSelection = () => {
    return flagsRef.current.map((e, i) => {
      return (
        <Select
          // eslint-disable-next-line react/no-array-index-key
          key={`${title} ${i}`}
          data-value={i}
          value={options[e]}
          w="23%"
          mr="5em"
          order={i}
          onChange={event => {
            setFlags(event);
          }}
        >
          {createOptions()}
        </Select>
      );
    });
  };

  const addBehavior = () => {
    if (!flagsRef.current.includes(0)) {
      flagsRef.current.push(0);
      setTrigger(prevState => {
        return !prevState;
      });
    }
  };

  return (
    <VStack align="start" w="100%">
      <HStack spacing="1.5em" justify="space-between">
        <Heading as="h5" size="md">
          {title}
        </Heading>
        <Tooltip label={description} fontSize="md">
          <InfoIcon />
        </Tooltip>
      </HStack>

      <Stack direction={['column', 'row']} w="100%">
        <Flex d="inline-flex" gridGap={8} wrap="wrap" w="inherit" m="1em auto">
          {createBehaviorSelection()}
        </Flex>
      </Stack>

      <Button bgColor="gray.700" textColor="gray.50" w="23%" onClick={addBehavior}>
        Add behavior +
      </Button>
    </VStack>
  );
}

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
