import React from 'react';
import {
  VStack,
  Heading,
  Grid,
  GridItem,
  Box,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import update from 'immutability-helper';
import { PropTypes } from 'prop-types';
import { useFormContext } from 'react-hook-form';

const inputs = [
  '# of Male Adults',
  '# of Male Fledges',
  '# of Male Chicks',
  '# of Female Adults',
  '# of Female Fledges',
  '# of Female Chicks',
];

const SexSection = () => {
  const title = 'Sex';
  const { register } = useFormContext();

  return (
    <Box width="100%" maxW="900px">
      <VStack spacing="2em" justify="start" align="start">
        <Heading as="h3" size="md">
          {title}
        </Heading>
        <Grid templateColumns="repeat(3, 1fr)" gap="2em">
          {inputs.map((input, idx) => (
            <GridItem key={input}>
              <FormControl>
                <FormLabel>
                  {input}
                  <Input type="number" {...register(`sex[${idx}]`)} />
                </FormLabel>
              </FormControl>
            </GridItem>
          ))}
        </Grid>
      </VStack>
    </Box>
  );
};

export default SexSection;
