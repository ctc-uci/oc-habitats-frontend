import { InfoIcon } from '@chakra-ui/icons';
import {
  Container,
  GridItem,
  HStack,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  SimpleGrid,
  Spacer,
  Text,
  Textarea,
  Tooltip,
  VStack,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React from 'react';
import { useFormContext } from 'react-hook-form';

const FORM_PREFIX = 'predators.';

const PREDATORS = [
  ['Corvid: American Crow', 'crow'],
  ['Corvid: Common Raven', 'raven'],
  ['Raptor', 'raptor'],
  ['Horse', 'horse'],
  ['Coyote', 'coyote'],
  ['Fox', 'fox'],
  ['Cat', 'cat'],
];

const PredatorField = ({ predatorName, predatorId }) => {
  const { setValue, getValues } = useFormContext();

  return (
    <GridItem colSpan={1} rowSpan={1} width="200px">
      <VStack spacing="8px" align="left">
        <Text fontWeight="500" fontSize="md">
          {predatorName}
        </Text>
        <NumberInput
          min={0}
          onChange={(_, val) => setValue(FORM_PREFIX + predatorId, val)}
          defaultValue={getValues()[FORM_PREFIX + predatorId] || 0}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </VStack>
    </GridItem>
  );
};

PredatorField.propTypes = {
  predatorName: PropTypes.string.isRequired,
  predatorId: PropTypes.string.isRequired,
};

const PredatorsTab = () => {
  const { register } = useFormContext();
  return (
    <Container maxW="100vw">
      <VStack spacing="23px" align="left">
        <Text fontWeight="600" fontSize="2xl">
          Predators
        </Text>
        <SimpleGrid columns={4} spacingX="64px" spacingY="68px">
          {PREDATORS.map(([name, value]) => (
            <PredatorField key={value} predatorName={name} predatorId={value} />
          ))}
        </SimpleGrid>
        <Spacer />
        <VStack spacing="8px" align="left">
          <HStack spacing="390">
            <Text fontWeight="500" fontSize="md">
              Other Predator(s)
            </Text>
            <Tooltip
              label="Describe any potential predator species not listed above.
              e.g. Unicorn - 2 "
              placement="top"
            >
              <InfoIcon />
            </Tooltip>
          </HStack>
          <Textarea width="536px" placeholder="Type here..." {...register(`${FORM_PREFIX}other`)} />
          <Spacer />
          <Spacer />
        </VStack>
      </VStack>
    </Container>
  );
};

export default PredatorsTab;
