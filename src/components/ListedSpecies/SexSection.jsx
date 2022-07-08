import {
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { PropTypes } from 'prop-types';
import CollapsibleSection from '../CollapsibleSection/CollapsibleSection';

const inputs = ['# of Male Adults', '# of Female Adults'];

const SexSection = ({ isTemplate }) => {
  const { watch, setValue, getValues } = useFormContext();

  const totalAdults = watch('totalAdults');

  const getMax = idx => {
    return totalAdults - getValues(`sex[${1 - idx}]`);
  };

  const unknownAdults = totalAdults - watch('sex[0]') - watch('sex[1]');
  setValue('sex[2]', unknownAdults);

  return (
    <CollapsibleSection title="Sex">
      <Grid templateColumns={{ md: 'repeat(3, 1fr)', base: 'repeat(1, 1fr)' }} gap="2em">
        {inputs.map((input, idx) => (
          <GridItem key={input}>
            <FormControl>
              <FormLabel>
                {input}
                <NumberInput
                  min={0}
                  onChange={(_, val) => setValue(`sex[${idx}]`, val, { shouldDirty: true })}
                  defaultValue={getValues(`sex[${idx}]`)}
                  max={getMax(idx)}
                  isDisabled={idx === 2}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormLabel>
              {isTemplate && <Text color="#718096">Static</Text>}
            </FormControl>
          </GridItem>
        ))}
        <GridItem>
          <FormControl>
            <FormLabel>
              # of Unknown Adults
              <NumberInput min={0} value={getValues(`sex[2]`)} isDisabled>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormLabel>
            {isTemplate && <Text color="#718096">Static</Text>}
          </FormControl>
        </GridItem>
      </Grid>
    </CollapsibleSection>
  );
};
SexSection.defaultProps = {
  isTemplate: false,
};
SexSection.propTypes = {
  isTemplate: PropTypes.bool,
};
export default SexSection;
