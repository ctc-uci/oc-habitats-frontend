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

const inputs = [
  '# of Male Adults',
  '# of Male Fledges',
  '# of Male Chicks',
  '# of Female Adults',
  '# of Female Fledges',
  '# of Female Chicks',
];

const SexSection = ({ values, setValues }) => {
  const title = 'Sex';

  const updateValue = (value, idx) => {
    setValues(update(values, { [idx]: { $set: parseInt(value, 10) } }));
  };

  return (
    <Box width="container.lg">
      <VStack spacing="2em" justify="start" align="start">
        <Heading as="h3" size="md">
          {title}
        </Heading>
        <Grid templateColumns="repeat(3, 1fr)" gap={4} width="100%">
          {inputs.map((input, idx) => (
            <GridItem key={input}>
              <FormControl>
                <FormLabel>
                  {input}
                  <Input
                    type="number"
                    value={values[idx]}
                    onChange={e => updateValue(e.target.value, idx)}
                  />
                </FormLabel>
              </FormControl>
            </GridItem>
          ))}
        </Grid>
      </VStack>
    </Box>
  );
};

SexSection.propTypes = {
  values: PropTypes.arrayOf(PropTypes.number).isRequired,
  setValues: PropTypes.func.isRequired,
};

export default SexSection;
