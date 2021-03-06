import { FormControl, FormLabel, Grid, GridItem, Text } from '@chakra-ui/react';
import { PropTypes } from 'prop-types';
import React from 'react';
import ReactHookFormSelect from '../../common/ReactHookFormSelect';
import CollapsibleSection from '../CollapsibleSection/CollapsibleSection';

const BehaviorsSection = ({ behaviorOptions, nestingOptions, isTemplate }) => {
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
      <Grid templateColumns={{ md: 'repeat(2, 1fr)', base: 'repeat(1,1fr)' }} gap={4} width="100%">
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
                menuPosition="fixed"
              />
            </FormLabel>
            {isTemplate && <Text color="#718096">Static</Text>}
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
                menuPosition="fixed"
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
  nestingOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  isTemplate: PropTypes.bool,
};

export default BehaviorsSection;
