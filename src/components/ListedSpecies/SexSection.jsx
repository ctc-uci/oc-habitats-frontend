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
} from '@chakra-ui/react';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import CollapsibleSection from '../CollapsibleSection/CollapsibleSection';

const TOTAL_FIELDS = ['totalAdults', 'totalFledges', 'totalChicks'];

const inputs = [
  '# of Male Adults',
  '# of Male Fledges',
  '# of Male Chicks',
  '# of Female Adults',
  '# of Female Fledges',
  '# of Female Chicks',
];

const SexSection = () => {
  const { watch, setValue, getValues } = useFormContext();

  const getMax = idx => {
    const otherCount = watch(`sex[${(idx + 3) % 6}]`);
    const totalCount = watch(TOTAL_FIELDS[idx % 3]);
    return totalCount - otherCount;
  };

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
