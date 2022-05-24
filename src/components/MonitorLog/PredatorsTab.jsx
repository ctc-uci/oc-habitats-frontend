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
import { FiExternalLink } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const FORM_PREFIX = 'predators';

const PredatorField = ({ predatorName, predatorId, isDisabled, predatorIndex }) => {
  const { setValue, getValues } = useFormContext();
  const formKey = `${FORM_PREFIX}[${predatorIndex}]`;

  React.useEffect(() => {
    setValue(formKey, { species: predatorId, count: getValues(formKey)?.count || 0 });
  }, []);

  return (
    <GridItem colSpan={1} rowSpan={1} width={{ md: '90%', base: '80%' }}>
      <VStack spacing="8px" align="left">
        <Text fontWeight="500" fontSize="md">
          {predatorName}
        </Text>
        <NumberInput
          min={0}
          isDisabled={isDisabled}
          onChange={(_, val) => setValue(formKey, { species: predatorId, count: val })}
          defaultValue={getValues(formKey)?.count || 0}
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

const PredatorsTab = ({ showHeader, isDisabled, predators, isTemplate }) => {
  const { register } = useFormContext();
  return (
    <>
      {isTemplate && (
        <>
          <Text mt="30px" color="ochPurple" fontWeight="500">
            The Predators section of the Monitor Log Template cannot be edited.
          </Text>
          <HStack mb="30px">
            <Text color="ochPurple" fontWeight="500">
              To view or edit the current catalogue of Predators,
            </Text>
            <Link to="/species">
              <Text color="#2B6CB0" fontWeight="500" maxW="100vw">
                Open Species Catalog
              </Text>
            </Link>
            <Link to="/species">
              <Text color="#2B6CB0" fontWeight="500" maxW="100vw">
                <FiExternalLink />
              </Text>
            </Link>
          </HStack>
        </>
      )}
      <VStack spacing="23px" align="left">
        {showHeader && (
          <Text fontWeight="600" fontSize="2xl">
            Predators
          </Text>
        )}
        <SimpleGrid
          columns={{ md: 4, base: 1 }}
          spacingX="64px"
          spacingY={{ md: '68px', base: '30px' }}
        >
          {predators.map(({ name: predatorName, _id }, num) => (
            <PredatorField
              key={_id}
              predatorIndex={num}
              predatorName={predatorName}
              predatorId={_id}
              isDisabled={isDisabled}
            />
          ))}
        </SimpleGrid>
        <Spacer />
        <VStack spacing="8px" align="left">
          <HStack spacing={{ md: '380' }} justify={{ base: 'space-between', md: 'start' }}>
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
    </>
  );
};

PredatorsTab.defaultProps = {
  isDisabled: false,
  showHeader: true,
  isTemplate: false,
};

PredatorsTab.propTypes = {
  isDisabled: PropTypes.bool,
  showHeader: PropTypes.bool,
  isTemplate: PropTypes.bool,
  predators: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      _id: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default PredatorsTab;
