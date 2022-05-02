import { FormControl, FormLabel, Grid, GridItem, Text } from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import { PropTypes } from 'prop-types';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import CollapsibleSection from '../CollapsibleSection/CollapsibleSection';

const BehaviorsSection = ({ behaviorOptions, nestingOptions, isTemplate }) => {
  const { control } = useFormContext();

  const behaviorDropdown = behaviorOptions.map(behavior => ({
    label: behavior,
    value: behavior,
  }));

  const nestingDropdown = nestingOptions.map(n => ({
    label: n,
    value: n,
  }));

  return (
    <CollapsibleSection title="Behaviors">
      <Grid templateColumns="repeat(2, 1fr)" gap={4} width="100%">
        <GridItem>
          <FormControl>
            <FormLabel>
              Nesting
              <Controller
                name="nesting"
                control={control}
                render={({ field }) => (
                  <Select {...field} isMulti options={nestingDropdown} closeMenuOnSelect={false} />
                )}
              />
            </FormLabel>
            {isTemplate && <Text color="#718096">Static</Text>}
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
                  <Select {...field} isMulti options={behaviorDropdown} closeMenuOnSelect={false} />
                )}
              />
            </FormLabel>
            {isTemplate && <Text color="#718096">Static</Text>}
          </FormControl>
        </GridItem>
      </Grid>
    </CollapsibleSection>
  );
};

BehaviorsSection.defaultProps = {
  isTemplate: false,
};
BehaviorsSection.propTypes = {
  behaviorOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  behaviors: PropTypes.arrayOf(PropTypes.string).isRequired,
  setBehaviors: PropTypes.func.isRequired,
  nestingOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  nesting: PropTypes.arrayOf(PropTypes.string).isRequired,
  setNesting: PropTypes.func.isRequired,
  isTemplate: PropTypes.bool,
};

export default BehaviorsSection;
