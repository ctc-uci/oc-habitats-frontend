import { InfoIcon } from '@chakra-ui/icons';
import {
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

const FORM_PREFIX = 'predators';

const PREDATORS = [
  ['Corvid: American Crow', 'crow'],
  ['Corvid: Common Raven', 'raven'],
  ['Raptor', 'raptor'],
  ['Horse', 'horse'],
  ['Coyote', 'coyote'],
  ['Fox', 'fox'],
  ['Cat', 'cat'],
];

const PredatorField = ({ predatorName, predatorId, isDisabled, predatorIndex }) => {
  const { setValue, getValues } = useFormContext();

  return (
    <GridItem colSpan={1} rowSpan={1} width="200px">
      <VStack spacing="8px" align="left">
        <Text fontWeight="500" fontSize="md">
          {predatorName}
        </Text>
        <NumberInput
          min={0}
          isDisabled={isDisabled}
          onChange={(_, val) =>
            setValue(`${FORM_PREFIX}[${predatorIndex}]`, { species: predatorId, count: val })
          }
          defaultValue={getValues(`${FORM_PREFIX}[${predatorIndex}]`)?.count || 0}
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
  predatorIndex: PropTypes.number.isRequired,
  isDisabled: PropTypes.bool.isRequired,
};

const PredatorsTab = ({ showHeader, isDisabled }) => {
  const { register } = useFormContext();
  return (
    <VStack spacing="23px" align="left">
      {showHeader && (
        <Text fontWeight="600" fontSize="2xl">
          Predators
        </Text>
      )}
      <SimpleGrid columns={4} spacingX="64px" spacingY="68px">
        {PREDATORS.map(([name, value], num) => (
          <PredatorField
            key={value}
            predatorIndex={num}
            predatorName={name}
            predatorId={value}
            isDisabled={isDisabled}
          />
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
        <Textarea width="536px" placeholder="Type here..." {...register(`${FORM_PREFIX}Other`)} />
        <Spacer />
        <Spacer />
      </VStack>
    </VStack>
  );
};

PredatorsTab.defaultProps = {
  isDisabled: false,
  showHeader: true,
};

PredatorsTab.propTypes = {
  isDisabled: PropTypes.bool,
  showHeader: PropTypes.bool,
};

export default PredatorsTab;