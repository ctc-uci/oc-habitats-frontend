import {
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from '@chakra-ui/react';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import CollapsibleSection from '../CollapsibleSection/CollapsibleSection';

const inputs = [
  '# of Male Adults',
  '# of Male Fledges',
  '# of Male Chicks',
  '# of Female Adults',
  '# of Female Fledges',
  '# of Female Chicks',
];

const SexSection = () => {
  const { register, setValue, getValues } = useFormContext();
  console.log('sex', getValues());

  return (
    <CollapsibleSection title="Sex">
      <Grid templateColumns="repeat(3, 1fr)" gap="2em">
        {inputs.map((input, idx) => (
          <GridItem key={input}>
            <FormControl>
              <FormLabel>
                {input}
                <NumberInput
                  min={0}
                  onChange={val => setValue(`sex[${idx}]`, parseInt(val, 10))}
                  defaultValue={getValues()[`sex[${idx}]`]}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormLabel>
            </FormControl>
          </GridItem>
        ))}
      </Grid>
    </CollapsibleSection>
  );
};

export default SexSection;
