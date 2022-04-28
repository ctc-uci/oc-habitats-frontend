import { FormControl, FormLabel, Grid, GridItem } from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import { PropTypes } from 'prop-types';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import ReactHookFormSelect from '../../common/ReactHookFormSelect';
import CollapsibleSection from '../CollapsibleSection/CollapsibleSection';

const BehaviorsSection = ({ behaviorOptions, nestingOptions }) => {
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
              <ReactHookFormSelect
                name="nesting"
                options={nestingDropdown}
                optionKey="value"
                isMulti
                closeMenuOnSelect={false}
              />
            </FormLabel>
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl>
            <FormLabel>
              Behaviors
              <ReactHookFormSelect
                name="behaviors"
                options={behaviorDropdown}
                optionKey="value"
                isMulti
                closeMenuOnSelect={false}
              />
            </FormLabel>
          </FormControl>
        </GridItem>
      </Grid>
    </CollapsibleSection>
  );
};

BehaviorsSection.propTypes = {
  behaviorOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  nestingOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default BehaviorsSection;
