import React, { useEffect } from 'react';
import { VStack, Heading, Grid, GridItem, Box, FormControl, FormLabel } from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import { PropTypes } from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';

const BehaviorsSection = ({
  behaviorOptions,
  behaviors,
  setBehaviors,
  nestingOptions,
  nesting,
  setNesting,
}) => {
  const title = 'Behaviors';

  const { control, setValue } = useFormContext();

  const behaviorDropdown = behaviorOptions.map(behavior => ({
    label: behavior,
    value: behavior,
  }));

  const nestingDropdown = nestingOptions.map(n => ({
    label: n,
    value: n,
  }));

  return (
    <Box width="100%" maxW="900px">
      <VStack spacing="2em" justify="start" align="start">
        <Heading as="h3" size="md">
          {title}
        </Heading>
        <Grid templateColumns="repeat(2, 1fr)" gap={4} width="100%">
          <GridItem>
            <FormControl>
              <FormLabel>
                Nesting
                <Controller
                  name="nesting"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      isMulti
                      options={nestingDropdown}
                      closeMenuOnSelect={false}
                    />
                  )}
                />
              </FormLabel>
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl>
              <FormLabel>
                Behaviors
                <Controller
                  name="behaviors"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      isMulti
                      options={behaviorDropdown}
                      closeMenuOnSelect={false}
                    />
                  )}
                />
              </FormLabel>
            </FormControl>
          </GridItem>
        </Grid>
      </VStack>
    </Box>
  );
};

BehaviorsSection.propTypes = {
  behaviorOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  behaviors: PropTypes.arrayOf(PropTypes.string).isRequired,
  setBehaviors: PropTypes.func.isRequired,
  nestingOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  nesting: PropTypes.arrayOf(PropTypes.string).isRequired,
  setNesting: PropTypes.func.isRequired,
};

export default BehaviorsSection;
