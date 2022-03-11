import React from 'react';
import { VStack, Heading, Grid, GridItem, Box, FormControl, FormLabel } from '@chakra-ui/react';
import { Select } from 'chakra-react-select';

import { PropTypes } from 'prop-types';

const BehaviorsSection = ({
  behaviorOptions,
  behaviors,
  setBehaviors,
  nestingOptions,
  nesting,
  setNesting,
}) => {
  const title = 'Behaviors';

  const behaviorDropdown = behaviorOptions.map(behavior => ({
    label: behavior,
    value: behavior,
  }));

  const nestingDropdown = nestingOptions.map(n => ({
    label: n,
    value: n,
  }));

  return (
    <Box width="container.lg">
      <VStack spacing="2em" justify="start" align="start">
        <Heading as="h3" size="md">
          {title}
        </Heading>
        <Grid templateColumns="repeat(2, 1fr)" gap={4} width="100%">
          <GridItem>
            <FormControl>
              <FormLabel>
                Nesting
                <Select
                  isMulti
                  name="colors"
                  options={nestingDropdown}
                  closeMenuOnSelect={false}
                  value={nesting}
                  onChange={n => setNesting(n)}
                />
              </FormLabel>
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl>
              <FormLabel>
                Behaviors
                <Select
                  isMulti
                  name="colors"
                  options={behaviorDropdown}
                  closeMenuOnSelect={false}
                  value={behaviors}
                  onChange={b => setBehaviors(b)}
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
